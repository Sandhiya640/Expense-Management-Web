import React from "react";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <Topbar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
