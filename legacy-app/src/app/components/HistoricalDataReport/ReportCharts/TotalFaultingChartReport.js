import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncTotalFaultingRateReports, getTotalFaultingRateDataReports} from "../../../../store/slices/reports/DataReportCharts/memoryReportChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const TotalFaultingChartReport = ({ activeChartView,reportId }) => {
  const dispatch = useDispatch();
  const totalFaultingRateData = useSelector(getTotalFaultingRateDataReports);
  const [checkData, setCheckData] = useState(false); //new

  useEffect(() => {
    dispatch(fetchAsyncTotalFaultingRateReports(reportId));
    }, [dispatch])

  useEffect(() => {
        if(totalFaultingRateData.loading === false && !_.isEmpty(totalFaultingRateData.data)){
      if (totalFaultingRateData.data.data.length === 0) {
        setCheckData(false);
      }
            else{
                setCheckData(true)
    }
        }
    }, [totalFaultingRateData])

  const totalFaultingRateDataMatrics = createChartDataMapping(
    totalFaultingRateData.data.data || [],
    "stackedArea",
    "totalFaultingRate"
  );
  const totalFaultingRateDataTrends = createChartDataMapping(
    totalFaultingRateData.data.trend || [],
    "stackedArea",
    "totalFaultingRateTrends"
  );

  return (
            <>  {totalFaultingRateData.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!totalFaultingRateData.loading && !_.isEmpty(totalFaultingRateData.data) && (checkData) &&
          <div className="chart_container" style={{ pageBreakAfter: "always" }}>
            {activeChartView.isMetricsChart && (
              <ChartView
                data={totalFaultingRateDataMatrics}
                title={"Total Faulting Rate"}
                yAxisTitle={"Faults / Sec"}
                xAxisDateFormat={totalFaultingRateDataMatrics[0].xValueFormatString}
                isVisible={true}
                showTotal={false}
                minimum={0}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                data={totalFaultingRateDataTrends}
                title={"Total Faulting Rate with Trends"}
                yAxisTitle={"Faults / Sec"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
              />
            )}
          </div>
                }

                {!totalFaultingRateData.loading && (checkData === false)  && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
          <div className="chart_container">
                <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>Total Faulting Chart</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Faulting Chart."/>
                  </div>
                </div>
                <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>Total Faulting Chart</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Faulting Chart."/>
                  </div>
                </div>
          </div>
                }

                {!totalFaultingRateData.loading && (checkData === false)  && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
          <div className="chart_container">
                <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>Total Faulting Chart</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Faulting Chart."/>
                  </div>
                </div>
          </div>
                }
                 {!totalFaultingRateData.loading && (checkData === false)  && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
          <div className="chart_container">
                <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>Total Faulting Chart</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Total Faulting Chart."/>
                  </div>
                </div>
          </div>
                }
    </>
    )
}

export default (TotalFaultingChartReport);