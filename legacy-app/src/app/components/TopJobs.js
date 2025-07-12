import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import CanvasJSReact from "../../scripts/canvasjs.stock.react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { getTopJobsChart } from "../../services/apiService";
import Loading from "../components/Loading";

const jobTypes = {
  1: "cpu",
  2: "asyncios",
  3: "syncios",
  4: "totalios",
  5: "faults",
};
const TopJobs = (props) => {
  const { title, date, selectedSystem, tabelData } = props;
  const [activeTabID, setActiveTabID] = useState(1);
  const [activeInternalTabID, setInternalActiveTabID] = useState(1);
  const [topJobFilterValue, setTopJobFilterValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [filters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: title || "Percentage Breakdown ",
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

  useEffect(() => {
    if (activeInternalTabID) {
      fetchTopJobsReportChart(jobTypes[activeInternalTabID]);
    }
  }, [activeInternalTabID]);

  const fetchTopJobsReportChart = async (jobType) => {
    try {
      setLoading(true);
      const queryData = {
        jobtype: jobType,
        ...(date.sdate.value && { sdate: date.sdate.value }),
        ...(date.edate.value && { edate: date.edate.value }),
        ...(date.stime.value && { stime: date.stime.value }),
        ...(date.etime.value && { etime: date.etime.value }),
        ...(selectedSystem.id && { sysid: selectedSystem.id }),
      };
      const responseTopJobsChart = await getTopJobsChart(queryData, jobType);
      if (responseTopJobsChart.status === 200) {
        const responseTopJobsChartData = responseTopJobsChart.data.data;
        setChartData(responseTopJobsChartData[0]);
      }
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
          <DataTable
            value={tabelData}
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
            <Column header="CPU ms" field="cpu" sortable></Column>
            <Column header="Total IOs" field="totalios" sortable></Column>
            <Column header="Sync IOs" field="syncios" sortable></Column>
            <Column header="Async IOs" field="asyncios" sortable></Column>
            <Column header="Faults" field="faults" sortable></Column>
          </DataTable>
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
                {loading ? (
                  <Loading />
                ) : (
                  <CanvasJSChart options={options} title={"CPU ms"} />
                )}
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="pie-chart-wrapper">
                {loading ? (
                  <Loading />
                ) : (
                  <CanvasJSChart options={options} title={"Total IOs"} />
                )}
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="pie-chart-wrapper">
                {loading ? (
                  <Loading />
                ) : (
                  <CanvasJSChart options={options} title={"Sync IOs"} />
                )}
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div className="pie-chart-wrapper">
                {loading ? (
                  <Loading />
                ) : (
                  <CanvasJSChart options={options} title={"Async IOs"} />
                )}
              </div>
            </TabPane>
            <TabPane tabId="5">
              <div className="pie-chart-wrapper">
                {loading ? (
                  <Loading />
                ) : (
                  <CanvasJSChart options={options} title={"Faults"} />
                )}
              </div>
            </TabPane>
          </TabContent>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default TopJobs;
