import React, { useState } from "react";
import SettingHeader from "../SettingHeader";
import { useNavigate } from "react-router-dom";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import FrameTab from "./FrameTab";
import SystemTab from "./SystemTab";

const SystemList = () => {
  const [activeTabID, setActiveTabID] = useState(1);
  let navigate = useNavigate();

  return (
    <>
      <SettingHeader
        iconClass={"fa fa-calendar-check-o"}
        title={"Manage Systems Metrics"}
        subTitle={"These are the available systems."}
      />
      <div className="manage-systems-wrapper">
        <div style={{ display: "flex" }}>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTabID === 1 ? "active" : ""}
                onClick={() => setActiveTabID(1)}
              >
                Frames
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTabID === 2 ? "active" : ""}
                onClick={() => setActiveTabID(2)}
              >
                Systems
              </NavLink>
            </NavItem>
          </Nav>
          {activeTabID === 1 && (
            <button
              className="btn btn-primary"
              onClick={() => navigate("add-frame")}
            >
              Add Frame
            </button>
          )}
          {activeTabID === 2 && (
            <button
              className="btn btn-primary"
              onClick={() => navigate("add-system")}
            >
              Add System
            </button>
          )}
        </div>
        <TabContent activeTab={String(activeTabID)}>
          <TabPane tabId="1">
            <FrameTab />
          </TabPane>
        </TabContent>

        <TabContent activeTab={String(activeTabID)}>
          <TabPane tabId="2">
            <SystemTab />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default SystemList;
