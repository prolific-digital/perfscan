import React from "react";
import { Outlet } from "react-router-dom";

function ChangeEvents() {
  return (
    <div className="setting-options change-events">
      <Outlet />
    </div>
  );
}

export default ChangeEvents;
