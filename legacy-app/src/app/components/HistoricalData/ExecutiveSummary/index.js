import React, { useEffect, useState, memo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector, useDispatch } from "react-redux";
import ReportHeaderDetails from "../../ReportHeaderDetails";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import { fetchAsyncAppMetrics } from "../../../../store/slices/settings";
import { checkSystemStatus, renderFindings } from "../../../../helpers/summaryHelpers";
import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";
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
} from '../../../../store/slices/datatables/executiveSummarySlice';
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { fetchAsyncGlobalConfig, getGlobalConfig } from "../../../../store/slices/appconfig/AppConfigSlice";

const ExecutiveSummary = ({print}) => {
  const filters = useSelector(state => state.filters);
  const dFilter = filters.historical_date_filter; //dates
  const sFilter = filters.system_filter; //system 
  const qd = useQueryData();
  const cpuData = useSelector(getExSummaryCPUData);
  const diskData = useSelector(getExSummaryDiskData);
  const memoryData = useSelector(getExSummaryMemoryData);
  const otherData = useSelector(getExSummaryOtherData);
  const trendData = useSelector(getExSummaryTrendCalculation);
  const userID = getParametersFromLocalStorage("userID");
  const uuid = useSelector(getUuidData);
  const globalConfigData = useSelector(getGlobalConfig);

  const metrics_data_app = useSelector(state => state.settings.metrics_data_app);
  const [metrics, setMetrics] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    if(!uuid?.loading && uuid.data.uniqueid){
    dispatch(fetchAsyncAppMetrics({ systemID: filters.system_filter.id, userID: userID}));
    dispatch(fetchAsyncSummaryDataCPU(qd));
    dispatch(fetchAsyncSummaryDataDisk(qd));
    dispatch(fetchAsyncSummaryDataMemory(qd));
    dispatch(fetchAsyncSummaryDataOther(qd));
    dispatch(fetchAsyncGlobalConfig());
    dispatch(fetchAsyncTrendCalculations({sysid: filters.system_filter.id}))
    }
    if(print){
      dispatch(fetchAsyncAppMetrics({ systemID: filters.system_filter.id, userID: userID}));
      dispatch(fetchAsyncSummaryDataCPU(qd));
      dispatch(fetchAsyncSummaryDataDisk(qd));
      dispatch(fetchAsyncSummaryDataMemory(qd));
      dispatch(fetchAsyncSummaryDataOther(qd));
      dispatch(fetchAsyncTrendCalculations({sysid: filters.system_filter.id}))
      }
  }, [dispatch,uuid])

  useEffect(() => {
    setMetrics(metrics_data_app.data.data)
  }, [metrics_data_app.data.length])

  let isCpu = true;
  let isDisk = true;
  let isMemory = true;
  let isOther = true;
  if (metrics) {
    isCpu = metrics.cpu_utilization || metrics.no_of_cores || metrics.cpu_ms || metrics.cpw;
    isDisk = metrics.read_write_ratio || metrics.cache_hit_perc || metrics.total_disk_ops || metrics.disk_response_time || metrics.disk_arm_utilization || metrics.disk_space_utilization;
    isMemory = metrics.faulting_rate || metrics.pool_faulting_rate || metrics.machine_pool_faulting || metrics.top_pool_faulting_rate || metrics.memory_size_faulting;
    isOther = metrics.ethernet_line_utilization || metrics.response_time_5250 || metrics.total_transactions;
  }

  return (<>
    <div className="table_wrapper">
      <ReportHeaderDetails
        reportTitle={"Executive Summary"}
        sdate={dFilter.sdate}
        stime={dFilter.stime}
        edate={dFilter.edate}
        etime={dFilter.etime}
        server={sFilter.entity_name + ' - ' + sFilter.entity_description + ` - ${sFilter.entity_data.frame.serial_number}`}
      />
      {metrics && isCpu &&
        <div style={{ pageBreakAfter: "always" }}>
      {cpuData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
      {!cpuData.loading && 
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
            field={(data) => renderFindings(data,false,trendData,globalConfigData)}
            header="Findings"
          ></Column>
        </DataTable>
        }
        </div>
      }
      {metrics && isDisk &&
        <div style={{ pageBreakAfter: "always" }}>
        {diskData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
        }
        {isDisk && !diskData.loading &&
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
            field={(data) => renderFindings(data,false,trendData,globalConfigData)}
            header='Findings'
          ></Column>
        </DataTable>
        }
        </div>
      }
      {metrics && isMemory &&
        <div style={{ pageBreakAfter: "always" }}>
        {memoryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
        }
        {!memoryData.loading &&
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
            field={(data) => renderFindings(data,false,trendData,globalConfigData)}
            header="Findings"
          ></Column>
        </DataTable>
      }
        </div>
      }
      {metrics && isOther &&
        <div style={{ pageBreakAfter: "always" }}>
        {otherData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
        }
        {!otherData.loading && 
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
            field={(data) => renderFindings(data,false,trendData,globalConfigData)}
            header="Findings"
          ></Column>
        </DataTable>
        }
        </div>
      }
    </div>
  </>)
}

export default React.memo(ExecutiveSummary);