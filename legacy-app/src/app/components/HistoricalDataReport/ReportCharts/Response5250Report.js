import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncResponse5250Reports, getResponse5250DataReports } from "../../../../store/slices/reports/DataReportCharts/otherReportChartsSlice";
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const Response5250Report = ({ activeChartView,reportId }) => {
  const dispatch = useDispatch();
  const response5250Data = useSelector(getResponse5250DataReports);
  const [checkData, setCheckData] = useState(false); //new

  useEffect(() => {
    dispatch(fetchAsyncResponse5250Reports(reportId));
    }, [dispatch])

  useEffect(() => {
        if(response5250Data.loading === false && !_.isEmpty(response5250Data.data)){
      if (response5250Data.data.data.length === 0) {
        setCheckData(false);
      }
            else{
                setCheckData(true)
    }
        }
    }, [response5250Data])

  const response5250DataMatrics = createChartDataMapping(
    response5250Data.data.data || [],
    "stackedArea",
    "responseTime5250"
  );
  const response5250DataTrends = createChartDataMapping(
    response5250Data.data.trend || [],
    "stackedArea",
    "responseTime5250Trends"
  );

  return (
            <>  {response5250Data.loading &&
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
                }
                {!response5250Data.loading && !_.isEmpty(response5250Data.data) && (checkData) &&
          <div className="chart_container" style={{ pageBreakAfter: "always" }}>
            {activeChartView.isMetricsChart && (
              <ChartView
                data={response5250DataMatrics}
                title={"5250 Response Time"}
                yAxisTitle={"Seconds"}
                xAxisDateFormat={response5250DataMatrics[0].xValueFormatString}
                isVisible={true}
                showTotal={false}
                minimum={0}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                data={response5250DataTrends}
                title={"5250 Response Time with Trends"}
                yAxisTitle={"Seconds"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
              />
            )}
          </div>
                }

                {!response5250Data.loading && (checkData === false)  && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
          <div className="chart_container">
                <div className="chat_main1"> {/* noDataStyle  */}
                      <div style={{textAlign:'center'}}>
                        <h4>Response 5250</h4>
                        <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Response 5250."/>
                      </div>
                </div>
                <div className="chat_main1"> {/* noDataStyle  */}
                      <div style={{textAlign:'center'}}>
                        <h4>Response 5250</h4>
                        <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Response 5250."/>
                      </div>
                </div>
          </div>
                }

                {!response5250Data.loading && (checkData === false)  && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
          <div className="chart_container">
                <div className="chat_main1"> {/* noDataStyle  */}
                      <div style={{textAlign:'center'}}>
                        <h4>Response 5250</h4>
                        <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Response 5250."/>
                      </div>
                </div>
          </div>
                }
                 {!response5250Data.loading && (checkData === false)  && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
          <div className="chart_container">
                <div className="chat_main1"> {/* noDataStyle  */}
                      <div style={{textAlign:'center'}}>
                        <h4>Response 5250</h4>
                        <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Response 5250."/>
                      </div>
                </div>
          </div>
                }
    </>
    )
}

export default (Response5250Report);