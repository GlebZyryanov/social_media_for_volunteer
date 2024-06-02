const express = require("express"); //получаем класс роутера из библиотеки
const EventsTypeController = require("../controllers/EventsTypeController");
const router = express.Router(); //вызываем обьект класса
const { auth, authAdmin } = require("../middleware/auth");

router.post("/",auth,authAdmin,EventsTypeController.createTypeEvent);
router.get("/",auth,EventsTypeController.getAllTypesEvents);
router.delete("/",auth,EventsTypeController.deleteTypeEvent);

module.exports = router;
