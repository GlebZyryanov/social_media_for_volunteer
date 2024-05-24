require("dotenv").config();
const express = require("express");
const sequelize = require("./db/db");
const cors = require("cors");
const router = require('./routes/index');
const ErrorHandler = require('./middleware/ErrorHandler');

const PORT = process.env.PORT || 5000; //настройка порта
const app = express(); //вызов сервера

app.use(cors());
//передаем в функцию use express.json для того чтобы приложение могло парсить json формат
app.use(express.json());
app.use('/api',router);


app.use(ErrorHandler); //вызов обработчика ошибок должен идти в конце

const start = async () => {
    try{
         await sequelize.authenticate() //устанавливаем подключение к бд
         await sequelize.sync() //сверяет состояние бд со схемой данных
        app.listen(PORT, () => {
            console.log(`listening on ${PORT} port`);
          });
          
    }catch(e){
        console.log(e)
    }


}

start()