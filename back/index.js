require("dotenv").config();
const express = require("express");
const sequelize = require("./db/db");
const cors = require("cors");
const router = require('./routes/index');

const PORT = process.env.PORT || 5000; //настройка порта
const app = express(); //вызов сервера

app.use(cors());
app.use('/api',router);

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