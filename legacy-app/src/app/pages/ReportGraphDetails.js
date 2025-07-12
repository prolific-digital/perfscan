import { Toast } from "primereact/toast";
import { BeatLoader } from "react-spinners";
import { FormGroup, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useRef, useState } from "react";

import {
  setChartViewMetrics,
  setChartViewTrends,
  setToggleGuidelines,
} from "../../store/slices/charts/alertChartsSlice";
import SectionHeader from "../components/SectionHeader";
import NumCores from "../components/RealTimeGraphs/Charts/NumCores";
import Response5250 from "../components/RealTimeGraphs/Charts/Response5250";
import CPUUtilization from "../components/RealTimeGraphs/Charts/CPUUtilization";
import DiskOperations from "../components/RealTimeGraphs/Charts/DiskOperations";
import EthernetLineUtil from "../components/RealTimeGraphs/Charts/EthernetLineUtil";
import DiskResponseTime from "../components/RealTimeGraphs/Charts/DiskResponseTime";
import TotalTransactions from "../components/RealTimeGraphs/Charts/TotalTransactions";
import TotalFaultingChart from "../components/RealTimeGraphs/Charts/TotalFaultingChart";
import DiskArmUtilization from "../components/RealTimeGraphs/Charts/DiskArmUtilization";
import DiskSpaceUtilization from "../components/RealTimeGraphs/Charts/DiskSpaceUtilization";

const ReportGraphDetails = ({selectedSystem, id, sysName, metricRefs}) => {
  const [activeChartView, setActiveChartView] = useState({
    isMetricsChart: true,
    isTrendsChart: false,
    isShowGuidelines: false,
  });
  const dispatch = useDispatch();
  const toast = useRef("");
  const graphToggleState = useSelector(
    (state) => state.metricGraphToggle.toggleMetric
  );

  const addMetricRef = (metricName, element)=>{
    if(element){
      metricRefs.current[metricName] = element
    }
  }

  const showToast = (type, summary, details) => {
    toast?.current?.show({
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
  ]);

  let chartButtonToggle = true;

  if (
    !graphToggleState.cpu_utilization &&
    !graphToggleState.no_of_cores &&
    !graphToggleState.response_time_5250 &&
    !graphToggleState.total_transactions &&
    !graphToggleState.ethernet_line_utilization &&
    !graphToggleState.disk_space_utilization &&
    !graphToggleState.disk_arm_utilization &&
    !graphToggleState.disk_response_time &&
    !graphToggleState.total_disk_ops &&
    !graphToggleState.faulting_rate
  ) {
    chartButtonToggle = false;
  }
  return (
    <div className="report_details_wrapper">
      <SectionHeader
        title={`Details`}
        // btnClickHandler={handlePrintDetails}
        // breadCrumbsList={filteredBreadCrumbsList}
      />
      {chartButtonToggle && (
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
      {graphToggleState.cpu_utilization && (
        <div className="chart_view_wrapper" ref={(el)=>{addMetricRef("cpu_utilization", el)}}>
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <CPUUtilization
              selectedSystem={selectedSystem}
              activeChartView={activeChartView}
              id={id}
              sysName={sysName}
            />
          </Suspense>
        </div>
      )}
      {graphToggleState.no_of_cores && (
        <div metricRefs className="chart_view_wrapper" ref={(el)=>{addMetricRef("no_of_cores", el)}}>
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <NumCores
              selectedSystem={selectedSystem}
              activeChartView={activeChartView}
              id={id}
              sysName={sysName}
            />
          </Suspense>
        </div>
      )}

      {graphToggleState.disk_space_utilization && (
        <div className="chart_view_wrapper" ref={(el)=>{addMetricRef("disk_space_utilization", el)}}>
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskSpaceUtilization
              selectedSystem={selectedSystem}
              activeChartView={activeChartView}
              id={id}
              sysName={sysName}
            />
          </Suspense>
        </div>
      )}
      {graphToggleState.disk_arm_utilization && (
        <div className="chart_view_wrapper" ref={(el)=>{addMetricRef("disk_arm_utilization", el)}}>
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskArmUtilization
              selectedSystem={selectedSystem}
              activeChartView={activeChartView}
              id={id}
              sysName={sysName}
            />
          </Suspense>
        </div>
      )}
      {graphToggleState.disk_response_time && (
        <div className="chart_view_wrapper" ref={(el)=>{addMetricRef("disk_response_time", el)}}>
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskResponseTime
              selectedSystem={selectedSystem}
              activeChartView={activeChartView}
              id={id}
              sysName={sysName}
            />
          </Suspense>
        </div>
      )}
      {graphToggleState.total_disk_ops && (
        <div className="chart_view_wrapper" ref={(el)=>{addMetricRef("total_disk_ops", el)}}>
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <DiskOperations
              selectedSystem={selectedSystem}
              activeChartView={activeChartView}
              id={id}
              sysName={sysName}
            />
          </Suspense>
        </div>
      )}
      {graphToggleState.faulting_rate && (
        <div className="chart_view_wrapper" ref={(el)=>{addMetricRef("faulting_rate", el)}}>
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <TotalFaultingChart
              selectedSystem={selectedSystem}
              activeChartView={activeChartView}
              id={id}
              sysName={sysName}
            />
          </Suspense>
        </div>
      )}
      {graphToggleState.response_time_5250 && (
        <div className="chart_view_wrapper" ref={(el)=>{addMetricRef("response_time_5250", el)}}>
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <Response5250
              selectedSystem={selectedSystem}
              activeChartView={activeChartView}
              id={id}
              sysName={sysName}
            />
          </Suspense>
        </div>
      )}
      {graphToggleState.total_transactions && (
        <div className="chart_view_wrapper" ref={(el)=>{addMetricRef("total_transactions", el)}}>
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <TotalTransactions
              selectedSystem={selectedSystem}
              activeChartView={activeChartView}
              id={id}
              sysName={sysName}
            />
          </Suspense>
        </div>
      )}
      {graphToggleState.ethernet_line_utilization && (
        <div className="chart_view_wrapper" ref={(el)=>{addMetricRef("ethernet_line_utilization", el)}}>
          <Suspense fallback={<BeatLoader color="#366bd6" />}>
            <EthernetLineUtil
              selectedSystem={selectedSystem}
              activeChartView={activeChartView}
              id={id}
              sysName={sysName}
            />
          </Suspense>
        </div>
      )}
      <Toast ref={toast} position="top-right"></Toast>
    </div>
  );
};

export default ReportGraphDetails;
