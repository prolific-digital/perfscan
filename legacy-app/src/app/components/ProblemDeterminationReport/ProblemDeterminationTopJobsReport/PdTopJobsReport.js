import React, { useEffect, useState, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import DetailedContext from "../DetailedMetricsContextReport/DetailedContextReport";
import { FilterMatchMode } from "primereact/api";
import { 
   fetchAsyncTopJobsReports,
   getTopJobsDataReport, 
   fetchAsyncCpuTopJobsChartReports,
   getCpuTopJobsChartDataReport} from "../../../../store/slices/reports/topJobsReport/topJobsReportSlice";
import CpuJobTypeReport from "../../HistoricalDataReport/ReportTopJobs/ReportPieCharts/CpuJobType";
import TotaliosJobTypeReport from "../../HistoricalDataReport/ReportTopJobs/ReportPieCharts/TotaliosJobType";
import SynciosJobTypeReport from "../../HistoricalDataReport/ReportTopJobs/ReportPieCharts/SynciosJobType";
import AsynciosJobTypeReport from "../../HistoricalDataReport/ReportTopJobs/ReportPieCharts/AsynciosJobType";
import FaultsJobTypeReport from "../../HistoricalDataReport/ReportTopJobs/ReportPieCharts/FaultsJobType";
import Loading from "../../Loading";


const jobTypes = {
  1: "cpu",
  2: "asyncios",
  3: "syncios",
  4: "totalios",
  5: "faults",
};

const PdTopJobsReport = ({ runReportStateValue,reportId,filters }) => {
  let qd = null;
  const getSysId = filters?.sysid;
  if (runReportStateValue === false) {
    qd = reportId
  } else {
    qd = reportId;
  }
  const { jobSelect } = useContext(DetailedContext);
  const topJobsData = useSelector(getTopJobsDataReport);
  const topJobsChartData = useSelector(getCpuTopJobsChartDataReport);
  const dispatch = useDispatch();

  /* State variables */
  const [checkData, setCheckData] = useState(true);
  const [detailsValue, setDetailsValue] = useState(jobSelect);
  const [activeTabID, setActiveTabID] = useState(1);
  const [activeInternalTabID, setInternalActiveTabID] = useState(1);
  const [topJobFilterValue, setTopJobFilterValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  useEffect(() => {
    if (qd && getSysId != undefined) {
      dispatch(fetchAsyncTopJobsReports(qd));
    }
    // dispatch(fetchAsyncCpuTopJobsChartReports(qd));
  }, [dispatch,getSysId])

  useEffect(() => {
    if (topJobsData.loading === false) {
        if(!(_.isEmpty(topJobsData.data?.data))){
          if (topJobsData?.data?.data[0].length !== 0) {
            setCheckData(true);
            setTableData(topJobsData.data?.data[0])
          }
        }
      else{
        setCheckData(false);
      }
    }
  }, [topJobsData])

  useEffect(() => {
    if (activeInternalTabID) {
      fetchTopJobsReportChart(jobTypes[activeInternalTabID]);
    }
  }, [activeInternalTabID]);

  useEffect(() => {
    setDetailsValue(jobSelect);
    if (jobSelect === 3) {
      setInternalActiveTabID(5);
    }
    else{
      setInternalActiveTabID(jobSelect);
    }
  }, [jobSelect])
  

  const fetchTopJobsReportChart = async (jobType) => {
    try {
      setLoading(true);
      setChartData(topJobsChartData.data.data[0]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const topJobSearchChange = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setTopJobFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <input
          type="search"
          style={{ maxWidth: "15rem" }}
          value={topJobFilterValue}
          onChange={(e) => topJobSearchChange(e)}
          placeholder="Enter your search key word"
          className="form-control"
        />
      </div>
    );
  };


  const renderMain = () => {
    if (!!detailsValue) {
      return (
        <div className="topjobs-conatiner" style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            {
                (topJobsData.loading === true) && (_.isEmpty(topJobsData.data)) &&
              <div style={{ textAlign: "center" }}><Loading/></div>
            }
            {!topJobsData.loading && !_.isEmpty(topJobsData.data) && (checkData) && 
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
                  { (detailsValue === 1) &&
                    <Column header="CPU ms" field="cpu" sortable></Column>
                  }
                  { (detailsValue === 2) &&
                    <Column header="Total IOs" field="totalios" sortable></Column>
                  }
                  { (detailsValue === 2) &&
                    <Column header="Sync IOs" field="syncios" sortable></Column>
                  }
                  { (detailsValue === 2) &&
                    <Column header="Async IOs" field="asyncios" sortable></Column>
                  }
                  { (detailsValue === 3) &&
                    <Column header="Faults" field="faults" sortable></Column>
                  }
                </DataTable>
            }
            {
              !topJobsData.loading && (checkData === false) && 
              <div style={{textAlign:'center', padding:'15em'}}>No data available for Top Jobs Data Table</div> 
            }
          </div>
          <div className="topjobs-conatiner" style={{ flex: 1 }}>
            <TabContent activeTab={String(activeTabID)}>
              <TabPane tabId="1">
                {/* inside pie  tabs  under performance insights starts */}
                <Nav tabs className="pie-inside-tabbing">
                { (detailsValue === 1) &&
                    <NavItem>
                      <NavLink
                        className={activeInternalTabID === 1 ? "active" : ""}
                        onClick={() => setInternalActiveTabID(1)}
                      >
                        CPU ms
                      </NavLink>
                    </NavItem>
                }
                { (detailsValue === 2) &&
                    <NavItem>
                      <NavLink
                        className={activeInternalTabID === 2 ? "active" : ""}
                        onClick={() => setInternalActiveTabID(2)}
                      >
                        Total IOs
                      </NavLink>
                    </NavItem>
                }
                { (detailsValue === 2) &&
                    <NavItem>
                      <NavLink
                        className={activeInternalTabID === 3 ? "active" : ""}
                        onClick={() => setInternalActiveTabID(3)}
                      >
                        Sync IOs
                      </NavLink>
                    </NavItem>
                }
                { (detailsValue === 2) &&
                    <NavItem>
                      <NavLink
                        className={activeInternalTabID === 4 ? "active" : ""}
                        onClick={() => setInternalActiveTabID(4)}
                      >
                        Async IOs
                      </NavLink>
                    </NavItem>
                }
                { (detailsValue === 3) &&
                    <NavItem>
                      <NavLink
                        className={activeInternalTabID === 5 ? "active" : ""}
                        onClick={() => setInternalActiveTabID(5)}
                      >
                        Faults
                      </NavLink>
                    </NavItem>
                }
                </Nav>
                {/* inside pie  tabs data under performance insights ends */}

                {/* inside pie  tabs data under performance insights starts */}
                <TabContent activeTab={String(activeInternalTabID)}>
                  <TabPane tabId="1">
                    <div className="pie-chart-wrapper">
                        <CpuJobTypeReport runReportStateValue={runReportStateValue} reportId={reportId}/>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="pie-chart-wrapper">
                        <TotaliosJobTypeReport runReportStateValue={runReportStateValue} reportId={reportId}/>
                    </div>
                  </TabPane>
                  <TabPane tabId="3">
                    <div className="pie-chart-wrapper">
                         <SynciosJobTypeReport runReportStateValue={runReportStateValue} reportId={reportId}/>
                    </div>
                  </TabPane>
                  <TabPane tabId="4">
                    <div className="pie-chart-wrapper">
                        <AsynciosJobTypeReport runReportStateValue={runReportStateValue} reportId={reportId}/>
                    </div>
                  </TabPane>
                  <TabPane tabId="5">
                    <div className="pie-chart-wrapper">
                        <FaultsJobTypeReport runReportStateValue={runReportStateValue} reportId={reportId}/>
                    </div>
                  </TabPane>
                </TabContent>
              </TabPane>
            </TabContent>
          </div>
        </div>
      )
    }
  }

  const header = renderHeader();
  return (
    <div>
      { 
        renderMain()       
      }
    </div>
      );
    }



export default PdTopJobsReport