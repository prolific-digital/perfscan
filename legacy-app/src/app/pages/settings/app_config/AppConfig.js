import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import {
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Input,
  Label,
  TabContent,
  TabPane,
} from "reactstrap";

import SettingHeader from "../SettingHeader";
import CapacityConfig from "./CapacityConfig";
import SectionHeader from "../../../components/SectionHeader";
import { client_name } from "../../../../typeCodes";
import GlobalConfig from "./GlobalConfig";
const AppConfig = () => {
  const [activeTabID, setActiveTabID] = useState(1);

  const toast = useRef(null);
  return (
    <div className="setting-container">
      {/*<SectionHeader title={"Settings"} help="true" type="CP-SETTINGS" />*/}
      <div className="setting-options-wrapper">
        <div className="setting-options">
          <Toast ref={toast} position="top-right" />
          <SettingHeader
            iconClass={"fa fa-picture-o"}
            title={"Application Configuration"}
            subTitle={""}
          />
          <div className="default-core-metrics" id="printableArea">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTabID === 1 ? "active" : ""}
                  onClick={() => setActiveTabID(1)}
                >
                  Global Configuration
                </NavLink>
              </NavItem>
              {client_name === "fnts" && (
                <NavItem>
                  <NavLink
                    className={activeTabID === 2 ? "active" : ""}
                    onClick={() => setActiveTabID(2)}
                  >
                    Capacity Planning
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <TabContent activeTab={String(activeTabID)}>
              <TabPane tabId="1">
              {/* Global Configuration */}
                <GlobalConfig />
              </TabPane>
              <TabPane tabId="2">
                <CapacityConfig />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppConfig;
