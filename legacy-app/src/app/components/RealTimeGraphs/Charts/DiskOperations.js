import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";
import ChartViewTrend from "../../common/ChartViewTrend";
import ChartNoDataImage from "../NodataImage/ChartNoDataImage";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import {
  diskOperationsGphData,
  diskOperationsGraphDataHandler,
} from "../../../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import { diskOperationsGraphSub } from "../../../pages/GraphQL/Subscriptions/DISKSubscription";
import { diskOperationsGraphTrigger } from "../../../pages/GraphQL/Mutations/DISKGraphMutation";

import { useMutation, useSubscription } from "@apollo/client";

const DiskOperations = ({ activeChartView, selectedSystem, id, sysName }) => {
  const systemName = sysName;
  const dispatch = useDispatch();
  const [checkData, setCheckData] = useState(false); //new
  const [receivedRtData, setReceivedRtData] = useState({
    diskOperationsGraph: [],
    diskOperationsTrendsGraph: [],
    values: [],
  });
  const diskOperationsData = useSelector(diskOperationsGphData);

  const [diskGraphDataMutation, wholeDayData] = useMutation(diskOperationsGraphTrigger);
  const diskDataSub = useSubscription(diskOperationsGraphSub, {
    variables: { totDiskOpsGraphId: +id },
  });

  useEffect(() => {
    if (wholeDayData && !wholeDayData?.loading && wholeDayData?.data) {
      if (
        typeof wholeDayData != "undefined" &&
        wholeDayData?.hasOwnProperty("data") &&
        Object.keys(wholeDayData?.data)?.length &&
        Object.keys(wholeDayData?.data?.tdoGraphUpdate)?.length
      ) {
        dispatch(diskOperationsGraphDataHandler(wholeDayData));
        setReceivedRtData((preVal) => {
          return {
            ...preVal,
            diskOperationsGraph: wholeDayData?.data?.tdoGraphUpdate?.data,
            diskOperationsTrendsGraph:
              wholeDayData?.data?.tdoGraphUpdate?.trend,
            values: wholeDayData?.data?.tdoGraphUpdate?.values,
          };
        });
      }
    }
  }, [wholeDayData.loading]);

  useEffect(() => {
    if (diskDataSub && !diskDataSub?.loading && diskDataSub?.data) {
      // const updatedArr = setTimeout(() => {
        if (
          !diskDataSub?.loading &&
          typeof diskDataSub === "object" &&
          diskDataSub?.data?.totDiskOpsGraph?.data?.length
        ) {
          setReceivedRtData((preVal) => {
            let updatedGraphData;
            let updatedTrendsData;
            if (!preVal?.diskOperationsGraph?.length) {
              updatedGraphData = [...diskDataSub?.data?.totDiskOpsGraph?.data];
            } else {
              const slicedData = preVal?.diskOperationsGraph?.slice(1);
              updatedGraphData = [
                ...slicedData,
                ...diskDataSub?.data?.totDiskOpsGraph?.data,
              ];
            }
            if (!preVal?.diskOperationsTrendsGraph.length) {
              updatedTrendsData = [
                ...diskDataSub?.data?.totDiskOpsGraph?.trend,
              ];
            } else {
              // const slicedData = preVal?.diskOperationsTrendsGraph?.slice(1);
              updatedTrendsData = [
                // ...slicedData,
                ...diskDataSub?.data?.totDiskOpsGraph?.trend,
              ];
            }
            return {
              ...preVal,
              diskOperationsGraph: updatedGraphData,
              diskOperationsTrendsGraph: updatedTrendsData,
              values: diskDataSub?.data?.totDiskOpsGraph?.values
                ? diskDataSub?.data?.totDiskOpsGraph?.values
                : preVal.values,
            };
          });
        }
      // }, 3000);

      // return () => {
      //   clearTimeout(updatedArr);
      // };
    }
  }, [diskDataSub?.data]);

  useEffect(() => {
    diskOperationsGraphDataMutationHandler(+id );
  }, [id]);

  useEffect(() => {
    if (
      diskDataSub?.loading === false &&
      (!_?.isEmpty(receivedRtData?.diskOperationsGraph) ||
        !_?.isEmpty(receivedRtData?.diskOperationsTrendsGraph))
    ) {
      if (
        receivedRtData?.diskOperationsGraph?.length === 0 ||
        receivedRtData?.diskOperationsTrendsGraph?.length === 0
      ) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [
    diskDataSub?.loading,
    receivedRtData?.diskOperationsGraph,
    receivedRtData?.diskOperationsTrendsGraph,
  ]);

  const DiskOperationsMetrics = createChartDataMapping(
    receivedRtData?.diskOperationsGraph || [],
    "stackedArea",
    "diskOperations"
  );
  const DiskOperationsTrends = createChartDataMapping(
    receivedRtData?.diskOperationsTrendsGraph || [],
    "stackedArea",
    "diskOperationsTrends"
  );

  const diskOperationsGraphDataMutationHandler = async (id) => {
    try {
      await diskGraphDataMutation({ variables: { tdoGraphUpdateId: id } });
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
        (!_.isEmpty(receivedRtData?.diskOperationsGraph) || !_.isEmpty(receivedRtData?.diskOperationsTrendsGraph)) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                key={"diskoperations"}
                data={DiskOperationsMetrics}
                title={"Total Disk Operations"}
                subtitle={systemName}
                yAxisTitle={"OPS / Sec"}
                xAxisDateFormat={DiskOperationsMetrics[0].xValueFormatString}
                isVisible={activeChartView.isMetricsChart}
                showTotal={true}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"total_disk_ops"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                key={"disksoperationstrends"}
                data={DiskOperationsTrends}
                title={"Total Disk Operations with Trends "}
                subtitle={systemName}
                yAxisTitle={"OPS / Sec"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"total_disk_ops"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
          </div>
        )}
      <ChartNoDataImage
        checkData={checkData}
        metric={diskOperationsData}
        activeChartView={activeChartView}
        metricName={"Total Disk Operations"}
        graphToggle={_.isEmpty(receivedRtData?.diskOperationsGraph) ? true : false}
        trendGraphToggle={_.isEmpty(receivedRtData?.diskOperationsTrendsGraph) ? true : false}
      />
    </>
  );
};

export default React.memo(DiskOperations);
