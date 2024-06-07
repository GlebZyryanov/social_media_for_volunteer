import { makeAutoObservable } from "mobx";
//тут стор где происходит управление состоянием сообщений
export default class MessageStore {
  constructor() {
    this._messages = [];
    makeAutoObservable(this);
  }
  setMessages(messages) {
    this._messages = messages;
  }
  get messages() {
    return this._messages;
  }
}
