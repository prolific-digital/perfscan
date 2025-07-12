import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import {
  checkRealTimeFrameStatusCount,
  checkRealTimeSystemStatusCount,
  getParametersFromLocalStorage,
  handlePrintDetails,
} from "../../helpers/commonHelper";
import MetricsCardSys from "../components/MetricsCardSys";
import SectionHeader from "../components/SectionHeader";
import _ from "lodash";
import EditGroupModal from "../components/EditGroupModal";
import { Fragment } from "react";
import {
  fetchAsyncFrames,
  fetchAsyncSystemsAndFrame,
  getFrameList,
  getSystemFrameList,
} from "../../store/slices/enterpriseServer/systemFrameSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMetricCPUData,
  fetchAsyncMetricDiskData,
  fetchAsyncMetricMemoryData,
  fetchAsyncMetricOtherData,
  getMetricsCPUData,
  getMetricsDiskData,
  getMetricsMemoryData,
  getMetricsOtherData,
} from "../../store/slices/enterpriseServer/metricsSlice";
import useQueryData from "../../hooks/useQueryDataHistorical";
import axios, { Axios } from "axios";
import { GridLoader } from "react-spinners";
import MetricsCard from "../components/MetricsCard";
import MetricsCardSysTest from "../components/MetricCardSysTest";

// const abc = new Axios()
// abc.defaults =

