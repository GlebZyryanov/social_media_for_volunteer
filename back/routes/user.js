const express = require("express"); //получаем класс роутера из библиотеки
const UserController = require("../controllers/UserController");
const { auth, authAdmin } = require("../middleware/auth");
const router = express.Router();
router.post("/register", UserController.register); //роуты регистрации авторизации обычного пользователя
router.post("/login", UserController.login); //(Протестировано)
router.post("/logout", auth, UserController.logout);
router.get("/", auth, UserController.getAllUsers); //роут получения всех пользователей юзером
router.get("/:userID", auth, UserController.getUserByID); //роут вывода одного пользователя (его профиля)
router.put("/update/:userID", auth,UserController.updateUser); //роут изменения профиля пользователя
router.put("/upgrade-role/:userID", auth, UserController.upgradeRole); //роут повышения роли пользователя до админа
router.put('/ban/:userID', auth, UserController.banUser);
router.put('/unban/:userID', auth,  UserController.unbanUser);
router.get('/confirm-email', UserController.confirmEmail);

module.exports = router;
