import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncTopPoolFaultingRateWhatsChanged,
  getTopPoolFaultingDataWc,
} from "../../../../store/slices/charts/memoryChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataWhatsChanged";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ContentLoader from "react-content-loader";
import * as _ from "lodash";
import ChartViewPools from "../../common/ChartViewPools";
import ChartViewPoolTrends from "../../common/ChartViewPoolTrends";
import GridLoader from "react-spinners/GridLoader";


const TopPoolFault = () => {
  const dispatch = useDispatch();
  const topPoolFaultingData = useSelector(getTopPoolFaultingDataWc);
  const activeChartView = useSelector((state) => state.charts.activeChartView);
  const [checkData, setCheckData] = useState(false); //new

  const qd = useQueryData();
  useEffect(() => {
    dispatch(fetchAsyncTopPoolFaultingRateWhatsChanged(qd));
  }, [dispatch]);

  useEffect(() => {
    if (
      topPoolFaultingData.loading === false &&
      !_.isEmpty(topPoolFaultingData.data)
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
    "stackedColumn",
    "topPoolFaultingRate"
  );
  const topPoolFaultingDataTrends = createChartDataMapping(
    topPoolFaultingData.data.data || [],
    "stackedColumn",
    "topPoolFaultingTrends"
  );

  return (
    <>
      {topPoolFaultingData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6"/>
          </div>
        </div>
      )}
      {!topPoolFaultingData.loading &&
        !_.isEmpty(topPoolFaultingData.data) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartViewPools
                poolData={topPoolFaultingDataMatrics}
                title={"Top Pool Faulting Rate"}
                yAxisTitle={"Faults / Sec"}
                //refHandler={(ref) => dispatch(setChartList(ref))}
                //showTooltip={showUtilizationTooltip}
                isVisible={true}
                //hideTooltip={hideUtilizationTooltip}
                //syncZoomHandler={syncHandler}
                showTotal={false}
                minimum={0}
              />
            )}
            {/* {activeChartView.isTrendsChart && (topPoolFaultingData.data) && (
                      <ChartViewPoolTrends
                      poolData={topPoolFaultingDataTrends}
                      title={"Top Pool Faulting Rate with Trends"}
                      yAxisTitle={"Faults / Sec"}
                      //refHandler={(ref) => dispatch(setChartList(ref))}
                      //showTooltip={showTrendsTooltip}
                      isVisible={activeChartView.isTrendsChart}
                      //hideTooltip={hideTrendsTooltip}
                      //syncZoomHandler={syncTrendsZoomHandler}
                      xAxisDateFormat="MMM YYYY"
                      showTotal={false}
                      minimum = {0}
                    />
      )} */}
          </div>
        )}
      {!topPoolFaultingData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {/* noDataStyle  */}
              No data available for Top Pool Fault.
            </div>
            <div className="chat_main1">
              {/* noDataStyle  */}
              No data available for Top Pool Fault.
            </div>
          </div>
        )}
      {!topPoolFaultingData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {/* noDataStyle  */}
              No data available for Top Pool Fault.
            </div>
          </div>
        )}
      {!topPoolFaultingData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {/* noDataStyle  */}
              No data available for Top Pool Fault.
            </div>
          </div>
        )}
    </>
  );
};

export default TopPoolFault;
