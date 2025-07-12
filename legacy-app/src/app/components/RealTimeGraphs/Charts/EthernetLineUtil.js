import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";
import ChartViewTrend from "../../common/ChartViewTrend";
import ChartNoDataImage from "../NodataImage/ChartNoDataImage";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import { ethernetUtilGraphSub } from "../../../pages/GraphQL/Subscriptions/OTHERSSubscriptions";
import {
  ethernetUtilGphData,
  ethernetUtilGraphDataHandler,
} from "../../../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import { ethernetUtilGraphTrigger } from "../../../pages/GraphQL/Mutations/OTHERSGraphMutation";
import { useMutation, useSubscription } from "@apollo/client";

const EthernetLineUtil = ({ activeChartView, selectedSystem, id, sysName }) => {
  const systemName = sysName;
  const dispatch = useDispatch();
  const [checkData, setCheckData] = useState(false); //new
  const ethernetLineData = useSelector(ethernetUtilGphData);
  const [receivedRtData, setReceivedRtData] = useState({
    ethernetUtilGraph: [],
    ethernetUtilTrendsGraph: [],
    values: [],
  });

  const [ethernetUtilGraphDataMutation, wholeDayData] = useMutation(ethernetUtilGraphTrigger);
  const ethernetLineDataSub = useSubscription(ethernetUtilGraphSub, {
    variables: { ethernetLineGraphId: +id },
  });

  useEffect(() => {
    if (wholeDayData && !wholeDayData?.loading && wholeDayData?.data) {
      if (
        typeof wholeDayData != "undefined" &&
        wholeDayData?.hasOwnProperty("data") &&
        Object.keys(wholeDayData?.data)?.length &&
        Object.keys(wholeDayData?.data?.ethernetLineGraphUpdate)?.length
      ) {
        dispatch(ethernetUtilGraphDataHandler(wholeDayData));
        setReceivedRtData((preVal) => {
          return {
            ...preVal,
            ethernetUtilGraph:
              wholeDayData?.data?.ethernetLineGraphUpdate?.data,
            ethernetUtilTrendsGraph:
              wholeDayData?.data?.ethernetLineGraphUpdate?.trend,
            values: wholeDayData?.data?.ethernetLineGraphUpdate?.values,
          };
        });
      }
    }
  }, [wholeDayData.loading]);

  useEffect(() => {
    if (
      ethernetLineDataSub &&
      !ethernetLineDataSub?.loading &&
      ethernetLineDataSub?.data
    ) {
      // const updatedArr = setTimeout(() => {
        if (
          !ethernetLineDataSub?.loading &&
          typeof ethernetLineDataSub === "object" &&
          ethernetLineDataSub?.data?.ethernetLineGraph?.data?.length
        ) {
          setReceivedRtData((preVal) => {
            let updatedGraphData;
            let updatedTrendsData;
            if (!preVal?.ethernetUtilGraph.length) {
              updatedGraphData = [
                ...ethernetLineDataSub?.data?.ethernetLineGraph?.data,
              ];
            } else {
              const slicedData = preVal?.ethernetUtilGraph?.slice(1);
              updatedGraphData = [
                ...slicedData,
                ...ethernetLineDataSub?.data?.ethernetLineGraph?.data,
              ];
            }
            if (!preVal?.ethernetUtilTrendsGraph.length) {
              updatedTrendsData = [
                ...ethernetLineDataSub?.data?.ethernetLineGraph?.trend,
              ];
            } else {
              // const slicedData = preVal?.ethernetUtilTrendsGraph?.slice(1);
              updatedTrendsData = [
                // ...slicedData,
                ...ethernetLineDataSub?.data?.ethernetLineGraph?.trend,
              ];
            }
            return {
              ...preVal,
              ethernetUtilGraph: updatedGraphData,
              ethernetUtilTrendsGraph: updatedTrendsData,
              values: ethernetLineDataSub?.data?.ethernetLineGraph?.values
                ? ethernetLineDataSub?.data?.ethernetLineGraph?.values
                : preVal.values,
            };
          });
        }
      // }, 3000);

      // return () => {
      //   clearTimeout(updatedArr);
      // };
    }
  }, [ethernetLineDataSub?.data]);

  useEffect(() => {
    totalFaultingGraphDataMutationHandler(+id);
  }, [id]);

  useEffect(() => {
    if (
      ethernetLineDataSub?.loading === false &&
      (!_?.isEmpty(receivedRtData?.ethernetUtilGraph) ||
        !_?.isEmpty(receivedRtData?.ethernetUtilTrendsGraph))
    ) {
      if (
        receivedRtData?.ethernetUtilGraph?.length === 0 &&
        receivedRtData?.ethernetUtilTrendsGraph?.length === 0
      ) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [
    ethernetLineDataSub?.loading,
    receivedRtData?.ethernetUtilGraph,
    receivedRtData?.ethernetUtilTrendsGraph,
  ]);

  const ethernetLineDataMatrics = createChartDataMapping(
    receivedRtData?.ethernetUtilGraph || [],
    "stackedArea",
    "ethernetLineUtilization"
  );
  const ethernetLineDataTrends = createChartDataMapping(
    receivedRtData?.ethernetUtilTrendsGraph || [],
    "stackedArea",
    "ethernetLineUtilizationTrends"
  );

  const totalFaultingGraphDataMutationHandler = async (id) => {
    try {
      await ethernetUtilGraphDataMutation({
        variables: { ethernetLineGraphUpdateId: id },
      });
    } catch (error) {
      console.log(error);
      if (error.name === "AbortError") {
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
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
        (!_.isEmpty(receivedRtData?.ethernetUtilGraph) || !_.isEmpty(receivedRtData?.ethernetUtilTrendsGraph)) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                data={ethernetLineDataMatrics}
                title={"Ethernet Utilization"}
                subtitle={systemName}
                yAxisTitle={"Utilization"}
                xAxisDateFormat={ethernetLineDataMatrics[0].xValueFormatString}
                isVisible={true}
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"ethernet_line_utilization"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                data={ethernetLineDataTrends}
                title={"Ethernet Utilization with Trends"}
                subtitle={systemName}
                yAxisTitle={"Utilization"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"ethernet_line_utilization"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
          </div>
        )}
      <ChartNoDataImage
        checkData={checkData}
        metric={ethernetLineData}
        activeChartView={activeChartView}
        metricName={"Ethernet Utilization"}
        graphToggle={_.isEmpty(receivedRtData?.ethernetUtilGraph) ? true : false}
        trendGraphToggle={_.isEmpty(receivedRtData?.ethernetUtilTrendsGraph) ? true : false}
      />
    </>
  );
};

export default React.memo(EthernetLineUtil);
