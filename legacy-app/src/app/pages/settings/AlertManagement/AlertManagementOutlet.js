import React from "react";
import { Outlet } from "react-router";

function AlertManagementOutlet() {
  return (
    <div className="setting-options manage-systems">
      <Outlet />
    </div>
  );
}

export default AlertManagementOutlet;
