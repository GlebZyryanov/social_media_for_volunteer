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
const path = require("path"); // для работы с путями и загрузки изображений

class EventsController {
  async getAllEvents(req, res, next) {
    try {
      const events = await Event.findAll();
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
    try {
      const { name, address, info, image_path, expires_date, type_event_id } =
        req.body;
      const newEvent = await Event.create({
        name,
        address,
        info,
        image_path,
        expires_date,
        author_id: req.user.user_id, // Сохраняем user_id автора
        type_event_id,
      });
      // Добавление автора в список посещений
      await Attendance.create({
        user_id: req.user.user_id,
        event_id: newEvent.event_id,
      });

      //созадние группового чата одновременно с созданием мероприятия
      const newChat = await Chat.create({
        name: `${name}-${newEvent.event_id} Group Chat`,
        // Сохраняем удобочитаемое имя
        displayName: name, 
        chat_type: "GROUP",
        // Связываем чат с пользователем-автором
        user_id: req.user.user_id, 
      });
      //добавление туда пользователя-автора
      await ChatUsers.create({
        user_id: req.user.user_id,
        chat_id: newChat.event_chat_id,
        
      });

      res.status(201).json(newEvent);
    } catch (error) {
      next(ApiError.internal("Failed to create event"));
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
      const { name, address, info, image_path, expires_date } = req.body;

      // Обновление полей мероприятия на основе данных из req.body
      const updatedEvent = await event.update({
        name: name || event.name,
        address: address || event.address,
        info: info || event.info,
        image_path: image_path || event.image_path,
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
    const userID = req.user.user_id;
  
    console.log("eventID:", eventID);
    console.log("userID:", userID);
  
    try {
      // Параллельный запрос к базе данных для получения события и пользователя
      const [event, user] = await Promise.all([
        Event.findByPk(eventID),
        User.findByPk(userID)
      ]);
  
      if (!event || !user) {
        return next(ApiError.notFound("Event or user not found"));
      }
  
      // Проверка на то, что пользователь уже присоединился к мероприятию
      const existingAttendance = await Attendance.findOne({
        where: { user_id: userID, event_id: eventID }
      });
  
      if (existingAttendance) {
        return next(ApiError.conflict("User have already joined this event"));
      }
  
      // Присоединение пользователя к мероприятию
      await Attendance.create({ user_id: userID, event_id: eventID });
  
      // Присоединение пользователя к групповому чату
      const groupChat = await Chat.findOne({
        where: {
          name: `${event.name}-${event.event_id} Group Chat`,
          chat_type: "GROUP"
        }
      });
  
      if (groupChat) {
        await ChatUsers.create({
          user_id: userID,
          chat_id: groupChat.event_chat_id
        });
      } else {
        console.log("Group chat not found.");
      }
  
      // Уведомление автора мероприятия
      const author = await User.findByPk(event.author_id);
  
      if (author) {
        await Notifications.create({
          user_id: author.user_id,
          event_id: eventID,
          message: `New user has joined your event: ${event.name}`
        });
        // В дальнейшем нужно добавить функционал отправки на почту с помощью nodemailer
        // sendEmail(author.email, "New user joined your event", `User ${req.user.name} has joined your event: ${event.name}`);
      }
  
      res.status(200).json({
        message: "Successfully joined the event and added to the group chat"
      });
    } catch (error) {
      console.error("Error joining event:", error);
      next(ApiError.internal("Failed to join event"));
    }
  }

}

module.exports = new EventsController();
