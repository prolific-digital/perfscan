import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncCPUUtilization, getCPUUtilData } from "../../../../store/slices/charts/cpuChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import * as _ from 'lodash';
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";

import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import GridLoader from "react-spinners/GridLoader";

const CPUUtilizationPrint = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const cpuData = useSelector(getCPUUtilData);
  const [checkData, setCheckData] = useState(false); //new
  const qd = useQueryData();

  useEffect(() => {
    dispatch(fetchAsyncCPUUtilization(qd));
  }, [dispatch])

  useEffect(() => {
    if (cpuData.loading === false && !_.isEmpty(cpuData.data)) {
      if (cpuData.data.data.length === 0) {
        setCheckData(false);
      }
      else {
        setCheckData(true)
      }
    }
  }, [cpuData])


  const cpuUtilization = createChartDataMapping(
    cpuData.data.data || [],
    "stackedColumn",
    "cpuUtilization"
  );
  const cpuUtilizationTrends = createChartDataMapping(
    cpuData.data.trend || [],
    "stackedColumn",
    "cpuUtilizationTrends"
  );
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
      {!cpuData.loading && !_.isEmpty(cpuData.data) && (checkData) &&
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <ChartView
                    key={"cpuutilization"}
                    data={cpuUtilization}
                    title={"CPU Utilization"}
                    yAxisTitle={"Utilization"}
                    isVisible={true}
                    showTotal={true}
                    minimum={0} />
                )}
              </tr>
              <tr>
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
              </tr>
            </tbody>
          </table>
        </div>
      }

      {!cpuData.loading && (checkData === false) && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>CPU Utilization</h4>
              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
            </div>
          </div>
          <div className="chat_main1">  {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>CPU Utilization</h4>
              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
            </div>
          </div>
        </div>
      }

      {!cpuData.loading && (checkData === false) && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
            <div style={{textAlign:'center'}}>
              <h4>CPU Utilization</h4>
              <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPU Utilization."/>
            </div>
          </div>
        </div>
      }
      {!cpuData.loading && (checkData === false) && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
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

export default (CPUUtilizationPrint);