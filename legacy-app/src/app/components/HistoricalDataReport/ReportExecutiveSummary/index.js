import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector, useDispatch } from "react-redux";
import ReportHeaderDetails from "../../ReportHeaderDetails";
import { checkSystemStatus, renderFindings } from "../../../../helpers/summaryHelpers";
import { fetchAsyncSummaryDataCPUReport , getExSummaryCPUDataReport,
fetchAsyncSummaryDataDiskReport , getExSummaryDiskDataReport,
fetchAsyncSummaryDataMemoryReport, getExSummaryMemoryDataReport,
fetchAsyncSummaryDataOtherReport, getExSummaryOtherDataReport,
fetchAsyncTrendCalculationsReport, getExSummaryTrendCalculationReport
} from "../../../../store/slices/reports/ReportDatatables/executiveSummaryReportSlice";
import GridLoader from "react-spinners/GridLoader";

const ExecutiveSummaryReport = ({queryReportData ,reportId,metrics}) => {
  const cpuData = useSelector(getExSummaryCPUDataReport);
  const diskData = useSelector(getExSummaryDiskDataReport);
  const memoryData = useSelector(getExSummaryMemoryDataReport);
  const otherData = useSelector(getExSummaryOtherDataReport);
  const trendData = useSelector(getExSummaryTrendCalculationReport)
  let isCpu = true;
  let isDisk = true;
  let isMemory = true;
  let isOther = true;
  const dispatch = useDispatch();

  if (metrics) {
    isCpu =
      metrics.cpu_utilization ||
      metrics.no_of_cores ||
      metrics.cpu_ms ||
      metrics.cpw;
    isDisk =
      metrics.read_write_ratio ||
      metrics.cache_hit_perc ||
      metrics.total_disk_ops ||
      metrics.disk_response_time ||
      metrics.disk_arm_utilization ||
      metrics.disk_space_utilization;
    isMemory =
      metrics.faulting_rate ||
      metrics.pool_faulting_rate ||
      metrics.machine_pool_faulting ||
      metrics.top_pool_faulting_rate;
    isOther =
      metrics.ethernet_line_utilization ||
      metrics.response_time_5250 ||
      metrics.total_transactions;
  }

  useEffect(() => {
    if(isCpu){
      dispatch(fetchAsyncSummaryDataCPUReport(reportId));
    }
    if(isDisk){
      dispatch(fetchAsyncSummaryDataDiskReport(reportId));
    }
    if(isMemory){
      dispatch(fetchAsyncSummaryDataMemoryReport(reportId));
    }
    if(isOther){
      dispatch(fetchAsyncSummaryDataOtherReport(reportId));
    }
    dispatch(fetchAsyncTrendCalculationsReport(reportId))
  }, [dispatch])

  let sysName;

  if((cpuData?.data?.params?.server && cpuData?.data?.params?.serverID)){
    sysName=(cpuData?.data?.params?.server + " - " +  cpuData?.data?.params?.serverID);
  }

  if(memoryData?.data?.params?.server && memoryData?.data?.params?.serverID){
    sysName=(memoryData?.data?.params?.server + " - " +  memoryData?.data?.params?.serverID);
  }

  if(diskData?.data?.params?.server &&  diskData?.data?.params?.serverID){
    sysName=(diskData?.data?.params?.server + " - " +  diskData?.data?.params?.serverID);
  }

  if(otherData?.data?.params?.server && otherData?.data?.params?.serverID){
    sysName=(otherData?.data?.params?.server + " - " +  otherData?.data?.params?.serverID);
  }

  return (<>
    <div className="table_wrapper">
      <ReportHeaderDetails
        reportTitle={"Executive Summary"}
        server={sysName}
        sdate={queryReportData.sdate}
        stime={queryReportData.stime}
        edate={queryReportData.edate}
        etime={queryReportData.etime}
      />
      {isCpu && cpuData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
      {isCpu && !cpuData.loading && 
        <div style={{ pageBreakAfter: "always" }}>
        <DataTable
          value={cpuData.data.data}
          header="CPU"
          stripedRows
          showGridlines
          responsiveLayout="scroll"
          key={"cpudata"}
        >
          <Column
            field="dtypedesc"
            header="Metric"
            align="center"
            style={{width:"264px"}}
          ></Column>
          <Column
            align="center"
            field={(data) => (
              <span className={checkSystemStatus(data)}>
                {checkSystemStatus(data)}
              </span>
            )}
            header="Status"
          ></Column>
          <Column
            field={(data) => renderFindings(data,false,trendData)}
            header="Findings"
          ></Column>
        </DataTable>
        </div>
      }
      {isDisk && diskData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
        }
        {isDisk && !diskData.loading &&
        <div style={{ pageBreakAfter: "always" }}>
        <DataTable
          value={diskData.data.data}
          header="Disk"
          stripedRows
          showGridlines
          responsiveLayout="scroll"
          key={"diskdata"}
        >
          <Column
            field="dtypedesc"
            header="Metric"
            align="center"
            style={{width:"264px"}}
          ></Column>
          <Column
            align="center"
            field={(data) => (
              <span className={checkSystemStatus(data)}>
                {checkSystemStatus(data)}
              </span>
            )}
            header="Status"
          ></Column>
          <Column
            field={(data) => renderFindings(data,false,trendData)}
            header="Findings"
          ></Column>
        </DataTable>
        </div>
        }
      
      {isMemory && memoryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
        }
        {isMemory && !memoryData.loading &&
        <div style={{ pageBreakAfter: "always" }}>
        <DataTable
          value={memoryData.data.data}
          header="Memory"
          stripedRows
          showGridlines
          responsiveLayout="scroll"
          key={"memorydata"}
        >
          <Column
            field="dtypedesc"
            header="Metric"
            align="center"
            style={{width:"264px"}}
          ></Column>
          <Column
            align="center"
            field={(data) => (
              <span className={checkSystemStatus(data)}>
                {checkSystemStatus(data)}
              </span>
            )}
            header="Status"
          ></Column>
          <Column
            field={(data) => renderFindings(data,false,trendData)}
            header="Findings"
          ></Column>
        </DataTable>
        </div>
      }
      
      {isOther && otherData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
        }
        {isMemory && !otherData.loading && 
        <div style={{ pageBreakAfter: "always" }}>
        <DataTable
          value={otherData.data.data}
          header="Other"
          stripedRows
          showGridlines
          responsiveLayout="scroll"
          key={"otherdata"}
        >
          <Column
            field="dtypedesc"
            header="Metric"
            align="center"
            style={{width:"264px"}}
          ></Column>
          <Column
            align="center"
            field={(data) => (
              <span className={checkSystemStatus(data)}>
                {checkSystemStatus(data)}
              </span>
            )}
            header="Status"
          ></Column>
          <Column
            field={(data) => renderFindings(data,false,trendData)}
            header="Findings"
          ></Column>
        </DataTable>
        </div>
      }
    </div>
  </>)
}

export default ExecutiveSummaryReport;