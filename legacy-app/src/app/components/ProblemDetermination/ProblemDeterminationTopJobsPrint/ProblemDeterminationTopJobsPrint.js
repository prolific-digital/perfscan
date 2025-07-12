import React, { useEffect, useState, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncTopJobs,
  getTopJobsData,
  fetchAsyncCpuTopJobsChart,
  getCpuTopJobsChartData,
} from "../../../../store/slices/topJobs/topJobsSlice";
import * as _ from "lodash";
import DetailedContext from "../DetailedMetricsContext/DetailedContext";
import useQueryData from "../../../../hooks/useQueryData";
import { queryDateTime } from "../QueryDates/QueryDates";
import { FilterMatchMode } from "primereact/api";
import CanvasJSReact from "../../../../scripts/canvasjs.react";
import Loading from "../../Loading";
import CpuJobType from "../../HistoricalData/TopJobs/PieCharts/CpuJobType";
import FaultsJobType from "../../HistoricalData/TopJobs/PieCharts/FaultsJobType";
import AsynciosJobType from "../../HistoricalData/TopJobs/PieCharts/AsynciosJobType";
import SynciosJobType from "../../HistoricalData/TopJobs/PieCharts/SynciosJobType";
import TotaliosJobType from "../../HistoricalData/TopJobs/PieCharts/TotaliosJobType";
import usePDQueryData from "../QueryDates/usePDQueryData";
import moment from "moment";
const jobTypes = {
  1: "cpu",
  2: "asyncios",
  3: "syncios",
  4: "totalios",
  5: "faults",
};

