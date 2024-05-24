const express = require("express"); //получаем класс роутера из библиотеки
const EventsTypeController = require("../controllers/EventsTypeController");
const router = express.Router(); //вызываем обьект класса


router.post("/",EventsTypeController.createTypeEvent);
router.get("/",EventsTypeController.getAllTypesEvents);
router.delete("/",EventsTypeController.deleteTypeEvent);

module.exports = router;
