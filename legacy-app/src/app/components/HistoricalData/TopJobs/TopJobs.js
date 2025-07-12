import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncTopJobs,
  getTopJobsData,
} from "../../../../store/slices/topJobs/topJobsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import { FilterMatchMode } from "primereact/api";
import CanvasJSReact from "../../../../scripts/canvasjs.react";
import Loading from "../../Loading";
import CpuJobType from "./PieCharts/CpuJobType";
import FaultsJobType from "./PieCharts/FaultsJobType";
import AsynciosJobType from "./PieCharts/AsynciosJobType";
import SynciosJobType from "./PieCharts/SynciosJobType";
import TotaliosJobType from "./PieCharts/TotaliosJobType";
import * as _ from "lodash";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { pieSaveReport } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import useReportData from "../../../../hooks/useSaveReportDataHistorical";
import useQueryDataRealTimeTopJobs from "../../../../hooks/useQueryDataRealTimeTopJobs";
import { fetchAsyncRealTimeTopJobs, getRealTimeTopJobsData } from "../../../../store/slices/topJobs/topJobsRealTimeMonitorSlice";
import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";
import { useSearchParams } from "react-router-dom";

const TopJobs = ({ alertPage }) => {
  const qd = useQueryData();
  let [searchParams] = useSearchParams();
  const topJobsData = useSelector(alertPage ? getRealTimeTopJobsData : getTopJobsData);
  const dispatch = useDispatch();
  const uuid = useSelector(getUuidData);
  const pieSaveRpt = useReportData();
  const realTimeQuery = useQueryDataRealTimeTopJobs();
  const sysid = searchParams.get("sysId");
  const entityName = searchParams.get("entityName");
  /* State variables */
  const [activeTabID, setActiveTabID] = useState(1);
  const [activeInternalTabID, setInternalActiveTabID] = useState(1);
  const [checkData, setCheckData] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  useEffect(() => {
    if (!uuid?.loading && uuid.data.uniqueid && !alertPage) {
      dispatch(fetchAsyncTopJobs(qd));
      dispatch(pieSaveReport(pieSaveRpt));
    }
    if (alertPage) {
      dispatch(
        fetchAsyncRealTimeTopJobs({ ...realTimeQuery, entityName })
      );
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (topJobsData.loading === false) {
      if (!_.isEmpty(topJobsData.data)) {
        if (!_.isEmpty(topJobsData.data?.data)) {
          if (topJobsData.data?.data) {
            setTableData(topJobsData.data?.data[0]);
            setCheckData(true);
          }
        }
      } else {
        setCheckData(false);
      }
    }
  }, [topJobsData]);

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

  const header = renderHeader();
  return (
    <div className="topjobs-conatiner">
      <div className="top-jobs-nav">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTabID === 1 ? "active" : ""}
              onClick={() => setActiveTabID(1)}
            >
              Reports
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTabID === 2 ? "active" : ""}
              onClick={() => setActiveTabID(2)}
            >
              Pie Chart
            </NavLink>
          </NavItem>
        </Nav>
      </div>

      <TabContent activeTab={String(activeTabID)}>
        <TabPane tabId="1">
          {topJobsData.loading === true && _.isEmpty(topJobsData.data) && (
            <div style={{ textAlign: "center" }}>Loading...</div>
          )}
          {!topJobsData.loading &&
            !_.isEmpty(topJobsData.data) &&
            checkData && (
              <DataTable
                value={tableData}
                header={header}
                paginator
                className="systems-table"
                showGridlines
                rows={10}
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                dataKey="id"
                filterDisplay="menu"
                responsiveLayout="scroll"
                filters={filters}
                globalFilterFields={[
                  "jbname",
                  "jbuser",
                  "jbnbr",
                  "cpu",
                  "totalios",
                  "syncios",
                  "asyncios",
                  "faults",
                ]}
                emptyMessage="No Jobs Found"
              >
                <Column header="Job Name" field="jbname" sortable></Column>
                <Column header="User" field="jbuser" sortable></Column>
                <Column header="Job Num" field="jbnbr" sortable></Column>
                <Column header="CPU ms" field="cpu" sortable></Column>
                <Column header="Total IOs" field="totalios" sortable></Column>
                <Column header="Sync IOs" field="syncios" sortable></Column>
                <Column header="Async IOs" field="asyncios" sortable></Column>
                <Column header="Faults" field="faults" sortable></Column>
              </DataTable>
            )}
          {!topJobsData.loading && checkData === false && (
            <div style={{ textAlign: "center", padding: "15em" }}>
              No data available for Top Jobs Data Table
            </div>
          )}
        </TabPane>

        <TabPane tabId="2">
          <Nav tabs className="pie-inside-tabbing">
            <NavItem>
              <NavLink
                className={activeInternalTabID === 1 ? "active" : ""}
                onClick={() => setInternalActiveTabID(1)}
              >
                CPU ms
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeInternalTabID === 2 ? "active" : ""}
                onClick={() => setInternalActiveTabID(2)}
              >
                Total IOs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeInternalTabID === 3 ? "active" : ""}
                onClick={() => setInternalActiveTabID(3)}
              >
                Sync IOs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeInternalTabID === 4 ? "active" : ""}
                onClick={() => setInternalActiveTabID(4)}
              >
                Async IOs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeInternalTabID === 5 ? "active" : ""}
                onClick={() => setInternalActiveTabID(5)}
              >
                Faults
              </NavLink>
            </NavItem>
          </Nav>
          {/* inside pie  tabs data under performance insights ends */}

          {/* inside pie  tabs data under performance insights starts */}
          <TabContent activeTab={String(activeInternalTabID)}>
            <TabPane tabId="1">
              <div className="pie-chart-wrapper">
                <CpuJobType
                  runReportStateValue={undefined}
                  alertPage={alertPage || false}
                />
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="pie-chart-wrapper">
                <TotaliosJobType
                  runReportStateValue={undefined}
                  alertPage={alertPage || false}
                />
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="pie-chart-wrapper">
                <SynciosJobType
                  runReportStateValue={undefined}
                  alertPage={alertPage || false}
                />
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div className="pie-chart-wrapper">
                <AsynciosJobType
                  runReportStateValue={undefined}
                  alertPage={alertPage || false}
                />
              </div>
            </TabPane>
            <TabPane tabId="5">
              <div className="pie-chart-wrapper">
                <FaultsJobType
                  runReportStateValue={undefined}
                  alertPage={alertPage || false}
                />
              </div>
            </TabPane>
          </TabContent>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default React.memo(TopJobs);
