import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._isAdmin = false;
    this._user = {
      user_id:'',
      name:'',
      surname:'',
      email:'',
      image_path: "",
      profile: '',
      phone: '',
      isActive: false,
      role:'',
      password: '',
      admin_password: '',
    }; 
    this._users = [];
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

  setUsers(users) { // Метод для установки списка пользователей
    this._users = users;
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

  get users() { // Геттер для списка пользователей
    return this._users;
  }

}
