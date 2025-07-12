import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncTopPoolFaultingRate, getTopPoolFaultingData } from "../../../../store/slices/charts/memoryChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
  createChartDataMapping
} from "../../../../helpers/commonHelper";
import ChartViewPools from "../../common/ChartViewPools";
import ChartViewPoolTrends from "../../common/ChartViewPoolTrends";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const TopPoolFaultPrint = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const topPoolFaultingData = useSelector(getTopPoolFaultingData);
  const qd = useQueryData();
  const [checkData, setCheckData] = useState(false); //new

  useEffect(() => {
    dispatch(fetchAsyncTopPoolFaultingRate(qd));
  }, [dispatch])

  useEffect(() => {
    if (topPoolFaultingData.loading === false && !_.isEmpty(topPoolFaultingData.data.data)) {
      if (topPoolFaultingData.data.data.length === 0) {
        setCheckData(false);
      }
      else {
        setCheckData(true)
      }
    }
  }, [topPoolFaultingData])

  const topPoolFaultingDataMatrics = createChartDataMapping(
    topPoolFaultingData.data.data || [],
    "stackedColumn",
    "topPoolFaultingRate"
  );

  const topPoolFaultingDataTrends = createChartDataMapping(
    topPoolFaultingData.data.trend || [],
    "stackedColumn",
    "topPoolFaultingRateTrends"
  );


  return (
    <>  {topPoolFaultingData.loading &&
      <div className="chart_container">
        <div style={{ display: "block", margin: "auto" }}>
          <GridLoader color="#366bd6"/>
        </div>
        <div style={{ display: "block", margin: "auto" }}>
          <GridLoader color="#366bd6"/>
        </div>
      </div>
    }
      {!topPoolFaultingData.loading && !_.isEmpty(topPoolFaultingData.data.data) && (checkData) &&
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <ChartViewPools
                    poolData={topPoolFaultingDataMatrics}
                    title={"Top Pool Faulting Rate"}
                    yAxisTitle={"Faults / Sec"}
                    isVisible={true}
                    showTotal={false}
                    minimum={0}
                  />
                )}
              </tr>
              <tr>
                {activeChartView.isTrendsChart && (topPoolFaultingData.data) && (
                  <ChartViewPoolTrends
                    poolData={topPoolFaultingDataTrends}
                    title={"Top Pool Faulting Rate with Trends"}
                    yAxisTitle={"Faults / Sec"}
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

      {!topPoolFaultingData.loading && _.isEmpty(topPoolFaultingData.data.data) && (checkData === false) && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
              <div style={{textAlign:'center'}}>
                <h4>Top Pool Faulting</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Top Pool Fault."/>
            </div>
          </div>
          <div className="chat_main1"> {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>Top Pool Faulting</h4>
              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Top Pool Fault."/>
              </div>
            </div>
        </div>
      }

      {!topPoolFaultingData.loading && _.isEmpty(topPoolFaultingData.data.data) && (checkData === false) && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
              <div style={{textAlign:'center'}}>
                <h4>Top Pool Faulting</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Top Pool Fault."/>
            </div>
          </div>
        </div>
      }
      {!topPoolFaultingData.loading && _.isEmpty(topPoolFaultingData.data.data) && (checkData === false) && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
              <div style={{textAlign:'center'}}>
                <h4>Top Pool Faulting</h4>
                <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Top Pool Fault."/>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default (TopPoolFaultPrint);