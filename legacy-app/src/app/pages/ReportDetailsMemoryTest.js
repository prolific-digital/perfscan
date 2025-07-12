import React, { Suspense, useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { Table, Toast } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { handlePrintDetails } from "../../helpers/commonHelper";
import {
  renderCommonPdMemory,
  getPdMemoryStatus,
} from "../../helpers/summaryHelpers";
import CanvasJSReact from "../../scripts/canvasjs.react";
import { ReportDetailsTableJSON, TopJobCPU } from "../../utils/constantdemo";
import SectionHeader from "../components/SectionHeader";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import TopJobsData from "../../assets/top_jobs_data.json";
import chartDataMemory from "../../assets/pie_data_memory.json";
import tableDataMemeory from "../../assets/table_data_memory.json";
import * as _ from "lodash";
import { BeatLoader } from "react-spinners";
import TotalFaultingChart from "../components/RealTimeGraphs/Charts/TotalFaultingChart";
import TopJobs from "../components/HistoricalData/TopJobs/TopJobs";
import { useDispatch } from "react-redux";
import {
  setChartViewMetrics,
  setChartViewTrends,
  setToggleGuidelines,
} from "../../store/slices/charts/alertChartsSlice";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ReportDetailsMemoryTest() {
  let [searchParams] = useSearchParams();
  const serverId = searchParams.get("id");
  const host = searchParams.get("host");
  const viewType = searchParams.get("viewType");
  const systemType = searchParams.get("systemType");
  const lparName = searchParams.get("lparName");
  const utilization = searchParams.get("utilization");
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const [activeInternalTabID, setInternalActiveTabID] = useState(5);
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
  const [filteredBreadCrumbsList, setFilteredBreadCrumbsList] = useState([]);

  const params = { id: serverId, host, systemType: systemType };
  const params2 = {
    id: serverId,
    host,
    lparName,
    systemType,
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
      ...(systemType === "Frame" ? {
        url: `/server?${createSearchParams(params)}`,
      } : {
        url: `/metrics?${createSearchParams(params)}`,
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
      ...(systemType === "Frame" && {
        id: 4,
        name: lparName,
        url: `/metrics?${createSearchParams(params2)}`,
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
        breadCrumbsList2[2],
      ];
    }
    setFilteredBreadCrumbsList(filteredBreadCrumbsBySystemType);
  }, [host, serverId, systemType]);


  const ViewTypeList = {
    "CPU-ms": "CPU ms",
    "Number-of-Cores": "No. of Cores",
    "Total Faulting Rate": "Faulting Rate (Faults/Sec)",
    cache_hit_perc: "Cache Hit Percentage",
    "Total-Disk-Operations": "Total Disk Operations",
    "CPU-Utilization": "CPU Utilization",
    read_write_ratio: "Read Write Ration",
    executing_summary: "Executive Summary",
    "Disk-Response-Time": "Disk Response Time",
    pool_faulting_rate: "Pool Faulting Rate",
    "5250-Response-Time": "5250 Response Time",
    "Total-Transactions": "Total Transactions",
    "Disk-Arm-Utilization": "Disk Arm Utilization",
    memory_size_faulting: "Memory vs Size Faulting",
    top_jobs_utilisation: "Top Jobs Utilization",
    machine_pool_faulting: "Machine Pool Faulting",
    system_specifications: "System Specifications",
    "Disk-Space-Utilization": "Disk Space Utilization",
    top_pool_faulting_rate: "Top Pool Faulting Rate",
    "Ethernet-Line-Utilization": "Ethernet Line Utilization",
    "CPW-Utilization": "CPW Utilization",
  };

  const optionsMemory = {
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
          title={`Details -  ${ViewTypeList[viewType]}`}
          btnClickHandler={handlePrintDetails}
          breadCrumbsList={filteredBreadCrumbsList}
        />
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
              {summaryData.map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{ViewTypeList[viewType]}</td>
                    <td>
                      <span className={type}>{status}</span>
                    </td>
                    <td className="findings_col">
                      {data.findings.map((d) => (
                        <div key={d.id} className={d.type}>
                          {d.msg}
                          {utilization}
                        </div>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      {viewType === "Total Faulting Rate" && (
        <div className="chart_view_wrapper">
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <TotalFaultingChart
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

export default ReportDetailsMemoryTest;
