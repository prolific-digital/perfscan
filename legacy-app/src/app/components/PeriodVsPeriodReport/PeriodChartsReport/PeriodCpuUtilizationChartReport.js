import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from 'lodash';
import moment from "moment";
import { fetchAsyncCPUUtilizationReports,getCPUUtilDataReports } from "../../../../store/slices/reports/DataReportCharts/cpuReportChartsSlice";
import {
  createChartDataMapping
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";
import { findMinMax,getRound } from "../../../../helpers/commonHelper";

const PeriodCpuUtilizationChartReport = ({reportId}) => {
  const dispatch = useDispatch();
  const cpuData = useSelector(getCPUUtilDataReports);
  let period1 = "";
  let period2 = "";
  let max = 100;
  // Show only start date if both start and end date are same
  const period1_sdate = moment(cpuData?.data[0]?.params?.sdata).unix()
  const period1_edate = moment(cpuData?.data[0]?.params?.edate).unix()
  if( period1_sdate === period1_edate )
  {
       period1 = moment(cpuData?.data[0]?.params?.sdata).format("MMM Do YYYY")
  }else{
       period1 = moment(cpuData?.data[0]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(cpuData?.data[0]?.params?.edate).format("MMM Do YYYY");
  }
  // Show only start date if both start and end date are same
  const period2_sdate = moment(cpuData?.data[1]?.params?.sdata).unix();
  const period2_edate = moment(cpuData?.data[1]?.params?.edate).unix();
  if( period2_sdate === period2_edate )
  {
      period2 = moment(cpuData?.data[1]?.params?.sdata).format("MMM Do YYYY")
  }else{
      period2 = moment(cpuData?.data[1]?.params?.sdata).format("MMM Do YYYY") + ' - ' + moment(cpuData?.data[1]?.params?.edate).format("MMM Do YYYY");
  }

  useEffect(() => {
    dispatch(fetchAsyncCPUUtilizationReports(reportId));
    }, [dispatch])

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
            <>  
            {cpuData.loading &&
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
          <div className="chart_container" style={{ pageBreakAfter: "always" }}>
                    {!_.isEmpty(cpuData.data[0].data) &&
              <ChartView
                key={"cpuutilization1"}
                data={cpuUtilization1}
                title={cpuData.data[0].params.server}
                title2={`CPU Utilization`}
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
                title={cpuData.data[1].params.server}
                title2={`CPU Utilization`}
                subtitle={period2}
                yAxisTitle={"Utilization"}
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

export default PeriodCpuUtilizationChartReport;