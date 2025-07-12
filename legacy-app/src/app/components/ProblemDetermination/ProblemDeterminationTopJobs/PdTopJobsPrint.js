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
import CpuJobType from '../../HistoricalData/TopJobs/PieCharts/CpuJobType';
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
  const getSysId = useSelector(state => state.filters.system_filter?.id);
  if (runReportStateValue === false) {
    qd = {
      sdate: moment(new Date()).format(),
      edate: moment(new Date()).format(),
      stime: moment(new Date()).subtract(15, 'minutes').format('h:mm:ss'),
      etime: moment(new Date()).format('h:mm:ss'),
      sysid: getSysId,
      pd: true
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
      dispatch(fetchAsyncTopJobs(qd));
  }, [dispatch])

  useEffect(() => {
    if (topJobsData.loading === false) {
        if (!(_.isEmpty(topJobsData.data?.data))) {
          if (topJobsData.data.data[0].length !== 0) {
            setCheckData(true);
            setTableData(topJobsData.data?.data[0])
          }
      }
      else {
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
    else {
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
        <div className="topjobs-conatiner">
          <div style={{ flex: 1 }}>
            {
              (topJobsData.loading === true) && (_.isEmpty(topJobsData.data)) &&
              <div style={{ textAlign: "center" }}><Loading/></div>
            }
            {
              !topJobsData.loading && !_.isEmpty(topJobsData.data) && (checkData) &&
              <div style={{ pageBreakAfter: "always" }}>
                <DataTable
                  value={tableData}
                  header={header}
                  // paginator
                  className="systems-table"
                  showGridlines
                  // rows={10}
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
                  {(detailsValue === 1) &&
                    <Column header="CPU ms" field="cpu" sortable></Column>
                  }
                  {(detailsValue === 2) &&
                    <Column header="Total IOs" field="totalios" sortable></Column>
                  }
                  {(detailsValue === 2) &&
                    <Column header="Sync IOs" field="syncios" sortable></Column>
                  }
                  {(detailsValue === 2) &&
                    <Column header="Async IOs" field="asyncios" sortable></Column>
                  }
                  {(detailsValue === 3) &&
                    <Column header="Faults" field="faults" sortable></Column>
                  }
                </DataTable>
              </div>
            }
            {
              !topJobsData.loading && (checkData === false) && _.isEmpty(topJobsData.data) &&
              <div style={{ textAlign: 'center', padding: '15em' }}>No data available for Top Jobs Data Table</div>
            }
          </div>
          <div style={{ pageBreakAfter: "always", textAlign: "center" }}>
        Pie Chart
        {topJobsData.loading && _.isEmpty(topJobsData.data) && (
          <div style={{ textAlign: "center" }}>Loading...</div>
        )}
        {/* inside pie  tabs  under performance insights starts */}
        <div style={{ pageBreakAfter: "always" }}>
          <NavLink className={"active"}> CPU ms </NavLink>
 
          {/* inside pie  tabs data under performance insights ends */}

          {/* inside pie  tabs data under performance insights starts */}

          <div className="pie-chart-wrapper">
          {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
          {!topJobsData.loading && (!_.isEmpty(topJobsData.data)) && <CpuJobType runReportStateValue={runReportStateValue} print={true}/>}
          </div>
        </div>

        {/* inside pie  tabs  under performance insights starts */}
        <div style={{ pageBreakAfter: "always", textAlign: "center" }}>
        <NavLink className={"active"}> Total IOs </NavLink>

          {/* inside pie  tabs data under performance insights ends */}

          {/* inside pie  tabs data under performance insights starts */}

          <div className="pie-chart-wrapper">
          {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
          {!topJobsData.loading && (!_.isEmpty(topJobsData.data)) && <TotaliosJobType runReportStateValue={runReportStateValue} print={true}/>}
          </div>
        </div>

        {/* inside pie  tabs  under performance insights starts */}
        <div style={{ pageBreakAfter: "always", textAlign: "center" }}>
        <NavLink className={"active"}>  Sync IOs </NavLink>

          {/* inside pie  tabs data under performance insights ends */}

          {/* inside pie  tabs data under performance insights starts */}

          <div className="pie-chart-wrapper">
          {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
          {!topJobsData.loading && (!_.isEmpty(topJobsData.data)) && <SynciosJobType runReportStateValue={runReportStateValue} print={true}/>}
          </div>
        </div>
        {/* inside pie  tabs  under performance insights starts */}
        <div style={{ pageBreakAfter: "always", textAlign: "center" }}>
        <NavLink className={"active"}> Async IOs </NavLink>

          {/* inside pie  tabs data under performance insights ends */}

          {/* inside pie  tabs data under performance insights starts */}

          <div className="pie-chart-wrapper">
          {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
          {!topJobsData.loading && (!_.isEmpty(topJobsData.data)) && <AsynciosJobType runReportStateValue={runReportStateValue} print={true}/>}
          </div>
        </div>
        {/* inside pie  tabs  under performance insights starts */}
        <div style={{ pageBreakAfter: "always", textAlign: "center" }}>
        <NavLink className={"active"}> Faults </NavLink>

          {/* inside pie  tabs data under performance insights ends */}

          {/* inside pie  tabs data under performance insights starts */}

          <div className="pie-chart-wrapper">
          {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
          {!topJobsData.loading && (!_.isEmpty(topJobsData.data)) && <FaultsJobType runReportStateValue={runReportStateValue} print={true}/>}
          </div>
        </div>
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



export default PdTopJobsPrint