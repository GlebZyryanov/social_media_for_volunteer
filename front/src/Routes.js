import Admin from "./pages/Admin";
import AllChats from "./pages/AllChats";
import AllEvents from "./pages/AllEvents";
import AllUsers from "./pages/AllUsers";
import Auth from "./pages/Auth";
import ChatPage from "./pages/ChatPage";
import CreateEvent from "./pages/CreateEvent";
import EventPage from "./pages/EventPage";
import UpdateEvent from "./pages/UpdateEvent";
import UpdateUser from "./pages/UpdateUser";
import UpdradeRole from "./pages/UpgradeRole";
import UserPage from "./pages/UserPage";
import {
  ADMIN_ROUTE,
  ALLCHATS_ROUTE,
  ALLEVENTS_ROUTE,
  ALLUSERS_ROUTE,
  CHATPAGE_ROUTE,
  CREATEEVENT_ROUTE,
  EVENTPAGE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  UPDATEEVENT_ROUTE,
  UPDATEUSER_ROUTE,
  UPGRADEROLE_ROUTE,
  USERPAGE_ROUTE,
} from "./utils/consts";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Element: <Admin />,
  },
];
export const authRoutes = [
  {
    path: ALLEVENTS_ROUTE,
    Element: <AllEvents/>,
  },
  {
    path: ALLCHATS_ROUTE,
    Element: <AllChats/>,
  },
  {
    path: ALLUSERS_ROUTE,
    Element: <AllUsers/>,
  },
  {
    path: EVENTPAGE_ROUTE + '/:id',
    Element: <EventPage/>,
  },
  {
    path: CHATPAGE_ROUTE + '/:id',
    Element: <ChatPage/>,
  },
  {
    path: USERPAGE_ROUTE  + '/:id',
    Element: <UserPage/>,
  },
  {
    path: CREATEEVENT_ROUTE,
    Element: <CreateEvent/>,
  },
  {
    path: UPDATEEVENT_ROUTE  + '/:id',
    Element: <UpdateEvent/>
  },
  {
    path: UPDATEUSER_ROUTE + '/:id',
    Element: <UpdateUser/>,
  },
  {
    path: UPGRADEROLE_ROUTE + '/:id',
    Element: <UpdradeRole/>,
  },
];
export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Element: <Auth/>,
  },
  {
    path: REGISTRATION_ROUTE,
    Element: <Auth/>,
  },
];
