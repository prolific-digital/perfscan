import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncEthernetUtilization, getEthernetLineData } from "../../../../store/slices/charts/otherChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import {
  createChartDataMapping,
} from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from 'lodash';
import GridLoader from "react-spinners/GridLoader";

const EthernetLineUtilPrint = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const ethernetLineData = useSelector(getEthernetLineData);
  const qd = useQueryData();
  const [checkData, setCheckData] = useState(false); //new

  useEffect(() => {
    dispatch(fetchAsyncEthernetUtilization(qd));
  }, [dispatch])

  useEffect(() => {
    if (ethernetLineData.loading === false && !_.isEmpty(ethernetLineData.data)) {
      if (ethernetLineData.data.data.length === 0) {
        setCheckData(false);
      }
      else {
        setCheckData(true)
      }
    }
  }, [ethernetLineData])

  const ethernetLineDataMatrics = createChartDataMapping(
    ethernetLineData.data.data || [],
    "stackedColumn",
    "ethernetLineUtilization"
  );
  const ethernetLineDataTrends = createChartDataMapping(
    ethernetLineData.data.trend || [],
    "stackedColumn",
    "ethernetLineUtilizationTrends"
  );

  return (
    <>  {ethernetLineData.loading &&
      <div className="chart_container">
        <div style={{ display: "block", margin: "auto" }}>
          <GridLoader color="#366bd6"/>
        </div>
        <div style={{ display: "block", margin: "auto" }}>
          <GridLoader color="#366bd6"/>
        </div>
      </div>
    }
      {!ethernetLineData.loading && !_.isEmpty(ethernetLineData.data) && (checkData) &&
        <div className="chart_container">
          <table className="table tableAlign printTable">
            <tbody>
              <tr>
                {activeChartView.isMetricsChart && (
                  <ChartView
                    data={ethernetLineDataMatrics}
                    title={"Ethernet Utilization"}
                    yAxisTitle={"Utilization"}
                    isVisible={true}
                    showTotal={false}
                    minimum={0}
                  />
                )}
              </tr>
              <tr>
                {activeChartView.isTrendsChart && (
                  <ChartViewTrend
                    data={ethernetLineDataTrends}
                    title={"Ethernet Utilization with Trends"}
                    yAxisTitle={"Utilization"}
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

      {!ethernetLineData.loading && (checkData === false) && activeChartView.isMetricsChart && activeChartView.isTrendsChart &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>Ethernet Line Utilization</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Ethernet Line Utilization."/>
                  </div>
          </div>
          <div className="chat_main1">  {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>Ethernet Line Utilization</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Ethernet Line Utilization."/>
                  </div>
          </div>
        </div>
      }

      {!ethernetLineData.loading && (checkData === false) && activeChartView.isMetricsChart && (activeChartView.isTrendsChart === false) &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>Ethernet Line Utilization</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Ethernet Line Utilization."/>
                  </div>
          </div>
        </div>
      }
      {!ethernetLineData.loading && (checkData === false) && (activeChartView.isMetricsChart === false) && (activeChartView.isTrendsChart) &&
        <div className="chart_container">
          <div className="chat_main1"> {/* noDataStyle  */}
                  <div style={{textAlign:'center'}}>
                    <h4>Ethernet Line Utilization</h4>
                    <img style={{height:'50%',width:'50%'}} src="/noData.webp" alt="No data available for Ethernet Line Utilization."/>
                  </div>
          </div>
        </div>
      }
    </>
  )
}

export default (EthernetLineUtilPrint);