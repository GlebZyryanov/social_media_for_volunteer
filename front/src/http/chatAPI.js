import { $authHost } from "./index";

// Получение всех чатов пользователя
export const getAllChats = async () => {
  const { data } = await $authHost.get('api/chats');
  return data;
};

// Получение чата по ID
export const getChatByID = async (chatID) => {
  const { data } = await $authHost.get(`api/chats/${chatID}`);
  return data;
};

// Создание приватного чата
export const createPrivateChat = async (targetUserID) => {
  const { data } = await $authHost.post('api/chats/private', { targetUserID });
  return data;
};

// Отправка сообщения в чат
export const sendMessage = async (chatID, message_text) => {
  const { data } = await $authHost.post(`api/chats/${chatID}`, { message_text });
  return data;
};

// Покидание чата
export const leaveChat = async (chatID) => {
  const { data } = await $authHost.put(`api/chats/leave/${chatID}`);
  return data;
};

export const getChatMessages = async (chatID) => {
  const { data } = await $authHost.get(`api/chats/messages/${chatID}`);
  return data;
}