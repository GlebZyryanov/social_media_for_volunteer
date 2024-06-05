import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._isAdmin = false;
    this._user = []; 
    // this._users = [
    //   {
    //     id: 1,
    //     name: "User1",
    //     surname: "Surname",
    //     email: "email",
    //     password: "password",
    //     profile: "profile",
    //     phone: "+89999999999",
    //     role: "USER",
    //     image_path: "https://dvscan.ru/wp-content/uploads/2014/10/af0d32cd39a1524c_org.jpg",
    //     isActive: false,
    //   },
    //   {
    //     id: 2,
    //     name: "User2",
    //     surname: "Surname",
    //     email: "email",
    //     password: "password",
    //     profile: "profile",
    //     phone: "+89999999999",
    //     role: "USER",
    //     image_path: "https://dvscan.ru/wp-content/uploads/2014/10/af0d32cd39a1524c_org.jpg",
    //     isActive: false,
    //   },
    // ];
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


  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get isAdmin() {
    return this._isAdmin;
  }


}
