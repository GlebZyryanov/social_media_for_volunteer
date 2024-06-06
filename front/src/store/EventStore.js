import { makeAutoObservable } from "mobx";
//тут стор где происходит управление состоянием мероприятий
export default class EventStore {
  constructor() {
    this._events = [];
    this._types = [];
    this._selectedType = {};

    makeAutoObservable(this);
  }
  setEvents(events) {
    this._events = events;
  }

  setTypes(types) {
    this._types = types;
  }

  setSelectedType(type) {
    this._selectedType = type;
  }

  get events() {
    return this._events;
  }

  get types() {
    return this._types;
  }
  get selectedType() {
    return this._selectedType;
  }
}
