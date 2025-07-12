import React, { useState, Suspense, useEffect } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { Toast } from "primereact/toast";
import * as _l from "lodash";
import ReportHeaderDetails from "../components/ReportHeaderDetails";
import ExecutiveSummaryReport from "../components/HistoricalDataReport/ReportExecutiveSummary";
import CPUUtilizationReport from "../components/HistoricalDataReport/ReportCharts/CPUUtilizationReport";
import CPUMsReport from "../components/HistoricalDataReport/ReportCharts/CPUMsReport";
import NumCoresReport from "../components/HistoricalDataReport/ReportCharts/NumCoresReport";
import DiskArmUtilizationReport from "../components/HistoricalDataReport/ReportCharts/DiskArmUtilizationReport";
import DiskResponseTimeReport from "../components/HistoricalDataReport/ReportCharts/DiskResponseTimeReport";
import DiskOperationsReport from "../components/HistoricalDataReport/ReportCharts/DiskOperationsReport";
import DiskReadWriteRatioReport from "../components/HistoricalDataReport/ReportCharts/DiskReadWriteRatioReport";
import CacheHitPercentReport from "../components/HistoricalDataReport/ReportCharts/CacheHitPercentReport";
import MachinePoolFaultingReport from "../components/HistoricalDataReport/ReportCharts/MachinePoolFaultingReport";
import TotalFaultingChartReport from "../components/HistoricalDataReport/ReportCharts/TotalFaultingChartReport";
import MemVsFaultingReport from "../components/HistoricalDataReport/ReportCharts/MemVsFaultingReport";
import SpecificPoolFaultReport from "../components/HistoricalDataReport/ReportCharts/SpecificPoolFaultReport";
import Response5250Report from "../components/HistoricalDataReport/ReportCharts/Response5250Report";
import TotalTransactionsReport from "../components/HistoricalDataReport/ReportCharts/TotalTransactionsReport";
import EthernetLineUtilReport from "../components/HistoricalDataReport/ReportCharts/EthernetLineUtilReport";
import TopJobsReport from "../components/HistoricalDataReport/ReportTopJobs/ReportTopJobs";
import DiskSpaceUtilizationReport from "../components/HistoricalDataReport/ReportCharts/DiskSpaceUtilizationReport";
import { getAllSystems } from "../../services/apiService";
import { useParams } from "react-router-dom";
import TopPoolFaultReport from "../components/HistoricalDataReport/ReportCharts/TopPoolFaultReport";
import SectionHeader from "../components/SectionHeader";
import { getManagedSystemMetrics } from '../../services/apiService'
import PrintPageHeader from "./PrintPageHeader";
import CPWReport from "../components/HistoricalDataReport/ReportCharts/CPWReport";
import { API_URL } from "typeCodes";
import SystemSpecificReport from "../components/SystemSpecificReport";

