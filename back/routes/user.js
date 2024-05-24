const express = require("express"); //получаем класс роутера из библиотеки
const UserController = require("../controllers/UserController");
const { auth, authAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/register", UserController.register); //роуты регистрации авторизации обычного пользователя
router.post("/login", UserController.login);
router.post("/logout", auth, UserController.logout);
router.get("/verify_user", auth, UserController.verify_user); //роут верификации и проверки роли для доступа к функционалу
router.get("/", auth, UserController.getAllUsers); //роут получения всех пользователей юзером
router.get("/:userID", auth, UserController.getUserByID); //роут вывода одного пользователя (его профиля)
router.get("/:userID/find_people", auth, UserController.findPeople); //роут для поиска пользователей
router.put("/:userID/update", auth, UserController.updateUser); //роут изменения профиля пользователя(можно и пароль будет изменить)
router.get("/admin", auth, authAdmin, UserController.getAllUsersAdmin); //роут получения всех пользователей админом(с более чувствительной информации
router.put("/:userID/admin", auth, authAdmin, UserController.getUserByIDAdmin); //роут получения чувствительной информации о пользователе (например админ пароль)
router.put("/upgrade-role", auth, UserController.upgradeRole); //роут повышения роли пользователя до админа
//далее будут еще роутинги для бана пользователей админами либо для бана ивентов админами(в роуте ивент)

module.exports = router;
