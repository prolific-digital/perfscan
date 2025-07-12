import * as _ from "lodash";

import ChartView from "../../common/ChartView";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChartViewTrend from "../../common/ChartViewTrend";

import GridLoader from "react-spinners/GridLoader";
import ChartNoDataImage from "../NodataImage/ChartNoDataImage";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import {
  diskSpaceUtilsGphData,
  diskSpaceUtilizationGraphDataHandler,
} from "../../../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import { diskSpaceUtilGraphSub } from "../../../pages/GraphQL/Subscriptions/DISKSubscription";
import { diskSpaceUtilGraphTrigger } from "../../../pages/GraphQL/Mutations/DISKGraphMutation";

import { useMutation, useSubscription } from "@apollo/client";

const DiskSpaceUtilization = ({ activeChartView, selectedSystem, id, sysName }) => {
  const systemName = sysName;
  const dispatch = useDispatch();
  const [checkData, setCheckData] = useState(false); //new
  const diskSpaceData = useSelector(diskSpaceUtilsGphData);
  const [receivedRtData, setReceivedRtData] = useState({
    diskSpaceGraph: [],
    diskSpaceTrendsGraph: [],
    values: [],
  });

  const [diskGraphDataMutation, wholeDayData] = useMutation(diskSpaceUtilGraphTrigger);
  const diskDataSub = useSubscription(diskSpaceUtilGraphSub, {
    variables: { diskSpaceGraphId: +id  },
  });

  useEffect(() => {
    if (wholeDayData && !wholeDayData?.loading && wholeDayData?.data) {
      if (
        typeof wholeDayData != "undefined" &&
        wholeDayData?.hasOwnProperty("data") &&
        Object.keys(wholeDayData?.data)?.length &&
        Object.keys(wholeDayData?.data?.dsuGraphUpdate)?.length
      ) {
        dispatch(diskSpaceUtilizationGraphDataHandler(wholeDayData));
        setReceivedRtData((preVal) => {
          return {
            ...preVal,
            diskSpaceGraph: wholeDayData?.data?.dsuGraphUpdate?.data,
            diskSpaceTrendsGraph: wholeDayData?.data?.dsuGraphUpdate?.trend,
            values: wholeDayData?.data?.dsuGraphUpdate?.values,
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
          diskDataSub?.data?.diskSpaceGraph?.data?.length
        ) {
          setReceivedRtData((preVal) => {
            let updatedGraphData;
            let updatedTrendsData;
            if (!preVal?.diskSpaceGraph.length) {
              updatedGraphData = [...diskDataSub?.data?.diskSpaceGraph?.data];
            } else {
              const slicedData = preVal?.diskSpaceGraph?.slice(1);
              updatedGraphData = [
                ...slicedData,
                ...diskDataSub?.data?.diskSpaceGraph?.data,
              ];
            }
            if (!preVal?.diskSpaceTrendsGraph.length) {
              updatedTrendsData = [...diskDataSub?.data?.diskSpaceGraph?.trend];
            } else {
              // const slicedData = preVal?.diskSpaceTrendsGraph?.slice(1);
              updatedTrendsData = [
                // ...slicedData,
                ...diskDataSub?.data?.diskSpaceGraph?.trend,
              ];
            }
            return {
              ...preVal,
              diskSpaceGraph: updatedGraphData,
              diskSpaceTrendsGraph: updatedTrendsData,
              values: diskDataSub?.data?.diskSpaceGraph?.values
                ? diskDataSub?.data?.diskSpaceGraph?.values
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
    diskSpaceGraphDataMutationHandler(+id );
  }, [id]);

  useEffect(() => {
    if (
      diskDataSub?.loading === false &&
      (!_?.isEmpty(receivedRtData?.diskSpaceGraph) ||
        !_?.isEmpty(receivedRtData?.diskSpaceTrendsGraph))
    ) {
      if (
        receivedRtData?.diskSpaceGraph?.length === 0 ||
        receivedRtData?.diskSpaceTrendsGraph?.length === 0
      ) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [
    diskDataSub?.loading,
    receivedRtData?.diskSpaceGraph,
    receivedRtData?.diskSpaceTrendsGraph,
  ]);

  const DiskSpceUtilization = createChartDataMapping(
    receivedRtData?.diskSpaceGraph || [],
    "stackedArea",
    "diskSpaceUtilization"
  );
  const DiskSpaceUtilizationsTrends = createChartDataMapping(
    receivedRtData?.diskSpaceTrendsGraph || [],
    "stackedArea",
    "diskSpaceUtilizationTrends"
  );

  const diskSpaceGraphDataMutationHandler = async (id) => {
    try {
      await diskGraphDataMutation({ variables: { dsuGraphUpdateId: id } });
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
      {diskSpaceData.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!diskSpaceData.loading &&
        (!_.isEmpty(receivedRtData?.diskSpaceGraph) || !_.isEmpty(receivedRtData?.diskSpaceTrendsGraph)) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                key={"diskspaceutilization"}
                data={DiskSpceUtilization}
                title={"Disk Space Utilization"}
                subtitle={systemName}
                yAxisTitle={"Utilization"}
                xAxisDateFormat={DiskSpceUtilization[0].xValueFormatString}
                isVisible={activeChartView.isMetricsChart}
                minimum={0}
                showTotal={false}
                maximum={100}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"disk_space_utilization"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                key={"diskspaceutilizationtrends"}
                data={DiskSpaceUtilizationsTrends}
                title={"Disk Space Utilization with Trends"}
                subtitle={systemName}
                yAxisTitle={"Utilization"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
                maximum={100}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"disk_space_utilization"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
          </div>
        )}
      <ChartNoDataImage
        checkData={checkData}
        metric={diskSpaceData}
        activeChartView={activeChartView}
        metricName={"Disk Space Utilization"}
        graphToggle={_.isEmpty(receivedRtData?.diskSpaceGraph) ? true : false}
        trendGraphToggle={_.isEmpty(receivedRtData?.diskSpaceTrendsGraph) ? true : false}
      />
    </>
  );
};

export default React.memo(DiskSpaceUtilization);
