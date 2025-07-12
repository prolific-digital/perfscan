import React,{useState} from "react";
import { useSearchParams } from "react-router-dom";
import { Table } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { handlePrintDetails } from "../../helpers/commonHelper";
import CanvasJSReact from "../../scripts/canvasjs.stock.react";
import { ReportDetailsTableJSON, TopJobCPU } from "../../utils/constant";
import SectionHeader from "../components/SectionHeader";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import TopJobsData from "../../assets/top_jobs_data.json"

function ReportDetailsTest() {

  let [searchParams] = useSearchParams();
  const serverId = searchParams.get("id");
  const host = searchParams.get("host");
  const viewType = searchParams.get("viewType");
  const [activeInternalTabID, setInternalActiveTabID] = useState(1);
  const [activeTabID, setActiveTabID] = useState(1);
  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  let breadCrumbsList = [
    {
      id: 1,
      name: "Enterprise",
      url: "/enterprise-server",
    },
    {
      id: 2,
      name: serverId,
      url: `/metrics?id=${serverId}`,
    },
    {
      id: 3,
      name: host,
      url: `/metrics?id=${serverId}&host=${host}`,
    },
    {
      id: 4,
      name: viewType,
      url: ``,
    },
  ];

  const ViewTypeList = {
    "cpu_ms": "CPU ms", 
    "Number-of-Cores": "No. of Cores", 
    "Faulting-Rate": "Faulting Rate (Faults/Sec)", 
    "cache_hit_perc": "Cache Hit Percentage", 
    "Total-Disk-Operations": "Total Disk Operations", 
    "CPU-Utilization": "CPU Utilization", 
    "read_write_ratio": "Read Write Ration", 
    "executing_summary": "Executive Summary", 
    "Disk-Response-Time": "Disk Response Time", 
    "pool_faulting_rate": "Pool Faulting Rate", 
    "5250-Response-Time": "5250 Response Time", 
    "Total-Transactions": "Total Transactions", 
    "Disk-Arm-Utilization": "Disk Arm Utilization", 
    "memory_size_faulting": "Memory vs Size Faulting", 
    "top_jobs_utilisation": "Top Jobs Utilization", 
    "machine_pool_faulting": "Machine Pool Faulting", 
    "system_specifications": "System Specifications", 
    "Disk-Space-Utilization": "Disk Space Utilization", 
    "top_pool_faulting_rate": "Top Pool Faulting Rate", 
    "Ethernet-Line-Utilization": "Ethernet Line Utilization",
    "CPW-Utilization":"CPW Utilization"
  }
  
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Percentage Breakdown - CPU Ms Used",
      fontSize: 20,
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 18, label: "Direct" },
          { y: 49, label: "Organic Search" },
          { y: 9, label: "Paid Search" },
          { y: 5, label: "Referral" },
          { y: 19, label: "Social" },
        ],
      },
    ],
  };
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
    <>
    <div className="report_details_wrapper">
      <SectionHeader
        title={`Details -  CPU Utilization`}
        btnClickHandler={handlePrintDetails}
        breadCrumbsList={breadCrumbsList}
      />
      <div className="table_wrapper">
        <Table bordered>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Status</th>
              <th>Findings</th>
            </tr>
          </thead>
          <tbody>
            {ReportDetailsTableJSON.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{ViewTypeList[viewType]}</td>
                  <td>
                    <span className={data.metric_status}>
                      {data.metric_health}
                    </span>
                  </td>
                  <td className="findings_col">
                    {data.findings.map((d) => (
                      <div key={d.id} className={d.type}>
                        {d.msg}
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
  </div>
  <div style={{display: "flex"}}>
  <div class="topjobs-conatiner" >
        <div>
          <DataTable
              value={TopJobsData}
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
              
            </DataTable>
        </div>
    </div>
    <div className="topjobs-conatiner">
        <TabContent activeTab={String(activeTabID)}>
          <TabPane tabId="1">
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
                    
                </div>
              </TabPane>
              <TabPane tabId="2">
                <div className="pie-chart-wrapper">
                    
                </div>
              </TabPane>
              <TabPane tabId="3">
                <div className="pie-chart-wrapper">
                      
                </div>
              </TabPane>
              <TabPane tabId="4">
                <div className="pie-chart-wrapper">
                    
                </div>
              </TabPane>
              <TabPane tabId="5">
                <div className="pie-chart-wrapper">
                    
                </div>
              </TabPane>
            </TabContent>
          </TabPane>
        </TabContent>
      </div>
  </div>
  </>
  );
}

export default ReportDetailsTest;
