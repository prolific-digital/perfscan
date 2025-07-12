import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncResponse5250, getResponse5250Data } from "../../../../store/slices/charts/otherChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const Response5250Print = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const response5250Data = useSelector(getResponse5250Data);
  const qd = useQueryData();
  const [checkData, setCheckData] = useState(false); //new

  useEffect(() => {
    dispatch(fetchAsyncResponse5250(qd));
  }, [dispatch])

  useEffect(() => {
    if (response5250Data.loading === false && !_.isEmpty(response5250Data.data)) {
      if (response5250Data.data.data.length === 0) {
        setCheckData(false);
      }
      else {
        setCheckData(true)
      }
    }
  }, [response5250Data])

  const response5250DataMatrics = createChartDataMapping(
    response5250Data.data.data || [],
    "stackedColumn",
    "responseTime5250"
  );
  const response5250DataTrends = createChartDataMapping(
    response5250Data.data.trend || [],
    "stackedColumn",
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
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <ChartView
                    data={response5250DataMatrics}
                    title={"5250 Response Time"}
                    yAxisTitle={"Seconds"}
                    isVisible={true}
                    showTotal={false}
                    minimum={0}
                  />
                )}
              </tr>
              <tr>
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
              </tr>
            </tbody>
          </table>
        </div>
      }

      {!response5250Data.loading && (checkData === false) && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>Response 5250</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Response 5250."/>
            </div>
          </div>
          <div className="chat_main1">  {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>Response 5250</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Response 5250."/>
            </div>
          </div>
        </div>
      }

      {!response5250Data.loading && (checkData === false) && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>Response 5250</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Response 5250."/>
            </div>
          </div>
        </div>
      }
      {!response5250Data.loading && (checkData === false) && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
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

export default (Response5250Print);