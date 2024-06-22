const { User } = require("../models/models");
const { Sequelize } = require("../db/db");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const { sendEmail } = require("../config/nodemailer");

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: "8000h",
  });
};

class UserController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      // Проверяем, существует ли уже пользователь с таким email
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const emailConfirmationToken = uuidv4();
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        emailConfirmationToken,
      });
      user.isActive = true;
      user.isBanned = false;
      await user.save();

      const emailSubject = "Подтверждение почты";
      const emailText = `Для подтверждения вашей почты перейдите по ссылке: ${process.env.FRONTEND_URL}/confirm-email?token=${emailConfirmationToken}`;
      await sendEmail(user.email, emailSubject, emailText);
      const token = generateJwt(user.user_id, user.email);
      return res.json({ token, user });
    } catch (error) {
      console.error("Registration error:", error);
      next(ApiError.internal("Failed to register"));
    }
  }

  async confirmEmail(req, res, next) {
    try {
      const { token } = req.query;
      const user = await User.findOne({
        where: { emailConfirmationToken: token },
      });
      if (!user) {
        return next(ApiError.notFound("Invalid token"));
      }
      user.isEmailConfirmed = true;
      user.emailConfirmationToken = null;
      await user.save();
      return res.json({ message: "Email confirmed successfully" });
    } catch (error) {
      console.error("Email confirmation error:", error);
      next(ApiError.internal("Failed to confirm email"));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        next(ApiError.unauthorized("Invalid email or password"));
      }

      // Обновляем состояние isActive при успешном входе
      user.isActive = true;
      await user.save();

      const token = generateJwt(user.user_id, user.email);
      return res.json({ token, user });
    } catch (error) {
      next(ApiError.internal("Failed to login"));
    }
  }

  async logout(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id);
      if (!user) {
        return next(ApiError.notFound("User not found"));
      }

      // Обновляем состояние isActive при выходе
      user.isActive = false;
      await user.save();

      return res.json({ message: "Logout successful" });
    } catch (error) {
      next(ApiError.internal("Failed to logout"));
    }
  }




  async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      return res.json({ users });
    } catch (error) {
      next(ApiError.internal("Failed to get users"));
    }
  }

  async getUserByID(req, res, next) {
    try {
      const { userID } = req.params;
      const user = await User.findByPk(userID);

      if (!user) {
        next(ApiError.notFound("User not found"));
      }

      return res.json({ user });
    } catch (error) {
      next(ApiError.internal("Failed to get user"));
    }
  }

  async updateUser(req, res, next) {
    //позже оптимизировать и прикрутить ошибку при загрузке НЕ ЖПЕГА
    try {
      const { userID } = req.params;
      const { name, surname, phone, profile, password } = req.body;
      const { image_path } = req.files;
      const user = await User.findByPk(userID);
      if (!user) {
        next(ApiError.notFound("User not found"));
      }

      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      user.name = name || user.name;
      user.surname = surname || user.surname;
      user.phone = phone || user.phone;
      user.profile = profile || user.profile;

      if (image_path) {
        let fileName = uuidv4() + ".jpg"; // Генерируем уникальное имя для изображения

        image_path.mv(path.resolve(__dirname, "..", "static", fileName));
        user.image_path = fileName; // Сохраняем путь к изображению в базе данных
      } else {
        next(
          ApiError.internal(
            "Failed to upload image. Only .jpg files are allowed"
          )
        );
      }

      await user.save();
      return res.json({ user });
    } catch (error) {
      next(ApiError.internal("Failed to update user"));
    }
  }

  async upgradeRole(req, res, next) {
    try {
      const { admin_password } = req.body;
      const { userID } = req.params;
      const user = await User.findByPk(userID);

      if (!user) {
        next(ApiError.notFound("User not found"));
      }

      // Проверяем, соответствует ли введенный пароль admin_password пользователя
      if (admin_password !== user.admin_password) {
        next(ApiError.unauthorized("Incorrect admin password"));
      }

      // Выполняем апгрейд роли пользователя
      user.role = "ADMIN";
      await user.save();

      return res.json({ user });
    } catch (error) {
      next(ApiError.internal("Failed to upgrade role"));
    }
  }
  async banUser(req, res, next) {
    try {
      const { userID } = req.params;
      const user = await User.findByPk(userID);

      if (!user) {
        return next(ApiError.notFound("User not found"));
      }

      user.isBanned = true;
      await user.save();

      return res.json({ message: "User banned successfully", user });
    } catch (error) {
      next(ApiError.internal("Failed to ban user"));
    }
  }

  async unbanUser(req, res, next) {
    try {
      const { userID } = req.params;
      const user = await User.findByPk(userID);

      if (!user) {
        return next(ApiError.notFound("User not found"));
      }

      user.isBanned = false;
      await user.save();

      return res.json({ message: "User unbanned successfully", user });
    } catch (error) {
      next(ApiError.internal("Failed to unban user"));
    }
  }
}

module.exports = new UserController();
