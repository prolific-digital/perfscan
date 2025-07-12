import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { handlePrintDetails } from "../../helpers/commonHelper";
import MetricsCard from "../components/MetricsCard";
import SectionHeader from "../components/SectionHeader";
import useQueryData from "../../hooks/useQueryDataHistorical";
import { useDispatch, useSelector } from "react-redux";
import { GridLoader } from "react-spinners";
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
import MetricsCardTest from "../components/MetricCardTest";

function MetricsPageTest() {
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const serverId = searchParams.get("id");
  const host = searchParams.get("host");
  const systemType = searchParams.get("systemType");
  const lparName = searchParams.get("lparName");
  const entityName = searchParams.get("entityName");
  const qd = useQueryData();
  const dispatch = useDispatch();
  const cpuData = useSelector(getMetricsCPUData);
  const diskData = useSelector(getMetricsDiskData);
  const memoryData = useSelector(getMetricsMemoryData);
  const otherData = useSelector(getMetricsOtherData);
  const [arr, setArr] = useState([]);
  const [filteredBreadCrumbsList, setFilteredBreadCrumbsList] = useState([]);
  const [alertSystemData, setAlertSystemData] = useState([]);
  const params = { id: serverId, host, systemType: systemType };

  // useEffect(() => {
  //   // if(!uuid?.loading && uuid.data.uniqueid){
  //   dispatch(fetchAsyncMetricCPUData({sysid:serverId}));
  //   dispatch(fetchAsyncMetricDiskData({sysid:serverId}));
  //   dispatch(fetchAsyncMetricMemoryData({sysid:serverId}));
  //   dispatch(fetchAsyncMetricOtherData({sysid:serverId}));
  //   // }
  // }, [dispatch]);

  const handleNavigation = (serverName, page, utilization, status, type) => {
    let myString = serverName;
    // myString = myString.replace(/\s+/g, "-");
    const params = {
      id: serverId,
      host: host,
      viewType: myString,
      utilization,
      status,
      type,
      systemType,
      ...(systemType === "Frame" && { lparName }),
    };
    navigate({
      pathname: `${page}`,
      search: `?${createSearchParams(params)}`,
    });
  };
  let breadCrumbsList = [
    {
      id: 1,
      name: "Enterprise",
      url: "/enterprise-server",
    },
    {
      id: 2,
      name: host,
      ...(systemType === "Frame" && {
        url: `/server?${createSearchParams(params)}`,
      }),
    },
  ];

  const breadCrumbsList2 = [
    {
      ...(systemType === "Frame" && {
        id: 3,
        name: serverId,
        url: ``,
      }),
    },
    {
      id: 4,
      name: lparName,
      url: ``,
    },
  ];

  const arr2 = [
    {
      lparName: "AETEST AE Test System",
      lparData: [
        {
          id: 1,
          aaaaa: "10-1421",
          type: "good",
          msg: "Good",
          utilization: "57.04%",
          metricsName: "CPU Utilization",
          page: "/detailed-view-cpu",
        },
        {
          id: 2,
          aaaaa: "10-2751",
          type: "info",
          msg: "Info",
          utilization: "0.57",
          metricsName: "Number of Cores",
          page: "/detailed-view-cpu",
        },
        {
          id: 4,
          aaaaa: "10-1421",
          type: "critical",
          msg: "Critical",
          utilization: "9.01 ms",
          metricsName: "5250 Response Time",
          page: "/detailed-view-other",
        },
        {
          id: 5,
          aaaaa: "10-1421",
          type: "info",
          msg: "Info",
          utilization: "1,739",
          metricsName: "Total Transactions",
          page: "/detailed-view-other",
        },
        {
          id: 11,
          aaaaa: "11-9432",
          type: "info",
          metricsName: "Ethernet Line Utilization",
          msg: "Info",
          utilization: "0.06%",
          page: "/detailed-view-other",
        },
        {
          id: 6,
          aaaaa: "10-2751",
          type: "critical",
          msg: "Critical",
          utilization: "87.03%",
          metricsName: "Disk Space Utilization",
          page: "/detailed-view-disk",
        },
        {
          id: 7,
          aaaaa: "11-9432",
          type: "good",
          msg: "Good",
          metricsName: "Disk Arm Utilization",
          utilization: "5.82%",
          page: "/detailed-view-disk",
        },
        {
          id: 8,
          aaaaa: "10-1421",
          type: "good",
          msg: "Good",
          metricsName: "Disk Response Time",
          utilization: "2.38 ms",
          page: "/detailed-view-disk",
        },
        {
          id: 9,
          aaaaa: "10-1421",
          type: "info",
          metricsName: "Total Disk Operations",
          msg: "Info",
          utilization: "4,265.00 ops/sec",
          page: "/detailed-view-disk",
        },
        {
          id: 10,
          aaaaa: "10-2751",
          type: "info",
          metricsName: "Total Faulting Rate",
          msg: "Info",
          utilization: "8,794.52 faults/sec",
          page: "/detailed-view-memory",
        },
      ],
    },
    {
      lparName: "AEQA AE QA System",
      lparData: [
        {
          id: 1,
          aaaaa: "10-1421",
          type: "good",
          msg: "Good",
          utilization: "62.88%",
          metricsName: "CPU Utilization",
          page: "/detailed-view-cpu",
        },
        {
          id: 2,
          aaaaa: "10-2751",
          type: "info",
          msg: "Info",
          utilization: "1.8",
          metricsName: "Number of Cores",
          page: "/detailed-view-cpu",
        },
        {
          id: 4,
          aaaaa: "10-1421",
          type: "good",
          msg: "Good",
          utilization: "0.69 ms",
          metricsName: "5250 Response Time",
          page: "/detailed-view-other",
        },
        {
          id: 5,
          aaaaa: "10-1421",
          type: "info",
          msg: "Info",
          utilization: "1,447",
          metricsName: "Total Transactions",
          page: "/detailed-view-other",
        },
        {
          id: 11,
          aaaaa: "11-9432",
          type: "good",
          metricsName: "Ethernet Line Utilization",
          msg: "Good",
          utilization: "1.07%",
          page: "/detailed-view-other",
        },
        {
          id: 6,
          aaaaa: "10-2751",
          type: "good",
          msg: "Good",
          utilization: "71.34%",
          metricsName: "Disk Space Utilization",
          page: "/detailed-view-disk",
        },
        {
          id: 7,
          aaaaa: "11-9432",
          type: "good",
          msg: "Good",
          metricsName: "Disk Arm Utilization",
          utilization: "6.22%",
          page: "/detailed-view-disk",
        },
        {
          id: 8,
          aaaaa: "10-1421",
          type: "good",
          msg: "Good",
          metricsName: "Disk Response Time",
          utilization: "2.5 ms",
          page: "/detailed-view-disk",
        },
        {
          id: 9,
          aaaaa: "10-1421",
          type: "info",
          metricsName: "Total Disk Operations",
          msg: "Info",
          utilization: "1,780 ops/sec",
          page: "/detailed-view-disk",
        },
        {
          id: 10,
          aaaaa: "10-2751",
          type: "info",
          metricsName: "Total Faulting Rate",
          msg: "Info",
          utilization: "1,210 faults/sec",
          page: "/detailed-view-memory",
        },
      ],
    },
    {
      lparName: "AEDEV AE DEV System",
      lparData: [
        {
          id: 1,
          aaaaa: "10-1421",
          type: "good",
          msg: "Good",
          utilization: "62.88%",
          metricsName: "CPU Utilization",
          page: "/detailed-view-cpu",
        },
        {
          id: 2,
          aaaaa: "10-2751",
          type: "info",
          msg: "Info",
          utilization: "1",
          metricsName: "Number of Cores",
          page: "/detailed-view-cpu",
        },
        {
          id: 4,
          aaaaa: "10-1421",
          type: "good",
          msg: "Good",
          utilization: "0.09 ms",
          metricsName: "5250 Response Time",
          page: "/detailed-view-other",
        },
        {
          id: 5,
          aaaaa: "10-1421",
          type: "info",
          msg: "Info",
          utilization: "1,129",
          metricsName: "Total Transactions",
          page: "/detailed-view-other",
        },
        {
          id: 11,
          aaaaa: "11-9432",
          type: "good",
          metricsName: "Ethernet Line Utilization",
          msg: "Good",
          utilization: "1.12%",
          page: "/detailed-view-other",
        },
        {
          id: 6,
          aaaaa: "10-2751",
          type: "good",
          msg: "Good",
          utilization: "71.34%",
          metricsName: "Disk Space Utilization",
          page: "/detailed-view-disk",
        },
        {
          id: 7,
          aaaaa: "11-9432",
          type: "good",
          msg: "Good",
          metricsName: "Disk Arm Utilization",
          utilization: "14%",
          page: "/detailed-view-disk",
        },
        {
          id: 8,
          aaaaa: "10-1421",
          type: "good",
          msg: "Good",
          metricsName: "Disk Response Time",
          utilization: "2.2 ms",
          page: "/detailed-view-disk",
        },
        {
          id: 9,
          aaaaa: "10-1421",
          type: "info",
          metricsName: "Total Disk Operations",
          msg: "Info",
          utilization: "854 ops/sec",
          page: "/detailed-view-disk",
        },
        {
          id: 10,
          aaaaa: "10-2751",
          type: "info",
          metricsName: "Total Faulting Rate",
          msg: "Info",
          utilization: "1,502 faults/sec",
          page: "/detailed-view-memory",
        },
      ],
    },
    {
      lparName: "AAAA - AMERICAS ATLANTA",
      lparData: [
        {
          id: 1,
          aaaaa: "10-1421",
          type: "critical",
          msg: "Critical",
          utilization: "92.44%",
          metricsName: "CPU Utilization",
          page: "/detailed-view-cpu",
        },
        {
          id: 2,
          aaaaa: "10-2751",
          type: "info",
          msg: "Info",
          utilization: "0.57",
          metricsName: "Number of Cores",
          page: "/detailed-view-cpu",
        },
        {
          id: 4,
          aaaaa: "10-1421",
          type: "good",
          msg: "Good",
          utilization: "0.66 ms",
          metricsName: "5250 Response Time",
          page: "/detailed-view-other",
        },
        {
          id: 5,
          aaaaa: "10-1421",
          type: "info",
          msg: "Info",
          utilization: "1,739",
          metricsName: "Total Transactions",
          page: "/detailed-view-other",
        },
        {
          id: 11,
          aaaaa: "11-9432",
          type: "info",
          metricsName: "Ethernet Line Utilization",
          msg: "Info",
          utilization: "0.06%",
          page: "/detailed-view-other",
        },
        {
          id: 6,
          aaaaa: "10-2751",
          type: "good",
          msg: "Good",
          utilization: "59.23%",
          metricsName: "Disk Space Utilization",
          page: "/detailed-view-disk",
        },
        {
          id: 7,
          aaaaa: "11-9432",
          type: "good",
          msg: "Good",
          metricsName: "Disk Arm Utilization",
          utilization: "5.82%",
          page: "/detailed-view-disk",
        },
        {
          id: 8,
          aaaaa: "10-1421",
          type: "warning",
          msg: "Warning",
          metricsName: "Disk Response Time",
          utilization: "3.01 ms",
          page: "/detailed-view-disk",
        },
        {
          id: 9,
          aaaaa: "10-1421",
          type: "info",
          metricsName: "Total Disk Operations",
          msg: "Info",
          utilization: "4265.00 ops/sec",
          page: "/detailed-view-disk",
        },
        {
          id: 10,
          aaaaa: "10-2751",
          type: "info",
          metricsName: "Total Faulting Rate",
          msg: "Info",
          utilization: "874.52 faults/sec",
          page: "/detailed-view-memory",
        },
      ],
    },
    {
      lparName: "DAANW - North West",
      lparData: [
        {
          id: 1,
          aaaaa: "10-1421",
          type: "good",
          msg: "Good",
          utilization: "57.04%",
          metricsName: "CPU Utilization",
          page: "/detailed-view-cpu",
        },
        {
          id: 2,
          aaaaa: "10-2751",
          type: "info",
          msg: "Info",
          utilization: "0.57",
          metricsName: "Number of Cores",
          page: "/detailed-view-cpu",
        },
        {
          id: 4,
          aaaaa: "10-1421",
          type: "good",
          msg: "Good",
          utilization: "0.24 ms",
          metricsName: "5250 Response Time",
          page: "/detailed-view-other",
        },
        {
          id: 5,
          aaaaa: "10-1421",
          type: "info",
          msg: "Info",
          utilization: "1,739",
          metricsName: "Total Transactions",
          page: "/detailed-view-other",
        },
        {
          id: 11,
          aaaaa: "11-9432",
          type: "info",
          metricsName: "Ethernet Line Utilization",
          msg: "Info",
          utilization: "0.06%",
          page: "/detailed-view-other",
        },
        {
          id: 6,
          aaaaa: "10-2751",
          type: "good",
          msg: "Good",
          utilization: "59.23%",
          metricsName: "Disk Space Utilization",
          page: "/detailed-view-disk",
        },
        {
          id: 7,
          aaaaa: "11-9432",
          type: "good",
          msg: "Good",
          metricsName: "Disk Arm Utilization",
          utilization: "5.82%",
          page: "/detailed-view-disk",
        },
        {
          id: 8,
          aaaaa: "10-1421",
          type: "warning",
          msg: "Warning",
          metricsName: "Disk Response Time",
          utilization: "3.56 ms",
          page: "/detailed-view-disk",
        },
        {
          id: 9,
          aaaaa: "10-1421",
          type: "info",
          metricsName: "Total Disk Operations",
          msg: "Info",
          utilization: "4,25.00 ops/sec",
          page: "/detailed-view-disk",
        },
        {
          id: 10,
          aaaaa: "10-2751",
          type: "info",
          metricsName: "Total Faulting Rate",
          msg: "Info",
          utilization: "8,794.52 faults/sec",
          page: "/detailed-view-memory",
        },
      ],
    },
  ];
  // const arr = [
  //   {
  //     id: 1,
  //     aaaaa: "10-1421",
  //     type: "critical",
  //     msg: "Critical",
  //     utilization: "91%",
  //     metricsName: "CPU Utilization",
  //     page: "/detailed-view-cpu",
  //   },
  //   {
  //     id: 2,
  //     aaaaa: "10-2751",
  //     type: "info",
  //     msg: "Info",
  //     utilization: "0.19",
  //     metricsName: "Number of Cores",
  //     page: "/detailed-view-cpu",
  //   },
  //   {
  //     id: 4,
  //     aaaaa: "10-1421",
  //     type: "critical",
  //     msg: "Critical",
  //     utilization: "8.4 ms",
  //     metricsName: "5250 Response Time",
  //     page: "/detailed-view-other",
  //   },
  //   {
  //     id: 5,
  //     aaaaa: "10-1421",
  //     type: "info",
  //     msg: "Info",
  //     utilization: "810",
  //     metricsName: "Total Transactions",
  //     page: "/detailed-view-other",
  //   },
  //   {
  //     id: 11,
  //     aaaaa: "11-9432",
  //     type: "warning",
  //     metricsName: "Ethernet Line Utilization",
  //     msg: "warning",
  //     utilization: "54%",
  //     page: "/detailed-view-other",
  //   },
  //   {
  //     id: 6,
  //     aaaaa: "10-2751",
  //     type: "good",
  //     msg: "good",
  //     utilization: "10%",
  //     metricsName: "Disk Space Utilization",
  //     page: "/detailed-view-disk",
  //   },
  //   {
  //     id: 7,
  //     aaaaa: "11-9432",
  //     type: "good",
  //     msg: "good",
  //     metricsName: "Disk Arm Utilization",
  //     utilization: "14%",
  //     page: "/detailed-view-disk",
  //   },
  //   {
  //     id: 8,
  //     aaaaa: "10-1421",
  //     type: "warning",
  //     msg: "warning",
  //     metricsName: "Disk Response Time",
  //     utilization: "34 ms",
  //     page: "/detailed-view-disk",
  //   },
  //   {
  //     id: 9,
  //     aaaaa: "10-1421",
  //     type: "info",
  //     metricsName: "Total Disk Operations",
  //     msg: "Info",
  //     utilization: "720 ops/sec",
  //     page: "/detailed-view-disk",
  //   },
  //   {
  //     id: 10,
  //     aaaaa: "10-2751",
  //     type: "info",
  //     metricsName: "Total Faulting Rate",
  //     msg: "Info",
  //     utilization: "300 faults/sec",
  //     page: "/detailed-view-memory",
  //   },
  // ];

  const frameAlertArr = [
    {
      lparName: "AETEST AE Test System",
      lparData: [
        {
          id: "787FF31",
          aaaaa: "10-1421",
          type: "critical",
          msg: "Critical",
          utilization: "93.21%",
          metricsName: "CPU Utilization",
          serverName: "AETEST - AE Test System",
          page: "/detailed-view-cpu",
          date: "May 4, 2024    10:23 AM",
        },
        {
          id: "787FF31",
          aaaaa: "10-2751",
          type: "critical",
          msg: "Critical",
          utilization: "87.03%",
          metricsName: "Disk Space Utilization",
          serverName: "AETEST - AE Test System",
          page: "/detailed-view-disk",
          date: "May 4, 2024    10:23 AM",
        },
        {
          id: "787FF31",
          aaaaa: "11-9432",
          type: "warning",
          msg: "Warning",
          metricsName: "5250 Response Time",
          serverName: "AETEST - AE Test System",
          utilization: "9.01 ms",
          page: "/detailed-view-other",
          date: "May 4, 2024     10:23 AM",
        },
      ],
    },
    {
      lparName: "AEQA AE QA System",
      lparData: [
        {
          id: "787FF31",
          aaaaa: "10-1421",
          type: "good",
          msg: "good",
          utilization: "62.88%",
          metricsName: "CPU Utilization",
          serverName: "AEQA AE QA System",
          page: "/detailed-view-cpu",
          date: "May 4, 2024    12:16PM",
        },
        {
          id: "787FF31",
          aaaaa: "11-9432",
          type: "good",
          msg: "good",
          metricsName: "5250 Response Time",
          serverName: "AEQA AE QA System",
          utilization: "0.69 ms",
          page: "/detailed-view-other",
          date: "May 4, 2024     1:04PM",
        },
      ],
    },
    {
      lparName: "AEDEV AE DEV System",
      lparData: [
        {
          id: "787FF31",
          aaaaa: "10-1421",
          type: "good",
          msg: "good",
          utilization: "62.21%",
          metricsName: "CPU Utilization",
          serverName: "AEDEV AE DEV System",
          page: "/detailed-view-cpu",
          date: "May 4, 2024    10:23AM",
        },
        {
          id: "787FF31",
          aaaaa: "10-2751",
          type: "critical",
          msg: "Critical",
          utilization: "71.34%",
          metricsName: "Disk Space Utilization",
          serverName: "AEDEV AE DEV System",
          page: "/detailed-view-disk",
          date: "May 4, 2024    10:23AM",
        },
        {
          id: "787FF31",
          aaaaa: "11-9432",
          type: "warning",
          msg: "Warning",
          metricsName: "5250 Response Time",
          serverName: "AEDEV AE DEV System",
          utilization: "0.09 ms",
          page: "/detailed-view-other",
          date: "May 4, 2024     10:23AM",
        },
      ],
    },
  ];

  const systemAlertArr = [
    {
      lparName: "DAANW - North West",
      lparData: [
        {
          id: "2157B5W",
          aaaaa: "10-2751",
          type: "warning",
          msg: "warning",
          utilization: "3.56 ms",
          metricsName: "Disk Response Time",
          serverName: "DAANW - North West",
          page: "/detailed-view-disk",
          date: "May 3, 2024    9:02PM",
        },
      ],
    },
    {
      lparName: "AAAA - AMERICAS ATLANTA",
      lparData: [
        {
          id: "7885FE0",
          aaaaa: "10-2751",
          type: "warning",
          msg: "warning",
          utilization: "88.34%",
          metricsName: "CPU Utilization",
          serverName: "AAAA - AMERICAS ATLANTA",
          page: "/detailed-view-cpu",
          date: "May 4, 2024    9:02PM",
        },
        {
          id: "7885FE0",
          aaaaa: "10-2751",
          type: "critical",
          msg: "critical",
          utilization: "92.44%",
          metricsName: "CPU Utilization",
          serverName: "AAAA - AMERICAS ATLANTA",
          page: "/detailed-view-cpu",
          date: "May 4, 2024    11:58PM",
        },
      ],
    },
  ];

  useEffect(() => {
    let foundArr = null;
    let filteredBreadCrumbsBySystemType = null;
    let foundAlertArr = null;
    if (systemType === "Frame") {
      foundArr = arr2.filter((ele) => ele.lparName === lparName);
      filteredBreadCrumbsBySystemType = [
        ...breadCrumbsList,
        ...breadCrumbsList2,
      ];
      foundAlertArr = frameAlertArr.filter((ele) => ele.lparName === lparName);
    } else {
      foundArr = arr2.filter((ele) => ele.lparName === host);
      filteredBreadCrumbsBySystemType = [
        ...breadCrumbsList,
        breadCrumbsList2[1],
      ];
      foundAlertArr = systemAlertArr.filter((ele) => ele.lparName === host);
    }
    setFilteredBreadCrumbsList(filteredBreadCrumbsBySystemType);
    setArr(foundArr);
    setAlertSystemData(foundAlertArr);
  }, [host, serverId, systemType]);

  return (
    <div className="enterprise_wrapper">
      <SectionHeader
        title={"Metrics"}
        btnClickHandler={handlePrintDetails}
        breadCrumbsList={filteredBreadCrumbsList}
      />
      <div className="servers_wrapper-alerts">
        <div className="server_wrapper-alert" style={{ width: "55%" }}>
          <div className="metrics_card_wrapper">
            {arr[0]?.lparData?.map((item) => (
              <MetricsCardTest
                key={item.id}
                cardClickHandler={() =>
                  handleNavigation(
                    item.metricsName,
                    item.page,
                    item.utilization,
                    item.type,
                    item.msg
                  )
                }
                {...item}
                metricPage={true}
                coreMetricPage={true}
              />
            ))}
          </div>
        </div>
        <div
          className="server_wrapper-alert scroll-container"
          style={{ width: "36%" }}
        >
          <div className="server_parent server_parent_alert">
            {alertSystemData[0]?.lparData?.map((item, idx) => {
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
    </div>
  );
}

export default MetricsPageTest;
