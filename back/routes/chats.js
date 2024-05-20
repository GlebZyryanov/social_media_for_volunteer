const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса

//router.use(auth);
router.get('/'); // роут получения всех чатов
router.get('/:chatID',) //роут конрктеного чата

router.post('/private',) //роут создания приватного чата между 2мя пользователями 
router.post('/group',) //роут создания группвого чата(мероприятия)
router.post('/:chatId',) //роут создания сообщения в чате

router.put('/:chatId/add-member',) //роут добавление человека в групповой чат(он сам будет добавляться) 
router.put('/:chatId/leave',) //роут покидания группы

router.delete('/:chatId', ) //роут удаления чата 

module.exports = router;
