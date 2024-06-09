const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса
const EventsController = require("../controllers/EventsController");
const { auth, authAdmin } = require("../middleware/auth");

router.post('/',auth, EventsController.createEvent); //роут создания мероприятия (протестировано)
router.get('/',auth, EventsController.getAllEvents); //роут вывода всех мероприятий (протестировано)
router.get('/:eventID',auth,EventsController.getEventByID); //показ одного конкретного мероприятия (протестировано)
router.put('/update/:eventID',auth,EventsController.updateEvent); //редактировать мероприятие (протестировано)
router.post('/join/:eventID',auth,EventsController.joinEvent); // присоединение к мероприятию пользователя
router.delete('/:eventID',auth,EventsController.deleteEvent); // удаление мероприятия
module.exports = router;
