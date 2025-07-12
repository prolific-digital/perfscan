import React, { useEffect, useState } from "react";
import { getParametersFromLocalStorage } from "../../helpers/commonHelper";
import PeriodHeader from "../components/PeriodVsPeriod/PeriodHeader/PeriodHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncAppMetrics } from "../../store/slices/settings";
import moment from "moment";
import { periodFilter } from "../../store/slices/searchFilter/index";
import PeriodDiskSPaceUtilizationChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodDiskSPaceUtilizationChartReport";
import PeriodDiskArmUtilizationChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodDiskArmUtilizationChartReport";
import PeriodDiskResponseChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodDiskResponseChartReport";
import PeriodDiskOperationChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodDiskOperationChartReport";
import PeriodDiskReadWriteChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodDiskReadWriteChartReport";
import PeriodDiskCacheHitPercentageChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodDiskCacheHitPercentageChartReport";
import PeriodMachinPoolFaultingChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodMachinPoolFaultingChartReport";
import PeriodTotalFaultingRateChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodTotalFaultingRateChartReport";
import PeriodMemVsFaultChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodMemVsFaultChartReport";
import PeriodSpecificPoolChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodSpecificPoolChartReport";
import PeriodTotalTransactionChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodTotalTransactionChartReport";
import PeriodEthernetLineChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodEthernetLineChartReport";
import PeriodNumCoresChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodNumCoresChartReport";
import PeriodCpuUtilizationChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodCpuUtilizationChartReport";
import { useParams } from "react-router-dom";
import PeriodCpuMsChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodCpuMsChartReport";
import PeriodSummaryTableReport from "../components/PeriodVsPeriodReport/PeriodSummaryTableReport";
import { getManagedSystemMetrics } from "../../services/apiService";
import PrintPageHeader from "./PrintPageHeader";
import {
  getExSummaryCPUDataReport,
  getExSummaryDiskDataReport,
  getExSummaryMemoryDataReport,
  getExSummaryOtherDataReport,
} from "../../store/slices/reports/ReportDatatables/executiveSummaryReportSlice";
import _ from "lodash";
import PeriodTopPoolFaultingChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodTopPoolFaultingChartReport";
import PeriodResponse5250ChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodResponse5250ChartReport";
import PeriodCpwChartReport from "../components/PeriodVsPeriodReport/PeriodChartsReport/PeriodCpwChartReport";

