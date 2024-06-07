require("dotenv").config();
const express = require("express");
const sequelize = require("./db/db");
const cors = require("cors");
const router = require("./routes/index");
const fileUpload = require("express-fileupload");
const ErrorHandler = require("./middleware/ErrorHandler");
const http = require("http"); // добавлено для создания сервера
const { Server } = require("socket.io"); // импортируем Server из socket.io
const path = require("path");
const { Message, User } = require("./models/models");

//настройка порта и вызов сервера
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
//передаем в функцию use express.json для того чтобы приложение могло парсить json формат
app.use(express.json());
//явно указываем серверу что файлы из папки static нужно раздавать как статику(иначе пишет не найден get метод)для получения
app.use(express.static(path.resolve(__dirname, "static")));
//для загрузки файлов
app.use(fileUpload({}));
app.use("/api", router);

const server = http.createServer(app); // создаем сервер
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use((req, res, next) => {
  req.io = io;
  next();
});
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  socket.on("message", async (data) => {
    const { chatId, message } = data;

    try {
      // Найти пользователя по userId
      const user = await User.findByPk(message.userId);

      // Сохранение сообщения в базе данных
      const savedMessage = await Message.create({
        message_text: message.text,
        user_id: message.userId,
        chat_id: chatId,
        createdAt: message.timestamp,
      });

      // Формирование правильного объекта сообщения
      const formattedMessage = {
        message_id: savedMessage.message_id,
        message_text: savedMessage.message_text,
        user_id: savedMessage.user_id,
        chat_id: savedMessage.chat_id,
        createdAt: savedMessage.createdAt,
        user: { name: user.name },
      };

      // Отправка сообщения в чат
      io.to(chatId).emit("message", formattedMessage);
    } catch (error) {
      console.error("Failed to save message:", error);
    }
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
  try {
    await sequelize.authenticate(); //устанавливаем подключение к бд
    await sequelize.sync(); //сверяет состояние бд со схемой данных
    server.listen(PORT, () => {
      console.log(`listening on ${PORT} port`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
