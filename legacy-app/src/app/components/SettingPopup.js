import React from "react";
import { Link } from "react-router-dom";

function SettingPopup() {
  return (
    <div className="custom_popup_wrapper">
      <div className="popup_header">
        <div
          className="bg_image"
          style={{
            backgroundColor: "#6c757d",
          }}
        ></div>
        <div className="popup_title">Settings</div>
      </div>
      <div className="popup_body">
        <ul>
          <li>
            <Link to="settings/default-core-metrics">
              Default Core Metric Graphs
            </Link>
          </li>

          <li>
            <Link to="settings/user-defined-performance">
              User Defined Performance
            </Link>
          </li>
          <li>
            <Link to="settings/user-management">User Management</Link>
          </li>
          <li>
            <Link to="settings/manage-systems">Manage Systems</Link>
          </li>
          <li>
            <Link to="settings/change-events">Manage Change Events</Link>
          </li>
          <li>
            <Link to="settings/manage-reports">Manage Saved Reports</Link>
          </li>
          <li>
            <Link to="settings/manage-branding">Manage Branding</Link>
          </li>
          <li>
            <Link to="settings/app-config">Application Config</Link>
          </li>
          {/* <li>
            <Link to="settings/alert-management">Alert Management</Link>
          </li> */}
          <li>
            <Link to="settings/report-automation">Report Automation</Link>
          </li>
          <li>
            <Link to="settings/system-configuration">IBMi System Configuration</Link>
          </li>
          <li>
            <Link to="settings/about-perfscan">About Perfscan</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingPopup;
