import React, { useState, Suspense, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { FormGroup, Input, Label } from "reactstrap";
import { Toast } from "primereact/toast";
import * as _l from "lodash";

// Local Imports to be put separately.
import { fetchAsyncAppMetrics } from "../../store/slices/settings";
import { getParametersFromLocalStorage } from "../../helpers/commonHelper";
import ReportHeaderDetails from "../components/ReportHeaderDetails";
import {
  getChartList,
  setChartViewMetrics,
  setChartViewTrends,
  setToggleGuidelines,
} from "../../store/slices/charts/chartsSlice";
import CPW from "../components/HistoricalData/Charts/CPW";

const SpecificPoolFault = React.lazy(() =>
  import("../components/HistoricalData/Charts/SpecificPoolFault")
);
const ExecutiveSummary = React.lazy(() =>
  import("../components/HistoricalData/ExecutiveSummary")
);
const CPUUtilization = React.lazy(() =>
  import("../components/HistoricalData/Charts/CPUUtilization")
);
const CPUMs = React.lazy(() =>
  import("../components/HistoricalData/Charts/CPUMs")
);
const NumCores = React.lazy(() =>
  import("../components/HistoricalData/Charts/NumCores")
);
const DiskSpaceUtilization = React.lazy(() =>
  import("../components/HistoricalData/Charts/DiskSpaceUtilization")
);
const DiskArmUtilization = React.lazy(() =>
  import("../components/HistoricalData/Charts/DiskArmUtilization")
);
const DiskResponseTime = React.lazy(() =>
  import("../components/HistoricalData/Charts/DiskResponseTime")
);
const DiskOperations = React.lazy(() =>
  import("../components/HistoricalData/Charts/DiskOperations")
);
const DiskReadWriteRatio = React.lazy(() =>
  import("../components/HistoricalData/Charts/DiskReadWriteRatio")
);
const MachinePoolFaulting = React.lazy(() =>
  import("../components/HistoricalData/Charts/MachinePoolFaulting")
);
const CacheHitPercent = React.lazy(() =>
  import("../components/HistoricalData/Charts/CacheHitPercent")
);
const TotalFaultingChart = React.lazy(() =>
  import("../components/HistoricalData/Charts/TotalFaultingChart")
);
const TopPoolFault = React.lazy(() =>
  import("../components/HistoricalData/Charts/TopPoolFault")
);
const MemVsFaulting = React.lazy(() =>
  import("../components/HistoricalData/Charts/MemVsFaulting")
);
const Response5250 = React.lazy(() =>
  import("../components/HistoricalData/Charts/Response5250")
);
const TotalTransactions = React.lazy(() =>
  import("../components/HistoricalData/Charts/TotalTransactions")
);
const EthernetLineUtil = React.lazy(() =>
  import("../components/HistoricalData/Charts/EthernetLineUtil")
);
const TopJobs = React.lazy(() =>
  import("../components/HistoricalData/TopJobs/TopJobs")
);
const SysSpecs = React.lazy(() => import("../components/SystemSpecificReport"));

const HistoricalData = () => {
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
    isTrendsChart: false,
    isShowGuidelines: false,
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
    dispatch(setChartViewMetrics(activeChartView.isMetricsChart));
    dispatch(setChartViewTrends(activeChartView.isTrendsChart));
    dispatch(setToggleGuidelines(activeChartView.isShowGuidelines));
  }, [
    activeChartView.isMetricsChart,
    activeChartView.isShowGuidelines,
    activeChartView.isTrendsChart,
    dispatch,
  ]);

  useEffect(() => {
    setMetrics(metrics_data_app.data.data);
  }, [metrics_data_app.data.length]);

  if (metrics) {
    isCpu = metrics.cpu_utilization || metrics.no_of_cores || metrics.cpu_ms;
    isDisk =
      metrics.read_write_ratio ||
      metrics.cache_hit_perc ||
      metrics.total_disk_ops ||
      metrics.disk_response_time ||
      metrics.disk_arm_utilization ||
      metrics.disk_space_utilization;
    isMemory =
      metrics.machine_pool_faulting ||
      metrics.faulting_rate ||
      metrics.top_pool_faulting_rate ||
      metrics.memory_size_faulting ||
      metrics.pool_faulting_rate;
    isOther =
      metrics.ethernet_line_utilization ||
      metrics.response_time_5250 ||
      metrics.total_transactions;
  }

  return (
    <>
      {metrics && metrics.executing_summary && (
        <Suspense fallback={<BeatLoader color="#366bd6" />}>
          <ExecutiveSummary />
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
      )}
      <div className="chart_view_wrapper">
        {metrics && metrics.cpu_utilization && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <CPUUtilization activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.cpu_ms && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <CPUMs activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.no_of_cores && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <NumCores activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.cpw && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <CPW activeChartView={activeChartView} />
          </Suspense>
        )}

        {metrics && metrics.disk_space_utilization && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskSpaceUtilization activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.disk_arm_utilization && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskArmUtilization activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.disk_response_time && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskResponseTime activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.total_disk_ops && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskOperations activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.read_write_ratio && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskReadWriteRatio activeChartView={activeChartView} />
          </Suspense>
        )}

        {/*metrics && metrics.cache_hit_perc && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <CacheHitPercent activeChartView={activeChartView} />
          </Suspense>
        )*/}
        {metrics && metrics.machine_pool_faulting && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <MachinePoolFaulting activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.faulting_rate && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <TotalFaultingChart activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.top_pool_faulting_rate && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <TopPoolFault activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.memory_size_faulting && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <MemVsFaulting activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.pool_faulting_rate && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <SpecificPoolFault activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.response_time_5250 && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <Response5250 activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.total_transactions && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <TotalTransactions activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.ethernet_line_utilization && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <EthernetLineUtil activeChartView={activeChartView} />
          </Suspense>
        )}
        {metrics && metrics.top_jobs_utilisation && (
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <ReportHeaderDetails
              reportTitle={"Top Jobs Reporting"}
              sdate={dFilter.sdate}
              stime={dFilter.stime}
              edate={dFilter.edate}
              etime={dFilter.etime}
              server={
                sFilter.entity_name +
                " - " +
                sFilter.entity_description +
                ` - ${sFilter.entity_data.frame.serial_number}`
              }
            />
            <TopJobs />
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

export default React.memo(HistoricalData);
