import React from "react";
import { Outlet } from "react-router-dom";

function ManageSystems() {
  return (
    <div className="setting-options manage-systems">
      <Outlet />
    </div>
  );
}
export default ManageSystems;
