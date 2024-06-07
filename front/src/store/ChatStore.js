import { makeAutoObservable } from "mobx";
//тут стор где происходит управление состоянием чата
export default class ChatStore {
  constructor() {
    this._chats = [];
    this._searchQuery = ""; // Новое состояние для строки поиска
    makeAutoObservable(this);
  }

  setChats(chats) {
    this._chats = chats;
  }

  setSearchQuery(query) {
    // Метод для установки строки поиска
    this._searchQuery = query;
  }

  get chats() {
    return this._chats;
  }
  get searchQuery() {
    return this._searchQuery;
  }

  get filteredChats() {
    // Метод для фильтрации мероприятий
    const query = this._searchQuery.toLowerCase();
    if (!query || query === "") {
      return this._chats;
    }
    return this._chats.filter(
      (chat) =>
        chat.display_name && chat.display_name.toLowerCase().includes(query) ||
        chat.name && chat.name.toLowerCase().includes(query)
    );
  }
}