const HistoricalDataReports = ({ filters, state }) => {
  const params = useParams();
  const [allSystems, setAllSystems] = useState([]);
  const pdfUrl = API_URL+"api/renderpdf?"
  const qdPdf = {
    sdate1: filters.sDate,
    edate1: filters.eDate,
    stime1: filters.sTime,
    etime1: filters.eTime,
    rptId : params.rptid, 
    rptType: filters.report_type, 
    userId: filters.userId,
    sysid:filters.sysid, 
    sysname:filters.system_name,
    chartMetric: true,
    trendMetric: true,
    showGuidelines: false,
    viewReport:true
   };
  const reportId = { rptId: params.rptid }

  const queryReportData = {
    sdate: filters.sDate,
    edate: filters.eDate,
    stime: filters.sTime,
    etime: filters.eTime,
    sysid: filters.sysid,
    sysname: filters.system_name,
    rptType: filters.report_type,
    reportName: filters.report_name
  };


  useEffect(() => {
    getSystems();
    fetchManagedSystemMetrics(params.rptid);
  }, [])

  const [msMetrics, setMsMetrics] = useState();
  const fetchManagedSystemMetrics = async (id) => {
    try {
      let response = await getManagedSystemMetrics(id);

      if (response.status === 200) {
        setMsMetrics(response.data)
      }
    } catch (error) {
    } finally {
    }
  }

  const getSystems = async () => {
    try {
      const response = await getAllSystems();
      if (response.status === 200) {
        const foundData = response.data
        if (foundData.length) {
          setAllSystems(foundData);
        }
      }
    } catch (error) { }
  }

  let isCpu = true;
  let isDisk = true;
  let isMemory = true;
  let isOther = true;

  const [activeChartView, setActiveChartView] = useState({
    isMetricsChart: true,
    isTrendsChart: false,
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

  if (msMetrics) {
    isCpu =
      msMetrics.cpu_utilization ||
      msMetrics.no_of_cores ||
      msMetrics.cpu_ms ||
      msMetrics.cpw;
    isDisk =
      msMetrics.read_write_ratio ||
      msMetrics.cache_hit_perc ||
      msMetrics.total_disk_ops ||
      msMetrics.disk_response_time ||
      msMetrics.disk_arm_utilization ||
      msMetrics.disk_space_utilization ||
      msMetrics.cache_hit_misses;
    isMemory =
      msMetrics.faulting_rate ||
      msMetrics.pool_faulting_rate ||
      msMetrics.machine_pool_faulting ||
      msMetrics.top_pool_faulting_rate;
    isOther =
      msMetrics.ethernet_line_utilization ||
      msMetrics.response_time_5250 ||
      msMetrics.total_transactions;
  }

  return (
    <>
    <div style={{ pageBreakAfter: "always" }}>
        <PrintPageHeader pageTitle={'Historical Data Analysis'} sDate={queryReportData.sdate} eDate={queryReportData.edate} mainmenu={true} printPdf={true} pdfUrl={pdfUrl} query={qdPdf}/>
      </div>
      {msMetrics?.executing_summary && (
        <>
          {/* <SectionHeader title={"Historical Data Analysis"} subTitle="Performance Insights" sDate={queryReportData.sdate} eDate={queryReportData.edate} name={queryReportData.reportName} /> */}
          <Suspense fallback={<div>Loading...</div>}>
            <ExecutiveSummaryReport queryReportData={queryReportData} reportId={reportId} metrics={msMetrics} />
          </Suspense>
        </>
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
      <div className="chart_view_wrapper">
        {msMetrics?.data?.cpu_utilization && (
          <Suspense fallback={<div>Loading...</div>}>
            <CPUUtilizationReport activeChartView={activeChartView} reportId={reportId} />
          </Suspense>
        )}
        {msMetrics?.data?.cpu_ms && (
          <CPUMsReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.no_of_cores && (
          <NumCoresReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.cpw && (
          <CPWReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.disk_space_utilization && (
          <DiskSpaceUtilizationReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.disk_arm_utilization && (
          <DiskArmUtilizationReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.disk_response_time && (
          <DiskResponseTimeReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.total_disk_ops && (
          <DiskOperationsReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.read_write_ratio && (
          <DiskReadWriteRatioReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.cache_hit_perc && (
          <CacheHitPercentReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.machine_pool_faulting && (
          <MachinePoolFaultingReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.faulting_rate && (
          <TotalFaultingChartReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.memory_size_faulting && (
          <MemVsFaultingReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.memory_size_faulting && (
          <SpecificPoolFaultReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.top_pool_faulting_rate && (
          <TopPoolFaultReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.response_time_5250 && (
          <Response5250Report activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.total_transactions && (
          <TotalTransactionsReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.ethernet_line_utilization && (
          <EthernetLineUtilReport activeChartView={activeChartView} reportId={reportId} />
        )}

        {msMetrics?.data?.top_jobs_utilisation && (
          <Suspense fallback={<div>Loading...</div>}>
            <div style={{ pageBreakAfter: "always"}}>
            <ReportHeaderDetails
              reportTitle={"Top Jobs Reporting"}
              sdate={filters.sDate}
              stime={filters.sTime}
              edate={filters.eDate}
              etime={filters.eTime}
            />
            </div>
            <div style={{ pageBreakAfter: "always", width:"100%"  }}>
            <TopJobsReport reportId={reportId} />
            </div>
          </Suspense>
        )}
        {msMetrics?.data?.system_specifications && (
          <Suspense fallback={<div>Loading...</div>}>
            <SystemSpecificReport data={msMetrics?.entity_data} />
          </Suspense>
         )}
      </div>
      <Toast ref={toast} position="top-right"></Toast>
    </>
  );
};

export default HistoricalDataReports;
