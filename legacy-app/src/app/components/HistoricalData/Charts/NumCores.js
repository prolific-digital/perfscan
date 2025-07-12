import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncNumCores,
  getNumCoresData,
} from "../../../../store/slices/charts/cpuChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getExSummaryCPUData } from "../../../../store/slices/datatables/executiveSummarySlice";

const NumCores = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const numCoresData = useSelector(getNumCoresData);
  const qd = useQueryData();
  const [checkData, setCheckData] = useState(false); //new
  const uuid = useSelector(getUuidData);
  const criticalUtilizationValue = useSelector(getExSummaryCPUData)
  const systemName = numCoresData?.data?.params?.server?.split(" ");

  useEffect(() => {
    if (!uuid?.loading && uuid.data.uniqueid) {
      dispatch(fetchAsyncNumCores(qd));
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (numCoresData.loading === false && !_.isEmpty(numCoresData.data)) {
      if (numCoresData.data.data.length === 0) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [numCoresData]);

  const NumCoresUtilization = createChartDataMapping(
    numCoresData.data.data || [],
    "stackedArea",
    "noOfCores"
  );
  const NumCoresTrends = createChartDataMapping(
    numCoresData.data.trend || [],
    "stackedArea",
    "noOfCoresTrends"
  );

  return (
    <>
      {" "}
      {numCoresData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!numCoresData.loading && !_.isEmpty(numCoresData.data) && checkData && (
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <ChartView
              key={"noofcores"}
              data={NumCoresUtilization}
              title={"Number of Cores"}
              subtitle={systemName[0]}
              yAxisTitle={"Cores"}
              xAxisDateFormat={NumCoresUtilization[0].xValueFormatString}
              isVisible={activeChartView.isMetricsChart}
              showTotal={false}
              stripLineToggle = {activeChartView.isShowGuidelines}
              criticalUtilizationValue={numCoresData}
              metricType = {"no_of_cores"}
              minimum={0}
            />
          )}
          {activeChartView.isTrendsChart && (
            <ChartViewTrend
              key={"noofcorestrends"}
              data={NumCoresTrends}
              title={"Number of Cores with Trends"}
              subtitle={systemName[0]}
              yAxisTitle={"Cores"}
              isVisible={activeChartView.isTrendsChart}
              xAxisDateFormat="MMM YYYY"
              showTotal={false}
              minimum={0}
              stripLineToggle = {activeChartView.isShowGuidelines}
              criticalUtilizationValue={numCoresData}
              metricType = {"no_of_cores"}
            />
          )}
        </div>
      )}
      {/* NEW CHANGES */}
      {!numCoresData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Num Cores</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Number of Cores."
                />
              </div>
            </div>
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Num Cores</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Number of Cores."
                />
              </div>
            </div>
          </div>
        )}
      {!numCoresData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Num Cores</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Number of Cores."
                />
              </div>
            </div>
          </div>
        )}
      {!numCoresData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Num Cores</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Number of Cores."
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default React.memo(NumCores);
