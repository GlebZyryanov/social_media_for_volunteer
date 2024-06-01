require("dotenv").config();
const express = require("express");
const sequelize = require("./db/db");
const cors = require("cors");
const router = require('./routes/index');
const fileUpload = require("express-fileupload");
const ErrorHandler = require('./middleware/ErrorHandler');
const http = require("http"); // добавлено для создания сервера
const { Server } = require("socket.io"); // импортируем Server из socket.io
const path = require("path");


//настройка порта и вызов сервера
const PORT = process.env.PORT || 5000
const app = express(); 
app.use(cors());
//передаем в функцию use express.json для того чтобы приложение могло парсить json формат
app.use(express.json());
//явно указываем серверу что файлы из папки static нужно раздавать как статику(иначе пишет не найден get метод)для получения
app.use(express.static(path.resolve(__dirname, "static")));
//для загрузки файлов
app.use(fileUpload({})); 
app.use('/api',router);


const server = http.createServer(app); // создаем сервер
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user connected");
    // обработка событий socket.io
    socket.on("joinChat", (chatId) => {
        socket.join(chatId);
        console.log(`User joined chat: ${chatId}`);
    });

    socket.on("message", (data) => {
        const { chatId, message } = data;
        io.to(chatId).emit("message", message); // отправка сообщения в чат
    });

    socket.on("leaveChat", (chatId) => {
        socket.leave(chatId);
        console.log(`User left chat: ${chatId}`);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

//вызов обработчика ошибок должен идти в конце
app.use(ErrorHandler); 

const start = async () => {
    try{
         await sequelize.authenticate() //устанавливаем подключение к бд
         await sequelize.sync() //сверяет состояние бд со схемой данных
         server.listen(PORT, () => {
            console.log(`listening on ${PORT} port`);
          });
          
    }catch(e){
        console.log(e)
    }


}

start()