const { User } = require("../models/models");
const { Sequelize } = require("../db/db");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

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
        expiresIn: "8000h",
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

  async verify_user(req, res) { //ВОЗМОЖНО УДАЛИТЬ ЕГО ТК ЕСТЬ РОУТ НИЖЕ
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
  async getUserRole(req, res, next) {
    try {
        if (!req.user || !req.user.role) {
            throw ApiError.forbidden("User role not provided");
        }

        return res.status(200).json({ role: req.user.role });
    } catch (error) {
        next(error);
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
      next(ApiError.internal("Failed to find people"));
    }
  }

  //тут тоже нужно пересмотреть немного - возможно удасться оптимизировать с помощью клиента
  // async updateUser(req, res, next) {

  //   // try {
  //     const { userID } = req.params;
  //     const { name, surname, email, phone, profile, password } =
  //       req.body;

  //     const user = await User.findByPk(userID);

  //     if (!user) {
  //       next(ApiError.notFound("User not found"));
  //     }

  //     if (password) {
  //       user.password = await bcrypt.hash(password, 10);
  //     }

  //     user.name = name || user.name;
  //     console.log(user.name)
  //     console.log(name)
  //     user.surname = surname || user.surname;
  //     console.log(user.surname)
  //     console.log(surname)
  //     user.email = email || user.email;
  //     console.log(user.email)
  //     console.log(email)
  //     user.phone = phone || user.phone;
  //     console.log(user.phone)
  //     console.log(phone)
  //     user.profile = profile || user.profile;
  //     console.log(user.profile)
  //     console.log(profile)

  //     if (req.files && req.files.image) {
  //       const image = req.files.image;
  //       const ext = path.extname(image.name);
  //       if (ext !== '.jpg') {
  //         return next(ApiError.badRequest("Only .jpg files are allowed"));
  //       }

  //       const image_name = uuid.v4() + ext;
  //       const image_path = path.join(__dirname, '..', 'static', image_name);

  //       // Ensure the uploads directory exists
  //       fs.mkdirSync(path.dirname(image_path), { recursive: true });

  //       // Move the file to the desired location
  //       await image.mv(image_path);

  //       user.image_path = image_name;
  //       console.log(user.image_path)
  //     }

  //   await user.save();

  //     return res.json({ user });
  //   // } catch (error) {
  //   //   next(ApiError.internal('Failed to update user'));
  //   // }
  // }
  async updateUser(req, res, next) { //позже оптимизировать и прикрутить ошибку при загрузке НЕ ЖПЕГА
    try {
      const { userID } = req.params;
      const { name, surname, email, phone, profile ,password } =
        req.body;
      const {image_path} = req.files;
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

  async getAllUsersAdmin(req, res, next) {
    //позже добавить функционал, пока тоже самое что и у обычного юзера
    try {
      const users = await User.findAll();
      return res.json({ users });
    } catch (error) {
      next(ApiError.internal("Failed to get users"));
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
      next(ApiError.internal("Failed to get user"));
    }
  }

  async upgradeRole(req, res, next) {
    try {
      const { admin_password } = req.body;
      const user = await User.findByPk(req.user.user_id);

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
}

module.exports = new UserController();
