import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncDiskArmUtilization,
  getDiskArmData,
} from "../../../../store/slices/charts/diskChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getExSummaryDiskData } from "../../../../store/slices/datatables/executiveSummarySlice";

const DiskArmUtilization = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const diskArmData = useSelector(getDiskArmData);
  const [checkData, setCheckData] = useState(false); //new
  const qd = useQueryData();
  const uuid = useSelector(getUuidData);
  const systemName = diskArmData?.data?.params?.server?.split(" ");
  const criticalUtilizationValue = useSelector(getExSummaryDiskData)

  useEffect(() => {
    if (!uuid?.loading && uuid.data.uniqueid) {
      dispatch(fetchAsyncDiskArmUtilization(qd));
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (diskArmData.loading === false && !_.isEmpty(diskArmData.data)) {
      if (diskArmData.data.data.length === 0) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [diskArmData]);

  const DiskArmUtilization = createChartDataMapping(
    diskArmData.data.data || [],
    "stackedArea",
    "diskArmUtilization"
  );
  const DiskArmUtilizationsTrends = createChartDataMapping(
    diskArmData.data.trend || [],
    "stackedArea",
    "diskArmTrends"
  );

  return (
    <>
      {" "}
      {diskArmData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!diskArmData.loading && !_.isEmpty(diskArmData.data) && checkData && (
        <div className="chart_container">
          {activeChartView.isMetricsChart && (
            <ChartView
              key={"diskarm"}
              data={DiskArmUtilization}
              title={"Disk Arm Utilization"}
              subtitle={systemName[0]}
              yAxisTitle={"Utilization"}
              xAxisDateFormat={DiskArmUtilization[0].xValueFormatString}
              isVisible={activeChartView.isMetricsChart}
              minimum={0}
              showTotal={false}
              stripLineToggle = {activeChartView.isShowGuidelines}
              criticalUtilizationValue={diskArmData}
              metricType = {"disk_arm_utilization"}
            />
          )}
          {activeChartView.isTrendsChart && (
            <ChartViewTrend
              key={"disksarmtrends"}
              data={DiskArmUtilizationsTrends}
              title={"Disk Arm Utilization with Trends"}
              subtitle={systemName[0]}
              yAxisTitle={"Utilization"}
              isVisible={activeChartView.isTrendsChart}
              xAxisDateFormat="MMM YYYY"
              showTotal={false}
              minimum={0}
              stripLineToggle = {activeChartView.isShowGuidelines}
              criticalUtilizationValue={diskArmData}
              metricType = {"disk_arm_utilization"}
            />
          )}
        </div>
      )}
      {!diskArmData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Disk Arm Utilization</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for DiskArm Utilization."
                />
              </div>
            </div>
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Disk Arm Utilization</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for DiskArm Utilization."
                />
              </div>
            </div>
          </div>
        )}
      {!diskArmData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Disk Arm Utilization</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for DiskArm Utilization."
                />
              </div>
            </div>
          </div>
        )}
      {!diskArmData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Disk Arm Utilization</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for DiskArm Utilization."
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default React.memo(DiskArmUtilization);
