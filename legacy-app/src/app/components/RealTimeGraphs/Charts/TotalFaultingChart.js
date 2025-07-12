import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";
import ChartViewTrend from "../../common/ChartViewTrend";
import { useMutation, useSubscription } from "@apollo/client";
import ChartNoDataImage from "../NodataImage/ChartNoDataImage";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import {
  totalFaultingChartGraphDataHandler,
  totalFaultingGphData,
} from "../../../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import { totalFaultingGraphTrigger } from "../../../pages/GraphQL/Mutations/MEMROYGraphMutation";
import { totalFaultingGraphSub } from "../../../pages/GraphQL/Subscriptions/MEMORYSubscriptions";

const TotalFaultingChart = ({ activeChartView, selectedSystem, id, sysName }) => {
  const systemName = sysName;
  const dispatch = useDispatch();
  const [checkData, setCheckData] = useState(false); //new
  const totalFaultingRateData = useSelector(totalFaultingGphData);
  const [receivedRtData, setReceivedRtData] = useState({
    totalFaultingGraph: [],
    totalFaultingTrendsGraph: [],
    values: [],
  });

  const [totalFaultingGraphDataMutation, wholeDayData] = useMutation(
    totalFaultingGraphTrigger
  );
  const totalFaultingDataSub = useSubscription(totalFaultingGraphSub, {
    variables: { totFaultRateGraphId: +id },
  });

  useEffect(() => {
    if (wholeDayData && !wholeDayData?.loading && wholeDayData?.data) {
      if (
        typeof wholeDayData != "undefined" &&
        wholeDayData?.hasOwnProperty("data") &&
        Object.keys(wholeDayData?.data)?.length &&
        Object.keys(wholeDayData?.data?.tfrGraphUpdate)?.length
      ) {
        dispatch(totalFaultingChartGraphDataHandler(wholeDayData));
        setReceivedRtData((preVal) => {
          return {
            ...preVal,
            totalFaultingGraph: wholeDayData?.data?.tfrGraphUpdate?.data,
            totalFaultingTrendsGraph: wholeDayData?.data?.tfrGraphUpdate?.trend,
            values: wholeDayData?.data?.tfrGraphUpdate?.values,
          };
        });
      }
    }
  }, [wholeDayData.loading]);

  useEffect(() => {
    if (
      totalFaultingDataSub &&
      !totalFaultingDataSub?.loading &&
      totalFaultingDataSub?.data
    ) {
      // const updatedArr = setTimeout(() => {
        if (
          !totalFaultingDataSub?.loading &&
          typeof totalFaultingDataSub === "object" &&
          totalFaultingDataSub?.data?.totFaultRateGraph?.data?.length
        ) {
          setReceivedRtData((preVal) => {
            let updatedGraphData;
            let updatedTrendsData;
            if (!preVal?.totalFaultingGraph.length) {
              updatedGraphData = [
                ...totalFaultingDataSub?.data?.totFaultRateGraph?.data,
              ];
            } else {
              const slicedData = preVal?.totalFaultingGraph?.slice(1);
              updatedGraphData = [
                ...slicedData,
                ...totalFaultingDataSub?.data?.totFaultRateGraph?.data,
              ];
            }
            if (!preVal?.totalFaultingTrendsGraph.length) {
              updatedTrendsData = [
                ...totalFaultingDataSub?.data?.totFaultRateGraph?.trend,
              ];
            } else {
              // const slicedData = preVal?.totalFaultingTrendsGraph?.slice(1);
              updatedTrendsData = [
                // ...slicedData,
                ...totalFaultingDataSub?.data?.totFaultRateGraph?.trend,
              ];
            }
            return {
              ...preVal,
              totalFaultingGraph: updatedGraphData,
              totalFaultingTrendsGraph: updatedTrendsData,
              values: totalFaultingDataSub?.data?.totFaultRateGraph?.values
                ? totalFaultingDataSub?.data?.totFaultRateGraph?.values
                : preVal.values,
            };
          });
        }
      // }, 3000);

      // return () => {
      //   clearTimeout(updatedArr);
      // };
    }
  }, [totalFaultingDataSub?.data]);

  useEffect(() => {
    totalFaultingGraphDataMutationHandler(+id);
  }, [id]);

  useEffect(() => {
    if (
      totalFaultingDataSub?.loading === false &&
      (!_?.isEmpty(receivedRtData?.totalFaultingGraph) ||
        !_?.isEmpty(receivedRtData?.totalFaultingTrendsGraph))
    ) {
      if (
        receivedRtData?.totalFaultingGraph?.length === 0 &&
        receivedRtData?.totalFaultingTrendsGraph?.length === 0
      ) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [
    receivedRtData?.totalFaultingGraph,
    receivedRtData?.totalFaultingTrendsGraph,
    totalFaultingDataSub?.loading,
  ]);

  const totalFaultingRateDataMatrics = createChartDataMapping(
    receivedRtData?.totalFaultingGraph || [],
    "stackedArea",
    "totalFaultingRate"
  );
  const totalFaultingRateDataTrends = createChartDataMapping(
    receivedRtData?.totalFaultingTrendsGraph || [],
    "stackedArea",
    "totalFaultingRateTrends"
  );

  const totalFaultingGraphDataMutationHandler = async (id) => {
    try {
      await totalFaultingGraphDataMutation({
        variables: { tfrGraphUpdateId: id },
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
        (!_.isEmpty(receivedRtData?.totalFaultingGraph) || !_.isEmpty(receivedRtData?.totalFaultingTrendsGraph)) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                data={totalFaultingRateDataMatrics}
                title={"Total Faulting Rate"}
                subtitle={systemName}
                yAxisTitle={"Faults / Sec"}
                xAxisDateFormat={
                  totalFaultingRateDataMatrics[0].xValueFormatString
                }
                isVisible={true}
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"faulting_rate"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                data={totalFaultingRateDataTrends}
                title={"Total Faulting Rate with Trends"}
                subtitle={systemName}
                yAxisTitle={"Faults / Sec"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"faulting_rate"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
          </div>
        )}
      <ChartNoDataImage
        checkData={checkData}
        metric={totalFaultingRateData}
        activeChartView={activeChartView}
        metricName={"Total Faulting Rate"}
        graphToggle={_.isEmpty(receivedRtData?.totalFaultingGraph) ? true : false}
        trendGraphToggle={_.isEmpty(receivedRtData?.totalFaultingTrendsGraph) ? true : false}
      />
    </>
  );
};

export default React.memo(TotalFaultingChart);
