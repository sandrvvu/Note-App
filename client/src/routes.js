import Workspace from "./pages/Workspace";
import Note from "./pages/Note";
import Folder from "./pages/Folder";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ShareFolder from "./pages/SharedFolder";
import ShareNote from "./pages/SharedNote";
import {
  WORKSPACE_ROUTE,
  NOTE_ROUTE,
  FOLDER_ROUTE,
  REGISTRATION_ROUTE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  SHARE_WITH_ME_ROUTE,
} from "./utils/const.js";

export const authRoutes = [
  {
    path: WORKSPACE_ROUTE,
    Component: Workspace,
  },
  {
    path: NOTE_ROUTE + "/:id",
    Component: Note,
  },
  {
    path: FOLDER_ROUTE + "/:id",
    Component: Folder,
  },
  {
    path: SHARE_WITH_ME_ROUTE,
    Component: ShareFolder,
  },
  {
    path: SHARE_WITH_ME_ROUTE + "/:id",
    Component: ShareNote,
  },
];

export const publicRoutes = [
  {
    path: REGISTRATION_ROUTE,
    Component: Register,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: HOME_ROUTE,
    Component: Home,
  },
];
