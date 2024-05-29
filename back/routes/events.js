const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса
const EventsController = require("../controllers/EventsController");
router.get('/',EventsController.getAllEvents); //роут вывода всех мероприятий
router.post('/',EventsController.createEvent); //роут создания мероприятия
router.get('/:eventID',EventsController.getEventByID); //показ одного конкретного мероприятия
router.put('/:eventID/update',EventsController.updateEvent); //редактировать мероприятие
router.post('/:eventID/join',EventsController.joinEvent); // присоединение к мероприятию пользователя
//мб добавить после удаление мероприятия, пока хз
module.exports = router;
