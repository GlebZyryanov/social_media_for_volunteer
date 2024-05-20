const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса

router.post('/register',); //роуты регистрации авторизации обычного пользователя
router.post('/login',);
router.get('/verify_user',); //роут верификации и проверки роли для доступа к функционалу
router.get('/',) //роут получения всех пользователей юзером
router.get('/:userID',); //роут вывода одного пользователя (его профиля)
router.get('/:userID/find_people',); //роут для поиска пользователей
router.put('/:userID/update'); //роут изменения профиля пользователя(можно и пароль будет изменить)
router.get('/',) //роут получения всех пользователей админом(с более чувствительной информации например
router.put('/:userID/role')//роут изменения роли пользователя до админа(с помощью функции assign-role)
//далее будут еще роутинги для бана пользователей админами либо для бана ивентов админами(в роуте ивент)


module.exports = router;
