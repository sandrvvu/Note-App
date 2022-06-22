import React, { createContext } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import UserApp from "./context/UserApp";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

export const Context = createContext(null);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Context.Provider
      value={{
        user: new UserApp(),
      }}
    >
      <App />
    </Context.Provider>
    ,
  </StrictMode>
);
