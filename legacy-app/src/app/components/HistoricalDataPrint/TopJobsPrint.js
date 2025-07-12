import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useSelector, useDispatch } from "react-redux";
import {
  getTopJobsData, fetchAsyncTopJobs
} from "../../../store/slices/topJobs/topJobsSlice";
import { FilterMatchMode } from "primereact/api";
import Loading from "../Loading";
import * as _ from "lodash";
import CpuJobType from "../HistoricalData/TopJobs/PieCharts/CpuJobType";
import TotaliosJobType from "../HistoricalData/TopJobs/PieCharts/TotaliosJobType";
import SynciosJobType from "../HistoricalData/TopJobs/PieCharts/SynciosJobType";
import AsynciosJobType from "../HistoricalData/TopJobs/PieCharts/AsynciosJobType";
import FaultsJobType from "../HistoricalData/TopJobs/PieCharts/FaultsJobType";
import useQueryData from "../../../hooks/useQueryDataHistorical";
import { Nav, NavLink } from "reactstrap";

const TopJobsPrint = ({ printButton }) => {
  const topJobsData = useSelector(getTopJobsData);
  const dispatch = useDispatch();
  const qd = useQueryData();

  /* State variables */
  const [checkData, setCheckData] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    dispatch(fetchAsyncTopJobs(qd));
  }, [dispatch]);

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
        Reports
      </div>
      <div style={{ pageBreakAfter: "always" }}>

        {topJobsData.loading && _.isEmpty(topJobsData.data) && (
          <div style={{ textAlign: "center" }}>Loading...</div>
        )}
        {!topJobsData.loading && !_.isEmpty(topJobsData.data) && checkData && (
          <DataTable
            value={tableData}
            header={header}
            className="systems-table"
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
            <Column header="Job Name" field="jbname" sortable filter></Column>
            <Column header="User" field="jbuser" sortable filter></Column>
            <Column header="Job Num" field="jbnbr" sortable filter></Column>
            <Column header="CPU ms" field="cpu" sortable filter></Column>
            <Column
              header="Total IOs"
              field="totalios"
              sortable
              filter
            ></Column>
            <Column
              header="Sync IOs"
              field="syncios"
              sortable
              filter
            ></Column>
            <Column
              header="Async IOs"
              field="asyncios"
              sortable
              filter
            ></Column>
            <Column header="Faults" field="faults" sortable filter></Column>
          </DataTable>
        )}
        {!topJobsData.loading && checkData === false && (
          <div style={{ textAlign: "center", padding: "15em" }}>
            No data available for Top Jobs Data Table
          </div>
        )}

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
          {!topJobsData.loading && (!_.isEmpty(topJobsData.data)) && <CpuJobType runReportStateValue={undefined} print={true}/>}
          </div>
        </div>

        {/* inside pie  tabs  under performance insights starts */}
        <div style={{ pageBreakAfter: "always", textAlign: "center" }}>
        <NavLink className={"active"}> Total IOs </NavLink>

          {/* inside pie  tabs data under performance insights ends */}

          {/* inside pie  tabs data under performance insights starts */}

          <div className="pie-chart-wrapper">
          {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
          {!topJobsData.loading && (!_.isEmpty(topJobsData.data)) && <TotaliosJobType runReportStateValue={undefined} print={true}/>}
          </div>
        </div>

        {/* inside pie  tabs  under performance insights starts */}
        <div style={{ pageBreakAfter: "always", textAlign: "center" }}>
        <NavLink className={"active"}>  Sync IOs </NavLink>

          {/* inside pie  tabs data under performance insights ends */}

          {/* inside pie  tabs data under performance insights starts */}

          <div className="pie-chart-wrapper">
          {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
          {!topJobsData.loading && (!_.isEmpty(topJobsData.data)) && <SynciosJobType runReportStateValue={undefined} print={true}/>}
          </div>
        </div>
        {/* inside pie  tabs  under performance insights starts */}
        <div style={{ pageBreakAfter: "always", textAlign: "center" }}>
        <NavLink className={"active"}> Async IOs </NavLink>

          {/* inside pie  tabs data under performance insights ends */}

          {/* inside pie  tabs data under performance insights starts */}

          <div className="pie-chart-wrapper">
          {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
          {!topJobsData.loading && (!_.isEmpty(topJobsData.data)) && <AsynciosJobType runReportStateValue={undefined} print={true}/>}
          </div>
        </div>
        {/* inside pie  tabs  under performance insights starts */}
        <div style={{ pageBreakAfter: "always", textAlign: "center" }}>
        <NavLink className={"active"}> Faults </NavLink>

          {/* inside pie  tabs data under performance insights ends */}

          {/* inside pie  tabs data under performance insights starts */}

          <div className="pie-chart-wrapper">
          {topJobsData.loading && (_.isEmpty(topJobsData.data)) && <Loading />}
          {!topJobsData.loading && (!_.isEmpty(topJobsData.data)) && <FaultsJobType runReportStateValue={undefined} print={true}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopJobsPrint;
