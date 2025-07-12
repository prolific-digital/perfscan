import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";
import ChartViewTrend from "../../common/ChartViewTrend";
import { useMutation, useSubscription } from "@apollo/client";
import ChartNoDataImage from "../NodataImage/ChartNoDataImage";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import { numCoresGraph } from "../../../pages/GraphQL/Subscriptions/CPUSubscription";
import {
  numCoresGphData,
  numCoresGraphDataHandler,
} from "../../../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import { numCoresGraphTrigger } from "../../../pages/GraphQL/Mutations/CPUGraphMutation";

const NumCores = ({ activeChartView, selectedSystem, id, sysName }) => {
  const systemName = sysName;
  const dispatch = useDispatch();
  const numCoresData = useSelector(numCoresGphData);
  const [checkData, setCheckData] = useState(true); //new
  const [receivedRtData, setReceivedRtData] = useState({
    numCoresGraph: [],
    numCoresTrendsGraph: [],
    values: [],
  });

  const [numCoresGraphDataMutation, wholeDayData] = useMutation(numCoresGraphTrigger);
  const numCoresDataSub = useSubscription(numCoresGraph, {
    variables: { numCoresGraphId: +id },
  });

  useEffect(() => {
    if (wholeDayData && !wholeDayData?.loading && wholeDayData?.data) {
      if (
        typeof wholeDayData != "undefined" &&
        wholeDayData.hasOwnProperty("data") &&
        Object.keys(wholeDayData?.data)?.length &&
        Object.keys(wholeDayData?.data?.mutationNcoresGraph)?.length
      ) {
        dispatch(numCoresGraphDataHandler(wholeDayData));
        setReceivedRtData((preVal) => {
          return {
            ...preVal,
            numCoresGraph: wholeDayData?.data?.mutationNcoresGraph?.data,
            numCoresTrendsGraph: wholeDayData?.data?.mutationNcoresGraph?.trend,
            values: wholeDayData?.data?.mutationNcoresGraph?.values,
          };
        });
      }
    }
  }, [wholeDayData.loading]);

  useEffect(() => {
    if (numCoresDataSub && !numCoresDataSub?.loading && numCoresDataSub?.data) {
      // const updatedArr = setTimeout(() => {
        if (
          !numCoresDataSub?.loading &&
          typeof numCoresDataSub === "object" &&
          numCoresDataSub?.data?.NcoresGraph?.data?.length
        ) {
          setReceivedRtData((preVal) => {
            let updatedGraphData;
            let updatedTrendsData;
            if (!preVal?.numCoresGraph.length) {
              updatedGraphData = [...numCoresDataSub?.data?.NcoresGraph?.data];
            } else {
              const slicedData = preVal?.numCoresGraph?.slice(1);
              updatedGraphData = [
                ...slicedData,
                ...numCoresDataSub?.data?.NcoresGraph?.data,
              ];
            }
            if (!preVal?.numCoresTrendsGraph.length) {
              updatedTrendsData = [
                ...numCoresDataSub?.data?.NcoresGraph?.trend,
              ];
            } else {
              // const slicedData = preVal?.numCoresTrendsGraph?.slice(1);
              updatedTrendsData = [
                // ...slicedData,
                ...numCoresDataSub?.data?.NcoresGraph?.trend,
              ];
            }
            return {
              ...preVal,
              numCoresGraph: updatedGraphData,
              numCoresTrendsGraph: updatedTrendsData,
              values: numCoresDataSub?.data?.NcoresGraph?.values
                ? numCoresDataSub?.data?.NcoresGraph?.values
                : preVal.values,
            };
          });
        }
      // }, 3000);

      // return () => {
      //   clearTimeout(updatedArr);
      // };
    }
  }, [numCoresDataSub?.data]);

  const NumCoresUtilization = createChartDataMapping(
    receivedRtData.numCoresGraph || [],
    "stackedArea",
    "noOfCores"
  );
  const NumCoresTrends = createChartDataMapping(
    receivedRtData.numCoresTrendsGraph || [],
    "stackedArea",
    "noOfCoresTrends"
  );

  const numCoresGraphDataMutationHandler = async (id) => {
    try {
      await numCoresGraphDataMutation({
        variables: { mutationNcoresGraph: id },
      });
    } catch (error) {
      console.log(error);
      if (error.name === "AbortError") {
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    numCoresGraphDataMutationHandler(+id);
  }, [id]);

  useEffect(() => {
    if (
      numCoresDataSub?.loading === false &&
      (!_?.isEmpty(receivedRtData?.numCoresGraph) ||
        !_?.isEmpty(receivedRtData?.numCoresTrendsGraph))
    ) {
      if (
        receivedRtData?.numCoresGraph?.length === 0 ||
        receivedRtData?.numCoresTrendsGraph?.length === 0
      ) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [
    numCoresDataSub?.loading,
    receivedRtData?.numCoresGraph,
    receivedRtData?.numCoresTrendsGraph,
  ]);

  return (
    <>
      {numCoresData?.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!numCoresData?.loading &&
        (!_.isEmpty(receivedRtData?.numCoresGraph) || !_.isEmpty(receivedRtData?.numCoresTrendsGraph)) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                key={"noofcores"}
                data={NumCoresUtilization}
                title={"Number of Cores"}
                subtitle={systemName}
                yAxisTitle={"Cores"}
                xAxisDateFormat={NumCoresUtilization[0].xValueFormatString}
                isVisible={activeChartView.isMetricsChart}
                showTotal={false}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"no_of_cores"}
                minimum={0}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                key={"noofcorestrends"}
                data={NumCoresTrends}
                title={"Number of Cores with Trends"}
                subtitle={systemName}
                yAxisTitle={"Cores"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"no_of_cores"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
          </div>
        )}
      <ChartNoDataImage
        metric={numCoresData}
        checkData={checkData}
        metricName={"Number of Cores"}
        activeChartView={activeChartView}
        graphToggle={_.isEmpty(receivedRtData?.numCoresGraph) ? true : false}
        trendGraphToggle={_.isEmpty(receivedRtData?.numCoresTrendsGraph) ? true : false}
      />
    </>
  );
};

export default React.memo(NumCores);
