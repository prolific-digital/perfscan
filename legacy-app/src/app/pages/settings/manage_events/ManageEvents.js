import React from "react";
import { Outlet } from "react-router";

function ManageEvents() {
  return (
    <div className="setting-options change-events">
      <Outlet />
    </div>
  );
}

export default ManageEvents;
