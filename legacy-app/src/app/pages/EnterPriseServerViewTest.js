import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import {
  getParametersFromLocalStorage,
  handlePrintDetails,
} from "../../helpers/commonHelper";
import MetricsCardSys from "../components/MetricsCardSys";
import SectionHeader from "../components/SectionHeader";
import _ from "lodash";
import EditGroupModal from "../components/EditGroupModal";
import { Fragment } from "react";
import MetricsCard from "../components/MetricsCard";
import MetricsCardTest from "../components/MetricCardTest";
import MetricsCardSysTest from "../components/MetricCardSysTest";

function EnterPriseServerViewTest() {
  const [data, setData] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [groupByType, setGroupByType] = useState("type");
  const [badgeType, setbadgeType] = useState("");
  const [isEditGroup, setisEditGroup] = useState(false);


  // const { data: servers, isSuccess, isLoading, isError } = useGetServersQuery();

  let navigate = useNavigate();

  const handleNavigation = (id, path, systemType, serialNo) => {
    const params = { id: id, host: serialNo, systemType: systemType };
    navigate({
      pathname: path,
      search: `?${createSearchParams(params)}`,
    });
  };
  let arr = [
    {
      id: "7885FE0",
      type: "critical",
      msg: "Critical",
      health: "90%",
      serverLocation: "Chicago, IL",
      serverName: "AAAA - AMERICAS ATLANTA",
      country: "USA",
      region: "IL",
      state: "IL",
      department: "IT",
      orderEntry: "Order-Entry",
      sortOrder: 1,
      systemType: "Stand-alone",
      path: "/metrics",
    },

    {
      id: "78733F1",
      serverName: "North Carolina Data Center",
      type: "critical",
      state: "Lower Saxony, Germany",
      country: "Germany",
      region: "Europe",
      department: "IT",
      orderEntry: "Order-Entry",
      msg: "Critical",
      health: "50%",
      serverLocation: "Chicago, IL",
      sortOrder: 1,
      systemType: "Frame",
      path: "/server",
    },
    {
      id: "2157B5W",
      serverName: "DAANW - North West",
      type: "warning",
      state: "Bavaria, Germany",
      country: "Germany",
      region: "Europe",
      department: "IT",
      orderEntry: "Order-Entry",
      serverLocation: "St. Louis, MO",
      msg: "warning",
      health: "90%",
      sortOrder: 2,
      systemType: "Stand-alone",
      path: "/metrics",
    },
  ];

  const alertArr = [
    {
      id: "7885FE0",
      aaaaa: "10-1421",
      type: "critical",
      msg: "Critical",
      utilization: "93.21%",
      metricsName: "CPU Utilization",
      serverName: "AAAA - AMERICAS ATLANTA",
      page: "/detailed-view-cpu",
      date: "May 4, 2024    10:23AM",
    },
    {
      id: "7885FE0",
      aaaaa: "10-2751",
      type: "critical",
      msg: "Critical",
      utilization: "86.35%",
      metricsName: "Disk Space Utilization",
      serverName: "AAAA - AMERICAS ATLANTA",
      page: "/detailed-view-disk",
      date: "May 4, 2024    10:23AM",
    },
    {
      id: "787FF31",
      aaaaa: "11-9432",
      type: "warning",
      msg: "Warning",
      metricsName: "Disk Space Utilization",
      serverName: "AETEST - AE Test System",
      utilization: "82.44%",
      page: "/detailed-view-disk",
      date: "May 4, 2024     10:29AM",
    },
  ];

  let groupOptionsList = [
    {
      id: 3,
      value: "serverName",
      viewText: "Server Serial No.",
    },
    {
      id: 1,
      value: "type",
      viewText: "Server Health Type",
    },
  ];

  useEffect(() => {
    let items = _.chain(arr)
      .groupBy(groupByType)
      .map((value, key) => ({ key: key, dataSet: value }))
      .value();
    const updatedItemsData = [...items, { key: "good", dataSet: [] }];
    setData(updatedItemsData);
  }, [groupByType]);

  //toggle group to view card of that category
  const toggleGroups = (id) => {
    setbadgeType("");
    if (activeGroup === id) {
      setActiveGroup(null);
      return;
    } else {
      setActiveGroup(id);
    }
  };
  // show selected type servers eg. good, critical
  const badgeClickHandler = (e, type, activeGroupID) => {
    e.stopPropagation();
    setbadgeType(type);
    setActiveGroup(activeGroupID);
  };

  const renderbadge = (dataItem) => {
    return (
      <div className="badge_spotlight">
        <span className="badge">{Number(dataItem?.dataSet?.length)}</span>
      </div>
    );
  };

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
          className={`badge_count_name ${item.key}`}
          onClick={(e) => badgeClickHandler(e, item.key, activeGroupID)}
          key={item.id}
        >
          <span className="badge">{Number(item?.dataSet?.length)}</span>
          <span className="badge-text">{item.key}</span>
        </div>
      );
    });
  };

  const editGroup = (e, data) => {
    e.stopPropagation();
    setisEditGroup((isEditGroup) => !isEditGroup);
  };
  const deleteGroup = (e) => {
    e.stopPropagation();
  };

  const checkUserType = () => {
    if (groupByType === "type" || groupByType === "serverName") return false;
    return true;
  };

  return (
    <div className="enterprise_wrapper">
      <SectionHeader
        title={"Enterprise"}
        btnClickHandler={handlePrintDetails}
      />
      <Fragment>
        <div className="enterprise_edit_options_wrap">
          <div className="options-left"></div>
          <div className="options-right">
            <div className="form-group">
              <select
                name="groupby"
                id="groupitems"
                className="form-control"
                onChange={(e) => setGroupByType(e.target.value)}
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
            {/* <div className="add-options">
              <button className="btn btn-primary" onClick={(e) => editGroup(e)}>
                +{"  "} Add Group
              </button>
            </div> */}
          </div>
        </div>
        <div className="servers_wrapper-alerts">
          <div className="server_wrapper-alert">
            {data?.map((dataItem, index) => (
              <div className="server_parent" key={index}>
                <div
                  className={`group_title ${dataItem.key}`}
                  onClick={() => toggleGroups(index)}
                >
                  <div className="left-sec">
                    {groupByType === "type" && renderbadge(dataItem)}{" "}
                    <i
                      className={
                        "fa " +
                        (activeGroup === index
                          ? "fa-angle-down"
                          : "fa-angle-right")
                      }
                    ></i>
                    {dataItem.key}{" "}
                    {groupByType !== "type" && renderAllbadge(dataItem, index)}
                  </div>
                  {checkUserType() ? (
                    <div className="right-sec">
                      <button
                        className="btn btn-icon btn-icon-secondary"
                        onClick={(e) => editGroup(e, dataItem)}
                      >
                        <i className="pi pi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-icon btn-icon-danger"
                        onClick={deleteGroup}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  ) : null}
                </div>
                <div
                  className={
                    "metrics_card_wrapper " +
                    (activeGroup === index ? "" : "d-none")
                  }
                >
                  {dataItem &&
                    dataItem.dataSet.length &&
                    dataItem.dataSet
                      .filter((item) => {
                        if (badgeType) {
                          return item.type === badgeType;
                        } else {
                          return item;
                        }
                      })
                      .map((item, index) => (
                        <MetricsCardSysTest
                          key={index}
                          keyID={item.id}
                          cardClickHandler={() =>
                            handleNavigation(
                              item.id,
                              item.path,
                              item.systemType,
                              item.serverName
                            )
                          }
                          {...item}
                        />
                      ))}
                </div>
              </div>
            ))}
            {/* <div className="add-options">
            <button className="btn btn-primary" onClick={(e) => editGroup(e)}>
              +{"  "} Add Category
            </button>
          </div> */}
          </div>
          <div className="server_wrapper-alert scroll-container">
            <div className="server_parent server_parent_alert">
              {alertArr.map((item, idx) => {
                if (item?.dtype === "cpu_ms" || item?.dtype === "cpw") {
                  // eslint-disable-next-line array-callback-return
                  return;
                } else {
                  return (
                    <MetricsCardTest
                      key={idx}
                      cpuData={item}
                      // cardClickHandler={() =>
                      //   handleNavigation(item.dtype, "/detailed-view-cpu")
                      // }
                      {...item}
                      alertMetricAlignClass={"alert_metric_alignment"}
                      alertWrapperClass={"metric_alert_wrapper"}
                      alertNotification={true}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </Fragment>
      {isEditGroup && (
        <EditGroupModal
          isEditGroup={isEditGroup}
          onModalClose={() => setisEditGroup((isEditGroup) => !isEditGroup)}
        />
      )}
    </div>
  );
}

export default EnterPriseServerViewTest;
