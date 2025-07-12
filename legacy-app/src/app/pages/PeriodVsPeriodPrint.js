import React, { useEffect, useState } from "react";
import { getParametersFromLocalStorage } from "../../helpers/commonHelper";
import PeriodCpuMsChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodCpuMsChartPrint";
import PeriodCpuUtilizationChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodCpuUtilizationChartPrint";
import PeriodDiskArmUtilizationChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodDiskArmUtilizationChartPrint";
import PeriodDiskCacheHitPercentageChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodDiskCacheHitPercentageChartPrint";
import PeriodDiskOperationChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodDiskOperationChartPrint";
import PeriodDiskReadWriteChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodDiskReadWriteChartPrint";
import PeriodDiskResponseChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodDiskResponseChartPrint";
import PeriodDiskSPaceUtilizationChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodDiskSPaceUtilizationChartPrint";
import PeriodEthernetLineChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodEthernetLineChartPrint";
import PeriodMachinPoolFaultingChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodMachinPoolFaultingChartPrint";
import PeriodMemVsFaultChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodMemVsFaultChartPrint";
import PeriodNumCoresChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodNumCoresChartPrint";
import PeriodSpecificPoolChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodSpecificPoolChartPrint";
import PeriodTotalFaultingRateChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodTotalFaultingRateChartPrint";
import PeriodTotalTransactionChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodTotalTransactionChartPrint";
import PeriodHeader from "../components/PeriodVsPeriod/PeriodHeader/PeriodHeader";
import PeriodSummaryTablePrint from "../components/PeriodVsPeriod/PeriodSummaryTablePrint";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncAppMetrics } from "../../store/slices/settings";
import moment from "moment";
import { periodFilter } from "../../store/slices/searchFilter/index";
import PrintPageHeader from "./PrintPageHeader";
import PeriodTopPoolFaultingChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodTopPoolFaultingChartPrint";
import PeriodReponse5250ChartPrint from "../components/PeriodVsPeriod/PeriodCharts/PeriodResponseChart5250ChartPrint";

