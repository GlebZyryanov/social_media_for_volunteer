const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса
const { auth, authAdmin } = require("../middleware/auth");
const ChatsController = require("../controllers/ChatsController");

//router.use(auth);
router.get('/',auth,ChatsController.getAllChats); // роут получения всех чатов
router.get('/:chatID',auth,ChatsController.getChatByID) //роут конрктеного чата
router.post('/private',auth,ChatsController.createPrivateChat) //роут создания приватного чата между 2мя пользователями 

router.post('/:chatID',auth,ChatsController.createMessage) //роут создания сообщения в чате

router.put('/leave/:chatID',auth,ChatsController.leaveChat) //роут покидания группы

router.get('/messages/:chatID', auth, ChatsController.getChatMessages);

//router.delete('/:chatId',auth, ) //роут удаления чата -скорее всего удалять его не нужно с этим сложности, это потом

module.exports = router;
