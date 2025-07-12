import React, { Suspense, useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { FormGroup, Input, Label, Table, Toast } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import {
  checkPeakSystemStatus,
  checkRealTimeSystemStatus,
  handlePrintDetails,
  metricCalculation,
} from "../../helpers/commonHelper";
import SectionHeader from "../components/SectionHeader";
import chartData from "../../assets/pie_data_cpu.json";
import * as _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMetricCPUData,
  getMetricsCPUData,
} from "../../store/slices/enterpriseServer/metricsSlice";
import useQueryData from "../../hooks/useQueryDataHistorical";
import { BeatLoader, GridLoader } from "react-spinners";
import {
  setChartViewMetrics,
  setChartViewTrends,
  setToggleGuidelines,
} from "../../store/slices/charts/alertChartsSlice";
import CPUUtilization from "../components/RealTimeGraphs/Charts/CPUUtilization";
import NumCores from "../components/RealTimeGraphs/Charts/NumCores";
import TopJobs from "../components/HistoricalData/TopJobs/TopJobs";
import useQueryDataRealTimeMonitor from "../../hooks/useQueryDataRealTimeMonitor";

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
  const realTimeQuery = useQueryDataRealTimeMonitor();
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
  const cpuData = useSelector(getMetricsCPUData);

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

  useEffect(() => {
    // if(!uuid?.loading && uuid.data.uniqueid){
    dispatch(fetchAsyncMetricCPUData(realTimeQuery));
    // }
  }, [dispatch]);

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

  const options = {
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
        dataPoints: chartData.map(({ total, jobname }) => ({
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

  const findMetricName = (metric) => {
    const foundMetric = cpuData?.data?.data?.find(
      (ele) => ele.dtype === metric
    );
    return foundMetric?.dtypedesc;
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
    <div>
      <div className="report_details_wrapper">
        <SectionHeader
          title={`Details -  ${findMetricName(viewType)}`}
          btnClickHandler={handlePrintDetails}
          breadCrumbsList={filteredBreadCrumbsList}
        />
        {cpuData.loading && (
          <div>
            <GridLoader color="#366bd6" />
          </div>
        )}
        {!cpuData.loading && (
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
                {cpuData?.data?.data?.map((item) => {
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
      {viewType === "cpu_utilization" && (
        <div className="chart_view_wrapper">
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <CPUUtilization
              activeChartView={activeChartView}
              alertPage={true}
            />
          </Suspense>
        </div>
      )}
      {viewType === "no_of_cores" && (
        <Suspense fallback={<BeatLoader color="#366bd6" />}>
          <div className="chart_view_wrapper">
            <NumCores activeChartView={activeChartView} alertPage={true} />
          </div>
        </Suspense>
      )}
      <TopJobs alertPage={true} />
      <Toast ref={toast} position="top-right"></Toast>
    </div>
  );
}

export default ReportDetails;