const PdTopJobsPrint = ({ runReportStateValue }) => {
  let qd = null;
  let pdQueryDates = usePDQueryData();
  const uqd = useQueryData();
  const getSysId = useSelector((state) => state.filters.system_filter?.id);
  if (runReportStateValue === false) {
    qd = {
      sdate: moment(new Date()).format(),
      edate: moment(new Date()).format(),
      stime: moment(new Date()).subtract(15, "minutes").format("h:mm:ss"),
      etime: moment(new Date()).format("h:mm:ss"),
      sysid: getSysId,
      pd: true,
    };
  } else {
    qd = { ...pdQueryDates, pd: true };
  }
  //   const qd = {
  //     sdate: moment(new Date()).format(),
  //     edate: moment(new Date()).format(),
  //     stime: moment(new Date()).subtract(15,'minutes').format('h:mm:ss'),
  //     etime: moment(new Date()).format('h:mm:ss'),
  //     sysid: uqd.sysid,
  //     pd:true
  // }
  // const qd = useQueryData();
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

  const printPieChart1 = 1;
  const printPieChart2 = 2;
  const printPieChart3 = 3;
  const printPieChart4 = 4;
  const printPieChart5 = 5;

  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  useEffect(() => {
    if (qd && getSysId != undefined) {
      dispatch(fetchAsyncTopJobs(qd));
    }
    // dispatch(fetchAsyncCpuTopJobsChart(qd));
  }, [dispatch, getSysId]);

  useEffect(() => {
    //debugger;
    if (topJobsData.loading === false) {
      if (!_.isEmpty(topJobsChartData.data)) {
        if (!_.isEmpty(topJobsData.data?.data)) {
          if (topJobsData.data.data[0].length !== 0) {
            setCheckData(true);
            setTableData(topJobsData.data?.data[0]);
          }
        }
      } else {
        setCheckData(false);
      }
    }
  }, [topJobsData]);

  useEffect(() => {
    if (activeInternalTabID) {
      fetchTopJobsReportChart(jobTypes[activeInternalTabID]);
    }
  }, [activeInternalTabID]);

  useEffect(() => {
    setDetailsValue(jobSelect);
    if (jobSelect === 3) {
      setInternalActiveTabID(5);
    } else {
      setInternalActiveTabID(jobSelect);
    }
  }, [jobSelect]);

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

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Percentage Breakdown ",
      //   text: title || "Percentage Breakdown ",
      fontSize: 15,
    },
    legend: {
      verticalAlign: "center", // "top" , "bottom"
      horizontalAlign: "left",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y} %",
        showInLegend: "true",
        legendText: "{label} - {y}%",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: chartData.map(({ total, jobname }) => ({
          y: +total,
          label: jobname,
        })),
      },
    ],
  };

  const renderMain = () => {
    if (!!detailsValue) {
      return (
        <div className="topjobs-conatiner" style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            {topJobsData.loading === false && _.isEmpty(topJobsData.data) && (
              <div style={{ textAlign: "center" }}>Loading...</div>
            )}
            {
              //  tableData && tableData?.length && (!!detailsValue) &&
              !topJobsData.loading && !_.isEmpty(topJobsData.data) && checkData && (
                <DataTable
                  value={tableData}
                  header={header}
                  // paginator
                  className="systems-table"
                  // showGridlines
                  // rows={10}
                  // rowsPerPageOptions={[10, 20, 30, 40, 50]}
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
                  {detailsValue === 1 && (
                    <Column header="CPU ms" field="cpu" sortable></Column>
                  )}
                  {detailsValue === 2 && (
                    <Column
                      header="Total IOs"
                      field="totalios"
                      sortable
                    ></Column>
                  )}
                  {detailsValue === 2 && (
                    <Column header="Sync IOs" field="syncios" sortable></Column>
                  )}
                  {detailsValue === 2 && (
                    <Column
                      header="Async IOs"
                      field="asyncios"
                      sortable
                    ></Column>
                  )}
                  {detailsValue === 3 && (
                    <Column header="Faults" field="faults" sortable></Column>
                  )}
                </DataTable>
              )
            }
            {!topJobsData.loading && checkData === false && (
              <div style={{ textAlign: "center", padding: "15em" }}>
                No data available for Top Jobs Data Table
              </div>
            )}
          </div>
          <div className="topjobs-conatiner" style={{ flex: 1 }}>
            <TabContent activeTab={String(activeTabID)}>
              <TabPane tabId="1">
                {detailsValue === 1 && (
                  <Nav tabs className="pie-inside-tabbing">
                    <NavItem>
                      <NavLink className={printPieChart1 === 1 ? "active" : ""}>
                        CPU ms
                      </NavLink>
                    </NavItem>
                  </Nav>
                )}
                <TabContent activeTab={String(1)}>
                  <TabPane tabId="1">
                    <div className="pie-chart-wrapper">
                      {loading ? (
                        <Loading />
                      ) : (
                        <CpuJobType runReportStateValue={runReportStateValue} />
                      )}
                    </div>
                  </TabPane>
                </TabContent>
              </TabPane>

              <TabPane tabId="1">
                {detailsValue === 2 && (
                  <Nav tabs className="pie-inside-tabbing">
                    <NavItem>
                      <NavLink className={printPieChart2 === 2 ? "active" : ""}>
                        Total IOs
                      </NavLink>
                    </NavItem>
                  </Nav>
                )}
                <TabContent activeTab={String(2)}>
                  <TabPane tabId="2">
                    <div className="pie-chart-wrapper">
                      {loading ? (
                        <Loading />
                      ) : (
                        <TotaliosJobType
                          runReportStateValue={runReportStateValue}
                        />
                      )}
                    </div>
                  </TabPane>
                </TabContent>
              </TabPane>

              <TabPane tabId="1">
                {detailsValue === 2 && (
                  <Nav tabs className="pie-inside-tabbing">
                    <NavItem>
                      <NavLink className={printPieChart3 === 3 ? "active" : ""}>
                        Sync IOs
                      </NavLink>
                    </NavItem>
                  </Nav>
                )}
                <TabContent activeTab={String(3)}>
                  <TabPane tabId="3">
                    <div className="pie-chart-wrapper">
                      {loading ? (
                        <Loading />
                      ) : (
                        <SynciosJobType
                          runReportStateValue={runReportStateValue}
                        />
                      )}
                    </div>
                  </TabPane>
                </TabContent>
              </TabPane>

              <TabPane tabId="1">
                {detailsValue === 2 && (
                  <Nav tabs className="pie-inside-tabbing">
                    <NavItem>
                      <NavLink className={printPieChart4 === 4 ? "active" : ""}>
                        Async IOs
                      </NavLink>
                    </NavItem>
                  </Nav>
                )}
                <TabContent activeTab={String(4)}>
                  <TabPane tabId="4">
                    <div className="pie-chart-wrapper">
                      {loading ? (
                        <Loading />
                      ) : (
                        <AsynciosJobType
                          runReportStateValue={runReportStateValue}
                        />
                      )}
                    </div>
                  </TabPane>
                </TabContent>
              </TabPane>
              <TabPane tabId="1">
                {detailsValue === 3 && (
                  <Nav tabs className="pie-inside-tabbing">
                    <NavItem>
                      <NavLink className={printPieChart5 === 5 ? "active" : ""}>
                        Faults
                      </NavLink>
                    </NavItem>
                  </Nav>
                )}
                <TabContent activeTab={String(5)}>
                  <TabPane tabId="5">
                    <div className="pie-chart-wrapper">
                      {loading ? (
                        <Loading />
                      ) : (
                        <FaultsJobType
                          runReportStateValue={runReportStateValue}
                        />
                      )}
                    </div>
                  </TabPane>
                </TabContent>
              </TabPane>
            </TabContent>
          </div>
        </div>
      );
    }
  };

  const header = renderHeader();
  return <div>{renderMain()}</div>;
};

export default PdTopJobsPrint;
