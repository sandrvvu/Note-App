import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row min-h-screen">
      <div>
        <Sidebar />
      </div>
      <main className="w-full mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
