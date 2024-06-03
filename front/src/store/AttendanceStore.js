import { makeAutoObservable } from "mobx"
//тут стор где происходит управление состоянием таблицы посещений
export default class AttendanceStore{
    constructor(){
        this._attendance = [
            { id:1,event_id: 1, user_id: 1 },
            {id:2, event_id: 2, user_id: 2 }
          ];
        makeAutoObservable(this);
    }
    setAttendance(attendance) {
        this._attendance = attendance;
      }
    
      get attendance() {
        return this._attendance;
      }
    
}