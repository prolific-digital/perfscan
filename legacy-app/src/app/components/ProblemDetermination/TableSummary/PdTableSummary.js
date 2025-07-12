import React, { useEffect, useContext, useState } from "react";
import { Button } from 'primereact/button';
import { 
  fetchAsyncSummaryDataCPU,
  getExSummaryCPUData,
  fetchAsyncSummaryDataDisk,
  getExSummaryDiskData,
  fetchAsyncSummaryDataMemory,
  getExSummaryMemoryData,
  fetchAsyncSummaryDataOther,
  getExSummaryOtherData,
  fetchAsyncTrendCalculations,
  getExSummaryTrendCalculation
} from "../../../../store/slices/datatables/executiveSummarySlice";
import { fetchAsyncAppMetrics } from "../../../../store/slices/settings";
import { useDispatch, useSelector } from "react-redux";
import * as _ from 'lodash';
import moment from "moment";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { renderFindings,checkSystemStatus } from "../../../../helpers/summaryHelpers";
import usePDQueryData from "../QueryDates/usePDQueryData";
import DetailedContext from "../DetailedMetricsContext/DetailedContext";
import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { counterTogglePDTopJobs } from "../../../../store/slices/topJobs/toggleTopJobsButton";

const PdTableSummary = ({runReportStateValue, loadingReport}) => {
    const { detailsButtonClickHandle } = useContext(DetailedContext)
    const [metrics, setMetrics] = useState();
    const filters = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const userId = getParametersFromLocalStorage("userID");
    let qd = usePDQueryData();
    const uuid = useSelector(getUuidData);
    const getSysId = useSelector(state=>state.filters.system_filter?.id);
    const metrics_data_app = useSelector(state => state.settings.metrics_data_app);
    const trendData = useSelector(getExSummaryTrendCalculation);
    if(runReportStateValue === false){
       qd = {
          sdate: moment(new Date()).format(),
          edate: moment(new Date()).format(),
          stime: moment(new Date()).subtract(15,'minutes').format('h:mm:ss'), 
          etime: moment(new Date()).format('h:mm:ss'),
          sysid: getSysId,
          pd:true,
          userId : userId
      }
   }
    const pdCpuData = useSelector(getExSummaryCPUData);
    const pdDiskData = useSelector(getExSummaryDiskData);
    const pdMemoryData = useSelector(getExSummaryMemoryData);
  const pdOtherData = useSelector(getExSummaryOtherData);
  useEffect(() => {
    if(!uuid?.loading && uuid.data.uniqueid){
    dispatch(fetchAsyncSummaryDataCPU(qd));
    dispatch(fetchAsyncSummaryDataDisk(qd));
    dispatch(fetchAsyncSummaryDataMemory(qd));
    dispatch(fetchAsyncSummaryDataOther(qd));
    dispatch(fetchAsyncAppMetrics({systemID: filters.system_filter.id, userID : userId}));
    dispatch(fetchAsyncTrendCalculations({sysid: filters.system_filter.id}))
   }
  }, [dispatch, uuid]);

  let isCpu = true;
  let isDisk = true;
  let isMemory = true;
  let isOther = true;

  useEffect(() => {
    setMetrics(metrics_data_app.data.data)
  },[metrics_data_app.data.length])

  if (metrics) {
    isCpu = metrics.cpu_utilization || metrics.no_of_cores || metrics.cpu_ms;
    isDisk = metrics.read_write_ratio || metrics.cache_hit_perc || metrics.total_disk_ops || metrics.disk_response_time || metrics.disk_arm_utilization || metrics.disk_space_utilization;
    isMemory = metrics.machine_pool_faulting || metrics.faulting_rate || metrics.top_pool_faulting_rate || metrics.memory_size_faulting || metrics.pool_faulting_rate;
    isOther = metrics.ethernet_line_utilization || metrics.response_time_5250 || metrics.total_transactions;
  }
/* @@@@@@@ AllFunctions @@@@@@@ */

  const renderHeader = (head,ord) => {
    return (
        <div style={{display:"flex"}}>
           <div style={{flex:1}}>
            <h5 style={{textAlign:"center"}}>{head}</h5>
           </div>
            <span style={{float:"right"}}>
                <Button onClick={()=>{
                  detailsButtonClickHandle(ord); 
                  dispatch(counterTogglePDTopJobs(head ? true : false))}}>Details</Button>
            </span>
        </div>
    )
}

  return (
    <div className="table_wrapper">
      <>
      {isCpu && pdCpuData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }

      {isCpu && !pdCpuData.loading &&
       <DataTable
          value={pdCpuData.data.data}
          header={renderHeader('CPU',1)}
          stripedRows
          showGridlines
          responsiveLayout="scroll"
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
            field={(data,pd=true) => renderFindings(data,pd,trendData)}
            header="Findings"
          ></Column>
        </DataTable>   
      } 

      {isDisk && pdDiskData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }

      {isDisk && !pdDiskData.loading && 
       <DataTable
          value={pdDiskData.data.data}
          header= {renderHeader('DISK',2)}
          stripedRows
          showGridlines
          responsiveLayout="scroll"
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
            field={(data,pd=true) => renderFindings(data,pd,trendData)}
            header="Findings"
          ></Column>
        </DataTable>   
      } 
    
      {isMemory && pdMemoryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }

      {isMemory && !pdMemoryData.loading && 
        <DataTable
          value={pdMemoryData.data.data}
          header={renderHeader("MEMORY",3)}
          stripedRows
          showGridlines
          responsiveLayout="scroll"
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
            field={(data,pd=true) => renderFindings(data,pd,trendData)}
            header="Findings"
          ></Column>
        </DataTable>
      } 

      {isOther && pdOtherData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div> 
      } 

      {isOther && !pdOtherData.loading && 
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
            field={(data,pd=true) => renderFindings(data,pd,trendData)}
            header="Findings"
          ></Column>
        </DataTable> 
      } 
      </>
    </div>
  )
}

export default PdTableSummary