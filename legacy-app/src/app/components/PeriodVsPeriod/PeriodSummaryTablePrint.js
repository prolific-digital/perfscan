import React, { useEffect, useState } from 'react';
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
  getParametersFromLocalStorage
} from '../../../helpers/commonHelper';
import "../../../stylesheets/main.scss"
import moment from 'moment';
import GridLoader from "react-spinners/GridLoader";


function PeriodSummaryTablePrint(props) {
  const [metrics, setMetrics] = useState();
  const pqd = usePeriodQueryData();
  const dispatch = useDispatch();
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
  const system = filters.period_save_filter;
  const system1 = filters.system_filter;
  const system2 = filters._system_filter;

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
  const period1_sdate = moment(pFilter[0].sdate).unix()
  const period1_edate = moment(pFilter[0].edate).unix()
  const period1_stime = pFilter[0].stime
  const period1_etime = pFilter[0].etime

  if (period1_sdate === period1_edate) {
    period1 = moment(pFilter[0].sdate).format("MMM Do YYYY");
    period1_dt = period1_sdate;
  } else {
    period1 = moment(pFilter[0].sdate).format("MMM Do YYYY") + ' - ' + moment(pFilter[0].edate).format("MMM Do YYYY");
  }

  if (period1_stime === period1_etime) {
    period1_t = period1_stime;
  }

  // Show only start date if both start and end date are same
  const period2_sdate = moment(pFilter[1].sdate).unix();
  const period2_edate = moment(pFilter[1].edate).unix();
  const period2_stime = pFilter[1].stime;
  const period2_etime = pFilter[1].etime;

  if (period2_sdate === period2_edate) {
    period2 = moment(pFilter[1].sdate).format("MMM Do YYYY");
    period2_dt = period2_sdate;
  } else {
    period2 = moment(pFilter[1].sdate).format("MMM Do YYYY") + ' - ' + moment(pFilter[1].edate).format("MMM Do YYYY");
  }

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

  // const isCpu = metrics.cpu_utilization || metrics.no_of_cores || metrics.cpu_ms || metrics.cpw;
  useEffect(() => {
    // dispatch(fetchAsyncPeriodDataCPU(pqd));
    dispatch(fetchAsyncPeriodDataCPUActual(pqd))

    // dispatch(fetchAsyncperiodDataMemory(pqd));
    dispatch(fetchAsyncperiodDataDiskActual(pqd))

    // dispatch(fetchAsyncperiodDataDisk(pqd));
    dispatch(fetchAsyncperiodDataMemoryActual(pqd))

    // dispatch(fetchAsyncperiodDataOther(pqd)); 
    dispatch(fetchAsyncperiodDataOtherActual(pqd))

    dispatch(fetchAsyncAppMetrics({systemID: filters.system_filter.id, userID : userID}));
    }, [dispatch])

  // useEffect(() => {
  //   if (cpuStatus?.status === "completed" && _.isEmpty(cpuSummaryData?.data)) {
  //     dispatch(fetchAsyncPeriodDataCPUActual(pqd))
  //   }
  //   if (diskStatus?.status === "completed" && _.isEmpty(diskSummaryData?.data)) {
  //     dispatch(fetchAsyncperiodDataDiskActual(pqd))
  //   }
  //   if (memorySummaryStatus?.status === "completed" && _.isEmpty(memorySummaryData?.data)) {
  //     dispatch(fetchAsyncperiodDataMemoryActual(pqd))
  //   }
  //   if (otherSummaryStatus?.status === "completed" && _.isEmpty(otherSummaryData?.data)) {
  //     dispatch(fetchAsyncperiodDataOtherActual(pqd))
  //   }
  // }, [cpuStatus?.status,
  // diskStatus?.status,
  // memorySummaryStatus?.status,
  // otherSummaryStatus?.status
  // ])


  useEffect(() => {
    setMetrics(metrics_data_app.data.data)
  }, [metrics_data_app.data.length])


  if (metrics) {
    isCpu = metrics.cpu_utilization || metrics.no_of_cores || metrics.cpu_ms;
    isDisk = metrics.read_write_ratio || metrics.cache_hit_perc || metrics.total_disk_ops || metrics.disk_response_time || metrics.disk_arm_utilization || metrics.disk_space_utilization;
    isMemory = metrics.machine_pool_faulting || metrics.faulting_rate || metrics.top_pool_faulting_rate || metrics.memory_size_faulting || metrics.pool_faulting_rate;
    isOther = metrics.ethernet_line_utilization || metrics.response_time_5250 || metrics.total_transactions;
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
        <div className=''>
          {!cpuSummaryData.loading && !_.isEmpty(cpuSummaryData.data) && isCpu &&
            <>
              {
                <div style={{ pageBreakAfter: "always" }}>
                  <table className="table table-bordered table-striped tableAlign">
                    <thead>
                      <tr style={{ backgroundColor: '#efefef' }}>
                        <th colSpan="6" style={{ textAlign: "center", fontSize: "x-large" }}>CPU</th>
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
                      <tr style={{ backgroundColor: '#efefef' }}>
                        <th colSpan="3" style={{ textAlign: "center" }}>{period1}</th>
                        <th colSpan="3" style={{ textAlign: "center" }}>{period2}</th>
                      </tr>

                      <tr style={{ backgroundColor: '#75c5f0' }}>
                        <th style={{ align: "center", height: "71px", width: "180px" }}>Core Metric</th>
                        <th style={{ align: "center", height: "71px", width: "100px" }}>Status</th>
                        <th style={{ align: "center", height: "71px" }}>Observations</th>
                        <th style={{ align: "center", height: "71px", width: "100px" }}>Status</th>
                        <th style={{ align: "center", height: "71px" }}>Observations</th>
                        <th style={{ align: "center", height: "71px" }}>Comparing Performance</th>
                      </tr>
                    </thead>
                    {
                      cpuSummaryData.data[0].data.map((res, valIndex) => {
                        return (
                          <tbody>
                            <tr>
                              <td style={{ height: "auto", width: "180px" }}>{res.dtypedesc}</td>
                              <td style={{ height: "auto", width: "100px" }}>
                                {checkSystemStatusForPVsP(res, 0)}
                              </td>
                              <td style={{ height: "auto" }}>{renderFindings(res, 0)}
                              </td>
                              <td style={{ height: "auto", width: "100px", backgroundColor: "aliceblue" }}>
                                {isPeriodSame ? checkSystemStatusForPVsP(res, 0) : checkSystemStatusForPVsP(res, 1)}
                              </td>
                              <td style={{ height: "auto", backgroundColor: "aliceblue" }}>
                                {isPeriodSame ? renderFindings(res, 0) : renderFindings(res, 1)}
                              </td>
                              <td style={{ height: "auto" }}>
                                {isPeriodSame ? calcPercentDiff(res.data[0], res.data[0], res) : calcPercentDiff(res.data[0], res.data[1], res)}
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
      <div className={isDisk ? 'table_wrapper' : ''}>
      {isDisk && diskSummaryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
        <div className=''>
          {!diskSummaryData.loading && !_.isEmpty(diskSummaryData.data) && isDisk &&
            <>
              {
                <div style={{ pageBreakAfter: "always" }}>
                  <table className="table table-bordered table-striped tableAlign">
                    <thead>
                      <tr style={{ backgroundColor: '#efefef' }}>
                        <th colSpan="6" style={{ textAlign: "center", fontSize: "x-large" }}>DISK</th>
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
                      <tr style={{ backgroundColor: '#efefef' }}>
                        <th colSpan="3" style={{ textAlign: "center" }}>{period1}</th>
                        <th colSpan="3" style={{ textAlign: "center" }}>{period2}</th>
                      </tr>

                      <tr style={{ backgroundColor: '#75c5f0' }}>
                        <th style={{ align: "center", height: "71px", width: "180px" }}>Core Metric</th>
                        <th style={{ align: "center", height: "71px", width: "100px" }}>Status</th>
                        <th style={{ align: "center", height: "71px" }}>Observations</th>
                        <th style={{ align: "center", height: "71px", width: "100px" }}>Status</th>
                        <th style={{ align: "center", height: "71px" }}>Observations</th>
                        <th style={{ align: "center", height: "71px" }}>Comparing Performance</th>
                      </tr>
                    </thead>
                    {
                      diskSummaryData.data[0].data.map((res, valIndex) => {
                        return (
                          <tbody>
                            <tr>
                              <td style={{ height: "auto", width: "180px" }}>{res.dtypedesc}</td>
                              <td style={{ height: "auto", width: "100px" }}>
                                {checkSystemStatusForPVsP(res, 0)}
                              </td>
                              <td style={{ height: "auto" }}>{renderFindings(res, 0)}</td>
                              <td style={{ height: "auto", width: "100px", backgroundColor: "aliceblue" }}>
                                {isPeriodSame ? checkSystemStatusForPVsP(res, 0) : checkSystemStatusForPVsP(res, 1)}
                              </td>
                              <td style={{ height: "auto", backgroundColor: "aliceblue" }}>
                                {isPeriodSame ? renderFindings(res, 0) : renderFindings(res, 1)}
                              </td>
                              <td style={{ height: "auto" }}>
                                {isPeriodSame ? calcPercentDiff(res.data[0], res.data[0], res) : calcPercentDiff(res.data[0], res.data[1], res)}
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
      <div className={isMemory ? 'table_wrapper' : ''}>
      {isMemory && memorySummaryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
        <div className=''>
          {!memorySummaryData.loading && !_.isEmpty(memorySummaryData.data) && isMemory &&
            <>
              {
                <div style={{ pageBreakAfter: "always" }}>
                  <table className="table table-bordered table-striped tableAlign">
                    <thead>
                      <tr style={{ backgroundColor: '#efefef' }}>
                        <th colSpan="6" style={{ textAlign: "center", fontSize: "x-large" }}>MEMORY</th>
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
                      <tr style={{ backgroundColor: '#efefef' }}>
                        <th colSpan="3" style={{ textAlign: "center" }}>{period1}</th>
                        <th colSpan="3" style={{ textAlign: "center" }}>{period2}</th>
                      </tr>

                      <tr style={{ backgroundColor: '#75c5f0' }}>
                        <th style={{ align: "center", height: "71px", width: "180px" }}>Core Metric</th>
                        <th style={{ align: "center", height: "71px", width: "100px" }}>Status</th>
                        <th style={{ align: "center", height: "71px" }}>Observations</th>
                        <th style={{ align: "center", height: "71px", width: "100px" }}>Status</th>
                        <th style={{ align: "center", height: "71px" }}>Observations</th>
                        <th style={{ align: "center", height: "71px" }}>Comparing Performance</th>
                      </tr>
                    </thead>
                    {
                      memorySummaryData.data[0].data.map((res, valIndex) => {
                        return (
                          <tbody>
                            <tr>
                              <td style={{ height: "auto", width: "180px" }}>{res.dtypedesc}</td>
                              <td style={{ height: "auto", width: "100px" }}>
                                {checkSystemStatusForPVsP(res, 0)}
                              </td>
                              <td style={{ height: "auto" }}>{renderFindings(res, 0)}</td>
                              <td style={{ height: "auto", width: "100px", backgroundColor: "aliceblue" }}>
                                {isPeriodSame ? checkSystemStatusForPVsP(res, 0) : checkSystemStatusForPVsP(res, 1)}
                              </td>
                              <td style={{ height: "auto", backgroundColor: "aliceblue" }}>
                                {isPeriodSame ? renderFindings(res, 0) : renderFindings(res, 1)}
                              </td>
                              <td style={{ height: "auto" }}>
                                {isPeriodSame ? calcPercentDiff(res.data[0], res.data[0], res) : calcPercentDiff(res.data[0], res.data[1], res)}
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
      <div className={isOther ? 'table_wrapper' : ''}>
      {isOther && otherSummaryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
        <div className=''>
          {!otherSummaryData.loading && !_.isEmpty(otherSummaryData.data) && isOther &&
            <>
              {
                <div style={{ pageBreakAfter: "always" }}>
                  <table className="table table-bordered table-striped tableAlign">
                    <thead>
                      <tr style={{ backgroundColor: '#efefef' }}>
                        <th colSpan="6" style={{ textAlign: "center", fontSize: "x-large" }}>OTHER</th>
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
                      <tr style={{ backgroundColor: '#efefef' }}>
                        <th colSpan="3" style={{ textAlign: "center" }}>{period1}</th>
                        <th colSpan="3" style={{ textAlign: "center" }}>{period2}</th>
                      </tr>

                      <tr style={{ backgroundColor: '#75c5f0' }}>
                        <th style={{ align: "center", height: "71px", width: "180px" }}>Core Metric</th>
                        <th style={{ align: "center", height: "71px", width: "100px" }}>Status</th>
                        <th style={{ align: "center", height: "71px" }}>Observations</th>
                        <th style={{ align: "center", height: "71px", width: "100px" }}>Status</th>
                        <th style={{ align: "center", height: "71px" }}>Observations</th>
                        <th style={{ align: "center", height: "71px" }}>Comparing Performance</th>
                      </tr>
                    </thead>
                    {
                      otherSummaryData.data[0].data.map((res, valIndex) => {
                        return (
                          <tbody>
                            <tr>
                              <td style={{ height: "auto", width: "180px" }}>{res.dtypedesc}</td>
                              <td style={{ height: "auto", width: "100px" }}>{checkSystemStatusForPVsP(res, 0)}</td>
                              <td style={{ height: "auto" }}>{renderFindings(res, 0)}</td>
                              <td style={{ height: "auto", width: "100px", backgroundColor: "aliceblue" }}>
                                {isPeriodSame ? checkSystemStatusForPVsP(res, 0) : checkSystemStatusForPVsP(res, 1)}
                              </td>
                              <td style={{ height: "auto", backgroundColor: "aliceblue" }}>
                                {isPeriodSame ? renderFindings(res, 0) : renderFindings(res, 1)}
                              </td>
                              <td style={{ height: "auto" }}>
                                {isPeriodSame ? calcPercentDiff(res.data[0], res.data[0], res) : calcPercentDiff(res.data[0], res.data[1], res)}
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

export default PeriodSummaryTablePrint