function PeriodVsPeriodPrint() {
  const filterData = getParametersFromLocalStorage("PeriodFilter");
  const systemFilterData = getParametersFromLocalStorage("systemfilter");
  const systemFilterData2 = getParametersFromLocalStorage("_systemfilter");
  const system = getParametersFromLocalStorage("PeriodSaveFilter");
  
  const pFilter = filterData; //dates
  const sFilter = systemFilterData; //system
  const sFilter2 = systemFilterData2

  const stime1 = pFilter[0].stime;
  const etime1 = pFilter[0].etime;

  const stime2 = pFilter[1].stime;
  const etime2 = pFilter[1].etime;

  useEffect(() => {
    dispatch(periodFilter(filterData));
  }, [filterData]);

  const metrics_data_app = useSelector(
    (state) => state.settings.metrics_data_app
  );
  const [metrics, setMetrics] = useState();
  const dispatch = useDispatch();
  const userID = getParametersFromLocalStorage("userID");

  let period1 = "";
  let period2 = "";

  // Show only start date if both start and end date are same
  const period1_sdate = moment(pFilter[0].sdate).unix();
  const period1_edate = moment(pFilter[0].edate).unix();
  if (period1_sdate === period1_edate) {
    period1 = moment(pFilter[0].sdate).format("MMM Do YYYY");
  } else {
    period1 =
      moment(pFilter[0].sdate).format("MMM Do YYYY") +
      " - " +
      moment(pFilter[0].edate).format("MMM Do YYYY");
  }
  // Show only start date if both start and end date are same
  const period2_sdate = moment(pFilter[1].sdate).unix();
  const period2_edate = moment(pFilter[1].edate).unix();
  if (period2_sdate === period2_edate) {
    period2 = moment(pFilter[1].sdate).format("MMM Do YYYY");
  } else {
    period2 =
      moment(pFilter[1].sdate).format("MMM Do YYYY") +
      " - " +
      moment(pFilter[1].edate).format("MMM Do YYYY");
  }

  useEffect(() => {
    dispatch(
      fetchAsyncAppMetrics({
        systemID: systemFilterData.id,
        userID: userID,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setMetrics(metrics_data_app.data.data);
  }, [metrics_data_app.data.length]);

  const PeriodFilter = JSON.parse(localStorage.getItem("PeriodFilter"));

  return (
    <>
      <div style={{ pageBreakAfter: "always" }}>
        <PrintPageHeader pageTitle={"Period Vs Period"} sDate={PeriodFilter.sdate} eDate={PeriodFilter.edate} mainmenu={false}/>
      </div>

      {metrics && metrics.executing_summary && (
        <div style={{ pageBreakAfter: "always" }}>
          <PeriodHeader
            period1={period1}
            period2={period2}
            system1 = {sFilter.entity_name + ' - ' + sFilter.entity_description}
            system2 = {sFilter2?.entity_name + ' - ' + sFilter2?.entity_description || ""}
            sys1SerialNum = {sFilter.entity_data.frame.serial_number}
            sys2SerialNum = {sFilter2?.entity_data?.frame?.serial_number || ""}
            systems = {system.sysOpt}
            stime1={stime1}
            etime1={etime1}
            stime2={stime2}
            etime2={etime2}
            report={true}
          />
          <PeriodSummaryTablePrint
            sdate1={pFilter[0].sdate}
            sdate2={pFilter[1].sdate}
          />
        </div>
      )}

      <div className="table_wrapper">
        <div className="detail-analysis">
        <p>PERIOD vs PERIOD ANALYSIS</p>
          <p style={{color:'blue'}}>{sFilter.entity_name + ' - ' + sFilter.entity_description} - {sFilter.entity_data.frame.serial_number}  
          {system.sysOpt ==='Multiple' && sFilter2.entity_name !== sFilter.entity_name &&  
          ` vs ${sFilter2.entity_name + ' - ' + sFilter2.entity_description} - ${sFilter2.entity_data.frame.serial_number}`}</p>
          <p>PERIOD ANALYZED: {period1} vs. {period2}</p>
          <p>
            Time Analyzed -{" "}
            {stime1 ? moment(`${stime1}:00`, "HHmmss").format("hh:mm a") : "___"} -{" "}
            {etime1 ? moment(`${etime1}:00`, "HHmmss").format("hh:mm a") : "___"}
            {system.sysOpt ==='Multiple' && sFilter2.entity_name !== sFilter.entity_name &&
            <> vs {" "}
            {stime2 ? moment(`${stime2}:00`, "HHmmss").format("hh:mm a") : "___"} -{" "}
            {etime2 ? moment(`${etime2}:00`, "HHmmss").format("hh:mm a") : "___"}
            </>
            }
          </p>
        </div>
      </div>

      <div className="">
        {metrics && metrics.cpu_utilization && <div style={{ pageBreakAfter: "always" }}><PeriodCpuUtilizationChartPrint /></div>}
        {metrics && metrics.cpu_ms && <div style={{ pageBreakAfter: "always" }}><PeriodCpuMsChartPrint /></div>}
        {metrics && metrics.no_of_cores && <div style={{ pageBreakAfter: "always" }}><PeriodNumCoresChartPrint /></div>}
        {metrics && metrics.disk_space_utilization && (
          <div style={{ pageBreakAfter: "always" }}><PeriodDiskSPaceUtilizationChartPrint /></div>
        )}
        {metrics && metrics.disk_arm_utilization && (
          <div style={{ pageBreakAfter: "always" }}><PeriodDiskArmUtilizationChartPrint /></div>
        )}
        {metrics && metrics.disk_response_time && <div style={{ pageBreakAfter: "always" }}><PeriodDiskResponseChartPrint /></div>}
        {metrics && metrics.total_disk_ops && <div style={{ pageBreakAfter: "always" }}><PeriodDiskOperationChartPrint /></div>}
        {metrics && metrics.read_write_ratio && <div style={{ pageBreakAfter: "always" }}><PeriodDiskReadWriteChartPrint /></div>}
        {
          metrics && metrics.cache_hit_perc && (
            <div style={{ pageBreakAfter: "always" }}><PeriodDiskCacheHitPercentageChartPrint /></div >
          )
        }
        {
          metrics && metrics.machine_pool_faulting && (
            <div style={{ pageBreakAfter: "always" }}><PeriodMachinPoolFaultingChartPrint /></div>
          )
        }
        {metrics && metrics.faulting_rate && <div style={{ pageBreakAfter: "always" }}><PeriodTotalFaultingRateChartPrint /></div >}
        {metrics && metrics.top_pool_faulting_rate && <div style={{ pageBreakAfter: "always" }}><PeriodTopPoolFaultingChartPrint /></div >}
        {metrics && metrics.memory_size_faulting && <div style={{ pageBreakAfter: "always" }}><PeriodMemVsFaultChartPrint /></div >}
        {metrics && metrics.pool_faulting_rate && <div style={{ pageBreakAfter: "always" }}><PeriodSpecificPoolChartPrint /></div >}
        {metrics && metrics.response_time_5250 && 
        <div style={{ pageBreakAfter: "always" }}>
          <PeriodReponse5250ChartPrint/>
        </div> }
        {
          metrics && metrics.total_transactions && (
            <div style={{ pageBreakAfter: "always" }}><PeriodTotalTransactionChartPrint /></div >
          )
        }
        {
          metrics && metrics.ethernet_line_utilization && (
            <div style={{ pageBreakAfter: "always" }}><PeriodEthernetLineChartPrint /></div >
          )
        }
      </div >
    </>
  );
}

export default PeriodVsPeriodPrint;
