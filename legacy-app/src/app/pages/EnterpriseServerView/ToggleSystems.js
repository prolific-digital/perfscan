import { Dropdown } from "primereact/dropdown";
import { useSubscription } from "@apollo/client";
import React, { useCallback, useEffect } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import {
  systemFrameData,
  systemsAndFramesData,
} from "../../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import { useDispatch, useSelector } from "react-redux";
import { SYSTEM_STATUS_SUBSCRIPTION } from "../GraphQL/Queries/Queries";

const ToggleSystems = ({
  // arr,
  activeTabID,
  selectedSysData,
  selectedSystem,
  activeTab,
  handleSystemChange,
  handleNavigation,
  systemOptionTemplate,
  groupByType,
  groupOptionsList,
  groupByTypeHandler,
  activeTabIdHandler,
  selectedSystemTemplate,
  toggleTab,
}) => {
  
  const arr = useSelector(systemFrameData);
  const { data, loading } = useSubscription(SYSTEM_STATUS_SUBSCRIPTION);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) {
      const updatedArr = setTimeout(() => {
        if (!loading && data?.systemStatus && data?.systemStatus?.length) {
          dispatch(systemsAndFramesData(data?.systemStatus));
        }
      }, 2000);

      return () => {
        clearTimeout(updatedArr);
        // disconnectMutation().catch((error) =>
        //   console.error("disconnection failed", error)
        // );
      };
    }
  }, [data, loading]);

  const updateActiveTabId = useCallback(
    (val) => {
      activeTabIdHandler(val);
    },
    [activeTabIdHandler]
  );

  const updateGroupByType = (val) => {
    groupByTypeHandler(val);
  };

  const systemChange = (system) => {
    if (system?.id !== selectedSystem?.id) {
      handleSystemChange(system, true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "45%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* {toggleTab && (
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  style={activeTab(activeTabID, "all")}
                  className={activeTabID === "all" ? "active" : ""}
                  onClick={() => updateActiveTabId("all")}
                >
                  All
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={activeTab(activeTabID, "31")}
                  className={activeTabID === "31" ? "active" : ""}
                  onClick={() => updateActiveTabId("31")}
                >
                  Frames
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={activeTab(activeTabID, "5")}
                  className={activeTabID === "5" ? "active" : ""}
                  onClick={() => updateActiveTabId("5")}
                >
                  Hosts
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        )} */}
        <div>
          <div className="build_para_card">
            <div className="filter_option">
              <Dropdown
                value={selectedSystem}
                options={arr}
                optionLabel="entity_name,entity_description,serial_number"
                filter
                filterBy="entity_name,entity_description,serial_number"
                placeholder="Select a System"
                onChange={(e) => systemChange(e.value)}
                valueTemplate={selectedSystemTemplate}
                itemTemplate={systemOptionTemplate}
              />
            </div>
          </div>
        </div>
      </div>
      {/* {toggleTab && (
        <div className="options-left">
          <div className="options-right">
            <div className="form-group">
              <select
                name="groupby"
                id="groupitems"
                className="form-control"
                onChange={(e) => updateGroupByType(e.target.value)}
                defaultValue={groupByType}
              >
                <option disabled>--Select Group Type--</option>
                {groupOptionsList?.map((type, index) => (
                  <option key={index} value={type.value}>
                    {type.viewText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default React.memo(ToggleSystems);
