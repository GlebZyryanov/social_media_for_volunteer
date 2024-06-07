import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._isAdmin = false;
    this._user = {
      user_id: "",
      name: "",
      surname: "",
      email: "",
      image_path: "",
      profile: "",
      phone: "",
      isActive: false,
      role: "",
      password: "",
      admin_password: "",
    };
    this._users = [];
    this._searchQuery = ""; // Новое состояние для строки поиска
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setIsAdmin(bool) {
    this._isAdmin = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setUsers(users) {
    // Метод для установки списка пользователей
    this._users = users;
  }

  setSearchQuery(query) {
    // Метод для установки строки поиска
    this._searchQuery = query;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  get users() {
    // Геттер для списка пользователей
    return this._users;
  }

  get searchQuery() {
    return this._searchQuery;
  }

  get filteredUsers() {
    // Метод для фильтрации пользователей
    const query = this._searchQuery.toLowerCase();
    if (!query || query === "") {
      return this._users;
    }
    return this._users.filter(
      (user) =>
        (user.name && user.name.toLowerCase().includes(query)) ||
        (user.surname && user.surname.toLowerCase().includes(query)) ||
        (user.email && user.email.toLowerCase().includes(query))
    );
  }
}
