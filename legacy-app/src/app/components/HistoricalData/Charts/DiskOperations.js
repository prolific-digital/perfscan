import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncDiskOperations,
  getDiskOperationsData,
} from "../../../../store/slices/charts/diskChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getExSummaryDiskData } from "../../../../store/slices/datatables/executiveSummarySlice";

const DiskOperations = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const diskOperationsData = useSelector(getDiskOperationsData);
  const qd = useQueryData();
  const [checkData, setCheckData] = useState(false); //new
  const uuid = useSelector(getUuidData);
  const systemName = diskOperationsData?.data?.params?.server?.split(" ");
  const criticalUtilizationValue = useSelector(getExSummaryDiskData);

  useEffect(() => {
    if (!uuid?.loading && uuid.data.uniqueid) {
      dispatch(fetchAsyncDiskOperations(qd));
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (
      diskOperationsData.loading === false &&
      !_.isEmpty(diskOperationsData.data)
    ) {
      if (diskOperationsData.data.data.length === 0) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [diskOperationsData]);

  const DiskOperationsMetrics = createChartDataMapping(
    diskOperationsData.data.data || [],
    "stackedArea",
    "diskOperations"
  );
  const DiskOperationsTrends = createChartDataMapping(
    diskOperationsData.data.trend || [],
    "stackedArea",
    "diskOperationsTrends"
  );

  return (
    <>
      {" "}
      {diskOperationsData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!diskOperationsData.loading &&
        !_.isEmpty(diskOperationsData.data) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                key={"diskoperations"}
                data={DiskOperationsMetrics}
                title={"Total Disk Operations"}
                subtitle={systemName[0]}
                yAxisTitle={"OPS / Sec"}
                xAxisDateFormat={DiskOperationsMetrics[0].xValueFormatString}
                isVisible={activeChartView.isMetricsChart}
                showTotal={true}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                criticalUtilizationValue={diskOperationsData}
                metricType={"total_disk_ops"}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                key={"disksoperationstrends"}
                data={DiskOperationsTrends}
                title={"Total Disk Operations with Trends "}
                subtitle={systemName[0]}
                yAxisTitle={"OPS / Sec"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                criticalUtilizationValue={diskOperationsData}
                metricType={"total_disk_ops"}
              />
            )}
          </div>
        )}
      {!diskOperationsData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Disk Operations</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Disk Operations."
                />
              </div>
            </div>
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Disk Operations</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Disk Operations."
                />
              </div>
            </div>
          </div>
        )}
      {!diskOperationsData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Disk Operations</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Disk Operations."
                />
              </div>
            </div>
          </div>
        )}
      {!diskOperationsData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Disk Operations</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Disk Operations."
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default React.memo(DiskOperations);
