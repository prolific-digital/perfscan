import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncCPUMS, getCPUMsData } from "../../../../store/slices/charts/cpuChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const CPUMsPrint = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const cpuMSData = useSelector(getCPUMsData);
  const [checkData, setCheckData] = useState(false);
  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncCPUMS(qd));
  }, [dispatch])

  useEffect(() => {
    if (cpuMSData.loading === false && !_.isEmpty(cpuMSData.data)) {
      if (cpuMSData.data.data.length === 0) {
        setCheckData(false);
      }
      else {
        setCheckData(true)
      }
    }
  }, [cpuMSData])

  const CPUMsUtilization = createChartDataMapping(
    cpuMSData.data.data || [],
    "stackedColumn",
    "CPUMsUtilization"
  );
  const CPUMsTrends = createChartDataMapping(
    cpuMSData.data.trend || [],
    "stackedColumn",
    "CPUMsTrends"
  );

  return (
    <>  {cpuMSData.loading &&
      <div className="chart_container">
        <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
      </div>
    }
      {!cpuMSData.loading && !_.isEmpty(cpuMSData.data) && (checkData) &&
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <ChartView
                    data={CPUMsUtilization}
                    title={"Total CPU ms used"}
                    yAxisTitle={"ms"}
                    isVisible={true}
                    showTotal={false}
                    minimum={0}
                  />
                )}
              </tr>
              <tr>
                {activeChartView.isTrendsChart && (
                  <ChartViewTrend
                    data={CPUMsTrends}
                    title={"Total CPU ms used with Trends "}
                    yAxisTitle={"ms"}
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

      {!cpuMSData.loading && (checkData === false) && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
          <div style={{textAlign:'center'}}>
            <h4>CPUMs</h4>
            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPUMS data."/>
          </div>
          </div>
          <div className="chat_main1">  {/* noDataStyle  */}
          <div style={{textAlign:'center'}}>
            <h4>CPUMs</h4>
            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPUMS data."/>
          </div>
          </div>
        </div>
      }

      {!cpuMSData.loading && (checkData === false) && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
        <div className="chart_container">
          <div className="chat_main1">
          <div style={{textAlign:'center'}}>
            <h4>CPUMs</h4>
            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPUMS data."/>
          </div>
          </div>
        </div>
      }
      {!cpuMSData.loading && (checkData === false) && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
        <div className="chart_container">
          <div className="chat_main1">
          <div style={{textAlign:'center'}}>
            <h4>CPUMs</h4>
            <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for CPUMS data."/>
          </div>
          </div>
        </div>
      }
    </>
  )
}

export default memo(CPUMsPrint);