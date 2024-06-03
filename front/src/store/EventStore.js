import { makeAutoObservable } from "mobx";
//тут стор где происходит управление состоянием мероприятий
export default class EventStore {
  constructor() {
    this._events = [
      {
        id: 1,
        name: "Event1",
        adress: "Adress1",
        info: "Info1",
        image_path:
          "https://dvscan.ru/wp-content/uploads/2014/10/af0d32cd39a1524c_org.jpg",
        author_id: 1,
        type_event_id: "Type1",
      },
      {
        id: 2,
        name: "Event2",
        adress: "Adress2",
        info: "Info2",
        image_path:
          "https://dvscan.ru/wp-content/uploads/2014/10/af0d32cd39a1524c_org.jpg",
        author_id: 2,
        type_event_id: "Type1",
      },
    ];
    this._types = [
      { id: 1, name: "Type1" },
      { id: 2, name: "Type2" },
    ];
    makeAutoObservable(this);
  }
  getEvents(events) {
    this._events = events;
  }

  setTypes(types) {
    this._types = types;
  }

  get events() {
    return this._events;
  }

  get types() {
    return this._types;
  }
}
