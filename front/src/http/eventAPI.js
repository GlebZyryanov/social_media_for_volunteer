import { $authHost } from "./index";

// Получение всех типов мероприятий
export const getAllTypesEvents = async () => {
  const { data } = await $authHost.get("api/type");
  return data;
};

// Получение всех мероприятий
export const getAllEvents = async (type_event_id) => {
  const { data } = await $authHost.get("api/events", {
    params: { type_event_id },
  });
  return data;
};

// Получение мероприятия по ID
export const getEventByID = async (eventID) => {
  const { data } = await $authHost.get(`api/events/${eventID}`);
  return data;
};

// Присоединение к мероприятию
export const joinEvent = async (eventID) => {
  const { data } = await $authHost.post(`api/events/join/${eventID}`);
  return data;
};

export const createEvent = async (formData) => {
  const { data } = await $authHost.post("api/events", formData);
  return data;
};

export const deleteEvent = async (eventID) => {
  const { data } = await $authHost.delete(`api/events/${eventID}`);
  return data;
};
export const createTypeEvent = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const deleteTypeEvent = async (typeId) => {
  const { data } = await $authHost.delete(`api/type/${typeId}`);
  return data;
};
