const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

//поля create_date и registered_date не нужны тк seuqelize добавляет поля createdAt и updatedAt по умолчанию

// Модель User
const User = sequelize.define("user", {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  surname: {
    type: Sequelize.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: false,
    autoIncrement: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profile: {
    type: Sequelize.TEXT,
  },
  phone: {
    type: Sequelize.STRING,
  },
  role: {
    type: DataTypes.ENUM("ADMIN", "USER"),
    defaultValue: "USER",
  },
  image_path: {
    type: Sequelize.STRING,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

// Модель Event
const Event = sequelize.define("event", {
  event_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
  },
  create_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  info: {
    type: Sequelize.TEXT,
  },
  image_path: {
    type: Sequelize.STRING,
  },
  expires_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  author_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Модель Type_Event
const TypeEvent = sequelize.define("type_event", {
  type_event_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Модель Attendance
const Attendance = sequelize.define("attendance", {
  attendance_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// Модель Notifications
const Notifications = sequelize.define("notifications", {
  notification_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: Sequelize.TEXT,
  },
});

// Модель Message
const Message = sequelize.define("message", {
  message_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message_text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Модель Chat
const Chat = sequelize.define("chat", {
  event_chat_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  chat_type: {
    type: DataTypes.ENUM("PRIVATE", "GROUP"),
    allowNull: false,
  },
});

const ChatUsers = sequelize.define("chat_users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// Определение связей
User.belongsToMany(Event, {
  through: Attendance,
  foreignKey: "user_id",
  otherKey: "event_id",
});
Event.belongsToMany(User, {
  through: Attendance,
  foreignKey: "event_id",
  otherKey: "user_id",
});

User.hasMany(Notifications);
Notifications.belongsTo(User);

Event.hasMany(Notifications); //целесообразность этой связи следует проверить позже
Notifications.belongsTo(Event);

TypeEvent.hasMany(Event);
Event.belongsTo(TypeEvent);

User.belongsToMany(Chat, {through: ChatUsers}); //когда юзер участник
Chat.belongsToMany(User, {through: ChatUsers});

User.hasMany(Message);
Message.belongsTo(User);

User.hasMany(Chat); //когда юзер создатель чата
Chat.belongsTo(User);

Chat.hasMany(Message);
Message.belongsTo(Chat);

module.exports = {
  User,
  Event,
  TypeEvent,
  Chat,
  ChatUsers,
  Message,
};
