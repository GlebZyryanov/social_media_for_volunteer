const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");


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
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: false,
      autoIncrement: false,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile: {
      type: DataTypes.TEXT,
      defaultValue: "some info about user",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("ADMIN", "USER"),
      defaultValue: "USER",
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    admin_password: {
      type: DataTypes.STRING,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isEmailConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailConfirmationToken: {
      type: DataTypes.STRING,
      allowNull: true,
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
  // create_date: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  // },
  info: {
    type: DataTypes.TEXT,
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expires_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'users', // Имя таблицы пользователей
        key: 'user_id'
    }
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
    defaultValue: "New user has entered to your event",
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    }
  },
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'chats',
      key: 'chat_id'
    }
  }
});

// Модель Chat
const Chat = sequelize.define("chat", {
  chat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: true, // Это поле может быть null для приватных чатов
},
  chat_type: {
    type: DataTypes.ENUM("PRIVATE", "GROUP"),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
});

const ChatUsers = sequelize.define("chat_users", {
  chat_user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
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

TypeEvent.hasMany(Event, { foreignKey: 'type_event_id', as: 'events' });
Event.belongsTo(TypeEvent, { foreignKey: 'type_event_id', as: 'typeEvent' });

User.belongsToMany(Chat, { through: ChatUsers, foreignKey: 'user_id', as: 'chats' });
Chat.belongsToMany(User, { through: ChatUsers, foreignKey: 'chat_id', as: 'users' });

User.hasMany(Message, { foreignKey: 'user_id' });
Message.belongsTo(User, { foreignKey: 'user_id' });

//когда юзер создатель чата!!!Вомзожно удалить тк функционал реализовал через добавление author_id в ивент
User.hasMany(Chat, { foreignKey: 'user_id' });
Chat.belongsTo(User, { foreignKey: 'user_id' });

Chat.hasMany(Message, { foreignKey: 'chat_id' });
Message.belongsTo(Chat, { foreignKey: 'chat_id' });

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
  Attendance,
  Notifications,
};
