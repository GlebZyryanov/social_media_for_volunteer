import { makeAutoObservable } from "mobx";
//тут стор где происходит управление состоянием сообщений
export default class MessageStore {
  constructor() {
    this._messages = [
      { id: 1, message_text: "hello1", user_id: 1, chat_id: 1 },
      { id: 2, message_text: "hello2", user_id: 1, chat_id: 1 },
    ];
    makeAutoObservable(this);
  }
  setMessages(messages) {
    this._messages = messages;
  }
  get messages() {
    return this._messages;
  }
}
