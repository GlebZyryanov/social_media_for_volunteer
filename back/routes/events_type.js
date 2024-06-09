const express = require("express"); //получаем класс роутера из библиотеки
const EventsTypeController = require("../controllers/EventsTypeController");
const router = express.Router(); //вызываем обьект класса
const { auth} = require("../middleware/auth");

router.post("/",auth,EventsTypeController.createTypeEvent);
router.get("/",auth,EventsTypeController.getAllTypesEvents);
router.delete("/:type_event_id", auth, EventsTypeController.deleteTypeEvent);

module.exports = router;
