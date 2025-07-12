import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./slices/settings/";
import filterReducer from "./slices/searchFilter";
import summaryReducer from "./slices/datatables/executiveSummarySlice";
import chartReducer from "./slices/charts/chartsSlice";
import cpuReducer from "./slices/charts/cpuChartsSlice";
import diskReducer from "./slices/charts/diskChartsSlice";
import memoryReducer from "./slices/charts/memoryChartsSlice";
import otherReducer from "./slices/charts/otherChartsSlice";
import jobsReducer from "./slices/datatables/jobsSlice";
import whatsChangedReducer from "./slices/whatschanged/whatsChangedSlice";
import periodDataReducer from "./slices/periodVsPeriodCharts/periodDataTableSlice";
import commonReducer from "./slices/common/commonSlice";
import periodCPUChartReducer from "./slices/periodVsPeriodCharts/periodCharts/periodCPUChartsSlice";
import periodDiskChartReducer from "./slices/periodVsPeriodCharts/periodCharts/periodDiskChartSlice";
import periodMemoryChartReducer from "./slices/periodVsPeriodCharts/periodCharts/periodMemoryChartsSlice";
import periodOtherChartReducer from "./slices/periodVsPeriodCharts/periodCharts/periodOtherChartsSlice";
import topJobsReducer from "./slices/topJobs/topJobsSlice";
import TimeLineSlice from "./slices/TimeLine/TimeLineSlice";
import metricsKeySlice from "./slices/metricsKey/metricsKeySlice";
import pdDataTableSlice from "./problemDetermination/pdDataTableSlice";
import pdCommonMemoryTableSlice from "./problemDetermination/pdCommonMemoryTableSlice";
import reportsReducer from "./slices/reports";
import cpuReportChartReducer from "./slices/reports/DataReportCharts/cpuReportChartsSlice";
import diskReportChartReducer from "./slices/reports/DataReportCharts/diskReportChartsSlice";
import memoryReportChart from "./slices/reports/DataReportCharts/memoryReportChartsSlice";
import otherReportChart from "./slices/reports/DataReportCharts/otherReportChartsSlice";
import executiveSummaryReport from "./slices/reports/ReportDatatables/executiveSummaryReportSlice";
import SaveNewReport from "./slices/reports/SaveNewReport/SaveNewReport";
import pdCommonMemoryReportTableSlice from "./slices/reports/problemDeterminationReport/pdCommonMemoryTableSlice";
import topJobsReportReducer from "./slices/reports/topJobsReport/topJobsReportSlice";
import UserProfile from "./slices/UserProfile/UserProfile";
import manageSystemSlice from "./slices/managesystems/manageSystemsSlice";
import TimeLineToggleSlice from "./slices/TimeLine/TimeLineToggleSlice";
import toggleTopJobsButtonSlice from "./slices/topJobs/toggleTopJobsButton";
import historicalDataRenderPdfSlice from "./slices/printReportSlice/historicalDataRenderPdf";
import brandingSlice from "./slices/branding/";
import UserManagementSlice from "./usermanagement/UserManagementSlice";
import CapacityPlanningSlice from "./slices/capacityplanning/CapacityPlanningSlice";
import AppConfigSlice from "./slices/appconfig/AppConfigSlice";
import metricReducer from "./slices/enterpriseServer/metricsSlice";
import systemsFramesSlice from "./slices/enterpriseServer/systemFrameSlice";
import alertChartsReducer from "./slices/charts/alertChartsSlice";
import topJobsRealTimeMonitorSlice from "./slices/topJobs/topJobsRealTimeMonitorSlice";
import cpugraphReducer from "./slices/enterpriseServer/realtimemonitorcpuchartslice";
import diskgraphReducer from "./slices/enterpriseServer/realtimemonitordiskchartslice";
import othergraphReducer from "./slices/enterpriseServer/realtimemonitorotherschartslice"
import memorygraphReducer from "./slices/enterpriseServer/realtimemonitormemorychartslice"
import schedulerSlice from "./slices/report_scheduler/schedulerSlice"
import addSchedulerSlice from "./slices/report_scheduler/addSchedulerSlice";
import editSchedulerSlice from "./slices/report_scheduler/editSchedulerSlice";
import realTimeGuidelinesDataReducer from "./slices/enterpriseServer/RTGraphSlice/realTimeGuidelinesData";
import metricGraphToggleReducer from "./slices/enterpriseServer/metricGraphToggle";
import enterpriseServerRTData from "./slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import reportTemplatesSlice from "./slices/report_templates/templates.slice";
import sysConfigSlice from "./slices/system_config/system_config.slice";

const store = configureStore({
  reducer: {
    alertcharts: alertChartsReducer,
    settings: settingsReducer,
    filters: filterReducer,
    exsummary: summaryReducer,
    metricdata: metricReducer,
    cpugraphdata: cpugraphReducer,
    diskgraphdata: diskgraphReducer,
    memorygraphdata: memorygraphReducer,
    othergraphdata:othergraphReducer, 
    charts: chartReducer,
    cpu: cpuReducer,
    disk: diskReducer,
    memory: memoryReducer,
    other: otherReducer,
    jobs: jobsReducer,
    whatschanged: whatsChangedReducer,
    perioddata: periodDataReducer,
    common: commonReducer,
    periodCPUCharts: periodCPUChartReducer,
    periodDiskCharts: periodDiskChartReducer,
    periodMemoryCharts: periodMemoryChartReducer,
    periodOtherCharts: periodOtherChartReducer,
    topjobs: topJobsReducer,
    topJobsRealTimeMonitor: topJobsRealTimeMonitorSlice,
    timeline: TimeLineSlice,
    timelinetoggle: TimeLineToggleSlice,
    metricslist: metricsKeySlice,
    pdexsummary: pdDataTableSlice,
    pdcommemory: pdCommonMemoryTableSlice,
    reports: reportsReducer,
    cpuReports: cpuReportChartReducer,
    diskReports: diskReportChartReducer,
    memoryReports: memoryReportChart,
    otherReports: otherReportChart,
    exsummaryReports: executiveSummaryReport,
    saveReport: SaveNewReport,
    pdcommemoryreport: pdCommonMemoryReportTableSlice,
    topJobsReports: topJobsReportReducer,
    userProfileData: UserProfile,
    managesystem: manageSystemSlice,
    toggleTopJobsBtn: toggleTopJobsButtonSlice,
    pdfData: historicalDataRenderPdfSlice,
    branding: brandingSlice,
    usermgt: UserManagementSlice,
    capacityplanning: CapacityPlanningSlice,
    appConfig: AppConfigSlice,
    systemframe: systemsFramesSlice,
    schedulerData: schedulerSlice, 
    addScheduler : addSchedulerSlice,
    editScheduler : editSchedulerSlice,
    realtimeguidelinesdata: realTimeGuidelinesDataReducer,
    enterpriseserverdata: enterpriseServerRTData,
    metricGraphToggle: metricGraphToggleReducer,
    reportTemplates: reportTemplatesSlice,
    sysConfig : sysConfigSlice,      
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
