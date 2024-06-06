import { $authHost } from "./index";

// Получение всех типов мероприятий
export const getAllTypesEvents = async () => {
  const { data } = await $authHost.get('api/type');
  return data;
};

// Получение всех мероприятий
export const getAllEvents = async (type_event_id) => {
  const { data } = await $authHost.get('api/events', {
    params: { type_event_id }
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
    const { data } = await $authHost.post(`api/events/${eventID}/join`);
    return data;
  };

  export const createEvent = async (formData) => {
    const { data } = await $authHost.post("api/events", formData);
    return data;
  };