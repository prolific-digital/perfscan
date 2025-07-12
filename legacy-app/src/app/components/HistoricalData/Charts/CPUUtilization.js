import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";
//Local imports to be put separtely.
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import {
  fetchAsyncCPUUtilization,
  getCPUUtilData,
} from "../../../../store/slices/charts/cpuChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getExSummaryCPUData } from "../../../../store/slices/datatables/executiveSummarySlice";

const CPUUtilization = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const cpuData = useSelector(getCPUUtilData);
  const [checkData, setCheckData] = useState(false); //new
  const qd = useQueryData();
  const uuid = useSelector(getUuidData);
  const systemName = cpuData?.data?.params?.server?.split(" ");

  useEffect(() => {
    if (!uuid?.loading && uuid.data.uniqueid) {
      dispatch(fetchAsyncCPUUtilization(qd));
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (cpuData.loading === false && !_.isEmpty(cpuData.data)) {
      if (cpuData.data.data.length === 0) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [cpuData]);


  const cpuUtilization = createChartDataMapping(
    cpuData.data.data || [],
    "stackedArea",
    "cpuUtilization"
  );

  const cpuUtilizationTrends = createChartDataMapping(
    cpuData.data.trend || [],
    "stackedArea",
    "cpuUtilizationTrends"
  );
  return (
    <>
      {" "}
      {cpuData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!cpuData.loading && !_.isEmpty(cpuData.data) && checkData && (
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <ChartView
              key={"cpuutilization"}
              data={cpuUtilization}
              title={"CPU Utilization"}
              subtitle={systemName[0]}
              yAxisTitle={"Utilization"}
              xAxisDateFormat={cpuUtilization[0].xValueFormatString}
              isVisible={true}
              showTotal={true}
              stripLineToggle = {activeChartView.isShowGuidelines}
              criticalUtilizationValue={cpuData}
              metricType = {"cpu_utilization"}
              minimum={0}
            />
          )}
          {activeChartView.isTrendsChart && (
            <ChartViewTrend
              key={"cpuutilizationtrends"}
              data={cpuUtilizationTrends}
              title={"CPU Utilization with Trends"}
              subtitle={systemName[0]}
              yAxisTitle={"Utilization"}
              isVisible={true}
              xAxisDateFormat={cpuUtilization[0].xValueFormatString}
              showTotal={true}
              minimum={0}
              stripLineToggle = {activeChartView.isShowGuidelines}
              criticalUtilizationValue={cpuData}
              metricType = {"cpu_utilization"}
            />
          )}
        </div>
      )}
      {!cpuData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>CPU Utilization</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for CPU Utilization."
                />
              </div>
            </div>
            <div className="chat_main1">
              <div style={{ textAlign: "center" }}>
                <h4>CPU Utilization</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for CPU Utilization."
                />
              </div>
            </div>
          </div>
        )}
      {!cpuData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>CPU Utilization</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for CPU Utilization."
                />
              </div>
            </div>
          </div>
        )}
      {!cpuData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>CPU Utilization</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for CPU Utilization."
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default React.memo(CPUUtilization);
