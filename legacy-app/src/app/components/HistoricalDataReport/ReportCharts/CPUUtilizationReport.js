import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncCPUUtilizationReports, getCPUUtilDataReports} from "../../../../store/slices/reports/DataReportCharts/cpuReportChartsSlice";
import * as _ from 'lodash';
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import GridLoader from "react-spinners/GridLoader";

const CPUUtilizationReport = ({ activeChartView,reportId }) => {
  const dispatch = useDispatch();
  const cpuData = useSelector(getCPUUtilDataReports);
  const [checkData, setCheckData] = useState(false); 

  
  useEffect(() => {
    dispatch(fetchAsyncCPUUtilizationReports(reportId));
    }, [dispatch])

  useEffect(() => {
    if (cpuData.loading === false && !_.isEmpty(cpuData.data)) {
      if (cpuData.data.data.length === 0) {
        setCheckData(false);
      }
            else{
                setCheckData(true)
    }
        }
    }, [cpuData])


  const cpuUtilization = createChartDataMapping(
    cpuData.data.data || [],
    "stackedArea",
    "cpuUtilization"
  );
  const cpuUtilizationTrends = createChartDataMapping(
    cpuData.data.trend || [],
    "stackedArea",
    "cpuUtilizationTrends"
  );
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
                {!cpuData.loading && !_.isEmpty(cpuData.data) && (checkData) &&
        <div className="chart_container" style={{ pageBreakAfter: "always" }}>
          {activeChartView.isMetricsChart && (
            <ChartView
              key={"cpuutilization"}
              data={cpuUtilization}
              title={"CPU Utilization"}
              yAxisTitle={"Utilization"}
              xAxisDateFormat={cpuUtilization[0].xValueFormatString}
              isVisible={true} 
              showTotal={true}
              minimum = {0}/>
          )}
          {activeChartView.isTrendsChart && (
            <ChartViewTrend
              key={"cpuutilizationtrends"}
              data={cpuUtilizationTrends}
              title={"CPU Utilization with Trends"}
              yAxisTitle={"Utilization"}
              isVisible={true}
              xAxisDateFormat="MMM YYYY"
              showTotal={true}
              minimum={0}
            />
          )}
        </div>
                }

                {!cpuData.loading && (checkData === false)  && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
          <div className="chart_container">
                <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>CPU Utilization</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
                  </div>
                </div>
                <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>CPU Utilization</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
                  </div>
                </div>
          </div>
                }

                {!cpuData.loading && (checkData === false)  && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
          <div className="chart_container">
              <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>CPU Utilization</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
                  </div>
                </div>
          </div>
                }
                 {!cpuData.loading && (checkData === false)  && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
          <div className="chart_container">
                <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>CPU Utilization</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
                  </div>
                </div>
          </div>
                }
    </>
    )
}

export default CPUUtilizationReport;