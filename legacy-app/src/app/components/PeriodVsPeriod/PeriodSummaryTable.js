import React,{ useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncAppMetrics } from "../../../store/slices/settings";
import * as _ from 'lodash';
import usePeriodQueryData from "../../../hooks/usePeriodQueryData";
import {
  // fetchAsyncPeriodDataCPU, getPeriodCPUData,
  // fetchAsyncperiodDataMemory, getPeriodMemoryData,
  // fetchAsyncperiodDataDisk, getPeriodDiskData,
  // fetchAsyncperiodDataOther, getPeriodOtherData,
  fetchAsyncPeriodDataCPUActual, getPeriodCPUDataActual,
  fetchAsyncperiodDataMemoryActual, getPeriodMemoryDataActual,
  fetchAsyncperiodDataDiskActual, getPeriodDiskDataActual,
  fetchAsyncperiodDataOtherActual, getPeriodOtherDataActual
} from '../../../store/slices/periodVsPeriodCharts/periodDataTableSlice';
import {
  renderFindings,
  calcPercentDiff,
  checkSystemStatusForPVsP,
  getParametersFromLocalStorage} from '../../../helpers/commonHelper';
import "../../../stylesheets/main.scss"
import moment from 'moment';
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from '../../../store/slices/reports/SaveNewReport/SaveNewReport';

