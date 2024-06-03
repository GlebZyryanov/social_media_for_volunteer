import { makeAutoObservable } from "mobx";
//тут стор где происходит управление состоянием пользователя
export default class UserStore {
  constructor() {
    this._isAuth = false;
    this.isAdmin = false;
    this._user = {};
    this._users = [
      {
        id: 1,
        name: "User1",
        surname: "SurnameUser1",
        email: "email",
        password: "password",
        profile: "profile",
        phone: "+89999999999",
        role: "USER",
        image_path:
          "https://dvscan.ru/wp-content/uploads/2014/10/af0d32cd39a1524c_org.jpg",
        isActive: false,
      },
      {
        id: 2,
        name: "User2",
        surname: "SurnameUser2",
        email: "email",
        password: "password",
        profile: "profile",
        phone: "+89999999999",
        role: "USER",
        image_path:
          "https://dvscan.ru/wp-content/uploads/2014/10/af0d32cd39a1524c_org.jpg",
        isActive: false,
      },
    ];
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
    //для объектов,пока не подключу базу, как подключу - буду использовать через user
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
  get users() {
    //для объектов,пока не подключу базу, как подключу - буду использовать через user
    return this._users;
  }
}
