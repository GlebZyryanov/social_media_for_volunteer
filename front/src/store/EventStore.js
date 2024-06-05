import { makeAutoObservable } from "mobx";
//тут стор где происходит управление состоянием мероприятий
export default class EventStore {
  constructor() {
    this._events = [
      {
        id: 1,
        name: "Рубим весь лес к хуям",
        address: "Барнаул, улица Пушкина, дом колотушкина",
        info: "Нужно ради экологии освободить парочку гектар соснового бора",
        image_path: "https://sun1-47.userapi.com/impg/wUFn9f1WRzyo_l2Qi3wLSFAQem5EuoKk0XsnJw/PMjWCuyVmR8.jpg?size=1024x566&quality=96&sign=3a82e081956a2479b72c49b0bf474caf&c_uniq_tag=o7SWhdWsHUwl0VZfyYGL-WrntoJVDNPpy0_Q-d2C9w4&type=album",
        author_id: 1,
        type_event_id: 1,
        expires_date: "2022-01-01",
      },
      {
        id: 2,
        name: "Спасаем животных ",
        address: "Барнаул, улица Пушкина, дом колотушкина",
        info: "Info2",
        image_path: "https://account.commishes.com/image/attribute/banner/119612/1280/300/?t=1629038082",
        author_id: 2,
        type_event_id: 1,
        expires_date: "2022-01-01",
      },
      {
        id: 3,
        name: "Рубим весь лес к хуям",
        address: "Барнаул, улица Пушкина, дом колотушкина",
        info: "Нужно ради экологии освободить парочку гектар соснового бора",
        image_path: "https://sun1-47.userapi.com/impg/wUFn9f1WRzyo_l2Qi3wLSFAQem5EuoKk0XsnJw/PMjWCuyVmR8.jpg?size=1024x566&quality=96&sign=3a82e081956a2479b72c49b0bf474caf&c_uniq_tag=o7SWhdWsHUwl0VZfyYGL-WrntoJVDNPpy0_Q-d2C9w4&type=album",
        author_id: 1,
        type_event_id: 1,
        expires_date: "2022-01-01",
      },
      {
        id: 4,
        name: "Спасаем животных ",
        address: "Барнаул, улица Пушкина, дом колотушкина",
        info: "Info2",
        image_path: "https://account.commishes.com/image/attribute/banner/119612/1280/300/?t=1629038082",
        author_id: 2,
        type_event_id: 1,
        expires_date: "2022-01-01",
      },
      {
        id: 5,
        name: "Рубим весь лес к хуям",
        address: "Барнаул, улица Пушкина, дом колотушкина",
        info: "Нужно ради экологии освободить парочку гектар соснового бора",
        image_path: "https://sun1-47.userapi.com/impg/wUFn9f1WRzyo_l2Qi3wLSFAQem5EuoKk0XsnJw/PMjWCuyVmR8.jpg?size=1024x566&quality=96&sign=3a82e081956a2479b72c49b0bf474caf&c_uniq_tag=o7SWhdWsHUwl0VZfyYGL-WrntoJVDNPpy0_Q-d2C9w4&type=album",
        author_id: 1,
        type_event_id: 1,
        expires_date: "2022-01-01",
      },
      {
        id: 6,
        name: "Спасаем животных ",
        address: "Барнаул, улица Пушкина, дом колотушкина",
        info: "Info2",
        image_path: "https://account.commishes.com/image/attribute/banner/119612/1280/300/?t=1629038082",
        author_id: 2,
        type_event_id: 1,
        expires_date: "2022-01-01",
      },
      {
        id: 7,
        name: "Рубим весь лес к хуям",
        address: "Барнаул, улица Пушкина, дом колотушкина",
        info: "Нужно ради экологии освободить парочку гектар соснового бора",
        image_path: "https://sun1-47.userapi.com/impg/wUFn9f1WRzyo_l2Qi3wLSFAQem5EuoKk0XsnJw/PMjWCuyVmR8.jpg?size=1024x566&quality=96&sign=3a82e081956a2479b72c49b0bf474caf&c_uniq_tag=o7SWhdWsHUwl0VZfyYGL-WrntoJVDNPpy0_Q-d2C9w4&type=album",
        author_id: 1,
        type_event_id: 1,
        expires_date: "2022-01-01",
      },
      {
        id: 8,
        name: "Спасаем животных ",
        address: "Барнаул, улица Пушкина, дом колотушкина",
        info: "Info2",
        image_path: "https://account.commishes.com/image/attribute/banner/119612/1280/300/?t=1629038082",
        author_id: 2,
        type_event_id: 1,
        expires_date: "2022-01-01",
      },
    ];
    this._types = [
      { id: 1, name: "Экологические инициативы" },
      { id: 2, name: "Type2" },
      { id: 3, name: "Type1" },
      { id: 4, name: "Type2" },
      { id: 5, name: "Type1" },
      { id: 6, name: "Type2" },
      { id: 7, name: "Type1" },
      { id: 8, name: "Type2" },
      { id: 9, name: "Type1" },
      { id: 10, name: "Type2" },
     
    ];
    this._selectedType = {};
    
    makeAutoObservable(this);
  }
  getEvents(events) {
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
