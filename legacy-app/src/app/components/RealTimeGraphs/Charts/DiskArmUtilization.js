import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";
import ChartViewTrend from "../../common/ChartViewTrend";
import ChartNoDataImage from "../NodataImage/ChartNoDataImage";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import {
  diskArmUtilizationGraphDataHandler,
  diskArmUtilGphData,
} from "../../../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import { diskArmUtilGraphSub } from "../../../pages/GraphQL/Subscriptions/DISKSubscription";
import { diskArmUtilGraphTrigger } from "../../../pages/GraphQL/Mutations/DISKGraphMutation";

import { useMutation, useSubscription } from "@apollo/client";

const DiskArmUtilization = ({ activeChartView, selectedSystem, id, sysName }) => {
  const systemName = sysName;
  const dispatch = useDispatch();
  const diskArmData = useSelector(diskArmUtilGphData);
  const [checkData, setCheckData] = useState(false); //new
  const [receivedRtData, setReceivedRtData] = useState({
    diskArmGraph: [],
    diskArmTrendsGraph: [],
    values: [],
  });

  const [diskGraphDataMutation, wholeDayData] = useMutation(
    diskArmUtilGraphTrigger
  );
  const diskDataSub = useSubscription(diskArmUtilGraphSub, {
    variables: { diskArmGraphId: +id  },
  });

  useEffect(() => {
    if (wholeDayData && !wholeDayData?.loading && wholeDayData?.data) {
      if (
        typeof wholeDayData != "undefined" &&
        wholeDayData?.hasOwnProperty("data") &&
        Object.keys(wholeDayData?.data)?.length &&
        Object.keys(wholeDayData?.data?.dauGraphUpdate)?.length
      ) {
        dispatch(diskArmUtilizationGraphDataHandler(wholeDayData));
        setReceivedRtData((preVal) => {
          return {
            ...preVal,
            diskArmGraph: wholeDayData?.data?.dauGraphUpdate?.data,
            diskArmTrendsGraph: wholeDayData?.data?.dauGraphUpdate?.trend,
            values: wholeDayData?.data?.dauGraphUpdate?.values,
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
          diskDataSub?.data?.diskArmGraph?.data?.length
        ) {
          setReceivedRtData((preVal) => {
            let updatedGraphData;
            let updatedTrendsData;
            if (!preVal?.diskArmGraph.length) {
              updatedGraphData = [...diskDataSub?.data?.diskArmGraph?.data];
            } else {
              const slicedData = preVal?.diskArmGraph?.slice(1);
              updatedGraphData = [
                ...slicedData,
                ...diskDataSub?.data?.diskArmGraph?.data,
              ];
            }
            if (!preVal?.diskArmTrendsGraph.length) {
              updatedTrendsData = [...diskDataSub?.data?.diskArmGraph?.trend];
            } else {
              // const slicedData = preVal?.diskArmTrendsGraph?.slice(1);
              updatedTrendsData = [
                // ...slicedData,
                ...diskDataSub?.data?.diskArmGraph?.trend,
              ];
            }
            return {
              ...preVal,
              diskArmGraph: updatedGraphData,
              diskArmTrendsGraph: updatedTrendsData,
              values: diskDataSub?.data?.diskArmGraph?.values
                ? diskDataSub?.data?.diskArmGraph?.values
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
    diskArmGraphDataMutationHandler(+id);
  }, [id]);

  useEffect(() => {
    if (
      diskDataSub?.loading === false &&
      (!_?.isEmpty(receivedRtData?.diskArmGraph) ||
        !_?.isEmpty(receivedRtData?.diskArmTrendsGraph))
    ) {
      if (
        receivedRtData?.diskArmGraph?.length === 0 ||
        receivedRtData?.diskArmTrendsGraph?.length === 0
      ) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [
    diskDataSub?.loading,
    receivedRtData?.diskArmGraph,
    receivedRtData?.diskArmTrendsGraph,
  ]);

  const DiskArmUtilization = createChartDataMapping(
    receivedRtData?.diskArmGraph || [],
    "stackedArea",
    "diskArmUtilization"
  );
  const DiskArmUtilizationsTrends = createChartDataMapping(
    receivedRtData?.diskArmTrendsGraph || [],
    "stackedArea",
    "diskArmTrends"
  );

  const diskArmGraphDataMutationHandler = async (id) => {
    try {
      await diskGraphDataMutation({ variables: { dauGraphUpdateId: id } });
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
      {!diskArmData.loading &&
        (!_.isEmpty(receivedRtData?.diskArmGraph) ||
          !_.isEmpty(receivedRtData?.diskArmTrendsGraph)) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                key={"diskarm"}
                data={DiskArmUtilization}
                title={"Disk Arm Utilization"}
                subtitle={systemName}
                yAxisTitle={"Utilization"}
                xAxisDateFormat={DiskArmUtilization[0].xValueFormatString}
                isVisible={activeChartView.isMetricsChart}
                minimum={0}
                showTotal={false}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"disk_arm_utilization"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                key={"disksarmtrends"}
                data={DiskArmUtilizationsTrends}
                title={"Disk Arm Utilization with Trends"}
                subtitle={systemName}
                yAxisTitle={"Utilization"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={false}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"disk_arm_utilization"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
          </div>
        )}
      <ChartNoDataImage
        metric={diskArmData}
        checkData={checkData}
        activeChartView={activeChartView}
        metricName={"Disk Arm Utilization"}
        graphToggle={_.isEmpty(receivedRtData?.diskArmGraph) ? true : false}
        trendGraphToggle={_.isEmpty(receivedRtData?.diskArmTrendsGraph) ? true : false}
      />
    </>
  );
};

export default React.memo(DiskArmUtilization);
