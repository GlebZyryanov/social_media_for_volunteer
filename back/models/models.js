const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

//поля create_date и registered_date не нужны тк seuqelize добавляет поля createdAt и updatedAt по умолчанию

// Модель User
const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: false,
      autoIncrement: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("ADMIN", "USER"),
      defaultValue: "USER",
    },
    image_path: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    admin_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        user.admin_password = generateAdminPassword(); // Генерация случайного пароля
      },
    },
  }
);

// Модель Event
const Event = sequelize.define("event", {
  event_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  create_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  info: {
    type: DataTypes.TEXT,
  },
  image_path: {
    type: DataTypes.STRING,
  },
  expires_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  author_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Модель Type_Event
const TypeEvent = sequelize.define("type_event", {
  type_event_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Модель Attendance
const Attendance = sequelize.define("attendance", {
  attendance_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// Модель Notifications
const Notifications = sequelize.define("notifications", {
  notification_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.TEXT,
  },
});

// Модель Message
const Message = sequelize.define("message", {
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Модель Chat
const Chat = sequelize.define("chat", {
  event_chat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
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

User.belongsToMany(Chat, { through: ChatUsers }); //когда юзер участник
Chat.belongsToMany(User, { through: ChatUsers });

User.hasMany(Message);
Message.belongsTo(User);

User.hasMany(Chat); //когда юзер создатель чата
Chat.belongsTo(User);

Chat.hasMany(Message);
Message.belongsTo(Chat);

function generateAdminPassword() {
  return Math.random().toString(36).slice(-8); // Генерация случайного пароля из 8 символов
}

module.exports = {
  User,
  Event,
  TypeEvent,
  Chat,
  ChatUsers,
  Message,
};
