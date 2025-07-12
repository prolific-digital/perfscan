import React, { useState, Suspense, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import { Toast } from "primereact/toast";
import { fetchAsyncAppMetrics } from "../../store/slices/settings";
import { getParametersFromLocalStorage } from "../../helpers/commonHelper";
import * as _l from "lodash";
import ReportHeaderDetails from "../components/ReportHeaderDetails";
import TopJobsPrint from "../components/HistoricalDataPrint/TopJobsPrint";
import ExecutiveSummary from "../components/HistoricalData/ExecutiveSummary";
import CPUUtilizationPrint from "../components/HistoricalData/Charts/CPUUtilizationPrint";
import CPUMsPrint from "../components/HistoricalData/Charts/CPUMsPrint";
import NumCoresPrint from "../components/HistoricalData/Charts/NumCoresPrint";
import DiskSpaceUtilizationPrint from "../components/HistoricalData/Charts/DiskSpaceUtilizationPrint";
import DiskArmUtilizationPrint from "../components/HistoricalData/Charts/DiskArmUtilizationPrint";
import DiskResponseTimePrint from "../components/HistoricalData/Charts/DiskResponseTimePrint";
import DiskOperationsPrint from "../components/HistoricalData/Charts/DiskOperationsPrint";
import DiskReadWriteRatioPrint from "../components/HistoricalData/Charts/DiskReadWriteRatioPrint";
import CacheHitPercentPrint from "../components/HistoricalData/Charts/CacheHitPercentPrint";
import MachinePoolFaultingPrint from "../components/HistoricalData/Charts/MachinePoolFaultingPrint";
import TopPoolFaultPrint from "../components/HistoricalData/Charts/TopPoolFaultPrint";
import TotalFaultingChartPrint from "../components/HistoricalData/Charts/TotalFaultingChartPrint";
import MemVsFaultingPrint from "../components/HistoricalData/Charts/MemVsFaultingPrint";
import SpecificPoolFaultPrint from "../components/HistoricalData/Charts/SpecificPoolFaultPrint";
import Response5250Print from "../components/HistoricalData/Charts/Response5250Print";
import TotalTransactionsPrint from "../components/HistoricalData/Charts/TotalTransactionsPrint";
import EthernetLineUtilPrint from "../components/HistoricalData/Charts/EthernetLineUtilPrint";
import SysSpecs from "../components/SystemSpecificReport";
import PrintPageHeader from "./PrintPageHeader";

const HistoricalDataPrint = ({ printButton }) => {
  const filters = useSelector((state) => state.filters);
  const dFilter = filters.historical_date_filter; //dates
  const sFilter = filters.system_filter; //system

  const metrics_data_app = useSelector(
    (state) => state.settings.metrics_data_app
  );
  const [metrics, setMetrics] = useState();
  const dispatch = useDispatch();
  const userID = getParametersFromLocalStorage("userID");

  let isCpu = true;
  let isDisk = true;
  let isMemory = true;
  let isOther = true;

  const [activeChartView, setActiveChartView] = useState({
    isMetricsChart: true,
    isTrendsChart: true,
  });

  const toast = React.useRef(null);

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
    dispatch(
      fetchAsyncAppMetrics({
        systemID: filters.system_filter.id,
        userID: userID,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setMetrics(metrics_data_app.data.data);
  }, [metrics_data_app.data.length]);

  if (metrics) {
    isCpu =
      metrics.cpu_utilization ||
      metrics.no_of_cores ||
      metrics.cpu_ms ||
      metrics.cpw;
    isDisk =
      metrics.read_write_ratio ||
      metrics.cache_hit_perc ||
      metrics.total_disk_ops ||
      metrics.disk_response_time ||
      metrics.disk_arm_utilization ||
      metrics.disk_space_utilization;
    isMemory =
      metrics.faulting_rate ||
      metrics.pool_faulting_rate ||
      metrics.machine_pool_faulting ||
      metrics.top_pool_faulting_rate;
    isOther =
      metrics.ethernet_line_utilization ||
      metrics.response_time_5250 ||
      metrics.total_transactions;
  }

  const historicalDate = JSON.parse(localStorage.getItem("HistoricalFilter"));

  return (
    <>
      <div style={{ pageBreakAfter: "always" }}>
        <PrintPageHeader pageTitle={'Historical Data'} sDate={historicalDate.sdate} eDate={historicalDate.edate} mainmenu={false}/>
      </div>
      {metrics && metrics.executing_summary && (
        <Suspense fallback={<div>Loading...</div>}>
          <ExecutiveSummary print={true}/>
        </Suspense>
      )}

      {(isCpu || isDisk || isMemory || isOther) && (
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
        </div>
      )}

      <div className="">

        {metrics && metrics.cpu_utilization && (
          <Suspense fallback={<div>Loading...</div>}>
            <div style={{ pageBreakAfter: "always" }}>
              <CPUUtilizationPrint activeChartView={activeChartView} />
            </div>
          </Suspense>
        )}

        {metrics && metrics.cpu_ms && (
          <div style={{ pageBreakAfter: "always" }}>
            <CPUMsPrint activeChartView={activeChartView} />
          </div>
        )}

        {metrics && metrics.no_of_cores && (
          <div style={{ pageBreakAfter: "always" }}>
            <NumCoresPrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.disk_space_utilization && (
          <div style={{ pageBreakAfter: "always" }}>
            <DiskSpaceUtilizationPrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.disk_arm_utilization && (
          <div style={{ pageBreakAfter: "always" }}>
            <DiskArmUtilizationPrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.disk_response_time && (
          <div style={{ pageBreakAfter: "always" }}>
            <DiskResponseTimePrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.total_disk_ops && (
          <div style={{ pageBreakAfter: "always" }}>
            <DiskOperationsPrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.read_write_ratio && (
          <div style={{ pageBreakAfter: "always" }}>
            <DiskReadWriteRatioPrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.cache_hit_perc && (
          <div style={{ pageBreakAfter: "always" }}>
            <CacheHitPercentPrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.machine_pool_faulting && (
          <div style={{ pageBreakAfter: "always" }}>
            <MachinePoolFaultingPrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.faulting_rate && (
          <div style={{ pageBreakAfter: "always" }}>
            <TotalFaultingChartPrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.top_pool_faulting_rate && (
          <div style={{ pageBreakAfter: "always" }}>
            <TopPoolFaultPrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.memory_size_faulting && (
          <div style={{ pageBreakAfter: "always" }}>
            <MemVsFaultingPrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.memory_size_faulting && (
          <div style={{ pageBreakAfter: "always" }}>
            <SpecificPoolFaultPrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.response_time_5250 && (
          <div style={{ pageBreakAfter: "always" }}>
            <Response5250Print activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.total_transactions && (
          <div style={{ pageBreakAfter: "always" }}>
            <TotalTransactionsPrint activeChartView={activeChartView} />
          </div>
        )}
        {metrics && metrics.ethernet_line_utilization && (
          <div style={{ pageBreakAfter: "always" }}>
            <EthernetLineUtilPrint activeChartView={activeChartView} />
          </div>
        )}

        {metrics && metrics.top_jobs_utilisation && (
          <Suspense fallback={<div>Loading...</div>}>
            <ReportHeaderDetails
              reportTitle={"Top Jobs Reporting"}
              sdate={dFilter.sdate}
              stime={dFilter.stime}
              edate={dFilter.edate}
              etime={dFilter.etime}
              server={sFilter.entity_name + " - " + sFilter.entity_description  + ` - ${sFilter.entity_data.frame.serial_number}`}
            />
            <TopJobsPrint printButton={printButton} />
          </Suspense>
        )}
        {metrics && metrics.system_specifications && (
          <Suspense fallback={<div>Loading...</div>}>
            <SysSpecs data={sFilter.entity_data} />
          </Suspense>
        )}
      </div>
      <Toast ref={toast} position="top-right"></Toast>
    </>
  );
};

export default memo(HistoricalDataPrint);
