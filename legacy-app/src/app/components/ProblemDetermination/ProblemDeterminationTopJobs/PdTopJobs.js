import React, { useEffect, useState, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncTopJobs, getTopJobsData, getCpuTopJobsChartData } from "../../../../store/slices/topJobs/topJobsSlice";
import * as _ from 'lodash';
import DetailedContext from "../DetailedMetricsContext/DetailedContext";
import { FilterMatchMode } from "primereact/api";
import Loading from "../../Loading";
import CpuJobType from '../../../components/HistoricalData/TopJobs/PieCharts/CpuJobType';
import FaultsJobType from "../../../components/HistoricalData/TopJobs/PieCharts/FaultsJobType";
import AsynciosJobType from "../../../components/HistoricalData/TopJobs/PieCharts/AsynciosJobType";
import SynciosJobType from "../../../components/HistoricalData/TopJobs/PieCharts/SynciosJobType";
import TotaliosJobType from "../../../components/HistoricalData/TopJobs/PieCharts/TotaliosJobType";
import usePDQueryData from "../QueryDates/usePDQueryData";
import moment from "moment";
import { pieSaveReport,getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import usePdPieReportData from "../../../../hooks/useSavePieReportDataProblemDetermination";

const jobTypes = {
  1: "cpu",
  2: "asyncios",
  3: "syncios",
  4: "totalios",
  5: "faults",
};

const PdTopJobs = ({ runReportStateValue }) => {
  let qd = null;
  let pdQueryDates = usePDQueryData();
  const uuid = useSelector(getUuidData);
  const getSysId = useSelector(state=>state.filters.system_filter?.id);
  const pieSaveRpt = usePdPieReportData();
  if (runReportStateValue === false) {
    qd = {
      sdate: moment(new Date()).format(),
      edate: moment(new Date()).format(),
       stime: moment(new Date()).subtract(15,'minutes').format('h:mm:ss'), 
       etime: moment(new Date()).format('h:mm:ss'),
      sysid: getSysId,
       pd:true
   }
  } else {
    qd = { ...pdQueryDates, pd: true };
  }
  
  const { jobSelect } = useContext(DetailedContext);
  const topJobsData = useSelector(getTopJobsData);
  const topJobsChartData = useSelector(getCpuTopJobsChartData);
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
    if (!uuid?.loading && uuid.data.uniqueid) {
      dispatch(fetchAsyncTopJobs(qd));
      dispatch(pieSaveReport(pieSaveRpt));
    }
  }, [dispatch,uuid])

  useEffect(() => {
    if (topJobsData.loading === false) {
        if(!(_.isEmpty(topJobsData.data?.data))){
          if (topJobsData.data.data[0].length !== 0) {
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
              <div style={{ textAlign: "center" }}><Loading /></div>
            }
            {
              !topJobsData.loading && !_.isEmpty(topJobsData.data) && (checkData) && 
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
                    {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
                    {!topJobsData.loading && <CpuJobType runReportStateValue={runReportStateValue} />}
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="pie-chart-wrapper">
                    {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
                    {!topJobsData.loading && <TotaliosJobType runReportStateValue={runReportStateValue}/>}
                    </div>
                  </TabPane>
                  <TabPane tabId="3">
                    <div className="pie-chart-wrapper">
                    {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
                    {!topJobsData.loading && <SynciosJobType runReportStateValue={runReportStateValue}/>}
                    </div>
                  </TabPane>
                  <TabPane tabId="4">
                    <div className="pie-chart-wrapper">
                    {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
                    {!topJobsData.loading && <AsynciosJobType runReportStateValue={runReportStateValue}/>}
                    </div>
                  </TabPane>
                  <TabPane tabId="5">
                    <div className="pie-chart-wrapper">
                    {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
                    {!topJobsData.loading && <FaultsJobType runReportStateValue={runReportStateValue}/>}
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



export default PdTopJobs