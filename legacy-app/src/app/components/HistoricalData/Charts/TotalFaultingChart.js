import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncTotalFaultingRate,
  getTotalFaultingRateData,
} from "../../../../store/slices/charts/memoryChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import { createChartDataMapping } from "../../../../helpers/commonHelper";

import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getExSummaryMemoryData } from "../../../../store/slices/datatables/executiveSummarySlice";

const TotalFaultingChart = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const totalFaultingRateData = useSelector(getTotalFaultingRateData);
  const qd = useQueryData();
  const [checkData, setCheckData] = useState(false); //new
  const uuid = useSelector(getUuidData);
  const systemName = totalFaultingRateData?.data?.params?.server?.split(" ");
  const criticalUtilizationValue = useSelector(getExSummaryMemoryData);

  useEffect(() => {
    if (!uuid?.loading && uuid.data.uniqueid) {
      dispatch(fetchAsyncTotalFaultingRate(qd));
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (
      totalFaultingRateData.loading === false &&
      !_.isEmpty(totalFaultingRateData.data)
    ) {
      if (totalFaultingRateData.data.data.length === 0) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [totalFaultingRateData]);

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
    <>
      {" "}
      {totalFaultingRateData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!totalFaultingRateData.loading &&
        !_.isEmpty(totalFaultingRateData.data) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                data={totalFaultingRateDataMatrics}
                title={"Total Faulting Rate"}
                subtitle={systemName[0]}
                yAxisTitle={"Faults / Sec"}
                xAxisDateFormat={
                  totalFaultingRateDataMatrics[0].xValueFormatString
                }
                isVisible={true}
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                criticalUtilizationValue={totalFaultingRateData}
                metricType={"faulting_rate"}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                data={totalFaultingRateDataTrends}
                title={"Total Faulting Rate with Trends"}
                subtitle={systemName[0]}
                yAxisTitle={"Faults / Sec"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                criticalUtilizationValue={totalFaultingRateData}
                metricType={"faulting_rate"}
              />
            )}
          </div>
        )}
      {!totalFaultingRateData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Total Faulting Chart</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Total Faulting Chart."
                />
              </div>
            </div>
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Total Faulting Chart</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Total Faulting Chart."
                />
              </div>
            </div>
          </div>
        )}
      {!totalFaultingRateData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Total Faulting Chart</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Total Faulting Chart."
                />
              </div>
            </div>
          </div>
        )}
      {!totalFaultingRateData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Total Faulting Chart</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Total Faulting Chart."
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default React.memo(TotalFaultingChart);
