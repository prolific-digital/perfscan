import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncEthernetUtilization,
  getEthernetLineData,
} from "../../../../store/slices/charts/otherChartsSlice";
import useQueryData from "../../../../hooks/useQueryDataHistorical";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import ChartView from "../../common/ChartView";
import ChartViewTrend from "../../common/ChartViewTrend";
import * as _ from "lodash";
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getExSummaryOtherData } from "../../../../store/slices/datatables/executiveSummarySlice";

const EthernetLineUtil = ({ activeChartView }) => {
  const dispatch = useDispatch();
  const ethernetLineData = useSelector(getEthernetLineData);
  const qd = useQueryData();
  const [checkData, setCheckData] = useState(false); //new
  const uuid = useSelector(getUuidData);
  const systemName = ethernetLineData?.data?.params?.server?.split(" ");
  const criticalUtilizationValue = useSelector(getExSummaryOtherData)

  useEffect(() => {
    if (!uuid?.loading && uuid.data.uniqueid) {
      dispatch(fetchAsyncEthernetUtilization(qd));
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (
      ethernetLineData.loading === false &&
      !_.isEmpty(ethernetLineData.data)
    ) {
      if (ethernetLineData.data.data.length === 0) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [ethernetLineData]);

  const ethernetLineDataMatrics = createChartDataMapping(
    ethernetLineData.data.data || [],
    "stackedArea",
    "ethernetLineUtilization"
  );
  const ethernetLineDataTrends = createChartDataMapping(
    ethernetLineData.data.trend || [],
    "stackedArea",
    "ethernetLineUtilizationTrends"
  );

  return (
    <>
      {" "}
      {ethernetLineData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!ethernetLineData.loading &&
        !_.isEmpty(ethernetLineData.data) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                data={ethernetLineDataMatrics}
                title={"Ethernet Utilization"}
                subtitle={systemName[0]}
                yAxisTitle={"Utilization"}
                xAxisDateFormat={ethernetLineDataMatrics[0].xValueFormatString}
                isVisible={true}
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                criticalUtilizationValue={ethernetLineData}
                metricType={"ethernet_line_utilization"}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                data={ethernetLineDataTrends}
                title={"Ethernet Utilization with Trends"}
                subtitle={systemName[0]}
                yAxisTitle={"Utilization"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                criticalUtilizationValue={ethernetLineData}
                metricType={"ethernet_line_utilization"}
              />
            )}
          </div>
        )}
      {!ethernetLineData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Ethernet Line Utilization</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Ethernet Line Utilization."
                />
              </div>
            </div>
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Ethernet Line Utilization</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Ethernet Line Utilization."
                />
              </div>
            </div>
          </div>
        )}
      {!ethernetLineData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Ethernet Line Utilization</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Ethernet Line Utilization."
                />
              </div>
            </div>
          </div>
        )}
      {!ethernetLineData.loading &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              {" "}
              {/* noDataStyle  */}
              <div style={{ textAlign: "center" }}>
                <h4>Ethernet Line Utilization</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt="No data available for Ethernet Line Utilization."
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default React.memo(EthernetLineUtil);
