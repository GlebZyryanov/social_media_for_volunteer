import { $host, $authHost } from "./index";
import { jwtDecode } from "jwt-decode"; 

// Регистрация пользователя
export const registration = async (name, email, password) => {
  const { data } = await $host.post("api/user/register", {
    name,
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

// Авторизация пользователя
export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

// Выход из системы
export const logout = async (email,password) => {
  const { data } = await $authHost.post("api/user/logout",{email,password});
  localStorage.removeItem("token");
};

// Получение роли пользователя
export const getUserRole = async () => {
  const { data } = await $authHost.get("api/user/role");
  return data.role;
};

// функция для получения всех пользователей
export const getAllUsers = async () => {
  const { data } = await $authHost.get("api/user");
  return data.users;
};

// функция для поиска пользователей
export const findPeople = async () => {
    const { data } = await $authHost.get("api/user/find_people");
    return data.users;
  };


// Получение пользователя по ID
export const getUserByID = async (userID) => {
    const { data } = await $authHost.get(`api/user/${userID}`);
    return data.user;
  };
  
  // Обновление профиля пользователя
  export const updateUser = async (userID, userData) => {
    const { data } = await $authHost.put(`api/user/update/${userID}`, userData);
    return data.user;
  };
  
  // Получение всех пользователей (только для администратора)
  export const getAllUsersAdmin = async () => {
    const { data } = await $authHost.get("api/user/admin");
    return data.users;
  };
  
  // Получение пользователя по ID (только для администратора)
  export const getUserByIDAdmin = async (userID) => {
    const { data } = await $authHost.get(`api/user/${userID}/admin`);
    return data.user;
  };
  
  // Повышение роли пользователя до администратора
  export const upgradeRole = async (userID, adminPassword) => {
    const { data } = await $authHost.put(`api/user/${userID}/upgrade-role`, { admin_password: adminPassword });
    return data.user;
  };

// Функция для получения информации о текущем пользователе
export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.id) {
          const { data } = await $authHost.get(`api/user/${decodedToken.id}`);
          return data.user;
        }
        throw new Error("Invalid token structure");
      } catch (error) {
        console.error("Error decoding token or fetching user:", error);
        return null;
      }
    } else {
      console.warn("No token found in localStorage");
      return null;
    }
  };