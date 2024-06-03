import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import UserStore from "./store/UserStore";
import MessageStore from "./store/MessageStore";
import EventStore from "./store/EventStore";
import ChatStore from "./store/ChatStore";
import ChatUsersStore from "./store/ChatUsersStore";
import AttendanceStore from "./store/AttendanceStore";
export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        message: new MessageStore(),
        event: new EventStore(),
        chat: new ChatStore(),
        chat_users: new ChatUsersStore(),
        attandance: new AttendanceStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
