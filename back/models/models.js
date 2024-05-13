const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

// Модель User
const User = sequelize.define("User", {
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
    type: Sequelize.STRING,
    allowNull: false,
  },
  registered_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  image_path: {
    type: Sequelize.STRING,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
  },
});

// Модель Event
const Event = sequelize.define("Event", {
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
const TypeEvent = sequelize.define("Type_Event", {
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
const Attendance = sequelize.define("Attendance", {
  attendance_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  create_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

// Модель Notifications
const Notifications = sequelize.define("Notifications", {
  notification_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.BOOLEAN,
  },
  time: {
    type: Sequelize.TIME,
    allowNull: false,
  },
});

// Модель Message
const Message = sequelize.define("Message", {
  message_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message_text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  create_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

// Модель Message_target
const MessageTarget = sequelize.define("Message_target", {
  message_target_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// Модель EventChat
const EventChat = sequelize.define("EventChat", {
  event_chat_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  create_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

// Модель User_EventChat
const UserEventChat = sequelize.define("User_EventChat", {
  user_event_chat_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  create_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

// Определение связей
User.belongsToMany(Event, { through: "Attendance", foreignKey: "user_id" });
Event.belongsToMany(User, { through: "Attendance", foreignKey: "event_id" });

User.hasMany(Notifications, { foreignKey: "user_id" });
Event.hasMany(Notifications, { foreignKey: "event_id" });

User.belongsToMany(EventChat, {
  through: "User_EventChat",
  foreignKey: "user_id",
});
EventChat.belongsToMany(User, {
  through: "User_EventChat",
  foreignKey: "event_chat_id",
});

User.hasMany(Message, { foreignKey: "user_id" });
Message.belongsTo(User, { foreignKey: "user_id" });

Message.hasMany(MessageTarget, { foreignKey: "message_id" });
User.hasMany(MessageTarget, { foreignKey: "user_id" });

UserEventChat.hasMany(MessageTarget, { foreignKey: "user_event_chat_id" });
