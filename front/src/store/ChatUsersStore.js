import { makeAutoObservable } from "mobx";
//тут стор где происходит управление состоянием таблицы chatusers
export default class ChatUsersStore {
  constructor() {
    this._chatUsers = [
      { id: 1, chat_id: 1, user_id: 1 },
      { id: 2, chat_id: 2, user_id: 2 },
    ];
    makeAutoObservable(this);
  }
  setChatUsers(chatUsers) {
    this._chatUsers = chatUsers;
  }

  get chatUsers() {
    return this._chatUsers;
  }
}
