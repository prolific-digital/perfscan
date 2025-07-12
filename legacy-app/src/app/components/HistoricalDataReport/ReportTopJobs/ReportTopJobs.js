import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import ReportHeaderDetails from "../../ReportHeaderDetails";
import { fetchAsyncTopJobsReports, getTopJobsDataReport} from "../../../../store/slices/reports/topJobsReport/topJobsReportSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import CanvasJSReact from "../../../../scripts/canvasjs.react";
import Loading from "../../Loading";
import CpuJobType from "./ReportPieCharts/CpuJobType";
import FaultsJobType from "./ReportPieCharts/FaultsJobType";
import AsynciosJobType from "./ReportPieCharts/AsynciosJobType";
import SynciosJobType from "./ReportPieCharts/SynciosJobType";
import TotaliosJobType from "./ReportPieCharts/TotaliosJobType";
import * as _ from 'lodash';

const jobTypes = {
  1: "cpu",
  2: "asyncios",
  3: "syncios",
  4: "totalios",
  5: "faults",
};

const TopJobsReport = ({ queryReportData,reportId }) => {
  const qd = useQueryData();
  const topJobsData = useSelector(getTopJobsDataReport);
  // const topJobsChartData = useSelector(getCpuTopJobsChartData);
  const dispatch = useDispatch();

  /* State variables */
  const [activeTabID, setActiveTabID] = useState(1);
  const [activeInternalTabID, setInternalActiveTabID] = useState(1);
  const [topJobFilterValue, setTopJobFilterValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkData, setCheckData] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const printPieChart1 = 1;
  const printPieChart2 = 2;
  const printPieChart3 = 3;
  const printPieChart4 = 4;
  const printPieChart5 = 5;

  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  useEffect(() => {
    dispatch(fetchAsyncTopJobsReports(reportId));
    // dispatch(fetchAsyncCpuTopJobsChart(qd));
  }, [dispatch]);

  useEffect(() => {
    if (topJobsData.loading === false) {
      if(!(_.isEmpty(topJobsData.data))){
        if(!(_.isEmpty(topJobsData.data?.data))){
          if (topJobsData.data?.data) {
            setTableData(topJobsData.data?.data[0])
            setCheckData(true);
          }
        }
      }
      else{
        setCheckData(false);
      }
    }
  }, [topJobsData])

  // useEffect(() => {
  //   if (activeInternalTabID) {
  //     fetchTopJobsReportChart(jobTypes[activeInternalTabID]);
  //   }
  // }, [activeInternalTabID]);

  // const fetchTopJobsReportChart = async (jobType) => {
  //   try {
  //     setLoading(true);
  //       setChartData(topJobsChartData.data.data[0]);

  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }


  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <InputText  style={{ maxWidth: "15rem" }} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" className="form-control"/>
      </div>
    );
  };

  const header = renderHeader();
  return (
    <div className="topjobs-conatiner">
      <div className="top-jobs-nav">
        {/* <div className="filters"></div> */}
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
          {
            (topJobsData.loading === true) && (_.isEmpty(topJobsData.data)) &&
            <div style={{ textAlign: "center" }}>Loading...</div>
          }
          {  !topJobsData.loading && !_.isEmpty(topJobsData.data) && (checkData) &&
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
              emptyMessage="No System Found"
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
          }
          {
          !topJobsData.loading && (checkData === false) && 
          <div style={{textAlign:'center', padding:'15em'}}>No data available for Top Jobs Data Table</div> 
          }
          {/* {TableJSON.length !== 0 && <NoDataFound rowValue={rowSpan} />} */}
        </TabPane>

        <TabPane tabId="2">
          {/* inside pie  tabs  under performance insights starts */}
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
                  <CpuJobType runReportStateValue={undefined} reportId={reportId}/>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="pie-chart-wrapper">
                  <TotaliosJobType runReportStateValue={undefined} reportId={reportId}/>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="pie-chart-wrapper">
                  <SynciosJobType runReportStateValue={undefined} reportId={reportId}/>
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div className="pie-chart-wrapper">
                  <AsynciosJobType runReportStateValue={undefined} reportId={reportId}/>
              </div>
            </TabPane>
            <TabPane tabId="5">
              <div className="pie-chart-wrapper">
                  <FaultsJobType runReportStateValue={undefined} reportId={reportId}/>
              </div>
            </TabPane>
          </TabContent>
        </TabPane>
      </TabContent>
    </div>
  );
}



export default TopJobsReport