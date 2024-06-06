import { makeAutoObservable } from "mobx";
//тут стор где происходит управление состоянием чата
export default class ChatStore {
  constructor() {
    this._chats = [];
    makeAutoObservable(this);
  }

  setChats(chats) {
    this._chats = chats;
  }

  get chats() {
    return this._chats;
  }
}
