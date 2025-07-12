import React, { Suspense, useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { FormGroup, Input, Label, Table, Toast } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import {
  checkRealTimeSystemStatus,
  handlePrintDetails,
  metricCalculation,
} from "../../helpers/commonHelper";
import CanvasJSReact from "../../scripts/canvasjs.react";
import { ReportDetailsTableJSON, TopJobCPU } from "../../utils/constant";
import SectionHeader from "../components/SectionHeader";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import TopJobsData from "../../assets/top_jobs_data.json";
import chartDataSyncIO from "../../assets/pie_data_disk_sync_ios.json";
import chartDataAsyncIO from "../../assets/pie_data_disk_async_ios.json";
import chartDataTotalIO from "../../assets/chart_data_total_ios.json";
import * as _ from "lodash";
import {
  fetchAsyncMetricDiskData,
  getMetricsDiskData,
} from "../../store/slices/enterpriseServer/metricsSlice";
import useQueryData from "../../hooks/useQueryDataHistorical";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader, GridLoader } from "react-spinners";
import {
  setChartViewMetrics,
  setChartViewTrends,
  setToggleGuidelines,
} from "../../store/slices/charts/alertChartsSlice";
import DiskSpaceUtilization from "../components/RealTimeGraphs/Charts/DiskSpaceUtilization";
import DiskArmUtilization from "../components/RealTimeGraphs/Charts/DiskArmUtilization";
import DiskResponseTime from "../components/RealTimeGraphs/Charts/DiskResponseTime";
import DiskOperations from "../components/RealTimeGraphs/Charts/DiskOperations";
import TopJobs from "../components/HistoricalData/TopJobs/TopJobs";
import useQueryDataRealTimeMonitor from "../../hooks/useQueryDataRealTimeMonitor";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ReportDetails() {
  let [searchParams] = useSearchParams();
  const serverId = searchParams.get("sysId");
  const host = searchParams.get("host");
  const viewType = searchParams.get("viewType");
  const systemType = searchParams.get("systemType");
  const lparName = searchParams.get("lparName");
  const serialNo = searchParams.get("serialNo");
  const systemName = searchParams.get("systemName");
  const entityName = searchParams.get("entityName");
  const [activeInternalTabID, setInternalActiveTabID] = useState(2);
  const [filteredBreadCrumbsList, setFilteredBreadCrumbsList] = useState([]);
  const [activeTabID, setActiveTabID] = useState(1);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [activeChartView, setActiveChartView] = useState({
    isMetricsChart: true,
    isTrendsChart: false,
    isShowGuidelines: false,
  });
  const qd = useQueryData();
  const dispatch = useDispatch();
  const diskData = useSelector(getMetricsDiskData);
  const toast = React.useRef(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const realTimeQuery = useQueryDataRealTimeMonitor();

  useEffect(() => {
    // if(!uuid?.loading && uuid.data.uniqueid){
    dispatch(fetchAsyncMetricDiskData(realTimeQuery));
    // }
  }, [dispatch]);

  const params = {
    sysId: serverId,
    serialNo,
    systemType,
    host,
    lparName,
    systemName,
  };
  const params2 = {
    sysId: serverId,
    serialNo,
    systemType,
    host,
    lparName,
    systemName,
    entityName,
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
      ...(systemType === "Frame"
        ? {
            url: `/server?${createSearchParams(params)}`,
          }
        : {
            url: `/metrics?${createSearchParams(params2)}`,
          }),
    },
  ];

  const breadCrumbsList2 = [
    {
      id: 3,
      name: serialNo,
      url: ``,
    },
    {
      ...(systemType === "Frame"
        ? {
            id: 4,
            name: lparName,
            url: `/metrics?${createSearchParams(params2)}`,
          }
        : {
            id: 4,
            name: entityName,
            url: ``,
          }),
    },
    {
      id: 5,
      name: viewType,
      url: ``,
    },
  ];

  useEffect(() => {
    let filteredBreadCrumbsBySystemType = null;
    if (systemType === "Frame") {
      filteredBreadCrumbsBySystemType = [
        ...breadCrumbsList,
        ...breadCrumbsList2,
      ];
    } else {
      filteredBreadCrumbsBySystemType = [
        ...breadCrumbsList,
        ...breadCrumbsList2,
      ];
    }
    setFilteredBreadCrumbsList(filteredBreadCrumbsBySystemType);
  }, [host, serverId, systemType]);

  const ViewTypeList = {
    "CPU-ms": "CPU ms",
    no_of_cores: "No. of Cores",
    faulting_rate: "Faulting Rate (Faults/Sec)",
    cache_hit_perc: "Cache Hit Percentage",
    total_disk_ops: "Total Disk Operations",
    cpu_utilization: "CPU Utilization",
    read_write_ratio: "Read Write Ration",
    executing_summary: "Executive Summary",
    disk_response_time: "Disk Response Time",
    pool_faulting_rate: "Pool Faulting Rate",
    response_time_5250: "5250 Response Time",
    total_transactions: "Total Transactions",
    disk_arm_utilization: "Disk Arm Utilization",
    memory_size_faulting: "Memory vs Size Faulting",
    top_jobs_utilisation: "Top Jobs Utilization",
    machine_pool_faulting: "Machine Pool Faulting",
    system_specifications: "System Specifications",
    disk_space_utilization: "Disk Space Utilization",
    top_pool_faulting_rate: "Top Pool Faulting Rate",
    ethernet_line_utilization: "Ethernet Line Utilization",
    "CPW-Utilization": "CPW Utilization",
  };

  const optionsSyncIO = {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Percentage Breakdown ",
      fontSize: 15,
    },
    legend: {
      verticalAlign: "center",
      horizontalAlign: "left",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y} %",
        showInLegend: "true",
        legendText: "{label} - {y}%",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: chartDataSyncIO.map(({ total, jobname }) => ({
          y: +total,
          label: jobname,
        })),
      },
    ],
  };
  const optionsAsyncIO = {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Percentage Breakdown ",
      fontSize: 15,
    },
    legend: {
      verticalAlign: "center",
      horizontalAlign: "left",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y} %",
        showInLegend: "true",
        legendText: "{label} - {y}%",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: chartDataAsyncIO.map(({ total, jobname }) => ({
          y: +total,
          label: jobname,
        })),
      },
    ],
  };
  const optionsTotalIO = {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Percentage Breakdown ",
      fontSize: 15,
    },
    legend: {
      verticalAlign: "center",
      horizontalAlign: "left",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y} %",
        showInLegend: "true",
        legendText: "{label} - {y}%",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: chartDataTotalIO.map(({ total, jobname }) => ({
          y: +total,
          label: jobname,
        })),
      },
    ],
  };
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const summaryData = _.filter(ReportDetailsTableJSON, function (o) {
    return o.metric_type == viewType;
  });

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <InputText
          style={{ maxWidth: "15rem" }}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
          className="form-control"
        />
      </div>
    );
  };
  const findMetricName = (metric) => {
    const foundMetric = diskData?.data?.data?.find(
      (ele) => ele.dtype === metric
    );
    return foundMetric?.dtypedesc;
  };

  const showToast = (type, summary, details) => {
    toast.current.show({
      severity: type || "error",
      summary: summary || "",
      detail: details || "",
      life: 3000,
    });
  };
  const handleMetricChartView = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    if (
      ((activeChartView.isMetricsChart === false && name === "isTrendsChart") ||
        (activeChartView.isTrendsChart === false &&
          name === "isMetricsChart")) &&
      checked === false
    ) {
      showToast("", "One chart view must be selected!");
      return;
    }
    setActiveChartView({ ...activeChartView, [name]: checked });
  };

  useEffect(() => {
    dispatch(setChartViewMetrics(activeChartView.isMetricsChart));
    dispatch(setChartViewTrends(activeChartView.isTrendsChart));
    dispatch(setToggleGuidelines(activeChartView.isShowGuidelines));
  }, [
    activeChartView.isMetricsChart,
    activeChartView.isShowGuidelines,
    activeChartView.isTrendsChart,
    dispatch,
  ]);

  const header = renderHeader();
  return (
    <>
      <div className="report_details_wrapper">
        <SectionHeader
          title={`Details -  ${findMetricName(viewType)}`}
          btnClickHandler={handlePrintDetails}
          breadCrumbsList={filteredBreadCrumbsList}
        />
        <div className="table_wrapper">
          {diskData.loading && (
            <div>
              <GridLoader color="#366bd6" />
            </div>
          )}
          {!diskData.loading && (
            <Table bordered>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Status</th>
                  <th>Findings</th>
                </tr>
              </thead>
              <tbody>
                {diskData?.data?.data?.map((item) => {
                  if (item.dtype === viewType) {
                    return (
                      <tr key={item.id}>
                        <td>{item.dtypedesc}</td>
                        <td>
                          <span className={checkRealTimeSystemStatus(item)}>
                            {checkRealTimeSystemStatus(item)}
                          </span>
                        </td>
                        <td className="findings_col">
                          <div className={checkRealTimeSystemStatus(item)}>
                            {metricCalculation(item)}
                          </div>
                        </td>
                      </tr>
                    );
                  }
                  // eslint-disable-next-line array-callback-return
                  // return;
                })}
                {/* {summaryData.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{ViewTypeList[viewType]}</td>
                  <td>
                    <span className={data.metric_status}>
                      {data.metric_health}
                    </span>
                  </td>
                  <td className="findings_col">
                    {data.findings.map((d) => (
                      <div key={d.id} className={d.type}>
                        {d.msg}
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })} */}
              </tbody>
            </Table>
          )}
        </div>
      </div>
      <div className="chart_type_view">
        <FormGroup check>
          <Input
            type="checkbox"
            name={"isMetricsChart"}
            id={"isMetricsChart"}
            checked={activeChartView.isMetricsChart}
            onChange={(e) => handleMetricChartView(e)}
          />
          <Label check for="isMetricsChart">
            Core Metric Charts
          </Label>
        </FormGroup>
        <FormGroup check>
          <Input
            type="checkbox"
            name={"isTrendsChart"}
            id={"isTrendsChart"}
            checked={activeChartView.isTrendsChart}
            onChange={(e) => handleMetricChartView(e)}
          />
          <Label check for="isTrendsChart">
            Core Metric Charts with Trends
          </Label>
        </FormGroup>
        <FormGroup check>
          <Input
            type="checkbox"
            name={"isShowGuidelines"}
            id={"isShowGuidelines"}
            checked={activeChartView.isShowGuidelines}
            onChange={(e) => handleMetricChartView(e)}
          />
          <Label check for="isShowGuidelines">
            Show Guidelines
          </Label>
        </FormGroup>
      </div>
      {viewType === "disk_space_utilization" && (
        <div className="chart_view_wrapper">
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskSpaceUtilization
              activeChartView={activeChartView}
              alertPage={true}
            />
          </Suspense>
        </div>
      )}
      {viewType === "disk_arm_utilization" && (
        <div className="chart_view_wrapper">
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskArmUtilization
              activeChartView={activeChartView}
              alertPage={true}
            />
          </Suspense>
        </div>
      )}
      {viewType === "disk_response_time" && (
        <div className="chart_view_wrapper">
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskResponseTime
              activeChartView={activeChartView}
              alertPage={true}
            />
          </Suspense>
        </div>
      )}
      {viewType === "total_disk_ops" && (
        <div className="chart_view_wrapper">
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskOperations
              activeChartView={activeChartView}
              alertPage={true}
            />
          </Suspense>
        </div>
      )}
      <TopJobs alertPage={true} />
      <Toast ref={toast} position="top-right"></Toast>
    </>
  );
}

export default ReportDetails;
