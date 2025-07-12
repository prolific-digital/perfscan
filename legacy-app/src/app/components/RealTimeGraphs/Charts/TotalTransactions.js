import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";
import ChartViewTrend from "../../common/ChartViewTrend";
import ChartNoDataImage from "../NodataImage/ChartNoDataImage";
import {
  totalTransactionGphData,
  totalTransactionGraphDataHandler,
} from "../../../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import { totalTransactionGraphSub } from "../../../pages/GraphQL/Subscriptions/OTHERSSubscriptions";
import { totalTransactionGraphTrigger } from "../../../pages/GraphQL/Mutations/OTHERSGraphMutation";

import { useMutation, useSubscription } from "@apollo/client";
import GraphNoDataImage from "../NodataImage/GraphNoDataImage";

const TotalTransactions = ({ activeChartView, selectedSystem, id, sysName }) => {
  const systemName = sysName;
  const dispatch = useDispatch();
  const totalTransactionsData = useSelector(totalTransactionGphData);
  const [checkData, setCheckData] = useState(false); //new
  const [receivedRtData, setReceivedRtData] = useState({
    totalTransactionGraph: [],
    totalTransactionTrendsGraph: [],
    values: [],
  });

  const [totalTransactionGraphDataMutation, wholeDayData] = useMutation(
    totalTransactionGraphTrigger
  );
  const totalFaultingDataSub = useSubscription(totalTransactionGraphSub, {
    variables: { totTransactionGraphId: +id },
  });

  useEffect(() => {
    if (wholeDayData && !wholeDayData?.loading && wholeDayData?.data) {
      if (
        typeof wholeDayData != "undefined" &&
        wholeDayData?.hasOwnProperty("data") &&
        Object.keys(wholeDayData?.data)?.length &&
        Object.keys(wholeDayData?.data?.totTransactionGraphUpdate)?.length
      ) {
        dispatch(totalTransactionGraphDataHandler(wholeDayData));
        setReceivedRtData((preVal) => {
          return {
            ...preVal,
            totalTransactionGraph:
              wholeDayData?.data?.totTransactionGraphUpdate?.data,
            totalTransactionTrendsGraph:
              wholeDayData?.data?.totTransactionGraphUpdate?.trend,
            values: wholeDayData?.data?.totTransactionGraphUpdate?.values,
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
          totalFaultingDataSub?.data?.totTransactionGraph?.data?.length
        ) {
          setReceivedRtData((preVal) => {
            let updatedGraphData;
            let updatedTrendsData;
            if (!preVal?.totalTransactionGraph.length) {
              updatedGraphData = [
                ...totalFaultingDataSub?.data?.totTransactionGraph?.data,
              ];
            } else {
              const slicedData = preVal?.totalTransactionGraph?.slice(1);
              updatedGraphData = [
                ...slicedData,
                ...totalFaultingDataSub?.data?.totTransactionGraph?.data,
              ];
            }
            if (!preVal?.totalTransactionTrendsGraph?.length) {
              updatedTrendsData = [
                ...totalFaultingDataSub?.data?.totTransactionGraph?.trend,
              ];
            } else {
              // const slicedData = preVal?.totalTransactionTrendsGraph?.slice(1);
              updatedTrendsData = [
                // ...slicedData,
                ...totalFaultingDataSub?.data?.totTransactionGraph?.trend,
              ];
            }
            return {
              ...preVal,
              totalTransactionGraph: updatedGraphData,
              totalTransactionTrendsGraph: updatedTrendsData,
              values: totalFaultingDataSub?.data?.totTransactionGraph?.values
                ? totalFaultingDataSub?.data?.totTransactionGraph?.values
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
    totalTransactionGraphDataMutationHandler(+id);
  }, [id]);

  useEffect(() => {
    if (
      totalFaultingDataSub?.loading === false &&
      (!_?.isEmpty(receivedRtData?.totalTransactionGraph) ||
        !_?.isEmpty(receivedRtData?.totalTransactionTrendsGraph))
    ) {
      if (
        receivedRtData?.totalTransactionGraph?.length === 0 &&
        receivedRtData?.totalTransactionTrendsGraph?.length === 0
      ) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [
    receivedRtData?.totalTransactionGraph,
    receivedRtData?.totalTransactionTrendsGraph,
    totalFaultingDataSub?.loading,
  ]);

  const totalTransactionsDataMatrics = createChartDataMapping(
    receivedRtData?.totalTransactionGraph || [],
    "stackedArea",
    "totalTransactions"
  );
  const totalTransactionsDataTrends = createChartDataMapping(
    receivedRtData?.totalTransactionTrendsGraph || [],
    "stackedArea",
    "totalTransactionsTrends"
  );

  const totalTransactionGraphDataMutationHandler = async (id) => {
    try {
      await totalTransactionGraphDataMutation({
        variables: { totTransactionGraphUpdateId: id },
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
      {totalTransactionsData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!totalTransactionsData.loading &&
        checkData && (
          <div className="chart_container">
            {(!_.isEmpty(receivedRtData?.totalTransactionGraph) || !_.isEmpty(receivedRtData?.totalTransactionTrendsGraph)) &&
             activeChartView.isMetricsChart && (
              <ChartView
                data={totalTransactionsDataMatrics}
                title={"Total Transactions"}
                subtitle={systemName}
                yAxisTitle={"Transactions"}
                xAxisDateFormat={
                  totalTransactionsDataMatrics[0].xValueFormatString
                }
                isVisible={true}
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"total_transactions"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}

          {!_.isEmpty(totalTransactionsData?.data?.totTransactionGraphUpdate?.trend) &&
            _.isEmpty(totalTransactionsData?.data?.totTransactionGraphUpdate?.data) &&
            activeChartView.isMetricsChart &&
            activeChartView.isTrendsChart && (
              <GraphNoDataImage metricName={"Total Transactions"} />
          )}

            {!_.isEmpty(totalTransactionsData?.data?.totTransactionGraphUpdate?.trend) &&
             activeChartView.isTrendsChart && (
              <ChartViewTrend
                data={totalTransactionsDataTrends}
                title={"Total Transactions with Trend"}
                subtitle={systemName}
                yAxisTitle={"Transactions"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"total_transactions"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}

          {_.isEmpty(totalTransactionsData?.data?.totTransactionGraphUpdate?.trend) &&
           !_.isEmpty(totalTransactionsData?.data?.totTransactionGraphUpdate?.data) &&
            activeChartView.isMetricsChart &&
            activeChartView.isTrendsChart && (
              <GraphNoDataImage metricName={"Total Transactions"} />
          )}
          </div>
        )}
      <ChartNoDataImage
        metric={totalTransactionsData}
        activeChartView={activeChartView}
        checkData={checkData}
        metricName={"Total Transactions"}
        graphToggle={_.isEmpty(receivedRtData?.totalTransactionGraph) ? true : false}
        trendGraphToggle={_.isEmpty(receivedRtData?.totalTransactionTrendsGraph) ? true : false}
      />
    </>
  );
};

export default React.memo(TotalTransactions);
