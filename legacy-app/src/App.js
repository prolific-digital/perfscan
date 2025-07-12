import { Navigate, Route, Routes } from "react-router-dom";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { HttpLink } from "@apollo/client/link/http";
import { getMainDefinition } from "@apollo/client/utilities";
import { useEffect, useRef } from "react";
import {
  ApolloClient,
  InMemoryCache,
  split,
  ApolloProvider,
} from "@apollo/client";
import AppConfig from "./app/pages/settings/app_config/AppConfig";
import DashboardHome from "./app/pages/DashboardHome";
import EnterPriseServerView from "./app/pages/EnterPriseServerView";
import ExistingReports from "./app/pages/ExistingReports";
import HostView from "./app/pages/HostView";
import Login from "./app/pages/Login";
import PerformanceInsights from "./app/pages/PerformanceInsights";
import ReportDetails from "./app/pages/ReportDetails";
import ReportDetailsCPU from "./app/pages/ReportDetailsCPU";
import ReportDetailsDisk from "./app/pages/ReportDetailsDisk";
import ReportDetailsMemory from "./app/pages/ReportDetailsMemory";
import ReportDetailsOthers from "./app/pages/ReportDetailsOthers";
import Settings from "./app/pages/Settings";
import MetricsPage from "./app/pages/MetricsPage";
import DefaultCoreMetrics from "./app/pages/settings/DefaultCoreMetrics";
import UserDefinedPerformance from "./app/pages/settings/UserDefinedPerformance";
import ApplicationComponent from "./app/pages/settings/ApplicationComponent";
import RequireAuth from "./auth/RequireAuth";
import ManageSystems from "./app/pages/settings/systems/ManageSystems";
import SystemList from "./app/pages/settings/systems/SystemList";
import AddSystem from "./app/pages/settings/systems/AddSystem";
import EditSystem from "./app/pages/settings/systems/EditSystem";
import AddChangeEvents from "./app/pages/settings/change_events/AddChangeEvents";
import ChangeEventsList from "./app/pages/settings/change_events/ChangeEventsList";
import ChangeEvents from "./app/pages/settings/change_events/ChangeEvents";
import UserProfile from "./app/components/UserProfile";
import HistoricalDataMainPage from "./app/pages/HistoricalDataMainPage";
import PeriodVsPeriodMainPage from "./app/pages/PeriodVsPeriodMainPage";
import ProblemDetermination from "./app/pages/ProblemDetermination";
import WhatsChangedMainPage from "./app/pages/WhatsChangedMainPage";
import EditChangeEvents from "./app/pages/settings/change_events/EditChangeEvents";
import ManageEvents from "./app/pages/settings/manage_events/ManageEvents";
import ManageEventlists from "./app/pages/settings/manage_events/ManageEventLists";
import ManageEventApplication from "./app/pages/settings/ManageEventApplication";
import DefaultCoreMetricsPrint from "./app/pages/settings/DefaultCoreMetricsPrint";
import UserDefinedPerformancePrint from "./app/pages/settings/UserDefinedPerformancePrint";
import HistoricalDataReportMainPage from "./app/pages/HistoricalDataReportsMainPage";
import WhatsChangedReportMainPage from "./app/pages/WhatsChangedReportMainPage";
import PeriodVsPeriodReportMainPage from "./app/pages/PeriodVsPeriodReportMainPage";
import ProblemDeterminationReport from "./app/pages/ProblemDeterminationReport";
import ResetPassword from "./app/pages/ResetPassword";
import ManageReports from "./app/pages/settings/ManageReports";
import ManageBranding from "./app/pages/settings/report_templates/ManageTemplate";
import TestPrint from "./app/pages/TestPrint";
import UserManagementList from "./app/pages/settings/usermanagement/UserManagementList";
import UserManagement from "./app/pages/settings/usermanagement/UserManagement";
import AddUser from "./app/pages/settings/usermanagement/AddUser";
import EditUser from "./app/pages/settings/usermanagement/EditUser";
import ComingSoon from "./app/pages/settings/ComingSoon";
import CapacityPlanMainPage from "./app/pages/capacity-planning/CapacityPlanMainPage";
import AddFrame from "./app/pages/settings/systems/AddFrame";
import EditFrame from "./app/pages/settings/systems/EditFrame";
import AlertManagement from "./app/pages/settings/AlertManagement/AlertManagement";
import EnterPriseServerViewTest from "./app/pages/EnterPriseServerViewTest";
import HostViewTest from "./app/pages/HostViewTest";
import MetricsPageTest from "./app/pages/MetricsPageTest";
import ReportDetailsTest from "./app/pages/ReportDetailsTest";
import ReportDetailsCPUTest from "./app/pages/ReportDetailsCPUTest";
import ReportDetailsDiskTest from "./app/pages/ReportDetailsDiskTest";
import ReportDetailsMemoryTest from "./app/pages/ReportDetailsMemoryTest";
import ReportDetailsOthersTest from "./app/pages/ReportDetailsOthersTest";
import AlertManagementOutlet from "./app/pages/settings/AlertManagement/AlertManagementOutlet";
import AddUserNotification from "./app/pages/settings/AlertManagement/AddUserNotification";
import ReportAutomation from "./app/pages/settings/report_automation"
import Socket from "./app/pages/Socket";
import ReportMenu from "app/pages/settings/report_automation/ReportMenu"
import Reports from "app/pages/settings/report_automation/Reports";
import CreateReport from "app/pages/settings/report_automation/CreateReport";
import EditReport from "app/pages/settings/report_automation/EditReport";
import RealTimeMonitor from "app/pages/RealTimeMonitor";
import ReportTemplates from "app/pages/settings/report_templates/"
import SystemConfig from "app/pages/settings/system_config";
import AboutPerfscan from "app/pages/settings/app_info/AboutPerfscan";
import { API_GRAPHQL, API_WEB_SOCKET } from "./typeCodes";

