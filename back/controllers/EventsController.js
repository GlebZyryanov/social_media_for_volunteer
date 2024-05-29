const {
  Event,
  User,
  Chat,
  ChatUsers,
  Attendance,
  TypeEvent,
} = require("../models/models");
const ApiError = require("../error/ApiError");

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
    console.log('User ID from req.user:', req.user.user_id); // Логирование user ID
    // try {
      const { name, address, info, image_path, expires_date,type_event_id} =
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
        event_id: newEvent.event_id
    });
      
      //созадние группового чата одновременно с созданием мероприятия
      const newChat = await Chat.create({
        name: `${name}-${newEvent.event_id} Group Chat`,
        displayName: name, // Сохраняем удобочитаемое имя
        chat_type: "GROUP",
        user_id: req.user.user_id, // Связываем чат с пользователем-автором
      });
      //добавление туда пользователя-автора
      await ChatUsers.create({
        user_id: req.user.user_id,
        chat_id: newChat.event_chat_id,
        // chat_id: newChat.chat_user_id, прежний вариант который выдавал ошибку
      });

      res.status(201).json(newEvent);
    // } catch (error) {
    //   next(ApiError.internal("Failed to create event"));
    // }
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
    const { userID } = req.body;
    try {
      const event = await Event.findByPk(eventID);
      const user = await User.findByPk(userID);
      if (!event || !user) {
        return next(ApiError.notFound("Event or user not found"));
      }
      //проверка на то, что пользователь уже присоединился к мероприятию
      const existingAttendance = await Attendance.findOne({
        where: { userId: userID, eventId: eventID },
      });
      if (existingAttendance) {
        return next(ApiError.conflict("User have already joined this event"));
      }

      //присоединение пользователя к мероприятию
      await Attendance.create({ userId: userID, eventId: eventID });

      //присоединение пользователя к групповому чату
      // Ищем соответствующий групповой чат по уникальному названию
      const groupChat = await Chat.findOne({
        where: {
          name: `${event.name}-${event.event_id} Group Chat`,
          chat_type: "GROUP",
        },
      });
      if (groupChat) {
        await ChatUsers.create({ userId: userID, chatId: groupChat.id });
      }
      // Уведомляем автора мероприятия
      const author = await User.findByPk(event.author_id); // Используем author_id для поиска автора
      if (author) {
        await Notifications.create({
          userId: author.id,
          eventId: eventID,
          message: `New user has joined your event: ${event.name}`,
        });
        //в дальнейшем нужно добавить функционал отправки на почту с помомщью nodemailer
        //тут примерно описывается как,
        // Optionally, send email notification to the event author (if email sending logic is implemented)
        // sendEmail(author.email, "New user joined your event", `User ${req.user.name} has joined your event: ${event.name}`);
      }

      res.status(200).json({
        message: "Successfully joined the event and added to the group chat",
      });
    } catch (error) {
      next(ApiError.internal("Ошибка при присоединении к мероприятию"));
    }
  }
}

module.exports = new EventsController();
