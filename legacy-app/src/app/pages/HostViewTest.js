import React, { useEffect, useRef, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  checkRealTimeSystemStatusCount,
  handlePrintDetails,
} from "../../helpers/commonHelper";
import ChartView from "../components/ChartView";
import MetricsCard from "../components/MetricsCardSys";
import SectionHeader from "../components/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncFramesLpars,
  getFrameLparList,
} from "../../store/slices/enterpriseServer/systemFrameSlice";
import useQueryData from "../../hooks/useQueryDataHistorical";
import { GridLoader } from "react-spinners";
import MetricsCardSysTest from "../components/MetricCardSysTest";
import MetricsCardTest from "../components/MetricCardTest";

function HostViewTest() {
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [foundSystemData, setfoundSystemData] = useState([]);
  const Lpar = searchParams.get("host");
  const serverId = searchParams.get("id");
  const systemType = searchParams.get("systemType");
  const serialNo = searchParams.get("serialNo");
  const qd = useQueryData();
  // const serialNo = searchParams.get("serial_number");
  const dispatch = useDispatch();
  const lparList = useSelector(getFrameLparList);

  const handleNavigation = (id, systemName,entity_name) => {
    const params = {
      sysId: id,
      serialNo,
      systemType,
      host: Lpar,
      lparName: systemName,
      entityName: entity_name,
    };
    navigate({
      pathname: "/metrics",
      search: `?${createSearchParams(params)}`,
    });
  };

  //   useEffect(() => {
  //     // if(!uuid?.loading && uuid.data.uniqueid){
  //     dispatch(fetchAsyncFramesLpars({ serialNumber: serialNo }));
  //     // }
  //   }, [dispatch, serialNo]);

  let breadCrumbsList = [
    {
      id: 1,
      name: "Enterprise",
      url: "/enterprise-server",
    },
    {
      id: 2,
      name: serialNo,
      url: "",
    },
  ];

  let arr = [
    {
      id: "787FF31",
      serverName: "AETEST AE Test System",
      type: "critical",
      msg: "Critical",
      health: "90%",
      serverLocation: "(LPAR#1)",
      systemType: "Frame",
    },
    {
      id: "787FF31",
      serverName: "AEQA AE QA System",
      type: "good",
      msg: "Good",
      health: "90%",
      serverLocation: "(LPAR#2)",
      systemType: "Frame",
    },
    {
      id: "787FF31",
      serverName: "AEDEV AE DEV System",
      type: "good",
      msg: "Good",
      health: "90%",
      serverLocation: "(LPAR#3)",
      systemType: "Frame",
    },
  ];

  const alertArr = [
    {
      id: "787FF31",
      aaaaa: "10-2751",
      type: "critical",
      msg: "Critical",
      utilization: "87.03%",
      metricsName: "Disk Space Utilization",
      serverName: "AETEST - AE Test System",
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
      date: "May 3, 2024     9:02PM",
    },
  ];

  //   useEffect(() => {
  //     if (!lparList.loading) {
  //       const updatedDataSet = [];
  //       for (let i = 0; i < lparList.data.length; i++) {
  //         const foundKeyStatus = checkRealTimeSystemStatusCount(
  //           lparList.data[i].metricData
  //         );
  //         updatedDataSet.push({
  //           ...lparList.data[i],
  //           type: foundKeyStatus,
  //           msg: foundKeyStatus,
  //           path: "/metrics",
  //         });
  //       }
  //       setfoundSystemData(updatedDataSet);
  //     }
  //   }, [lparList]);

  return (
    <div className="enterprise_wrapper">
      <SectionHeader
        title={"LPAR / Host"}
        btnClickHandler={handlePrintDetails}
        breadCrumbsList={breadCrumbsList}
        serialNo={serverId}
      />
      <div className="servers_wrapper-alerts">
        <div className="server_wrapper-alert">
          {/* {lparList.loading && (
          <div>
            <GridLoader color="#366bd6" />
          </div>
        )} */}
          <div className="metrics_card_wrapper">
            {/* {arr.map((item, idx) => (
              <MetricsCardSysTest
                key={idx}
                keyID={item.id}
                cardClickHandler={() =>
                  handleNavigation(item.id, item.serverName, item.systemType)
                }
                {...item}
                alertMetricAlignClass={"alert_metric_alignment"}
                alertWrapperClass={"metric_alert_wrapper"}
                alertNotification={true}
                lpar={true}
              />
            ))} */}
            <h3>Coming soon!</h3>
          </div>
        </div>
        <div className="server_wrapper-alert scroll-container">
          <div className="server_parent server_parent_alert">
            {/* {alertArr.map((item, idx) => {
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
            })} */}
            <p style={{ textAlign: "center" }}>No alert data</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostViewTest;
