const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса
const userRouter = require('./user');
const eventRouter = require('./events');
const eventTypeRouter = require('./events_type');
const chatRouter = require('./chats');

router.use("/user",userRouter);
router.use("/events",eventRouter);
router.use("/type",eventTypeRouter);
router.use("/chats",chatRouter);
module.exports = router;