function EnterPriseServerView() {
  const [data, setData] = useState([{ key: "critical", dataSet: [] },
    { key: "warning", dataSet: [] },
    { key: "good  ", dataSet: [] },
    { key: "info", dataSet: [] },]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [groupByType, setGroupByType] = useState("type");
  const [badgeType, setbadgeType] = useState("");
  const [foundSystemData, setfoundSystemData] = useState([]);
  const [isEditGroup, setisEditGroup] = useState(false);
  const userID = getParametersFromLocalStorage("userID");
  const [loader, setLoader] = useState(false);
  // const { data: servers, isSuccess, isLoading, isError } = useGetServersQuery();
  const systemList = useSelector(getSystemFrameList);
  const frameList = useSelector(getFrameList);
  const cpuData = useSelector(getMetricsCPUData);
  const diskData = useSelector(getMetricsDiskData);
  const memoryData = useSelector(getMetricsMemoryData);
  const otherData = useSelector(getMetricsOtherData);
  const qd = useQueryData();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (
    id,
    path,
    systemType,
    serialNo,
    systemName,
    entity_name
  ) => {
    const params = {
      sysId: id,
      serialNo,
      systemType,
      host: systemName,
      ...(systemType === "Stand-alone" && { entityName: entity_name }),
    };

    navigate({
      pathname: path,
      search: `?${createSearchParams(params)}`,
    });
  };

  useEffect(()=>{
    if(!systemList.data.length && !frameList.data.length){
      setLoader(true);
    }
  },[frameList.data.length, systemList.data.length])

  useEffect(()=>{
    if(data.length){
      setLoader(false);
    }
  },[data])

  //css for showing message on <p> tag
  // display: flex;
  // width: 100%;
  // justify-content: center;

  let arr = [
    {
      id: "7885FE0",
      type: "critical",
      msg: "Critical",
      health: "90%",
      serverLocation: "Chicago, IL",
      serverName: "AMERICAS - ATLANTA",
      country: "USA",
      region: "IL",
      state: "IL",
      department: "IT",
      orderEntry: "Order-Entry",
      sortOrder: 1,
      systemType: "System",
      path: "/metrics",
    },

    {
      id: "78733F1",
      serverName: "COLUMBUS FAIR",
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
      id: "217731W",
      serverName: "QUINCY AA",
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
      systemType: "System",
      path: "/metrics",
    },
    {
      id: "78733F1",
      serverName: "DYER AA, INC.",
      type: "warning",
      state: "Bavaria, Germany",
      country: "Germany",
      region: "Europe",
      department: "IT",
      orderEntry: "Order-Entry",
      msg: "warning",
      serverLocation: "St. Louis, MO",
      health: "90%",
      sortOrder: 2,
      systemType: "Frame",
      path: "/server",
    },
    {
      id: "7851590",
      serverName: "NORTHEAST AA",
      type: "good",
      state: "Kotoor, Africa",
      country: "Egypt",
      region: "Africa",
      department: "IT",
      orderEntry: "Order-Entry",
      msg: "good",
      serverLocation: "St. Louis, MO",
      health: "90%",
      sortOrder: 3,
      systemType: "System",
      path: "/metrics",
    },
    {
      id: "78733F1",
      serverName: "AMERICAS - DALLAS",
      type: "good",
      msg: "Good",
      health: "90%",
      serverLocation: "Chicago, IL",
      country: "India",
      region: "Asia",
      state: "Bangalore, India",
      department: "IT",
      orderEntry: "Order-Entry",
      sortOrder: 3,
      systemType: "Frame",
      path: "/server",
    },
  ];
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
    dispatch(fetchAsyncMetricCPUData(qd));
    // dispatch(fetchAsyncMetricDiskData(qd));
    // dispatch(fetchAsyncMetricMemoryData(qd));
    // dispatch(fetchAsyncMetricOtherData(qd));
    dispatch(fetchAsyncSystemsAndFrame({ userid: userID }));
    dispatch(fetchAsyncFrames({ userid: userID }));
  }, [dispatch]);

  useEffect(() => {
    if (foundSystemData?.length) {
      if (groupByType === "type") {
        let items = _.chain(foundSystemData)
          .groupBy(groupByType)
          .map((value, key) => ({ key: key, dataSet: value }))
          .value();

        const updatedItems = [
          { key: "critical", dataSet: [] },
          { key: "warning", dataSet: [] },
          { key: "good  ", dataSet: [] },
          { key: "info", dataSet: [] },
        ];
        for (let i = 0; i < items.length; i++) {
          if (items[i].key === "critical") {
            updatedItems[0] = items[i];
          }
          if (items[i].key === "warning") {
            updatedItems[1] = items[i];
          }
          if (items[i].key === "good") {
            updatedItems[2] = items[i];
          }
          if (items[i].key === "info") {
            updatedItems[3] = items[i];
          }
        }
        setData(updatedItems);
      } else {
        let items = _.chain(foundSystemData)
          .groupBy(groupByType)
          .map((value, key) => ({ key: key, dataSet: value }))
          .value();
        setData(items);
      }
    }
  }, [foundSystemData, groupByType]);

  useEffect(() => {
    const updatedSystemDataSet = [];
    const updatedFrameDataSet = [];
    if (!systemList.loading) {
      for (let i = 0; i < systemList?.data.length; i++) {
        const foundKeyStatus = checkRealTimeSystemStatusCount(
          systemList?.data[i].metricData
        );
        updatedSystemDataSet.push({
          ...systemList?.data[i],
          type: foundKeyStatus,
          msg: foundKeyStatus,
          path: "/metrics",
          systemType: "Stand-alone",
        });
      }
    }

    if (!frameList.loading) {
      let foundKeyStatus = null;
      for (let i = 0; i < frameList.data.length; i++) {
        if (!frameList?.data[i]?.lparData.length) {
          updatedFrameDataSet.push({
            ...frameList.data[i],
            type: "info",
            msg: "info",
            path: "/server",
            systemType: "Frame",
          });
        } else {
          foundKeyStatus = checkRealTimeFrameStatusCount(frameList.data[i]);
          updatedFrameDataSet.push({
            ...frameList.data[i],
            type: foundKeyStatus,
            msg: foundKeyStatus,
            path: "/server",
            systemType: "Frame",
          });
        }
      }
      const formattedData = [...updatedSystemDataSet, ...updatedFrameDataSet];
      setfoundSystemData(formattedData);
    }
  }, [
    cpuData,
    diskData,
    groupByType,
    memoryData,
    otherData,
    systemList,
    frameList,
  ]);

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
    // debugger
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
    // debugger
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
    if (groupByType === "type" || groupByType === "entity_description")
      return false;
    return true;
  };

  return (
    <div className="enterprise_wrapper">
      <SectionHeader
        title={"Enterprise"}
        btnClickHandler={handlePrintDetails}
      />
      {/* {(loader) && (
        <div>
          <GridLoader color="#366bd6" />
        </div>
      )} */}
      {/* {!loader && */}
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
        </div>
      </div>
      <div className="servers_wrapper-alerts">
        <div className="server_wrapper-alert">
          {data?.map((dataItem, index) => (
            <div className="server_parent" key={index}>
              <div
                className={`group_title ${dataItem?.key}`}
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
                  {dataItem?.key}{" "}
                  {groupByType !== "type" &&
                    renderAllbadge(dataItem, index)}
                </div>
                {/* {checkUserType() ? (
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
                ) : null} */}
              </div>
              <div
                className={
                  "metrics_card_wrapper " +
                  (activeGroup === index ? "" : "d-none")
                }
              >
                {!dataItem?.dataSet?.length && (
                  <p style={{ marginLeft: "0.8rem" }}>
                    No system and frame available
                  </p>
                )}
                {dataItem &&
                  dataItem?.dataSet?.length > 0 &&
                  dataItem?.dataSet
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
                        cardClickHandler={() =>
                          handleNavigation(
                            item?.id,
                            item?.path,
                            item?.systemType,
                            item?.entity_data?.frame?.serial_number,
                            item?.entity_description,
                            item?.entity_name
                          )
                        }
                        {...item}
                        serverName={item?.entity_description}
                        keyID={item?.entity_data?.frame?.serial_number}
                        msg={item?.msg}
                        serverLocation={item?.entity_name}
                        systemType={item?.systemType}
                        alertWrapperClass={"metric_alert_wrapper"}
                      />
                    ))}
              </div>
            </div>
          ))}
        </div>
        <div className="server_wrapper-alert scroll-container">
          <div className="server_parent server_parent_alert">
            {/* {cpuData.loading && (
              <div>
                <GridLoader color="#366bd6" />
              </div>
            )}
            {!cpuData.loading &&
              cpuData?.data?.data?.map((item, idx) => {
                if (item.dtype === "cpu_ms" || item.dtype === "cpw") {
                  // eslint-disable-next-line array-callback-return
                  return;
                } else {
                  return (
                    <MetricsCard
                      key={idx}
                      cpuData={item}
                      // cardClickHandler={() =>
                      //   handleNavigation(item.dtype, "/detailed-view-cpu")
                      // }
                      {...item}
                      alertMetricAlignClass={"alert_metric_alignment"}
                      alertWrapperClass={"metric_alert_wrapper"}
                    />
                  );
                }
              })}
            {!cpuData.loading &&
              cpuData?.data?.data?.map((item, idx) => {
                if (item.dtype === "cpu_ms" || item.dtype === "cpw") {
                  // eslint-disable-next-line array-callback-return
                  return;
                } else {
                  return (
                    <MetricsCard
                      key={idx}
                      cpuData={item}
                      // cardClickHandler={() =>
                      //   handleNavigation(item.dtype, "/detailed-view-cpu")
                      // }
                      {...item}
                      alertMetricAlignClass={"alert_metric_alignment"}
                    />
                  );
                }
              })}
            {!cpuData.loading &&
              cpuData?.data?.data?.map((item, idx) => {
                if (item.dtype === "cpu_ms" || item.dtype === "cpw") {
                  // eslint-disable-next-line array-callback-return
                  return;
                } else {
                  return (
                    <MetricsCard
                      key={idx}
                      cpuData={item}
                      // cardClickHandler={() =>
                      //   handleNavigation(item.dtype, "/detailed-view-cpu")
                      // }
                      {...item}
                      alertMetricAlignClass={"alert_metric_alignment"}
                    />
                  );
                }
              })}
            {!cpuData.loading &&
              cpuData?.data?.data?.map((item, idx) => {
                if (item.dtype === "cpu_ms" || item.dtype === "cpw") {
                  // eslint-disable-next-line array-callback-return
                  return;
                } else {
                  return (
                    <MetricsCard
                      key={idx}
                      cpuData={item}
                      // cardClickHandler={() =>
                      //   handleNavigation(item.dtype, "/detailed-view-cpu")
                      // }
                      {...item}
                      alertMetricAlignClass={"alert_metric_alignment"}
                    />
                  );
                }
              })}
            {!cpuData.loading &&
              cpuData?.data?.data?.map((item, idx) => {
                if (item.dtype === "cpu_ms" || item.dtype === "cpw") {
                  // eslint-disable-next-line array-callback-return
                  return;
                } else {
                  return (
                    <MetricsCard
                      key={idx}
                      cpuData={item}
                      // cardClickHandler={() =>
                      //   handleNavigation(item.dtype, "/detailed-view-cpu")
                      // }
                      {...item}
                      alertMetricAlignClass={"alert_metric_alignment"}
                    />
                  );
                }
              })}
            {!cpuData.loading &&
              cpuData?.data?.data?.map((item, idx) => {
                if (item.dtype === "cpu_ms" || item.dtype === "cpw") {
                  // eslint-disable-next-line array-callback-return
                  return;
                } else {
                  return (
                    <MetricsCard
                      key={idx}
                      cpuData={item}
                      // cardClickHandler={() =>
                      //   handleNavigation(item.dtype, "/detailed-view-cpu")
                      // }
                      {...item}
                      alertMetricAlignClass={"alert_metric_alignment"}
                    />
                  );
                }
              })}
            {!cpuData.loading &&
              cpuData?.data?.data?.map((item, idx) => {
                if (item.dtype === "cpu_ms" || item.dtype === "cpw") {
                  // eslint-disable-next-line array-callback-return
                  return;
                } else {
                  return (
                    <MetricsCard
                      key={idx}
                      cpuData={item}
                      // cardClickHandler={() =>
                      //   handleNavigation(item.dtype, "/detailed-view-cpu")
                      // }
                      {...item}
                      alertMetricAlignClass={"alert_metric_alignment"}
                    />
                  );
                }
              })} */}
            <p style={{textAlign:"center"}}>No alert data for systems and frames.</p>
          </div>
        </div>
      </div>
    </Fragment>
       {/* } */}
        
      
      {isEditGroup && (
        <EditGroupModal
          isEditGroup={isEditGroup}
          onModalClose={() => setisEditGroup((isEditGroup) => !isEditGroup)}
        />
      )}
    </div>
  );
}

export default EnterPriseServerView;
