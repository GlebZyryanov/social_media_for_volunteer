import { $authHost } from "./index";

export const getAllChats = async () => {
  const { data } = await $authHost.get("api/chats");
  return data;
};

export const getChatByID = async (eventID) => {
  const { data } = await $authHost.get(`api/chats/${eventID}`);
  return data;
};
