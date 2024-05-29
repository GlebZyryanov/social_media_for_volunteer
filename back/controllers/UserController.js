const {  User } = require('../models/models');
const {Sequelize} = require("../db/db");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY, {
        expiresIn: "8000h",
      });
      return res.json({ token, user });
    } catch (error) {
      next(ApiError.internal("Failed to register")); // Возникла внутренняя ошибка сервера
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

      const token = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.json({ token, user });
    } catch (error) {
      next(ApiError.internal("Failed to login"));
    }
  }

  async logout(req, res, next) {
    try {
      const user = req.user;

      // Обновляем состояние isActive при выходе
      user.isActive = false;
      await user.save();

      return res.json({ message: "Logout successful" });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async verify_user(req, res) {
    try {
      // Проверяем, есть ли роль в теле запроса
      const { role } = req.body;
      if (!role) {
        throw ApiError.badRequest("Role is required");
      }

      // Проверяем, есть ли у пользователя роль
      if (!req.user || !req.user.role) {
        throw ApiError.forbidden("User role not provided");
      }

      // Сравниваем роль из тела запроса с ролью пользователя
      const isValid = role === req.user.role;

      // Возвращаем результат сравнения
      return res.status(200).json({ isValid });
    } catch (error) {
      // Передаём ошибку дальше обработчику ошибок express
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      return res.json({ users });
    } catch (error) {
      next(ApiError.internal('Failed to get users'));
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
       next(ApiError.internal('Failed to get user'));
    }
  }

  async findPeople(req, res, next) {
    //разобраться с этим чуть позже понять как оптимизировать
    try {
      const { query } = req.query;
      const users = await User.findAll({
        where: {
          [Sequelize.Op.or]: [
            { name: { [Sequelize.Op.like]: `%${query}%` } },
            { surname: { [Sequelize.Op.like]: `%${query}%` } },
            { email: { [Sequelize.Op.like]: `%${query}%` } }, // Добавляем поиск по email
          ],
        },
      });
      return res.json({ users });
    } catch (error) {
      next(ApiError.internal('Failed to find people'));
    }
  }

  //тут тоже нужно пересмотреть немного - возможно удасться оптимизировать с помощью клиента
  async updateUser(req, res, next) {
    
    try {
      const { userID } = req.params;
      const { name, surname, email, phone, profile, image_path, password } =
        req.body;

      const user = await User.findByPk(userID);

      if (!user) {
        next(ApiError.notFound("User not found"));
      }

      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      user.name = name || user.name;
      user.surname = surname || user.surname;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.profile = profile || user.profile;
      user.image_path = image_path || user.image_path;

      await user.save();
      return res.json({ user });
    } catch (error) {
      next(ApiError.internal('Failed to update user'));
    }
  }

  async getAllUsersAdmin(req, res, next) {
    //позже добавить функционал, пока тоже самое что и у обычного юзера
    try {
      const users = await User.findAll();
      return res.json({ users });
    } catch (error) {
      next(ApiError.internal('Failed to get users'));
    }
  }

  async getUserByIDAdmin(req, res, next) {
    try {
      const { userID } = req.params;
      const user = await User.findByPk(userID, {
        attributes: { exclude: ["password"] }, // Исключаем поле пароля из результатов запроса
        raw: true, // Получаем чистый объект без экземпляра модели Sequelize
      });

      if (!user) {
        next(ApiError.notFound("User not found"));
      }

      if (req.user.role !== "ADMIN") {
        next(ApiError.forbidden("Access denied (admin only)"));
      }

      // Возвращаем админу информацию, включая admin_password пользователя
      return res.json({ user });
    } catch (error) {
      next(ApiError.internal('Failed to get user'));
    }
  }

  async upgradeRole(req, res, next) {
    try {
      const { userID, adminPassword } = req.body;
      const user = await User.findByPk(userID);

      if (!user) {
        next(ApiError.notFound("User not found"));
      }

      // Проверяем, соответствует ли введенный пароль admin_password пользователя
      if (adminPassword !== user.admin_password) {
        next(ApiError.unauthorized("Incorrect admin password"));
      }

      // Выполняем апгрейд роли пользователя
      user.role = "ADMIN";
      await user.save();

      return res.json({ user });
    } catch (error) {
      next(ApiError.internal('Failed to upgrade role'));
    }
  }
}

module.exports = new UserController();