function PeriodSummaryTable(props) {
  const [metrics, setMetrics] = useState({});
  const pqd = usePeriodQueryData();
  const dispatch = useDispatch();
  const uuid = useSelector(getUuidData);
  // const cpuStatus = useSelector(getPeriodCPUData);
  // const diskStatus = useSelector(getPeriodDiskData);
  // const memorySummaryStatus = useSelector(getPeriodMemoryData);
  // const otherSummaryStatus = useSelector(getPeriodOtherData);
  
  const cpuSummaryData = useSelector(getPeriodCPUDataActual);
  const diskSummaryData = useSelector(getPeriodDiskDataActual);
  const memorySummaryData = useSelector(getPeriodMemoryDataActual);
  const otherSummaryData = useSelector(getPeriodOtherDataActual);
  const metrics_data_app = useSelector(state => state.settings.metrics_data_app);
  const filters = useSelector(state => state.filters);
  const pFilter = filters.period_filter; //dates
  const userID = getParametersFromLocalStorage("userID");
  const system = getParametersFromLocalStorage("PeriodSaveFilter");
  const system1 = getParametersFromLocalStorage("systemfilter");
  const system2 = getParametersFromLocalStorage("_systemfilter");

  let period1 = "";
  let period2 = "";
  let period1_dt = "";
  let period1_t = ""; //time
  let period2_dt = "";
  let period2_t = ""; //time
  let isPeriodSame = false;
  let isCpu = false;
  let isDisk = false;
  let isMemory = false;
  let isOther = false;
  // Show only start date if both start and end date are same
  const period1_sdate = moment(pFilter[0].sdate).unix()
  const period1_edate = moment(pFilter[0].edate).unix()
  const period1_stime = pFilter[0].stime
  const period1_etime = pFilter[0].etime

  if( period1_sdate === period1_edate )
  {
  period1 = moment(pFilter[0].sdate).format("MMM Do YYYY");
  period1_dt = period1_sdate;
} else {
       period1 = moment(pFilter[0].sdate).format("MMM Do YYYY") + ' - ' + moment(pFilter[0].edate).format("MMM Do YYYY");
}

//needs to discuss this period time logic for isperiodsame variable
if (period1_stime === period1_etime) {
  period1_t = period1_stime;
}

// Show only start date if both start and end date are same
const period2_sdate = moment(pFilter[1].sdate).unix();
const period2_edate = moment(pFilter[1].edate).unix();
const period2_stime = pFilter[1].stime;
const period2_etime = pFilter[1].etime;

  if( period2_sdate === period2_edate )
  {
  period2 = moment(pFilter[1].sdate).format("MMM Do YYYY");
  period2_dt = period2_sdate;
} else {
      period2 = moment(pFilter[1].sdate).format("MMM Do YYYY") + ' - ' + moment(pFilter[1].edate).format("MMM Do YYYY");
}

//needs to discuss this period time logic for isperiodsame variable
if (period2_stime === period2_etime) {
  period2_t = period2_stime;
}

if(system.sysOpt === "Single"){
  if((period1_dt === period2_dt) && (period1_t === period2_t) && period1_dt && period2_dt && period1_t && period2_t){
    isPeriodSame = true;
  }
}
else if(system.sysOpt === "Multiple"){
  if((period1_dt === period2_dt) && (period1_t === period2_t) && 
      (system1.entity_name === system2.entity_name) &&
      period1_dt && period2_dt && period1_t && period2_t
      ){
    isPeriodSame = true;
  }
}

  useEffect(() => {
    if(!uuid?.loading && uuid.data.uniqueid){
    // dispatch(fetchAsyncPeriodDataCPU(pqd));
    dispatch(fetchAsyncPeriodDataCPUActual(pqd))

    // dispatch(fetchAsyncperiodDataMemory(pqd));
    dispatch(fetchAsyncperiodDataDiskActual(pqd))

    // dispatch(fetchAsyncperiodDataDisk(pqd));
    dispatch(fetchAsyncperiodDataMemoryActual(pqd))

    // dispatch(fetchAsyncperiodDataOther(pqd)); 
    dispatch(fetchAsyncperiodDataOtherActual(pqd))

    // dispatch(fetchAsyncAppMetrics({systemID: filters.system_filter.id, userID : userID}));
   }  
  }, [dispatch, uuid])

  // useEffect(() => {
  //   if (cpuStatus?.status === "completed" ) { //&& _.isEmpty(cpuSummaryData?.data)
  //         dispatch(fetchAsyncPeriodDataCPUActual(pqd))
  //       }
  //       if(diskStatus?.status === "completed"){ // && _.isEmpty(diskSummaryData?.data)
  //         dispatch(fetchAsyncperiodDataDiskActual(pqd))
  //   }
  //       if(memorySummaryStatus?.status === "completed"){ //&& _.isEmpty(memorySummaryData?.data)
  //         dispatch(fetchAsyncperiodDataMemoryActual(pqd))
  //       }
  //       if(otherSummaryStatus?.status === "completed"){ //&& _.isEmpty(otherSummaryData?.data)
  //         dispatch(fetchAsyncperiodDataOtherActual(pqd))
  //   }
  //   }, [
  //     cpuStatus?.status,
  //   diskStatus?.status,
  //   memorySummaryStatus?.status,
  //      otherSummaryStatus?.status,
  //     ])
    

  useEffect(() => {
        setMetrics(metrics_data_app.data)
  },[metrics_data_app.data])

      
  if (metrics) {
      isCpu = (metrics?.data?.cpu_utilization || (metrics?.sys1?.cpu_utilization || metrics?.sys2?.cpu_utilization)) || 
              (metrics?.data?.no_of_cores || (metrics?.sys1?.no_of_cores || metrics?.sys2?.no_of_cores)) || 
              (metrics?.data?.cpu_ms || (metrics?.sys1?.cpu_ms || metrics?.sys2?.cpu_ms)) || 
              (metrics?.data?.cpw || (metrics?.sys1?.cpw || metrics?.sys2?.cpw));

      isDisk =  (metrics?.data?.read_write_ratio || (metrics?.sys1?.read_write_ratio || metrics?.sys2?.read_write_ratio)) || 
                (metrics?.data?.cache_hit_perc || (metrics?.sys1?.cache_hit_perc || metrics?.sys2?.cache_hit_perc)) || 
                (metrics?.data?.total_disk_ops || (metrics?.sys1?.total_disk_ops || metrics?.sys2?.total_disk_ops)) || 
                (metrics?.data?.disk_response_time || (metrics?.sys1?.disk_response_time || metrics?.sys2?.disk_response_time)) || 
                (metrics?.data?.disk_arm_utilization || (metrics?.sys1?.disk_arm_utilization || metrics?.sys2?.disk_arm_utilization)) || 
                (metrics?.data?.disk_space_utilization || (metrics?.sys1?.disk_space_utilization || metrics?.sys2?.disk_space_utilization));

      isMemory =  (metrics?.data?.machine_pool_faulting || (metrics?.sys1?.machine_pool_faulting || metrics?.sys2?.machine_pool_faulting)) || 
                  (metrics?.data?.faulting_rate || (metrics?.sys1?.faulting_rate || metrics?.sys2?.faulting_rate)) || 
                  (metrics?.data?.top_pool_faulting_rate || (metrics?.sys1?.top_pool_faulting_rate || metrics?.sys2?.top_pool_faulting_rate)) || 
                  (metrics?.data?.memory_size_faulting || (metrics?.sys1?.memory_size_faulting || metrics?.sys2?.memory_size_faulting)) || 
                  (metrics?.data?.pool_faulting_rate || (metrics?.sys1?.pool_faulting_rate || metrics?.sys2?.pool_faulting_rate));

      isOther =   (metrics?.data?.ethernet_line_utilization || (metrics?.sys1?.ethernet_line_utilization || metrics?.sys2?.ethernet_line_utilization)) || 
                  (metrics?.data?.response_time_5250 || (metrics?.sys1?.response_time_5250 || metrics?.sys2?.response_time_5250)) || 
                  (metrics?.data?.total_transactions || (metrics?.sys1?.total_transactions || metrics?.sys2?.total_transactions));
  }

  return (
    <>
      {/* !!!!!!!!!!!!!!!!!!! CPU Data Table !!!!!!!!!!!!!!!!!!!!!! */}
    <div className={isCpu ? 'table_wrapper' : ''}>
    {isCpu && cpuSummaryData?.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
      <div className='wrapDataTables'>
          { !cpuSummaryData?.loading && !_.isEmpty(cpuSummaryData?.data) && isCpu &&
            <>
              {
                <table className="table table-bordered table-striped tableAlign">
                  <thead>
                      <tr style={{backgroundColor:'#efefef'}}> 
                        <th colSpan="6" style={{textAlign:"center", fontSize:"x-large"}}>CPU</th>
                    </tr>
                    <tr style={{backgroundColor:'#efefef'}}>
                      {filters.period_save_filter.sysOpt === "Multiple" ?
                      <>
                      <th colSpan="3">{`${filters.system_filter.entity_name}-${filters.system_filter.entity_description}`}</th>
                      <th colSpan="3">{`${filters._system_filter.entity_name}-${filters._system_filter.entity_description}`}</th> 
                      </>:
                      <>
                        <th colSpan="3">{`${filters.system_filter.entity_name}-${filters.system_filter.entity_description}`}</th>
                        <th colSpan="3">{`${filters.system_filter.entity_name}-${filters.system_filter.entity_description}`}</th> 
                        </>
                        }
                    </tr>
                      <tr style={{backgroundColor:'#efefef'}}>
                        <th colSpan="3" style={{textAlign:"center"}}>{period1}</th>
                        <th colSpan="3" style={{textAlign:"center"}}>{period2}</th>
                    </tr>

                      <tr style={{backgroundColor:'#75c5f0'}}>
                        <th style={{align:"center",height:"71px", width:"180px"}}>Core Metric</th>
                        <th style={{align:"center",height:"71px", width:"100px"}}>Status</th>
                        <th style={{align:"center",height:"71px"}}>Observations</th>
                        <th style={{align:"center",height:"71px", width:"100px"}}>Status</th>
                        <th style={{align:"center",height:"71px"}}>Observations</th>
                        <th style={{align:"center",height:"71px"}}>Comparing Performance</th>                                        
                    </tr>
                  </thead>
                    {cpuSummaryData?.data[0]?.data?.map((res,valIndex)=> {
                    return (
                      <tbody key={valIndex}>
                        <tr>
                                  <td style={{height:"auto", width:"180px"}}>{res.dtypedesc}</td>
                          <td style={{ height: "auto", width: "100px" }}>
                            {checkSystemStatusForPVsP(res, 0)}
                          </td>
                                  <td style={{height:"auto"}}>{renderFindings(res,0)}
                          </td>
                                  <td style={{height:"auto", width:"100px", backgroundColor: "aliceblue"}}>
                                      {isPeriodSame ? checkSystemStatusForPVsP(res,0) : checkSystemStatusForPVsP(res,1)}
                          </td>
                                  <td style={{height:"auto", backgroundColor: "aliceblue"}}>
                                    {isPeriodSame ? renderFindings(res,0) : renderFindings(res,1)}
                          </td>
                          <td style={{ height: "auto" }}>
                                    {isPeriodSame ? calcPercentDiff(res.data[0],res.data[0],res) : calcPercentDiff(res.data[0],res.data[1],res)}
                          </td>
                        </tr>
                      </tbody>
                      )
                    }) 
                  }
                </table>
              }
            </>
          }
        </div>
      </div>
      {/* !!!!!!!!!!!!!!!!!!! Disk Data Table !!!!!!!!!!!!!!!!!!!!!! */}
    <div className={isDisk?'table_wrapper':''}>
    {isDisk && diskSummaryData?.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
      <div className='wrapDataTables'>
          { !diskSummaryData?.loading && !_.isEmpty(diskSummaryData?.data) && isDisk &&
              <>
                {
                  <table className="table table-bordered table-striped tableAlign">
                    <thead>
                      <tr style={{backgroundColor:'#efefef'}}>
                        <th colSpan="6" style={{textAlign:"center", fontSize:"x-large"}}>DISK</th>
                      </tr>
                      <tr style={{backgroundColor:'#efefef'}}>
                      {filters.period_save_filter.sysOpt === "Multiple" ?
                      <>
                      <th colSpan="3">{`${filters.system_filter.entity_name}-${filters.system_filter.entity_description}`}</th>
                      <th colSpan="3">{`${filters._system_filter.entity_name}-${filters._system_filter.entity_description}`}</th> 
                      </>:
                      <>
                        <th colSpan="3">{`${filters.system_filter.entity_name}-${filters.system_filter.entity_description}`}</th>
                        <th colSpan="3">{`${filters.system_filter.entity_name}-${filters.system_filter.entity_description}`}</th> 
                        </>
                        }
                    </tr>
                      <tr style={{backgroundColor:'#efefef'}}>
                        <th colSpan="3" style={{textAlign:"center"}}>{period1}</th>
                        <th colSpan="3" style={{textAlign:"center"}}>{period2}</th>
                      </tr>
                      
                      <tr style={{backgroundColor:'#75c5f0'}}>
                        <th style={{align:"center",height:"71px", width:"180px"}}>Core Metric</th>
                        <th style={{align:"center",height:"71px", width:"100px"}}>Status</th>
                        <th style={{align:"center",height:"71px"}}>Observations</th>
                        <th style={{align:"center",height:"71px", width:"100px"}}>Status</th>
                        <th style={{align:"center",height:"71px"}}>Observations</th>
                        <th style={{align:"center",height:"71px"}}>Comparing Performance</th>                                        
                      </tr>
                    </thead>
                  {
                    diskSummaryData?.data[0]?.data?.map((res,valIndex)=> {
                      return (
                        <tbody key={valIndex}>
                          <tr>
                                  <td style={{height:"auto", width:"180px"}}>{res.dtypedesc}</td>
                            <td style={{ height: "auto", width: "100px" }}>
                              {checkSystemStatusForPVsP(res, 0)}
                            </td>
                                  <td style={{height:"auto"}}>{renderFindings(res,0)}</td>
                                  <td style={{height:"auto", width:"100px", backgroundColor: "aliceblue"}}>
                                    {isPeriodSame ? checkSystemStatusForPVsP(res,0) : checkSystemStatusForPVsP(res,1)}
                            </td>
                                  <td style={{height:"auto", backgroundColor: "aliceblue"}}>
                                    {isPeriodSame ? renderFindings(res,0) : renderFindings(res,1)}
                            </td>
                            <td style={{ height: "auto" }}>
                                    {isPeriodSame ? calcPercentDiff(res.data[0],res.data[0],res) : calcPercentDiff(res.data[0],res.data[1],res)}
                            </td>
                          </tr>
                        </tbody>
                      )
                    }) 
                  }
                  </table>
                }
              </>
          }
        </div>
      </div>
      {/* !!!!!!!!!!!!!!!!!!! Memory Data Table !!!!!!!!!!!!!!!!!!!!!! */}
    <div className={isMemory?'table_wrapper':''}>
    {isMemory && memorySummaryData?.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
      <div className='wrapDataTables'>
          { !memorySummaryData?.loading && !_?.isEmpty(memorySummaryData.data) && isMemory &&
              <>
                {
                  <table className="table table-bordered table-striped tableAlign">
                    <thead>
                      <tr style={{backgroundColor:'#efefef'}}>
                        <th colSpan="6" style={{textAlign:"center", fontSize:"x-large"}}>MEMORY</th>
                      </tr>
                      <tr style={{backgroundColor:'#efefef'}}>
                      {filters.period_save_filter.sysOpt === "Multiple" ?
                      <>
                      <th colSpan="3">{`${filters.system_filter.entity_name}-${filters.system_filter.entity_description}`}</th>
                      <th colSpan="3">{`${filters._system_filter.entity_name}-${filters._system_filter.entity_description}`}</th> 
                      </>:
                      <>
                        <th colSpan="3">{`${filters.system_filter.entity_name}-${filters.system_filter.entity_description}`}</th>
                        <th colSpan="3">{`${filters.system_filter.entity_name}-${filters.system_filter.entity_description}`}</th> 
                        </>
                        }
                    </tr>
                      <tr style={{backgroundColor:'#efefef'}}>
                        <th colSpan="3" style={{textAlign:"center"}}>{period1}</th>
                        <th colSpan="3" style={{textAlign:"center"}}>{period2}</th>
                      </tr>

                      <tr style={{backgroundColor:'#75c5f0'}}>
                        <th style={{align:"center",height:"71px", width:"180px"}}>Core Metric</th>
                        <th style={{align:"center",height:"71px", width:"100px"}}>Status</th>
                        <th style={{align:"center",height:"71px"}}>Observations</th>
                        <th style={{align:"center",height:"71px", width:"100px"}}>Status</th>
                        <th style={{align:"center",height:"71px"}}>Observations</th>
                        <th style={{align:"center",height:"71px"}}>Comparing Performance</th>                                        
                      </tr>
                    </thead>
                  {
                    memorySummaryData?.data[0]?.data?.map((res,valIndex)=> {
                      return (
                        <tbody key={valIndex}>
                          <tr>
                                  <td style={{height:"auto", width:"180px"}}>{res.dtypedesc}</td>
                            <td style={{ height: "auto", width: "100px" }}>
                              {checkSystemStatusForPVsP(res, 0)}
                            </td>
                                  <td style={{height:"auto"}}>{renderFindings(res,0)}</td>
                                  <td style={{height:"auto", width:"100px", backgroundColor: "aliceblue"}}>
                                    {isPeriodSame ? checkSystemStatusForPVsP(res,0) : checkSystemStatusForPVsP(res,1)}
                            </td>
                                  <td style={{height:"auto", backgroundColor: "aliceblue"}}>
                                    {isPeriodSame ? renderFindings(res,0) : renderFindings(res,1)}
                            </td>
                            <td style={{ height: "auto" }}>
                                    {isPeriodSame ? calcPercentDiff(res.data[0],res.data[0],res) : calcPercentDiff(res.data[0],res.data[1],res)}
                            </td>
                          </tr>
                        </tbody>
                      )
                    }) 
                  }
                  </table>
                }
              </>
          }
        </div>
      </div>
      {/* !!!!!!!!!!!!!!!!!!! Other Data Table !!!!!!!!!!!!!!!!!!!!!! */}
    <div className={isOther?'table_wrapper':''}>  
    { isOther && otherSummaryData?.loading && 
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
      <div className='wrapDataTables'>
          { !otherSummaryData?.loading && !_.isEmpty(otherSummaryData?.data) && isOther &&
              <>
                {
                  <table className="table table-bordered table-striped tableAlign">
                    <thead>
                      <tr style={{backgroundColor:'#efefef'}}>
                        <th colSpan="6" style={{textAlign:"center", fontSize:"x-large"}}>OTHER</th>
                      </tr>
                      <tr style={{backgroundColor:'#efefef'}}>
                      {filters.period_save_filter.sysOpt === "Multiple" ?
                      <>
                      <th colSpan="3">{`${filters.system_filter.entity_name}-${filters.system_filter.entity_description}`}</th>
                      <th colSpan="3">{`${filters._system_filter.entity_name}-${filters._system_filter.entity_description}`}</th> 
                      </>:
                      <>
                        <th colSpan="3">{`${filters.system_filter.entity_name}-${filters.system_filter.entity_description}`}</th>
                        <th colSpan="3">{`${filters.system_filter.entity_name}-${filters.system_filter.entity_description}`}</th> 
                        </>
                        }
                    </tr>
                      <tr style={{backgroundColor:'#efefef'}}>
                        <th colSpan="3" style={{textAlign:"center"}}>{period1}</th>
                        <th colSpan="3" style={{textAlign:"center"}}>{period2}</th>
                      </tr>

                      <tr style={{backgroundColor:'#75c5f0'}}>
                        <th style={{align:"center",height:"71px", width:"180px"}}>Core Metric</th>
                        <th style={{align:"center",height:"71px", width:"100px"}}>Status</th>
                        <th style={{align:"center",height:"71px"}}>Observations</th>
                        <th style={{align:"center",height:"71px", width:"100px"}}>Status</th>
                        <th style={{align:"center",height:"71px"}}>Observations</th>
                        <th style={{align:"center",height:"71px"}}>Comparing Performance</th>                                        
                      </tr>
                    </thead>
                  {
                    otherSummaryData?.data[0]?.data?.map((res,valIndex)=> {
                      return (
                        <tbody key={valIndex}>
                          <tr>
                                  <td style={{height:"auto", width:"180px"}}>{res.dtypedesc}</td>
                                  <td style={{height:"auto", width:"100px"}}>{checkSystemStatusForPVsP(res,0)}</td>
                                  <td style={{height:"auto"}}>{renderFindings(res,0)}</td>
                                  <td style={{height:"auto", width:"100px", backgroundColor: "aliceblue"}}>
                                    {isPeriodSame ? checkSystemStatusForPVsP(res,0) : checkSystemStatusForPVsP(res,1)}
                            </td>
                                  <td style={{height:"auto", backgroundColor: "aliceblue"}}>
                                    {isPeriodSame ? renderFindings(res,0) : renderFindings(res,1)}
                            </td>
                            <td style={{ height: "auto" }}>
                                    {isPeriodSame ? calcPercentDiff(res.data[0],res.data[0],res) : calcPercentDiff(res.data[0],res.data[1],res)}
                            </td>
                          </tr>
                        </tbody>
                      )
                    }) 
                  }
                  </table>
                }
              </>
          }
        </div>
      </div>
    </>
  )
}

export default PeriodSummaryTable