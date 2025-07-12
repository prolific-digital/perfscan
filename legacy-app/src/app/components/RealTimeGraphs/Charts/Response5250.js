import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";
import ChartViewTrend from "../../common/ChartViewTrend";
import ChartNoDataImage from "../NodataImage/ChartNoDataImage";
import {
  response5250GphData,
  response5250GraphDataHandler,
} from "../../../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import { responseTime5250GraphTrigger } from "../../../pages/GraphQL/Mutations/OTHERSGraphMutation";
import { responseTime5250GraphSub } from "../../../pages/GraphQL/Subscriptions/OTHERSSubscriptions";

import { useMutation, useSubscription } from "@apollo/client";

const Response5250 = ({ activeChartView, selectedSystem, id, sysName }) => {
  const systemName = sysName;
  const dispatch = useDispatch();
  const response5250Data = useSelector(response5250GphData);
  const [receivedRtData, setReceivedRtData] = useState({
    resp5250Graph: [],
    resp5250TrendsGraph: [],
    values: [],
  });
  const [checkData, setCheckData] = useState(false); //new
  const [response5250GraphDataMutation, wholeDayData] = useMutation(
    responseTime5250GraphTrigger
  );
  const response5250DataSub = useSubscription(responseTime5250GraphSub, {
    variables: { responseTimeGraphId: +id },
  });

  useEffect(() => {
    if (wholeDayData && !wholeDayData?.loading && wholeDayData?.data) {
      if (
        typeof wholeDayData != "undefined" &&
        wholeDayData.hasOwnProperty("data") &&
        Object.keys(wholeDayData?.data)?.length &&
        Object.keys(wholeDayData?.data?.responseTimeGraphUpdate)?.length
      ) {
        dispatch(response5250GraphDataHandler(wholeDayData));
        setReceivedRtData((preVal) => {
          return {
            ...preVal,
            resp5250Graph: wholeDayData?.data?.responseTimeGraphUpdate?.data,
            resp5250TrendsGraph:
              wholeDayData?.data?.responseTimeGraphUpdate?.trend,
            values: wholeDayData?.data?.responseTimeGraphUpdate?.values,
          };
        });
      }
    }
  }, [wholeDayData.loading]);

  useEffect(() => {
    if (
      response5250DataSub &&
      !response5250DataSub?.loading &&
      response5250DataSub?.data
    ) {
      // const updatedArr = setTimeout(() => {
        if (
          !response5250DataSub?.loading &&
          typeof response5250DataSub === "object" &&
          response5250DataSub?.data?.responseTimeGraph?.data?.length
        ) {
          setReceivedRtData((preVal) => {
            let updatedGraphData;
            let updatedTrendsData;
            if (!preVal?.resp5250Graph.length) {
              updatedGraphData = [
                ...response5250DataSub?.data?.responseTimeGraph?.data,
              ];
            } else {
              const slicedData = preVal?.resp5250Graph?.slice(1);
              updatedGraphData = [
                ...slicedData,
                ...response5250DataSub?.data?.responseTimeGraph?.data,
              ];
            }
            if (!preVal?.resp5250TrendsGraph.length) {
              updatedTrendsData = [
                ...response5250DataSub?.data?.responseTimeGraph?.data,
              ];
            } else {
              // const slicedData = preVal?.resp5250TrendsGraph?.slice(1);
              updatedTrendsData = [
                // ...slicedData,
                ...response5250DataSub?.data?.responseTimeGraph?.data,
              ];
            }
            return {
              ...preVal,
              resp5250Graph: updatedGraphData,
              resp5250TrendsGraph: updatedTrendsData,
              values: response5250DataSub?.data?.totFaultRateGraph?.values
                ? response5250DataSub?.data?.totFaultRateGraph?.values
                : preVal.values,
            };
          });
        }
      // }, 3000);

      // return () => {
      //   clearTimeout(updatedArr);
      // };
    }
  }, [response5250DataSub?.data]);

  useEffect(() => {
    if (
      response5250DataSub?.loading === false &&
      (!_?.isEmpty(receivedRtData?.resp5250Graph) ||
        !_?.isEmpty(receivedRtData?.resp5250TrendsGraph))
    ) {
      if (
        receivedRtData?.resp5250Graph?.length === 0 ||
        receivedRtData?.resp5250TrendsGraph?.length === 0
      ) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [
    receivedRtData?.resp5250Graph,
    receivedRtData?.resp5250TrendsGraph,
    response5250DataSub?.loading,
  ]);

  const response5250DataMatrics = createChartDataMapping(
    receivedRtData?.resp5250Graph || [],
    "stackedArea",
    "responseTime5250"
  );
  const response5250DataTrends = createChartDataMapping(
    receivedRtData?.resp5250TrendsGraph || [],
    "stackedArea",
    "responseTime5250Trends"
  );

  useEffect(() => {
    respTime5250GraphDataMutationHandler(+id);
  }, [id]);

  const respTime5250GraphDataMutationHandler = async (id) => {
    try {
      await response5250GraphDataMutation({
        variables: { responseTimeGraphUpdateId: id },
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
      {response5250Data.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!response5250Data.loading &&
        (!_.isEmpty(receivedRtData?.resp5250Graph) || !_.isEmpty(receivedRtData?.resp5250TrendsGraph)) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                data={response5250DataMatrics}
                title={"5250 Response Time"}
                subtitle={systemName}
                yAxisTitle={"Seconds"}
                xAxisDateFormat={response5250DataMatrics[0].xValueFormatString}
                isVisible={true}
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"response_time_5250"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                data={response5250DataTrends}
                title={"5250 Response Time with Trends"}
                subtitle={systemName}
                yAxisTitle={"Seconds"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"response_time_5250"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
          </div>
        )}
      <ChartNoDataImage
        checkData={checkData}
        metric={response5250Data}
        metricName={"5250 Response Time"}
        activeChartView={activeChartView}
        graphToggle={_.isEmpty(receivedRtData?.resp5250Graph) ? true : false}
        trendGraphToggle={_.isEmpty(receivedRtData?.resp5250TrendsGraph) ? true : false}
      />
    </>
  );
};

export default React.memo(Response5250);
