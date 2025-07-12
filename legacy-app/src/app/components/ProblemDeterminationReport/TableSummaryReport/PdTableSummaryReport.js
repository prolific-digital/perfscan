import React, { useEffect, useState, useContext } from "react";
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from "react-redux";
import * as _ from 'lodash';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { renderFindings, checkSystemStatus } from "../../../../helpers/summaryHelpers";
import DetailedContextReport from "../DetailedMetricsContextReport/DetailedContextReport";
import {
  fetchAsyncSummaryDataCPUReport,
  getExSummaryCPUDataReport,
  fetchAsyncSummaryDataDiskReport,
  getExSummaryDiskDataReport,
  fetchAsyncSummaryDataMemoryReport,
  getExSummaryMemoryDataReport,
  fetchAsyncSummaryDataOtherReport,
  getExSummaryOtherDataReport,
  fetchAsyncTrendCalculationsReport,
  getExSummaryTrendCalculationReport
} from "../../../../store/slices/reports/ReportDatatables/executiveSummaryReportSlice";
import SectionHeader from "../../SectionHeader";
import { getManagedSystemMetrics } from '../../../../services/apiService';
import GridLoader from "react-spinners/GridLoader";
import PrintPageHeader from "../../../pages/PrintPageHeader";


const PdTableSummaryReport = ({ runReportStateValue, reportId, filters }) => {
  const { detailsButtonClickHandle } = useContext(DetailedContextReport)
  const dispatch = useDispatch();
  let qd = null;
  const getSysId = filters?.sysid
  if (runReportStateValue === false) {
    qd = reportId;
  }
  const pdCpuData = useSelector(getExSummaryCPUDataReport);
  const pdDiskData = useSelector(getExSummaryDiskDataReport);
  const pdMemoryData = useSelector(getExSummaryMemoryDataReport);
  const pdOtherData = useSelector(getExSummaryOtherDataReport);
  const trendData = useSelector(getExSummaryTrendCalculationReport)
  useEffect(() => {
    if (getSysId !== undefined) {
      dispatch(fetchAsyncSummaryDataCPUReport(qd));
      dispatch(fetchAsyncSummaryDataDiskReport(qd));
      dispatch(fetchAsyncSummaryDataMemoryReport(qd));
      dispatch(fetchAsyncSummaryDataOtherReport(qd));
      dispatch(fetchAsyncTrendCalculationsReport(qd))
    }
  }, [dispatch, getSysId]);

  /* @@@@@@@ AllFunctions @@@@@@@ */

  const renderHeader = (head, ord) => {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h5 style={{ textAlign: "center" }}>{head}</h5>
        </div>
        <span style={{ float: "right" }}>
          <Button onClick={() => detailsButtonClickHandle(ord)}>Details</Button>
        </span>
      </div>
    )
  }

  useEffect(() => {
    fetchManagedSystemMetrics(reportId.rptId);
  }, [])

  const [msMetrics, setMsMetrics] = useState();
  const fetchManagedSystemMetrics = async (id) => {
    try {
      let response = await getManagedSystemMetrics(id);

      if (response.status === 200) {
        setMsMetrics(response.data.data)
      }
    } catch (error) {
    } finally {
    }
  }
  let isCpu = true;
  let isDisk = true;
  let isMemory = true;
  let isOther = true;
  if (msMetrics) {
    isCpu = msMetrics.cpu_utilization || msMetrics.no_of_cores || msMetrics.cpu_ms;
    isDisk = msMetrics.read_write_ratio || msMetrics.cache_hit_perc || msMetrics.total_disk_ops || msMetrics.disk_response_time || msMetrics.disk_arm_utilization || msMetrics.disk_space_utilization;
    isMemory = msMetrics.machine_pool_faulting || msMetrics.faulting_rate || msMetrics.top_pool_faulting_rate || msMetrics.memory_size_faulting || msMetrics.pool_faulting_rate;
    isOther = msMetrics.ethernet_line_utilization || msMetrics.response_time_5250 || msMetrics.total_transactions;
  }


  return (
    <>
    <div style={{ pageBreakAfter: "always" }}>
        <PrintPageHeader pageTitle={'Problem Determination Analysis'} sDate={filters.sDate} eDate={filters.eDate} mainmenu={true}/>
      </div>
      <div className="table_wrapper">
        <>
        {isCpu && pdCpuData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
        }
          {isCpu && !pdCpuData.loading && 
          <div style={{ pageBreakAfter: "always" }}>
          <DataTable
            value={pdCpuData.data.data}
            header={renderHeader('CPU', 1)}
            stripedRows
            showGridlines
            responsiveLayout="scroll"
          >
            <Column
              field="dtypedesc"
              header="Metric"
              align="center"
              style={{ width: "264px" }}
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
              field={(data, pd = true) => renderFindings(data, pd,trendData)}
              header="Findings"
            ></Column>
          </DataTable>
          </div>
        } 
        
        {isDisk && pdDiskData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
        }
        {isDisk && !pdDiskData.loading && 
        <div style={{ pageBreakAfter: "always" }}>
          <DataTable
            value={pdDiskData.data.data}
            header={renderHeader('DISK', 2)}
            stripedRows
            showGridlines
            responsiveLayout="scroll"
          >
            <Column
              field="dtypedesc"
              header="Metric"
              align="center"
              style={{ width: "264px" }}
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
              field={(data, pd = true) => renderFindings(data, pd,trendData)}
              header="Findings"
            ></Column>
          </DataTable>
          </div>
        } 

        {isMemory && pdMemoryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
        }
        {isMemory && !pdMemoryData.loading && 
        <div style={{ pageBreakAfter: "always" }}>
          <DataTable
            value={pdMemoryData.data.data}
            header={renderHeader("MEMORY", 3)}
            stripedRows
            showGridlines
            responsiveLayout="scroll"
          >
            <Column
              field="dtypedesc"
              header="Metric"
              align="center"
              style={{ width: "264px" }}
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
              field={(data, pd = true) => renderFindings(data, pd,trendData)}
              header="Findings"
            ></Column>
          </DataTable>
          </div>
        } 

        {isOther && pdOtherData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
        }
        {isOther && !pdOtherData.loading && 
        <div style={{ pageBreakAfter: "always" }}>
          <DataTable
            value={pdOtherData.data.data}
            header="OTHER"
            stripedRows
            showGridlines
            responsiveLayout="scroll"
          >
            <Column
              field="dtypedesc"
              header="Metric"
              align="center"
              style={{ width: "264px" }}
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
              field={(data, pd = true) => renderFindings(data, pd,trendData)}
              header="Findings"
            ></Column>
          </DataTable>
          </div>
        } 
        </>
        {/* }  */}
      </div>
    </>
  )
}

export default PdTableSummaryReport