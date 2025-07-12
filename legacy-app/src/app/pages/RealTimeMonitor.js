//react hooks import
import _ from "lodash";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";

//JSX component import
import SectionHeader from "../components/SectionHeader";
import AlertView from "./EnterpriseServerView/AlertView";
import ToggleSystems from "./EnterpriseServerView/ToggleSystems";
import EnterPriseServerViewBadge from "./EnterpriseServerView/EnterPriseServerViewBadge";

//functions import
import { selectedSystemData } from "../../store/slices/enterpriseServer/metricGraphToggle";
import { handlePrintDetails, saveParametersIntoLocalStorage } from "../../helpers/commonHelper";
import { systemFrameData } from "../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";

function RealTimeMonitor() {
  //redux import
  const arr = useSelector(systemFrameData);
  const dispatch = useDispatch();

  //react-router navigation import
  let navigate = useNavigate();

  //usestate initialized
  const [activeTabID, setActiveTabID] = useState("all");
  const [groupByType, setGroupByType] = useState("type");
  const [activeGroupType, setActiveGroupType] = useState(null);
  const [badgeType, setbadgeType] = useState("");
  const [isEditGroup, setisEditGroup] = useState(false);
  const [navigation, setNavigation] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState({});
  const [data2, setData2] = useState([
    { key: "critical", dataSet: [] },
    { key: "warning", dataSet: [] },
    { key: "good  ", dataSet: [] },
    { key: "info", dataSet: [] },
  ]);
  const [activeGroup, setActiveGroup] = useState({
    critical: false,
    warning: false,
    good: false,
    info: false,
  });

  // const { data, loading } = useSubscription(SYSTEM_STATUS_SUBSCRIPTION);

  let groupOptionsList = [
    {
      id: 3,
      value: "entity_description",
      viewText: "Server Serial No.",
    },
    {
      id: 1,
      value: "type",
      viewText: "Server Health Type",
    },
  ];

  useEffect(() => {
    if (navigation) {
      handleNavigation(
        selectedSystem?.id,
        selectedSystem?.path,
        selectedSystem?.system_type,
        selectedSystem?.serial_number,
        selectedSystem?.entity_name,
        selectedSystem?.entity_description,
        selectedSystem
      );
    } 
  }, [navigation, selectedSystem]);


  const handleNavigation = (
    sysId,
    path,
    systemType,
    serialNo,
    systemName,
    entity_description,
    systemData
  ) => {
    
    const params = {
      sysId: sysId,
      serialNo,
      systemType,
      host: systemName,
      // ...(systemType === "host" && { entityName: entity_name }),
      ...(systemType == "5" && { entityName: systemName }),
    };
    // dispatch(selectedSystemData(systemData));
    // saveParametersIntoLocalStorage("systemData", systemData);
    navigate({
      // pathname: systemType === "host" ? "/metrics" : "/server",
      pathname: systemType == "5" ? "/metrics" : "/server",
      search: `?${createSearchParams(params)}`,
    });
    // navigate(`${systemType == "5" ? `/metrics/${sysId}` : "/server"}`)
  };

  useEffect(() => {
    if (arr.length) {
      let filteredArray = null;
      if (activeTabID !== "all") {
        filteredArray = arr.filter((ele) => ele.system_type === activeTabID);
      } else {
        filteredArray = [...arr];
      }
      if (groupByType === "type") {
        let items = _.chain(filteredArray)
          .groupBy(groupByType)
          .map((value, key) => ({ key: key, dataSet: value }))
          .value();

        const updatedItems = [
          { key: "critical", dataSet: [] },
          { key: "warning", dataSet: [] },
          { key: "good", dataSet: [] },
          { key: "info", dataSet: [] },
        ];
        for (let i = 0; i < items.length; i++) {
          if (items[i].key.toLowerCase() === "critical") {
            updatedItems[0] = items[i];
          }
          if (items[i].key.toLowerCase() === "warning") {
            updatedItems[1] = items[i];
          }
          if (items[i].key.toLowerCase() === "good") {
            updatedItems[2] = items[i];
          }
          if (items[i].key.toLowerCase() === "info") {
            updatedItems[3] = items[i];
          }
        }
        setData2(updatedItems);
      } else {
        let items = _.chain(filteredArray)
          .groupBy(groupByType)
          .map((value, key) => ({ key: key, dataSet: value }))
          .value();
        setData2(items);
      }
    }

    return () =>
      setData2([
        { key: "critical", dataSet: [] },
        { key: "warning", dataSet: [] },
        { key: "good  ", dataSet: [] },
        { key: "info", dataSet: [] },
      ]);
  }, [activeTabID, arr, groupByType]);

  //toggle group to view card of that category
  const toggleGroups = useCallback(
    (id, idx) => {
      setbadgeType("");
      if (groupByType === "type") {
        if (id === 0) {
          setActiveGroup((preval) => ({
            ...preval,
            critical: !preval.critical,
          }));
        } else if (id === 1) {
          setActiveGroup((preval) => ({
            ...preval,
            warning: !preval.warning,
          }));
        } else if (id === 2) {
          setActiveGroup((preval) => ({ ...preval, good: !preval.good }));
        } else if (id === 3) {
          setActiveGroup((preval) => ({ ...preval, info: !preval.info }));
        }
      }
      if (groupByType !== "type") {
        if (activeGroupType === id) {
          setActiveGroupType(null);
          return;
        } else {
          setActiveGroupType(id);
        }
      }
      return;
    },
    [activeGroupType, groupByType]
  );

  const badgeClickHandler = (e, type, activeGroupID) => {
    e.stopPropagation();
    setbadgeType(type);
    setActiveGroup(activeGroupID);
  };

  const renderbadge = useCallback((dataItem) => {
    return (
      <div className="badge_spotlight">
        <span className="badge">{Number(dataItem?.dataSet?.length)}</span>
      </div>
    );
  }, []);

  // render badge with Number
  const renderAllbadge = (dataItem, activeGroupID) => {
    let filterdData = dataItem.dataSet;

    const dataList = _.chain(filterdData)
      .groupBy("type")
      .map((value, key) => ({ key: key, dataSet: value }))
      .value();

    return dataList.map((item) => {
      return (
        <div
          className={`badge_count_name ${item.key?.toLowerCase()}`}
          onClick={(e) =>
            badgeClickHandler(e, item.key?.toLowerCase(), activeGroupID)
          }
          key={item.id}
        >
          <span className="badge">{Number(item?.dataSet?.length)}</span>
          <span className="badge-text">{item?.key}</span>
        </div>
      );
    });
  };

  const activeTab = (activeId, tab) => {
    if (activeId === tab) {
      return {
        border: "",
        background: "",
      };
    } else {
      return {
        border: "2px solid #D9D9D9",
        background: "#D9D9D9",
      };
    }
  };

  const selectedSystemTemplate = (option, props) => {
    return <span>{props?.placeholder}</span>;
  };

  const systemOptionTemplate = (option) => {
    return (
      <div style={{ display: "flex", justifyContent: "left" }}>
        <p
          className={`metricsCard ${option.type.toLowerCase()}`}
          style={{
            margin: "auto 0.2rem",
            width: "5%",
            padding: "0.5rem 0.7rem",
          }}
        ></p>
        <p
          className={`value-options`}
          style={{ margin: "auto 0.5rem", width: "auto" }}
        >
          {option.entity_name} - {option.entity_description} -{" "}
          {option.serial_number}
        </p>
      </div>
    );
  };

  const handleSystemChange = (systemData, nav) => {
    setSelectedSystem(systemData);
    setNavigation(nav);
  };

  const groupByTypeHandler = (val) => {
    setGroupByType(val);
  };

  const activeTabIdHandler = useCallback((val) => {
    setActiveTabID(val);
  }, []);

  const tabAlert = (tab) => {
    if (tab === "all") return "system and frames";
    else if (tab === "31") return "frame";
    else return "host";
  };

  return (
    <div className="enterprise_wrapper">
      <SectionHeader
        title={"Enterprise"}
        btnClickHandler={handlePrintDetails}
      />
      <ToggleSystems
        // arr={arr}
        activeTabID={activeTabID}
        selectedSystem={selectedSystem}
        groupByType={groupByType}
        activeTab={activeTab}
        handleSystemChange={handleSystemChange}
        handleNavigation={handleNavigation}
        systemOptionTemplate={systemOptionTemplate}
        groupOptionsList={groupOptionsList}
        groupByTypeHandler={groupByTypeHandler}
        activeTabIdHandler={activeTabIdHandler}
        selectedSystemTemplate={selectedSystemTemplate}
        toggleTab={true}
      />

      <div className="enterprise_edit_options_wrap"></div>
      <div className="servers_wrapper-alerts">
        <div className="server_wrapper-alert">
          {data2.length > 0 &&
            data2?.map((dataItem, index) => (
              <div className="server_parent" key={index}>
                <EnterPriseServerViewBadge
                  toggleGroups={toggleGroups}
                  index={index}
                  dataItem={dataItem}
                  groupByType={groupByType}
                  renderAllbadge={renderAllbadge}
                  renderbadge={renderbadge}
                  activeGroup={activeGroup}
                  handleNavigation={handleNavigation}
                  activeGroupType={activeGroupType}
                  activeStatus={activeGroup[dataItem?.key?.toLowerCase()]}
                />
              </div>
            ))}
          {!data2?.length && <p>No {tabAlert(activeTabID)} are available.</p>}
        </div>
        {/* <AlertView /> */}
      </div>
      {/* {isEditGroup && (
        <EditGroupModal
          isEditGroup={isEditGroup}
          onModalClose={() => setisEditGroup((isEditGroup) => !isEditGroup)}
        />
      )} */}
    </div>
  );
}

export default RealTimeMonitor;
