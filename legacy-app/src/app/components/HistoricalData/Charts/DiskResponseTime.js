import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncDiskResponse,
  getDiskResponseData,
} from "../../../../store/slices/charts/diskChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getExSummaryDiskData } from "../../../../store/slices/datatables/executiveSummarySlice";

const DiskResponseTime = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const diskResponseData = useSelector(getDiskResponseData);
  const qd = useQueryData();
  const [checkData, setCheckData] = useState(false); //new
  const uuid = useSelector(getUuidData);
  const systemName = diskResponseData?.data?.params?.server?.split(" ");
  const criticalUtilizationValue = useSelector(getExSummaryDiskData);

  useEffect(() => {
    if (!uuid?.loading && uuid.data.uniqueid) {
      dispatch(fetchAsyncDiskResponse(qd));
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (
      diskResponseData.loading === false &&
      !_.isEmpty(diskResponseData.data)
    ) {
      if (diskResponseData.data.data.length === 0) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [diskResponseData]);

  const DiskResponseTimeData = createChartDataMapping(
    diskResponseData.data.data || [],
    "stackedArea",
    "diskResponse"
  );
  const DiskResponseTimeTrends = createChartDataMapping(
    diskResponseData.data.trend || [],
    "stackedArea",
    "diskResponseTrends"
  );

  return (
    <>
      {" "}
      {diskResponseData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!diskResponseData.loading &&
        !_.isEmpty(diskResponseData.data) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                key={"diskresponse"}
                data={DiskResponseTimeData}
                title={"Disk Response Time"}
                subtitle={systemName[0]}
                yAxisTitle={"ms"}
                xAxisDateFormat={DiskResponseTimeData[0].xValueFormatString}
                isVisible={activeChartView.isMetricsChart}
                showTotal={true}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                criticalUtilizationValue={diskResponseData}
                metricType={"disk_response_time"}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                key={"diskresponsetrends"}
                data={DiskResponseTimeTrends}
                title={"Disk Response Time with Trends "}
                subtitle={systemName[0]}
                yAxisTitle={"ms"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={true}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                criticalUtilizationValue={diskResponseData}
                metricType={"disk_response_time"}
              />
            )}
          </div>
        )}
      {!diskResponseData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Disk Response Time</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Disk Response Time."
                />
              </div>
            </div>
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Disk Response Time</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Disk Response Time."
                />
              </div>
            </div>
          </div>
        )}
      {!diskResponseData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Disk Response Time</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Disk Response Time."
                />
              </div>
            </div>
          </div>
        )}
      {!diskResponseData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Disk Response Time</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Disk Response Time."
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default React.memo(DiskResponseTime);
