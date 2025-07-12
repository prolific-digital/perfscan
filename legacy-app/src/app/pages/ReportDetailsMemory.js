import React, { Suspense, useEffect, useRef, useState } from "react";
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
import SectionHeader from "../components/SectionHeader";
import chartDataMemory from "../../assets/pie_data_memory.json";
import * as _ from "lodash";
import {
  fetchAsyncMetricMemoryData,
  getMetricsMemoryData,
} from "../../store/slices/enterpriseServer/metricsSlice";
import useQueryData from "../../hooks/useQueryDataHistorical";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader, GridLoader } from "react-spinners";
import TotalFaultingChart from "../components/RealTimeGraphs/Charts/TotalFaultingChart";
import TopJobs from "../components/HistoricalData/TopJobs/TopJobs";
import {
  setChartViewMetrics,
  setChartViewTrends,
  setToggleGuidelines,
} from "../../store/slices/charts/alertChartsSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  checkSystemStatus,
  renderCommonPdMemory,
  renderStatus,
} from "../../helpers/summaryHelpers";
import tableDataMemeory from "../../assets/table_data_memory.json";
import {
  fetchAsyncRealTimeMemoryPoolData,
  getMemoryPoolData,
} from "../../store/slices/enterpriseServer/realtimemonitormemorychartslice";
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
  const memoryPoolData = useSelector(getMemoryPoolData);
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
  const toast = useRef(null);
  const qd = useQueryData();
  const memoryData = useSelector(getMetricsMemoryData);
  const realTimeQuery = useQueryDataRealTimeMonitor();

  useEffect(() => {
    // if(!uuid?.loading && uuid.data.uniqueid){
    dispatch(fetchAsyncMetricMemoryData(realTimeQuery));
    dispatch(
      fetchAsyncRealTimeMemoryPoolData({
        sdate: "2023-12-10",
        edate: "2023-12-15",
        userId: realTimeQuery.userId,
        sysid: serverId,
      })
    );
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
    const foundMetric = memoryData?.data?.data?.find(
      (ele) => ele.dtype === metric
    );
    return foundMetric?.dtypedesc;
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

  const showToast = (type, summary, details) => {
    toast.current.show({
      severity: type || "error",
      summary: summary || "",
      detail: details || "",
      life: 3000,
    });
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
        {memoryData.loading && (
          <div>
            <GridLoader color="#366bd6" />
          </div>
        )}
        {!memoryData.loading && (
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
                {memoryData?.data?.data?.map((item) => {
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
      {viewType === "faulting_rate" && (
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
      <div
        className="performance_wrapper table_wrapper"
        style={{ marginTop: "1.5rem", marginBottom: "2rem" }}
      >
        <div style={{ textAlign: "left" }}>
          <div>CURRENT MEMROY ANALYSIS</div>
          <div>PERIOD ANALYZED : {realTimeQuery.sdate}</div>
          <div style={{ marginBottom: "1.5rem" }}>TIME ANALYZED : {realTimeQuery.etime}</div>
        </div>
        <DataTable
          value={memoryPoolData?.data?.data}
          stripedRows
          showGridlines
          responsiveLayout="scroll"
        >
          <Column
            field="pool"
            header="Memory Pool"
            align="center"
            style={{ width: "264px" }}
          ></Column>
          <Column
            align="center"
            field={(data) => renderCommonPdMemory(data, data.memory_size)}
            header="Memory (GB)"
          ></Column>
          <Column
            align="center"
            field={(data) => renderCommonPdMemory(data, data.mem_perc)}
            header="% of Memory in Pool"
          ></Column>
          <Column
            align="center"
            field={(data) => renderCommonPdMemory(data, data.faulting_rate)}
            header="Average Faulting Rate (Faults / Sec)"
          ></Column>
          <Column
            align="center"
            field={(data) => <span className="Info">{renderStatus(data)}</span>}
            header="Status"
          ></Column>
        </DataTable>
      </div>
      <Toast ref={toast} position="top-right"></Toast>
    </>
  );
}

export default ReportDetails;
