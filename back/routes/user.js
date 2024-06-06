const express = require("express"); //получаем класс роутера из библиотеки
const UserController = require("../controllers/UserController");
const { auth, authAdmin } = require("../middleware/auth");
const router = express.Router();
router.get("/check", auth, UserController.check);
router.get("/find_people", auth, UserController.findPeople); // Маршрут для поиска пользователей (Протестировано)
router.post("/register", UserController.register); //роуты регистрации авторизации обычного пользователя (Протестировано)
router.post("/login", UserController.login); //(Протестировано)
router.post("/logout", auth, UserController.logout);
router.get("/role", auth, UserController.getUserRole); // маршрут для получения роли пользователя
router.get("/", auth, UserController.getAllUsers); //роут получения всех пользователей юзером (Протестировано)
router.get("/:userID", auth, UserController.getUserByID); //роут вывода одного пользователя (его профиля) (Протестировано)
router.put("/update/:userID", auth,UserController.updateUser); //роут изменения профиля пользователя(можно и пароль будет изменить)
router.get("/admin", auth, authAdmin, UserController.getAllUsersAdmin); //роут получения всех пользователей админом(с более чувствительной информации
router.put("/:userID/admin", auth, authAdmin, UserController.getUserByIDAdmin); //роут получения чувствительной информации о пользователе (например админ пароль)
router.put("/:userID/upgrade-role", auth, UserController.upgradeRole); //роут повышения роли пользователя до админа

//далее будут еще роутинги для бана пользователей админами либо для бана ивентов админами(в роуте ивент)
module.exports = router;