const App = () => {
  const wsClientRef = useRef(null);

  const httpLink = new HttpLink({
    uri: API_GRAPHQL,
  });

  if (!wsClientRef.current) {
    wsClientRef.current = createClient({
      url: API_WEB_SOCKET, // replace with your WebSocket URL
    });
  }

  const wsLink = new GraphQLWsLink(wsClientRef.current);

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });

  useEffect(() => {
    return () => {
      if (wsClientRef.current) {
        wsClientRef.current.dispose();
        console.log("websocket connection lost");
      }
    };
  }, []);
  
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Routes>
        <Route path="/" element={<RequireAuth><DashboardHome /></RequireAuth>}>
          <Route path="/" element={<HistoricalDataMainPage />} />
          <Route path="coming-soon" element={<ComingSoon />} />
          {/* <Route path="enterprise-server" element={<Socket />} /> */}
          {/* <Route path="enterprise-server" element={<EnterPriseServerView />} /> */}
          <Route path="enterprise-server" element={<RealTimeMonitor />} />
          {/* <Route path="server" element={<HostView />} /> */}
          <Route path="server" element={<HostViewTest />} />
          {/* <Route path="metrics/:sysId" element={<MetricsPage />} /> */}
          <Route path="metrics" element={<MetricsPage />} />
          {/* <Route path="metrics" element={<MetricsPageTest />} /> */}
          <Route path="detailed-view" element={<ReportDetails />} />
          <Route path="detailed-view-cpu" element={<ReportDetailsCPU />} />
          <Route path="detailed-view-disk" element={<ReportDetailsDisk />} />
          <Route path="detailed-view-memory" element={<ReportDetailsMemory />} />
          <Route path="detailed-view-other" element={<ReportDetailsOthers />} />
          {/* <Route path="detailed-view" element={<ReportDetailsTest />} />
          <Route path="detailed-view-cpu" element={<ReportDetailsCPUTest />} />
          <Route path="detailed-view-disk" element={<ReportDetailsDiskTest />} />
          <Route path="detailed-view-memory" element={<ReportDetailsMemoryTest />} />
          <Route path="detailed-view-other" element={<ReportDetailsOthersTest />} /> */}
          <Route path="test-print" element={<TestPrint />} />
          <Route path="performance-insights">
            <Route path="historical-data" element={<HistoricalDataMainPage />} />
            <Route path="whats-changed" element={<WhatsChangedMainPage />} />
            <Route path="problem-determination" element={<ProblemDetermination />} />
            <Route path="period-vs-period" element={<PeriodVsPeriodMainPage />} />
          </Route>
          <Route path="capacity-analysis" element={<CapacityPlanMainPage />} />
          <Route path="existing-reports" element={<ExistingReports />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="settings" element={<Settings />}>
            <Route path="default-core-metrics" element={<DefaultCoreMetrics />} />
            <Route path="user-defined-performance" element={<UserDefinedPerformance />} />
           
            <Route path="manage-systems" element={<ManageSystems />}>
              <Route index element={<SystemList />} />
              <Route path="add-frame" element={<AddFrame />} />
              <Route path="edit-frame/:systemId" element={<EditFrame />} />
              <Route path="add-system" element={<AddSystem />} />
              <Route path="edit-system/:systemId" element={<EditSystem />} />
            </Route>
            <Route path="system-configuration" element={<SystemConfig />} />
            <Route path="application-component" element={<ApplicationComponent />} />
            <Route path="change-events" element={<ChangeEvents />}>
              <Route index element={<ChangeEventsList />} />
              <Route path="add" element={<AddChangeEvents />} />
              <Route path="edit/:id" element={<EditChangeEvents />} />
            </Route>
            <Route path="user-management" element={<UserManagement/>}>
              <Route index element = {<UserManagementList/>}/>
              <Route path="add" element = {<AddUser/>}/>
              <Route path="edit/:id" element = {<EditUser />}/>
            </Route>
            <Route path="manageEventApplication" element={<ManageEventApplication />} />
            <Route path="manage-events" element={<ManageEvents />}>
              <Route index element={<ManageEventlists />} />
            </Route>
            <Route path="manage-reports" element={<ManageReports />} />
            <Route path="report-automation" element={<ReportAutomation />} />
            {/*
            <Route path="report-automation" element={<ReportMenu />}>
              <Route index element={<Reports />} />
              <Route path="create" element={<CreateReport />} />
              <Route path="edit/:id" element={<EditReport />} /> 
            </Route>
            */}  
            <Route path="manage-branding" element={<ReportTemplates />} />
            <Route path="app-config" element={<AppConfig />} />
            {/* <Route path="alert-management" element={<AlertManagementOutlet />} >
              <Route index element={<AlertManagement />}/>
              <Route path="add-user-modification" element={<AddUserNotification />}/>
            </Route> */}
            {/* <Route path="about-perfscan" element={<AboutPerfscan />} /> */}
          </Route>
        </Route>
         <Route path="reports-historical/:rptid" element={<RequireAuth><HistoricalDataReportMainPage /></RequireAuth>} />
          <Route path="reports-whats/:rptid" element={<RequireAuth><WhatsChangedReportMainPage /></RequireAuth>} />
          <Route path="reports-period/:rptid" element={<RequireAuth><PeriodVsPeriodReportMainPage /></RequireAuth>} />
          <Route path="reports-problem/:rptid" element={<RequireAuth><ProblemDeterminationReport /></RequireAuth>} />

        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        {/* <Route path="historical-data-print" element={<HistoricalDataPrintMainPage />} />
        <Route path="whatschanged-data-print" element={<WhatsChangedPrintMainPage />} />
        <Route path="problem-determination-print" element={<ProblemDeterminationPrint />} />
        <Route path="periodvsperiod-print" element={<PeriodVsPeriodPrintMainPage />} /> */}
        <Route path="defaultcoremetrics-print" element={<DefaultCoreMetricsPrint />} />
        <Route path="userdefinedperformance-print" element={<UserDefinedPerformancePrint />} />
        
      </Routes>
    </div>
    </ApolloProvider>
  );
};

export default App;
