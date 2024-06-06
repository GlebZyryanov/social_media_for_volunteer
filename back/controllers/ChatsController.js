const { Chat, Message, ChatUsers, User } = require("../models/models");
const ApiError = require("../error/ApiError");
require("express-async-errors");

class ChatsController {
  async getAllChats(req, res, next) {
    try {
      const userID = req.user.id;
      console.log("ChatController userID:", userID);
      const chats = await Chat.findAll({
        include: [
          {
            model: User,
            as: "users", // Alias для User
            attributes: [], // Исключаем атрибуты User
            where: {
              user_id: userID,
            },
          },
        ],
      });
      res.json(chats);
    } catch (error) {
      next(ApiError.internal("Failed to get chats"));
    }
  }

  async getChatByID(req, res, next) {
    try {
      const { chatID } = req.params;
      const userID = req.user.id;

      console.log("chatID:", chatID, "userID:", userID); // Логирование

      const chat = await Chat.findOne({
        where: { chat_id: chatID },
        include: [
          {
            model: Message,
            include: [User],
          },
          {
            model: User,
            as: "users",
            through: {
              where: { user_id: userID },
            },
          },
        ],
      });

      if (!chat) {
        return next(ApiError.notFound("Chat not found or access denied"));
      }

      // Проверяем, состоит ли пользователь в чате
      const userInChat = chat.users.some((user) => user.user_id === userID);
      

      if (!userInChat) {
        return next(ApiError.forbidden("Access denied"));
      }

      res.json(chat);
    } catch (error) {
      console.error("Error in getChatByID:", error); // Логирование ошибки
      next(ApiError.internal("Failed to get chat"));
    }
  }

  async createPrivateChat(req, res, next) { 
    try {
        const { targetUserID } = req.body;
        const userID = req.user.id;
        const existingChat = await Chat.findOne({
          where: { chat_type: "PRIVATE" },
          include: [
            {
              model: User,
              as: "users",
              where: {
                user_id: [userID, targetUserID],
              },
              through: {
                attributes: [], 
              },
            },
          ],
        });
  
        if (existingChat) {
          return next(ApiError.conflict("Private chat already exists"));
        }

        const user = await User.findByPk(userID);
        const targetUser = await User.findByPk(targetUserID);
  
        if (!user || !targetUser) {
          return next(ApiError.notFound("User not found"));
        }
  
        const chatName = `${user.name} and ${targetUser.name} private chat`;
  
        const chat = await Chat.create({
          name: chatName,
          chat_type: "PRIVATE",
          user_id: userID,
        });
  
        await ChatUsers.bulkCreate([
          { user_id: userID, chat_id: chat.chat_id },
          { user_id: targetUserID, chat_id: chat.chat_id },
        ]);
  
        res.status(201).json(chat);
      } catch (error) {
        next(ApiError.internal("Failed to create private chat"));
      }
  }

  async createMessage(req, res, next) {
    try {
      const { chatID } = req.params;
      const { message_text } = req.body;
      const userID = req.user.id;

      const chat = await Chat.findByPk(chatID);

      if (!chat) {
        return next(ApiError.notFound("Chat not found"));
      }

      const message = await Message.create({
        message_text,
        user_id: userID,
        chat_id: chatID,
      });

      res.status(201).json(message);
    } catch (error) {
      next(ApiError.internal("Failed to create message"));
    }
  }

  async leaveChat(req, res, next) {
    try {
      const { chatID } = req.params;
      const userID = req.user.id;

      const chat = await Chat.findByPk(chatID);

      if (!chat) {
        return next(ApiError.notFound("Chat not found"));
      }

      if (chat.user_id === userID) {
        return next(ApiError.forbidden("Chat owner cannot leave the chat"));
      }

      await ChatUsers.destroy({
        where: { chat_id: chatID, user_id: userID },
      });
      
      res.status(204).send();
    } catch (error) {
      next(ApiError.internal("Failed to leave chat"));
    }
  }

  // async deleteChat(req, res, next){
  //     try {
  //         const { chatID } = req.params;
  //         const userID = req.user.user_id;

  //         const chat = await Chat.findByPk(chatID);

  //         if (!chat) {
  //             return next(ApiError.notFound("Chat not found"));
  //         }

  //         if (chat.user_id !== userID) {
  //             return next(ApiError.forbidden("Only the chat owner can delete the chat"));
  //         }

  //         await chat.destroy();

  //         res.status(204).send();
  //     } catch (error) {
  //         next(ApiError.internal("Failed to delete chat"));
  //     }
  // }
}

module.exports = new ChatsController();
