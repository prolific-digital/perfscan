import React, { memo, useEffect,Suspense, useState } from 'react';
import PeriodCpuMsChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodCpuMsChart'
import PeriodCpuUtilizationChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodCpuUtilizationChart'
import PeriodDiskArmUtilizationChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodDiskArmUtilizationChart'
import PeriodDiskCacheHitPercentageChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodDiskCacheHitPercentageChart'
import PeriodDiskOperationChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodDiskOperationChart'
import PeriodDiskReadWriteChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodDiskReadWriteChart'
import PeriodDiskResponseChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodDiskResponseChart'
import PeriodDiskSPaceUtilizationChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodDiskSPaceUtilizationChart'
import PeriodEthernetLineChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodEthernetLineChart'
import PeriodMachinPoolFaultingChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodMachinPoolFaultingChart'
import PeriodMemVsFaultChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodMemVsFaultChart'
import PeriodNumCoresChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodNumCoresChart'
import PeriodSpecificPoolChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodSpecificPoolChart'
import PeriodTopPoolFaultingChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodTopPoolFaultingChart'
import PeriodTotalFaultingRateChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodTotalFaultingRateChart'
import PeriodTotalTransactionChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodTotalTransactionChart'
import PeriodHeader from '../components/PeriodVsPeriod/PeriodHeader/PeriodHeader'
import PeriodSummaryTable from '../components/PeriodVsPeriod/PeriodSummaryTable';
import PeriodReponse5250Chart from '../components/PeriodVsPeriod/PeriodCharts/PeriodReponse5250Chart';
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncAppMetrics } from "../../store/slices/settings";
import { getParametersFromLocalStorage } from "../../helpers/commonHelper";
import moment from "moment";
import { BeatLoader } from "react-spinners";
import PeriodCpwChart from '../components/PeriodVsPeriod/PeriodCharts/PeriodCpwChart';

