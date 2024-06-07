import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL);

export const joinChat = (chatId) => {
  socket.emit("joinChat", chatId);
};

export const sendMessage = (chatId, message) => {
  socket.emit("message", { chatId, message });
};

export const leaveChat = (chatId) => {
  socket.emit("leaveChat", chatId);
};

export const onMessageReceived = (callback) => {
  socket.on("message", callback);
};

export const disconnectSocket = () => {
  socket.disconnect();
};
