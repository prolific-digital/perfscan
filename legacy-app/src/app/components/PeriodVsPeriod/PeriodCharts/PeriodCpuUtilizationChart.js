import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncPeriodCPUUtilization,getCPUUtilizationData } from "../../../../store/slices/periodVsPeriodCharts/periodCharts/periodCPUChartsSlice";
import usePeriodQueryData from "../../../../hooks/usePeriodQueryData";
import * as _ from 'lodash';
import moment from "moment";
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";
import { findMinMax, getRound } from "../../../../helpers/commonHelper";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";

const PeriodCpuUtilizationChart = (syncHandler) => {
  const dispatch = useDispatch();
  const cpuData = useSelector(getCPUUtilizationData);
  const filters = useSelector(state => state.filters);
  const pFilter = filters.period_filter; //dates
  const uuid = useSelector(getUuidData);

  let period1 = "";
  let period2 = "";
  let max = 100;
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

  const pqd = usePeriodQueryData();

  useEffect(() => {
    if(!uuid?.loading && uuid.data.uniqueid ){
    dispatch(fetchAsyncPeriodCPUUtilization(pqd));
    }
    }, [dispatch,uuid])

  const cpuUtilization1 = createChartDataMapping(
    cpuData.data[0]?.data || [],
    "stackedArea",
    "cpuUtilization"
  );
  const cpuUtilization2 = createChartDataMapping(
    cpuData.data[1]?.data || [],
    "stackedArea",
    "cpuUtilization"
  );

  if(!_.isEmpty(cpuData.data[0]?.data) && !_.isEmpty(cpuData.data[1]?.data)){
    const min_max_1_dp1 = findMinMax(cpuUtilization1[0].dataPoints); 
    const min_max_1_dp2 = findMinMax(cpuUtilization1[1].dataPoints);
    const min_max_1_dp3 = findMinMax(cpuUtilization1[2].dataPoints);

    const min_max_2_dp1 = findMinMax(cpuUtilization2[0].dataPoints); 
    const min_max_2_dp2 = findMinMax(cpuUtilization2[1].dataPoints);
    const min_max_2_dp3 = findMinMax(cpuUtilization2[2].dataPoints);

    const min_max_1 = min_max_1_dp1[1] + min_max_1_dp2[1] + min_max_1_dp3[1];
    const min_max_2 = min_max_2_dp1[1] + min_max_2_dp2[1] + min_max_2_dp3[1];
    
    max = _.round(_.max([Math.round(min_max_1), Math.round(min_max_2)]),2);
  }

  if(!_.isEmpty(cpuData.data[0]?.data) && _.isEmpty(cpuData.data[1]?.data)){
    const min_max_1_dp1 = findMinMax(cpuUtilization1[0].dataPoints); 
    const min_max_1_dp2 = findMinMax(cpuUtilization1[1].dataPoints);
    const min_max_1_dp3 = findMinMax(cpuUtilization1[2].dataPoints);
    const min_max_1 = min_max_1_dp1[1] + min_max_1_dp2[1] + min_max_1_dp3[1];
    max = _.round(_.max(getRound(min_max_1)));
  }

  if(_.isEmpty(cpuData.data[0]?.data) && !_.isEmpty(cpuData.data[1]?.data)){
    const min_max_2_dp1 = findMinMax(cpuUtilization2[0].dataPoints); 
    const min_max_2_dp2 = findMinMax(cpuUtilization2[1].dataPoints);
    const min_max_2_dp3 = findMinMax(cpuUtilization2[2].dataPoints);
    const min_max_2 = min_max_2_dp1[1] + min_max_2_dp2[1] + min_max_2_dp3[1];
    max = _.round(_.max(getRound(min_max_2)));
  }
  return (
            <>  {cpuData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!cpuData.loading && !_.isEmpty(cpuData.data) &&
        <>
          <div className="chart_container">
                    {!_.isEmpty(cpuData.data[0].data) &&
              <ChartView
                key={"cpuutilization1"}
                data={cpuUtilization1}
                title2={`CPU Utilization`}
                title={cpuData.data[0].params.server}
                xAxisDateFormat={cpuUtilization1[0].xValueFormatString}
                subtitle={period1}
                yAxisTitle={"Utilization"}
                isVisible={true} 
                showTotal={true}
                minimum={0}
                maximum={max}
              />
                            
                    }
                    {_.isEmpty(cpuData.data[0].data) &&
              <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>CPU Utilization</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
                  </div>
              </div>
                    }
                    {!_.isEmpty(cpuData.data[1].data) &&
              <ChartView
                key={"cpuutilization2"}
                data={cpuUtilization2}
                title2={`CPU Utilization`}
                title={cpuData.data[1].params.server}
                subtitle={period2}
                yAxisTitle={"Utilization"}
                xAxisDateFormat={cpuUtilization2[0].xValueFormatString}
                isVisible={true}
                showTotal={true}
                minimum={0}
                maximum={max}
              />
                    } 
                    {_.isEmpty(cpuData.data[1].data) &&
              <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>CPU Utilization</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
                  </div>
              </div>
                    }                                             
          </div>
        </>
                }
    </>
    )
}

export default PeriodCpuUtilizationChart;