function PeriodVsPeriod() {
  const filters = useSelector(state => state.filters);

  const pFilter = filters.period_filter; //dates
  const sFilter = filters.system_filter; //system
  const sFilter2 = filters._system_filter
  const metrics_data_app = useSelector(state => state.settings.metrics_data_app);
  const [metrics, setMetrics] = useState();
  const dispatch = useDispatch();
  const userID = getParametersFromLocalStorage("userID");
  const system = getParametersFromLocalStorage("PeriodSaveFilter");
  const stime1 = pFilter[0].stime;
  const etime1 = pFilter[0].etime;

  const stime2 = pFilter[1].stime;
  const etime2 = pFilter[1].etime;


  let period1 = "";
  let period2 = "";

  // Show only start date if both start and end date are same
  const period1_sdate = moment(pFilter[0].sdate).unix()
  const period1_edate = moment(pFilter[0].edate).unix()
  if( period1_sdate === period1_edate )
  {
    period1 = moment(pFilter[0].sdate).format("MMM Do YYYY")
  } else {
    period1 = moment(pFilter[0].sdate).format("MMM Do YYYY") + ' - ' + moment(pFilter[0].edate).format("MMM Do YYYY");
  }
  // Show only start date if both start and end date are same
  const period2_sdate = moment(pFilter[1].sdate).unix();
  const period2_edate = moment(pFilter[1].edate).unix();
  if( period2_sdate === period2_edate )
  {
    period2 = moment(pFilter[1].sdate).format("MMM Do YYYY")
  } else {
    period2 = moment(pFilter[1].sdate).format("MMM Do YYYY") + ' - ' + moment(pFilter[1].edate).format("MMM Do YYYY");
  }

  useEffect(() => {
    dispatch(fetchAsyncAppMetrics({ systemID: filters.system_filter.id, userID: userID, 
      systemID2: system.sysOpt ==='Multiple' ?"/"+filters._system_filter.id : "" 
    }));
  }, [dispatch]);

  useEffect(() => {
    if(Object.values(metrics_data_app.data).length > 1){
      setMetrics(metrics_data_app.data);
    }else{
      setMetrics(metrics_data_app.data.data)
    }
  }, [metrics_data_app.data.length])
  return (
    <>
      {metrics && (metrics?.executing_summary ||  metrics?.sys1?.executing_summary || metrics?.sys2?.executing_summary) &&
        <>
          <PeriodHeader
            period1={period1}
            period2={period2}
            system1 = {sFilter.entity_name + ' - ' + sFilter.entity_description}
            system2 = {sFilter2?.entity_name + ' - ' + sFilter2?.entity_description || ""}
            sys1SerialNum = {sFilter.entity_data.frame.serial_number}
            sys2SerialNum = {sFilter2?.entity_data?.frame?.serial_number || ""}
            systems = {system.sysOpt}
            stime1={stime1}
            etime1={etime1}
            stime2={stime2}
            etime2={etime2}
          />
          <PeriodSummaryTable sdate1={pFilter[0].sdate} sdate2={pFilter[1].sdate} />
        </>
      }

      <div className="table_wrapper">
        <div className="detail-analysis">
          <p>PERIOD vs PERIOD ANALYSIS</p>
          <p style={{color:'blue'}}>{sFilter.entity_name + ' - ' + sFilter.entity_description} - {sFilter.entity_data.frame.serial_number}
          {system.sysOpt ==='Multiple' && sFilter2?.entity_name !== sFilter?.entity_name &&  
          ` vs ${sFilter2?.entity_name + ' - ' + sFilter2?.entity_description} - ${sFilter2?.entity_data?.frame?.serial_number}`}</p>
          <p>PERIOD ANALYZED: {period1} vs. {period2}</p>
          <p>
            Time Analyzed -{" "}
            {stime1 ? moment(`${stime1}:00`, "HHmmss").format("hh:mm a") : "___"} -{" "}
            {etime1 ? moment(`${etime1}:00`, "HHmmss").format("hh:mm a") : "___"}
            {system.sysOpt ==='Multiple' && sFilter2?.entity_name !== sFilter?.entity_name &&
            <> vs {" "}
            {stime2 ? moment(`${stime2}:00`, "HHmmss").format("hh:mm a") : "___"} -{" "}
            {etime2 ? moment(`${etime2}:00`, "HHmmss").format("hh:mm a") : "___"}
            </>
            }
          </p>
        </div>
      </div>

      <div className="chart_view_wrapper">
        {metrics && (metrics?.cpu_utilization || metrics?.sys1?.cpu_utilization  || metrics?.sys2?.cpu_utilization)  &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodCpuUtilizationChart />
        </Suspense>
        }
        {metrics && (metrics?.cpu_ms  || metrics?.sys1?.cpu_ms  || metrics?.sys2?.cpu_ms) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodCpuMsChart />
        </Suspense>
        }
        {metrics && (metrics?.no_of_cores  || metrics?.sys1?.no_of_cores  || metrics?.sys2?.no_of_cores) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodNumCoresChart />
        </Suspense>
        }
        {metrics && (metrics?.cpw || metrics?.sys1?.cpw  || metrics?.sys2?.cpw) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodCpwChart />
        </Suspense>
        }
        {metrics && (metrics?.disk_space_utilization  || metrics?.sys1?.disk_space_utilization  || metrics?.sys2?.disk_space_utilization) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodDiskSPaceUtilizationChart />
        </Suspense>
        }
        {metrics && (metrics?.disk_arm_utilization || metrics?.sys1?.disk_arm_utilization  || metrics?.sys2?.disk_arm_utilization) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodDiskArmUtilizationChart />
        </Suspense>
        }
        {metrics && (metrics?.disk_response_time || metrics?.sys1?.disk_response_time  || metrics?.sys2?.disk_response_time) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodDiskResponseChart />
        </Suspense>
        }
        {metrics && (metrics?.total_disk_ops || metrics?.sys1?.total_disk_ops  || metrics?.sys2?.total_disk_ops) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodDiskOperationChart />
        </Suspense>
        }
        {metrics && (metrics?.read_write_ratio || metrics?.sys1?.read_write_ratio  || metrics?.sys2?.read_write_ratio) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodDiskReadWriteChart />
        </Suspense>
        }
        {metrics && (metrics?.cache_hit_perc || metrics?.sys1?.cache_hit_perc  || metrics?.sys2?.cache_hit_perc) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodDiskCacheHitPercentageChart />
        </Suspense>
        }
        {metrics && (metrics?.machine_pool_faulting || metrics?.sys1?.machine_pool_faulting  || metrics?.sys2?.machine_pool_faulting) &&
          <PeriodMachinPoolFaultingChart />
        }
        {metrics && (metrics?.faulting_rate || metrics?.sys1?.faulting_rate  || metrics?.sys2?.faulting_rate) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodTotalFaultingRateChart />
        </Suspense>
        }
        {metrics && (metrics?.top_pool_faulting_rate || metrics?.sys1?.top_pool_faulting_rate  || metrics?.sys2?.top_pool_faulting_rate) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodTopPoolFaultingChart />
        </Suspense>
        }
        {metrics && (metrics?.memory_size_faulting || metrics?.sys1?.memory_size_faulting  || metrics?.sys2?.memory_size_faulting) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodMemVsFaultChart />
        </Suspense>
        }
        {metrics && (metrics?.pool_faulting_rate || metrics?.sys1?.pool_faulting_rate  || metrics?.sys2?.pool_faulting_rate) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodSpecificPoolChart />
        </Suspense>
        }
        {metrics && (metrics?.response_time_5250 || metrics?.sys1?.response_time_5250  || metrics?.sys2?.response_time_5250) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodReponse5250Chart/>
        </Suspense>
        }
        {metrics && (metrics?.total_transactions || metrics?.sys1?.total_transactions  || metrics?.sys2?.total_transactions) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodTotalTransactionChart />
        </Suspense>
        }
        {metrics && (metrics?.ethernet_line_utilization || metrics?.sys1?.ethernet_line_utilization  || metrics?.sys2?.ethernet_line_utilization) &&
        <Suspense fallback={<BeatLoader color="#366bd6"/>}>
          <PeriodEthernetLineChart />
        </Suspense>
        }
      </div>
    </>
  )
}

export default memo(PeriodVsPeriod);