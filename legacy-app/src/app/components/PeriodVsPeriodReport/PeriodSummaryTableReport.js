import React,{useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import {
  renderFindings,
  calcPercentDiff,
  checkSystemStatusForPVsP} from '../../../helpers/commonHelper';
import "../../../stylesheets/main.scss"
import moment from 'moment';
import { fetchAsyncSummaryDataCPUReport, fetchAsyncSummaryDataDiskReport, fetchAsyncSummaryDataMemoryReport, fetchAsyncSummaryDataOtherReport, getExSummaryCPUDataReport, getExSummaryDiskDataReport, getExSummaryMemoryDataReport, getExSummaryOtherDataReport } from '../../../store/slices/reports/ReportDatatables/executiveSummaryReportSlice';
import GridLoader from "react-spinners/GridLoader";

function PeriodSummaryTableReport({reportId,metrics}) {
  const dispatch = useDispatch();
  const cpuSummaryData = useSelector(getExSummaryCPUDataReport);
  const diskSummaryData = useSelector(getExSummaryDiskDataReport);
  const memorySummaryData = useSelector(getExSummaryMemoryDataReport);
  const otherSummaryData = useSelector(getExSummaryOtherDataReport);
  const filters = useSelector(state => state.filters);
  const pFilter = filters.period_filter; //dates

  let period1 = "";
  let period2 = "";
  let period1_dt = "";
  let period1_t = ""; //time
  let period2_dt = "";
  let period2_t = ""; //time
  let isPeriodSame = false;
  let isCpu = true;
  let isDisk = true;
  let isMemory = true;
  let isOther = true;
  // Show only start date if both start and end date are same
    const period1_sdate = moment(cpuSummaryData?.data[0]?.params?.sdata || 
                                 diskSummaryData?.data[0]?.params?.sdata ||
                                 memorySummaryData?.data[0]?.params?.sdata || 
                                 otherSummaryData?.data[0]?.params?.sdata).unix()
    const period1_edate = moment(cpuSummaryData?.data[0]?.params?.edate ||
                                 diskSummaryData?.data[0]?.params?.edate ||
                                 memorySummaryData?.data[0]?.params?.edate || 
                                 otherSummaryData?.data[0]?.params?.edate).unix()

    const period1_stime = cpuSummaryData?.data[0]?.params?.stime || diskSummaryData?.data[0]?.params?.stime || 
                          memorySummaryData?.data[0]?.params?.stime || otherSummaryData?.data[0]?.params?.stime

    const period1_etime = cpuSummaryData?.data[0]?.params?.etime || diskSummaryData?.data[0]?.params?.etime ||
                          memorySummaryData?.data[0]?.params?.etime || otherSummaryData?.data[0]?.params?.etime

    if( period1_sdate === period1_edate )
    {
    period1 = moment(cpuSummaryData?.data[0]?.params?.sdata || diskSummaryData?.data[0]?.params?.sdata ||
       memorySummaryData?.data[0]?.params?.sdata || otherSummaryData?.data[0]?.params?.sdata).format("MMM Do YYYY");
    period1_dt = period1_sdate;
  } else {
    period1 = moment(cpuSummaryData?.data[0]?.params?.sdata || diskSummaryData?.data[0]?.params?.sdata ||
       memorySummaryData?.data[0]?.params?.sdata || otherSummaryData?.data[0]?.params?.sdata).format("MMM Do YYYY") 
       + ' - ' + moment(cpuSummaryData?.data[0]?.params?.edate || diskSummaryData?.data[0]?.params?.edate || 
        memorySummaryData.data[0]?.params?.edate || otherSummaryData?.data[0]?.params?.edate).format("MMM Do YYYY");
  }

  if (period1_stime === period1_etime) {
    period1_t = period1_stime;
  }

  // Show only start date if both start and end date are same
  const period2_sdate = moment(cpuSummaryData?.data[0]?.params?.sdata2 || 
                               diskSummaryData?.data[0]?.params?.sdata2 || 
                               memorySummaryData?.data[0]?.params?.sdata2 || 
                               otherSummaryData?.data[0]?.params?.sdata2).unix();

  const period2_edate = moment(cpuSummaryData?.data[0]?.params?.edate2 || 
                               diskSummaryData?.data[0]?.params?.edate2 || 
                               memorySummaryData?.data[0]?.params?.edate2 || 
                               otherSummaryData?.data[0]?.params?.edate2).unix();
                               
  const period2_stime = cpuSummaryData?.data[0]?.params?.stime2 || diskSummaryData?.data[0]?.params?.stime2 || 
                        memorySummaryData?.data[0]?.params?.stime2 || otherSummaryData?.data[0]?.params?.stime2;

  const period2_etime = cpuSummaryData?.data[0]?.params?.etime2 || diskSummaryData?.data[0]?.params?.etime2 || 
                        memorySummaryData?.data[0]?.params?.etime2 || otherSummaryData?.data[0]?.params?.etime2;

    if( period2_sdate === period2_edate )
    {
    period2 = moment(cpuSummaryData?.data[0]?.params?.sdata2 || diskSummaryData?.data[0]?.params?.sdata2 || 
                     memorySummaryData?.data[0]?.params?.sdata2 || otherSummaryData?.data[0]?.params?.sdata2).format("MMM Do YYYY");
    period2_dt = period2_sdate;
  } else {
        period2 = moment(cpuSummaryData?.data[0]?.params?.sdata2 || diskSummaryData?.data[0]?.params?.sdata2 || 
          memorySummaryData?.data[0]?.params?.sdata2 || otherSummaryData?.data[0]?.params?.sdata2).format("MMM Do YYYY")
          + ' - ' + moment(cpuSummaryData?.data[0]?.params?.edate2 || diskSummaryData?.data[0]?.params?.edate2 || 
          memorySummaryData?.data[0]?.params?.edate2 || otherSummaryData?.data[0]?.params?.edate2).format("MMM Do YYYY");
  }

  if (period2_stime === period2_etime) {
    period2_t = period2_stime;
  }

  //   if((period1_dt === period2_dt) && (period1_t === period2_t)){
  //   isPeriodSame = true;
  // }


  if(cpuSummaryData?.data[0]?.params?.sysOpt === "Single" || diskSummaryData?.data[0]?.params?.sysOpt === "Single" || 
     memorySummaryData?.data[0]?.params?.sysOpt === "Single" || otherSummaryData?.data[0]?.params?.sysOpt === "Single"){
    if((period1_dt === period2_dt) && (period1_t === period2_t) && period1_dt && period2_dt && period1_t && period2_t){
      isPeriodSame = true;
    }
  }
  else if(cpuSummaryData?.data[0]?.params?.sysOpt === "Multiple" || diskSummaryData?.data[0]?.params?.sysOpt === "Multiple" ||
          memorySummaryData?.data[0]?.params?.sysOpt === "Multiple" || otherSummaryData?.data[0]?.params?.sysOpt === "Multiple"){
    if((period1_dt === period2_dt) && (period1_t === period2_t) && 
        (cpuSummaryData?.data[0]?.params?.server1 === cpuSummaryData?.data[0]?.params?.server2 || 
          diskSummaryData?.data[0]?.params?.server1 === diskSummaryData?.data[0]?.params?.server2 ||
          memorySummaryData?.data[0]?.params?.server1 === memorySummaryData?.data[0]?.params?.server2 ||
          otherSummaryData?.data[0]?.params?.server1 === otherSummaryData?.data[0]?.params?.server2 
          ) &&
        period1_dt && period2_dt && period1_t && period2_t
        ){
      isPeriodSame = true;
    }
  }

  useEffect(() => {
    dispatch(fetchAsyncSummaryDataCPUReport(reportId));
    dispatch(fetchAsyncSummaryDataMemoryReport(reportId));
    dispatch(fetchAsyncSummaryDataDiskReport(reportId));
    dispatch(fetchAsyncSummaryDataOtherReport(reportId));
    }, [dispatch])


    if (metrics) {
      isCpu = (metrics?.data?.cpu_utilization || (metrics?.sys1?.cpu_utilization || metrics?.sys2?.cpu_utilization)) || 
              (metrics?.data?.no_of_cores  || (metrics?.sys1?.no_of_cores || metrics?.sys2?.no_of_cores)) || 
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
    {isCpu && cpuSummaryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
      <div className='wrapDataTables'>
          { !cpuSummaryData.loading && !_.isEmpty(cpuSummaryData.data) && isCpu && 
            <>
              {
                <div style={{ pageBreakAfter: "always" }}>
                <table className="table table-bordered table-striped tableAlign">
                  <thead>
                      <tr style={{backgroundColor:'#efefef'}}> 
                        <th colSpan="6" style={{textAlign:"center", fontSize:"x-large"}}>CPU</th>
                    </tr>
                    <tr style={{backgroundColor:'#efefef'}}>
                    <th colSpan="3">{cpuSummaryData?.data[0]?.params?.server1}</th>
                    <th colSpan="3">{cpuSummaryData?.data[0]?.params?.server2}</th>
                    </tr>
                      <tr style={{backgroundColor:'#efefef'}}>
                        <th colSpan="3" style={{textAlign:"center"}}>{period1}</th>
                        <th colSpan="2" style={{textAlign:"center"}}>{period2}</th>
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
                    cpuSummaryData?.data[0]?.data?.map((res,valIndex)=> {
                    return (
                      <tbody>
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
                </div>
              }
            </>
          }
        </div>
      </div>
      {/* !!!!!!!!!!!!!!!!!!! Disk Data Table !!!!!!!!!!!!!!!!!!!!!! */}
    <div className={isDisk?'table_wrapper':''}>
    {isDisk && diskSummaryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
      <div className='wrapDataTables'>
          { !diskSummaryData.loading && !_.isEmpty(diskSummaryData.data) && isDisk &&
              <>
                {
                <div style={{ pageBreakAfter: "always" }}>
                  <table className="table table-bordered table-striped tableAlign">
                    <thead>
                      <tr style={{backgroundColor:'#efefef'}}>
                        <th colSpan="6" style={{textAlign:"center", fontSize:"x-large"}}>DISK</th>
                      </tr>
                      <tr style={{backgroundColor:'#efefef'}}>
                      <th colSpan="3">{diskSummaryData?.data[0]?.params?.server1}</th>
                      <th colSpan="3">{diskSummaryData?.data[0]?.params?.server2}</th> 
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
                        <tbody>
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
                  </div>
                }
              </>
          }
        </div>
      </div>
      {/* !!!!!!!!!!!!!!!!!!! Memory Data Table !!!!!!!!!!!!!!!!!!!!!! */}
    <div className={isMemory?'table_wrapper':''}>
    {isMemory && memorySummaryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
      <div className='wrapDataTables'>
          { !memorySummaryData.loading && !_.isEmpty(memorySummaryData.data) && isMemory &&
              <>
                {
                <div style={{ pageBreakAfter: "always" }}>
                  <table className="table table-bordered table-striped tableAlign">
                    <thead>
                      <tr style={{backgroundColor:'#efefef'}}>
                        <th colSpan="6" style={{textAlign:"center", fontSize:"x-large"}}>MEMORY</th>
                      </tr>
                      <tr style={{backgroundColor:'#efefef'}}>
                      <th colSpan="3">{memorySummaryData?.data[0]?.params?.server1}</th>
                      <th colSpan="3">{memorySummaryData?.data[0]?.params?.server2}</th>
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
                        <tbody>
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
                  </div>
                }
              </>
          }
        </div>
      </div>
      {/* !!!!!!!!!!!!!!!!!!! Other Data Table !!!!!!!!!!!!!!!!!!!!!! */}
    <div className={isOther?'table_wrapper':''}> 
    {isOther && otherSummaryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      } 
      <div className='wrapDataTables'>
          { !otherSummaryData.loading && !_.isEmpty(otherSummaryData.data) && isOther &&
              <>
                {
                <div style={{ pageBreakAfter: "always" }}>
                  <table className="table table-bordered table-striped tableAlign">
                    <thead>
                      <tr style={{backgroundColor:'#efefef'}}>
                        <th colSpan="6" style={{textAlign:"center", fontSize:"x-large"}}>OTHER</th>
                      </tr>
                      <tr style={{backgroundColor:'#efefef'}}>
                      <th colSpan="3">{otherSummaryData?.data[0]?.params?.server1}</th>
                      <th colSpan="3">{otherSummaryData?.data[0]?.params?.server2}</th>
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
                        <tbody>
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
                  </div>
                }
              </>
          }
        </div>
      </div>
    </>
  )
}

export default PeriodSummaryTableReport