const {
  Event,
  User,
  Chat,
  ChatUsers,
  Attendance,
  TypeEvent,
  Notifications,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");
const path = require("path"); // для работы с путями и загрузки изображений
const { where } = require("sequelize");
const { sendEmail } = require('../config/nodemailer');

class EventsController {
  async getAllEvents(req, res, next) {
    const { type_event_id } = req.query;

    try {
      // Проверка наличия параметра type_event_id
      let events;
      if (type_event_id) {
        events = await Event.findAll({
          where: { type_event_id },
        });
      } else {
        // Если параметр отсутствует, возвращаем все события
        events = await Event.findAll();
      }
      return res.json(events);
    } catch (error) {
      next(ApiError.internal("Failed to get events"));
    }
  }

  async getEventByID(req, res, next) {
    try {
      const { eventID } = req.params;
      const event = await Event.findByPk(eventID);
      if (event) {
        res.json(event);
      } else {
        throw ApiError.notFound("Event not found");
      }
    } catch (error) {
      next(ApiError.internal("Failed to get event"));
    }
  }

  async createEvent(req, res, next) {
    console.log("User ID from req.user:", req.user.user_id); // Логирование user ID
    console.log("User ID from req.user:", req.user.id); // Логирование user ID
    console.log("User ID from req.user:", req.user); // Логирование user ID
    try {
      const { name, address, info, expires_date, type_event_id } = req.body;
      const { image_path } = req.files;
      let fileName = uuidv4() + ".jpg"; // Генерируем уникальное имя для изображения
      image_path.mv(path.resolve(__dirname, "..", "static", fileName));
      const newEvent = await Event.create({
        name,
        address,
        info,
        image_path: fileName,
        expires_date,
        author_id: req.user.id, // Сохраняем user_id автора
        type_event_id,
      });
      // Добавление автора в список посещений
      await Attendance.create({
        user_id: req.user.id,
        event_id: newEvent.event_id,
      });

      //созадние группового чата одновременно с созданием мероприятия
      const newChat = await Chat.create({
        name: `${name}-${newEvent.event_id} Group Chat`,
        // Сохраняем удобочитаемое имя
        displayName: `Чат мероприятия ${name}`,
        chat_type: "GROUP",
        // Связываем чат с пользователем-автором
        user_id: req.user.id,
      });
      //добавление туда пользователя-автора
      await ChatUsers.create({
        user_id: req.user.id,
        chat_id: newChat.chat_id,
      });

      res.status(201).json(newEvent);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async updateEvent(req, res, next) {
    const { eventID } = req.params;

    try {
      const event = await Event.findByPk(eventID);
      if (!event) {
        return next(ApiError.notFound("Event not found"));
      }

      // Сохранение текущего названия мероприятия
      const currentEventName = event.name;
      const { name, address, info, expires_date } = req.body;

      // Обновление полей мероприятия на основе данных из req.body
      const updatedEvent = await event.update({
        name: name || event.name,
        address: address || event.address,
        info: info || event.info,

        expires_date: expires_date || event.expires_date,
      });
      // Обновление названия чата, связанного с мероприятием
      const groupChat = await Chat.findOne({
        where: {
          name: `${currentEventName}-${event.event_id} Group Chat`,
          chat_type: "GROUP",
        },
      });
      if (groupChat && name) {
        await groupChat.update({
          name: `${name}-${event.event_id} Group Chat`,
          displayName: name,
        });
      }

      res.json(updatedEvent);
    } catch (error) {
      next(ApiError.internal("Failed to update event"));
    }
  }

  async joinEvent(req, res, next) {
    const { eventID } = req.params;
    const userID = req.user.id;
    console.log("eventID:", eventID);
    console.log("userID:", userID);
    try {
      // Параллельный запрос к базе данных для получения события и пользователя
      const [event, user] = await Promise.all([
        Event.findByPk(eventID),
        User.findByPk(userID),
      ]);

      if (!event || !user) {
        return next(ApiError.notFound("Event or user not found"));
      }
      // Проверка на то, что пользователь уже присоединился к мероприятию
      const existingAttendance = await Attendance.findOne({
        where: { user_id: userID, event_id: eventID },
      });
      // Присоединение пользователя к мероприятию
      await Attendance.create({ user_id: userID, event_id: eventID });
      // Присоединение пользователя к групповому чату
      const groupChat = await Chat.findOne({
        where: {
          name: `${event.name}-${event.event_id} Group Chat`,
          chat_type: "GROUP",
        },
      });
      if (groupChat) {
        await ChatUsers.create({
          user_id: userID,
          chat_id: groupChat.chat_id,
        });
      } else {
        console.log("Group chat not found.");
      }
      if (existingAttendance) {
        return next(ApiError.conflict("User have already joined this event"));
      }
      // Уведомление автора мероприятия
      const author = await User.findByPk(event.author_id);
      console.log("author_email", author.email);
      console.log("authorEvent", author);
      console.log("user_email", user.email);
      if (author) {
        await Notifications.create({
          user_id: author.user_id,
          event_id: eventID,
          message: `New user has joined your event: ${event.name}`,
        });

        // Отправка письма автору
      const emailSubject = 'Новый пользователь присоединился к вашему мероприятию!';
      const emailText = `Пользователь ${user.name} присоединился к вашему мероприятию!`;
      await sendEmail(author.email, emailSubject, emailText);
      }

      res.status(200).json({
        message: "Successfully joined the event and added to the group chat",
      });
    } catch (error) {
      console.error("Error joining event:", error);
      next(ApiError.internal("Failed to join event"));
    }
  }

  async deleteEvent(req, res, next) {
    const { eventID } = req.params;
    const userID = req.user.id;

    try {
      const event = await Event.findByPk(eventID);

      if (!event) {
        return next(ApiError.notFound("Event not found"));
      }

      await event.destroy();

      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      next(ApiError.internal("Failed to delete event"));
    }
  }
}

module.exports = new EventsController();