function PeriodVsPeriodReport({ filters }) {
  const filterData = getParametersFromLocalStorage("PeriodFilter");
  const systemFilterData = getParametersFromLocalStorage("systemfilter");
  const cpuData = useSelector(getExSummaryCPUDataReport);
  const diskData = useSelector(getExSummaryDiskDataReport);
  const memoryData = useSelector(getExSummaryMemoryDataReport);
  const otherData = useSelector(getExSummaryOtherDataReport);
  const params = useParams();

  let stime1 =
    cpuData?.data[0]?.params?.stime ||
    diskData?.data[0]?.params?.stime ||
    memoryData?.data[0]?.params?.stime ||
    otherData?.data[0]?.params?.stime;

  let etime1 =
    cpuData?.data[0]?.params?.etime ||
    diskData?.data[0]?.params?.etime ||
    memoryData?.data[0]?.params?.etime ||
    otherData?.data[0]?.params?.etime;

  let stime2 =
    cpuData?.data[0]?.params?.stime2 ||
    diskData?.data[0]?.params?.stime2 ||
    memoryData?.data[0]?.params?.stime2 ||
    otherData?.data[0]?.params?.stime2;

  let etime2 =
    cpuData?.data[0]?.params?.etime2 ||
    diskData?.data[0]?.params?.etime2 ||
    memoryData?.data[0]?.params?.etime2 ||
    otherData?.data[0]?.params?.etime2;

  useEffect(() => {
    fetchManagedSystemMetrics(params.rptid);
  }, []);
  const [msMetrics, setMsMetrics] = useState();
  const fetchManagedSystemMetrics = async (id) => {
    try {
      let response = await getManagedSystemMetrics(id);

      if (response.status === 200) {
        setMsMetrics(response.data);
      }
    } catch (error) {
    } finally {
    }
  };
  useEffect(() => {
    dispatch(periodFilter(filterData));
  }, [filterData]);

  const dispatch = useDispatch();
  const userID = getParametersFromLocalStorage("userID");

  const reportId = { rptId: params.rptid };

  let period1 = "";
  let period2 = "";

  // Show only start date if both start and end date are same
  const period1_sdate = moment(cpuData?.data[0]?.params?.sdata).unix();
  const period1_edate = moment(cpuData?.data[0]?.params?.edate).unix();
  if (period1_sdate === period1_edate) {
    period1 = moment(cpuData?.data[0]?.params?.sdata).format("MMM Do YYYY");
  } else {
    period1 =
      moment(cpuData?.data[0]?.params?.sdata).format("MMM Do YYYY") +
      " - " +
      moment(cpuData?.data[0]?.params?.edate).format("MMM Do YYYY");
  }
  // Show only start date if both start and end date are same
  const period2_sdate = moment(cpuData?.data[0]?.params?.sdata2).unix();
  const period2_edate = moment(cpuData?.data[0]?.params?.edate2).unix();
  if (period2_sdate === period2_edate) {
    period2 = moment(cpuData?.data[0]?.params?.sdata2).format("MMM Do YYYY");
  } else {
    period2 =
      moment(cpuData?.data[0]?.params?.sdata2).format("MMM Do YYYY") +
      " - " +
      moment(cpuData?.data[0]?.params?.edate2).format("MMM Do YYYY");
  }

  useEffect(() => {
    dispatch(
      fetchAsyncAppMetrics({
        systemID: systemFilterData.id,
        userID: userID,
      })
    );
  }, [dispatch]);

  return (
    <>
      <div style={{ pageBreakAfter: "always" }}>
        <PrintPageHeader
          pageTitle={"Period vs Period Analysis"}
          sDate={filters.sDate}
          eDate={filters.eDate}
          mainmenu={true}
        />
      </div>
      {(msMetrics?.data?.executing_summary || msMetrics?.sys1?.executing_summary  || msMetrics?.sys2?.executing_summary) && (
        <>
          <div style={{ pageBreakAfter: "always" }}>
            <PeriodHeader
              period1={period1}
              period2={period2}
              system1={
                cpuData?.data[0]?.params?.server1 ||
                diskData?.data[0]?.params?.server1 ||
                memoryData?.data[0]?.params?.server1 ||
                otherData?.data[0]?.params?.server1
              }
              system2={
                cpuData?.data[0]?.params?.server2 ||
                diskData?.data[0]?.params?.server2 ||
                memoryData?.data[0]?.params?.server2 ||
                otherData?.data[0]?.params?.server2 ||
                ""
              }
              sys1SerialNum={
                cpuData?.data[0]?.params?.serverID1 ||
                diskData?.data[0]?.params?.serverID1 ||
                memoryData?.data[0]?.params?.serverID1 ||
                otherData?.data[0]?.params?.serverID1
              }
              sys2SerialNum={
                cpuData?.data[0]?.params?.serverID2 ||
                diskData?.data[0]?.params?.serverID2 ||
                memoryData?.data[0]?.params?.serverID2 ||
                otherData?.data[0]?.params?.serverID2 ||
                ""
              }
              systems={
                cpuData?.data[0]?.params?.sysOpt ||
                diskData?.data[0]?.params?.sysOpt ||
                memoryData?.data[0]?.params?.sysOpt ||
                otherData?.data[0]?.params?.sysOpt
              }
              stime1={stime1}
              etime1={etime1}
              stime2={stime2}
              etime2={etime2}
              report={true}
            />
            <PeriodSummaryTableReport reportId={reportId} metrics={msMetrics} />
          </div>
        </>
      )}

      {!_.isEmpty(cpuData?.data[0]?.params) && (
        <div className="table_wrapper">
          <div className="detail-analysis">
            <p>PERIOD vs PERIOD ANALYSIS</p>
            <p style={{ color: "blue" }}>
              {cpuData?.data[0]?.params?.server1 || diskData?.data[0]?.params?.server1 ||
                memoryData?.data[0]?.params?.server1 || otherData?.data[0]?.params?.server1}{" "}
              -
              {cpuData?.data[0]?.params?.serverID1 || diskData?.data[0]?.params?.serverID1 ||
                memoryData?.data[0]?.params?.serverID1 || otherData?.data[0]?.params?.serverID1}
              {(cpuData?.data[0]?.params?.sysOpt === "Multiple" || diskData?.data[0]?.params?.sysOpt === "Multiple" ||
                memoryData?.data[0]?.params?.sysOpt === "Multiple" || otherData?.data[0]?.params?.sysOpt === "Multiple") &&
                (cpuData?.data[0]?.params?.server1 || diskData?.data[0]?.params?.server1 ||
                  memoryData?.data[0]?.params?.server1 || otherData?.data[0]?.params?.server1) !==
                  (cpuData?.data[0]?.params?.server2 || diskData?.data[0]?.params?.server2 ||
                    memoryData?.data[0]?.params?.server2 || otherData?.data[0]?.params?.server2) &&
                ` vs 
                ${cpuData?.data[0]?.params?.server2 || diskData?.data[0]?.params?.server2 ||
                  memoryData?.data[0]?.params?.server2 || otherData?.data[0]?.params?.server2} - 
                ${cpuData?.data[0]?.params?.serverID1 || diskData?.data[0]?.params?.serverID1 ||
                memoryData?.data[0]?.params?.serverID1 || otherData?.data[0]?.params?.serverID1}`}
            </p>
            <p>
              PERIOD ANALYZED: {period1} vs. {period2}
            </p>
            <p>
              Time Analyzed -{" "}
              {stime1
                ? moment(`${stime1}:00`, "HHmmss").format("hh:mm a")
                : "___"}{" "}
              -{" "}
              {etime1
                ? moment(`${etime1}:00`, "HHmmss").format("hh:mm a")
                : "___"}
              {(cpuData?.data[0]?.params?.sysOpt === "Multiple" || diskData?.data[0]?.params?.sysOpt === "Multiple" ||
                memoryData?.data[0]?.params?.sysOpt === "Multiple" || otherData?.data[0]?.params?.sysOpt === "Multiple") &&
                (cpuData?.data[0]?.params?.server1 || diskData?.data[0]?.params?.server1 ||
                  memoryData?.data[0]?.params?.server1 || otherData?.data[0]?.params?.server1) !==
                  (cpuData?.data[0]?.params?.server2 || diskData?.data[0]?.params?.server2 ||
                    memoryData?.data[0]?.params?.server2 || otherData?.data[0]?.params?.server2) && (
                  <>
                    {" "}
                    vs{" "}
                    {stime2
                      ? moment(`${stime2}:00`, "HHmmss").format("hh:mm a")
                      : "___"}{" "}
                    -{" "}
                    {etime2
                      ? moment(`${etime2}:00`, "HHmmss").format("hh:mm a")
                      : "___"}
                  </>
                )}
            </p>
          </div>
        </div>
      )}

      <div className="chart_view_wrapper">
        {(msMetrics?.data?.cpu_utilization || msMetrics?.sys1?.cpu_utilization  || msMetrics?.sys2?.cpu_utilization) && (
          <PeriodCpuUtilizationChartReport reportId={reportId} />
        )}
        {(msMetrics?.data?.cpu_ms || msMetrics?.sys1?.cpu_ms  || msMetrics?.sys2?.cpu_ms) && <PeriodCpuMsChartReport reportId={reportId} />}
        
        {(msMetrics?.data?.no_of_cores || msMetrics?.sys1?.no_of_cores  || msMetrics?.sys2?.no_of_cores) && (
          <PeriodNumCoresChartReport reportId={reportId} />
        )}
        {(msMetrics?.data?.cpw || msMetrics?.sys1?.cpw  || msMetrics?.sys2?.cpw) && (
          <PeriodCpwChartReport reportId={reportId} />
        )}
        {(msMetrics?.data?.disk_space_utilization || msMetrics?.sys1?.disk_space_utilization  || msMetrics?.sys2?.disk_space_utilization) && (
          <PeriodDiskSPaceUtilizationChartReport reportId={reportId} />
        )}

        {(msMetrics?.data?.disk_arm_utilization || msMetrics?.sys1?.disk_arm_utilization  || msMetrics?.sys2?.disk_arm_utilization) && (
          <PeriodDiskArmUtilizationChartReport reportId={reportId} />
        )}

        {(msMetrics?.data?.disk_response_time || msMetrics?.sys1?.disk_response_time  || msMetrics?.sys2?.disk_response_time) && (
          <PeriodDiskResponseChartReport reportId={reportId} />
        )}
        {(msMetrics?.data?.total_disk_ops || msMetrics?.sys1?.total_disk_ops  || msMetrics?.sys2?.total_disk_ops) && (
          <PeriodDiskOperationChartReport reportId={reportId} />
        )}
        {(msMetrics?.data?.read_write_ratio || msMetrics?.sys1?.read_write_ratio  || msMetrics?.sys2?.read_write_ratio) && (
          <PeriodDiskReadWriteChartReport reportId={reportId} />
        )}
        {(msMetrics?.data?.cache_hit_perc || msMetrics?.sys1?.cache_hit_perc  || msMetrics?.sys2?.cache_hit_perc) && (
          <PeriodDiskCacheHitPercentageChartReport reportId={reportId} />
        )}

        {(msMetrics?.data?.machine_pool_faulting || msMetrics?.sys1?.machine_pool_faulting  || msMetrics?.sys2?.machine_pool_faulting) && (
          <PeriodMachinPoolFaultingChartReport reportId={reportId} />
        )}

        {(msMetrics?.data?.faulting_rate || msMetrics?.sys1?.faulting_rate  || msMetrics?.sys2?.faulting_rate) && (
          <PeriodTotalFaultingRateChartReport reportId={reportId} />
        )}

        {(msMetrics?.data?.top_pool_faulting_rate || msMetrics?.sys1?.top_pool_faulting_rate  || msMetrics?.sys2?.top_pool_faulting_rate) && (
          <PeriodTopPoolFaultingChartReport reportId={reportId} />
        )}

        {(msMetrics?.data?.memory_size_faulting || msMetrics?.sys1?.memory_size_faulting  || msMetrics?.sys2?.memory_size_faulting) && (
          <PeriodMemVsFaultChartReport reportId={reportId} />
        )}
        {(msMetrics?.data?.pool_faulting_rate || msMetrics?.sys1?.pool_faulting_rate  || msMetrics?.sys2?.pool_faulting_rate) && (
          <PeriodSpecificPoolChartReport reportId={reportId} />
        )}
        {(msMetrics?.data?.response_time_5250 || msMetrics?.sys1?.response_time_5250  || msMetrics?.sys2?.response_time_5250) && (
          <PeriodResponse5250ChartReport reportId={reportId} />
        )}

        {(msMetrics?.data?.total_transactions || msMetrics?.sys1?.total_transactions  || msMetrics?.sys2?.total_transactions) && (
          <PeriodTotalTransactionChartReport reportId={reportId} />
        )}

        {(msMetrics?.data?.ethernet_line_utilization || msMetrics?.sys1?.ethernet_line_utilization  || msMetrics?.sys2?.ethernet_line_utilization) && (
          <PeriodEthernetLineChartReport reportId={reportId} />
        )}
      </div>
    </>
  );
}

export default PeriodVsPeriodReport;
