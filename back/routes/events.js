const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса

router.get('/',); //роут вывода всех мероприятий
router.post('/',); //роут создания мероприятия
router.get('/:eventID',); //показ одного конкретного мероприятия
router.put('/:eventID/update',); //редактировать мероприятие
//мб добавить после удаление мероприятия, пока хз
module.exports = router;
