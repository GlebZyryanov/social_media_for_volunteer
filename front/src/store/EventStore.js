import { makeAutoObservable } from "mobx";

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

  get filteredEvents() {
    if (!this._selectedType || !this._selectedType.type_event_id) {
      return this._events;
    }
    return this._events.filter(event => event.type_event_id === this._selectedType.type_event_id);
  }
}
