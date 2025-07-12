import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncTopPoolFaultingRateReports,
  getTopPoolFaultingDataReports,
} from "../../../../store/slices/reports/DataReportCharts/memoryReportChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import { createChartDataMapping } from "../../../../helpers/commonHelper";

import ChartViewPools from "../../common/ChartViewPools";
import ChartViewPoolTrends from "../../common/ChartViewPoolTrends";
import * as _ from "lodash";
import ContentLoader from "react-content-loader";
import GridLoader from "react-spinners/GridLoader";

const TopPoolFaultReport = ({ activeChartView, reportId }) => {
  const dispatch = useDispatch();
  const topPoolFaultingData = useSelector(getTopPoolFaultingDataReports);
  // const activeChartView = useSelector(state => state.charts.activeChartView);
  const qd = useQueryData();
  const [checkData, setCheckData] = useState(false); //new
  const [checkTrends, setCheckTrends] = useState(false); //new

  useEffect(() => {
    dispatch(fetchAsyncTopPoolFaultingRateReports(reportId));
  }, [dispatch]);

  useEffect(() => {
    if (
      topPoolFaultingData.loading === false &&
      !_.isEmpty(topPoolFaultingData.data.data)
    ) {
      if (topPoolFaultingData.data.data.length === 0) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [topPoolFaultingData]);

  const topPoolFaultingDataMatrics = createChartDataMapping(
    topPoolFaultingData.data.data || [],
    "stackedArea",
    "topPoolFaultingRate"
  );

  const topPoolFaultingDataTrends = createChartDataMapping(
    topPoolFaultingData.data.trend || [],
    "stackedArea",
    "topPoolFaultingRateTrends"
  );

  return (
    <>
      {" "}
      {topPoolFaultingData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!topPoolFaultingData.loading &&
        !_.isEmpty(topPoolFaultingData.data.data) &&
        checkData && (
          <div className="chart_container" style={{ pageBreakAfter: "always" }}>
            {activeChartView.isMetricsChart && (
              <ChartViewPools
                poolData={topPoolFaultingDataMatrics}
                title={"Top Pool Faulting Rate"}
                yAxisTitle={"Faults / Sec"}
                xAxisDateFormat={
                  topPoolFaultingDataMatrics[0]?.xValueFormatString ||
                  "DD MMM YY HH:mm" 
                }
                isVisible={true}
                showTotal={false}
                minimum={0}
              />
            )}
            {activeChartView.isTrendsChart && topPoolFaultingData.data && (
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
          </div>
        )}
      {!topPoolFaultingData.loading &&
        _.isEmpty(topPoolFaultingData.data.data) &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Top Pool Faulting</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Top Pool Fault."
                />
              </div>
            </div>
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Top Pool Faulting</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Top Pool Fault."
                />
              </div>
            </div>
          </div>
        )}
      {!topPoolFaultingData.loading &&
        _.isEmpty(topPoolFaultingData.data.data) &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Top Pool Faulting</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Top Pool Fault."
                />
              </div>
            </div>
          </div>
        )}
      {!topPoolFaultingData.loading &&
        _.isEmpty(topPoolFaultingData.data.data) &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Top Pool Faulting</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Top Pool Fault."
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default TopPoolFaultReport;
