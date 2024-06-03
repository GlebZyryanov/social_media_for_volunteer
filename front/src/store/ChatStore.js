import { makeAutoObservable } from "mobx"
//тут стор где происходит управление состоянием чата
export default class ChatStore{
    constructor(){
        this._chats = [
            { id: 1, name: 'Chat1',displayName: 'Chat1',chat_type:'Private',user_id:1, },
            { id: 2, name: 'Chat2',displayName: 'Chat2',chat_type:'Group',user_id:1, },
          ];
        makeAutoObservable(this);
    }

    setChats(chats) {
        this._chats = chats;
      }
    
      get chats() {
        return this._chats;
      }
    
}