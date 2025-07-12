import React, { Suspense, useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { FormGroup, Input, Label, Table, Toast } from "reactstrap";
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
import chartDataMemory from "../../assets/pie_data_memory.json";
import * as _ from "lodash";
import useQueryData from "../../hooks/useQueryDataHistorical";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader, GridLoader } from "react-spinners";
import {
  fetchAsyncMetricOtherData,
  getMetricsOtherData,
} from "../../store/slices/enterpriseServer/metricsSlice";
import {
  setChartViewMetrics,
  setChartViewTrends,
  setToggleGuidelines,
} from "../../store/slices/charts/alertChartsSlice";
import Response5250 from "../components/RealTimeGraphs/Charts/Response5250";
import TotalTransactions from "../components/RealTimeGraphs/Charts/TotalTransactions";
import EthernetLineUtil from "../components/RealTimeGraphs/Charts/EthernetLineUtil";
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
  const [activeInternalTabID, setInternalActiveTabID] = useState(1);
  const [filteredBreadCrumbsList, setFilteredBreadCrumbsList] = useState([]);
  const [activeTabID, setActiveTabID] = useState(1);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [activeChartView, setActiveChartView] = useState({
    isMetricsChart: true,
    isTrendsChart: false,
    isShowGuidelines: false,
  });
  const dispatch = useDispatch();
  const toast = React.useRef(null);
  const qd = useQueryData();
  const otherData = useSelector(getMetricsOtherData);
  const realTimeQuery = useQueryDataRealTimeMonitor();

  useEffect(() => {
    // if(!uuid?.loading && uuid.data.uniqueid){
    dispatch(fetchAsyncMetricOtherData(realTimeQuery));
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

  const breadCrumbsList = [
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

  let chartData = [
    {
      jobname: "Greater than 1 sec guideline 10.0%",
      jobtype: "faults",
      total: "0.71",
    },
    {
      jobname: "Less than 1 sec guideline 90.0%",
      jobtype: "faults",
      total: "6.67",
    },
  ];

  const optionsMemory = {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      fontSize: 15,
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y} %",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: chartData.map(({ total, jobname }) => ({
          y: +total,
          label: jobname,
        })),
      },
    ],
  };

  const optionsMemory2 = {
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
        dataPoints: chartDataMemory.map(({ total, jobname }) => ({
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
    const foundMetric = otherData?.data?.data?.find(
      (ele) => ele.dtype === metric
    );
    return foundMetric?.dtypedesc;
  };

  const header = renderHeader();

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

  return (
    <>
      <div className="report_details_wrapper">
        <SectionHeader
          title={`Details -  ${findMetricName(viewType)}`}
          btnClickHandler={handlePrintDetails}
          breadCrumbsList={filteredBreadCrumbsList}
        />
        {otherData.loading && (
          <div>
            <GridLoader color="#366bd6" />
          </div>
        )}
        {!otherData.loading && (
          <div className="table_wrapper">
            <Table bordered>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Status</th>
                  <th>Findings</th>
                </tr>
              </thead>
              <tbody>
                {otherData?.data?.data?.map((item) => {
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
              </tbody>
            </Table>
          </div>
        )}
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
      {viewType === "response_time_5250" && (
        <div className="chart_view_wrapper">
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <Response5250 activeChartView={activeChartView} alertPage={true} />
          </Suspense>
        </div>
      )}
      {viewType === "total_transactions" && (
        <div className="chart_view_wrapper">
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <TotalTransactions
              activeChartView={activeChartView}
              alertPage={true}
            />
          </Suspense>
        </div>
      )}
      {viewType === "ethernet_line_utilization" && (
        <div className="chart_view_wrapper">
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <EthernetLineUtil
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
