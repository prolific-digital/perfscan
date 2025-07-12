import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChartDataMapping } from "../../../../helpers/commonHelper";

import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";
import ChartViewTrend from "../../common/ChartViewTrend";
import ChartNoDataImage from "../NodataImage/ChartNoDataImage";
import {
  diskResponseTimeGraphDataHandler,
  diskResTimeGphData,
} from "../../../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import { diskResponseTimeGraphSub } from "../../../pages/GraphQL/Subscriptions/DISKSubscription";
import { diskResponseTimeGraphTrigger } from "../../../pages/GraphQL/Mutations/DISKGraphMutation";
  
import { useMutation, useSubscription } from "@apollo/client";

const DiskResponseTime = ({ activeChartView, selectedSystem, id, sysName }) => {
  const systemName = sysName;
  const dispatch = useDispatch();
  const [checkData, setCheckData] = useState(false); //new
  const diskResponseData = useSelector(diskResTimeGphData);
  const [receivedRtData, setReceivedRtData] = useState({
    diskRespTimeGraph: [],
    diskRespTimeTrendsGraph: [],
    values: [],
  });

  const [diskGraphDataMutation, wholeDayData] = useMutation(diskResponseTimeGraphTrigger);
  const diskDataSub = useSubscription(diskResponseTimeGraphSub, {
    variables: { diskRespTimeGraphId: +id  },
  });

  useEffect(() => {
    if (wholeDayData && !wholeDayData?.loading && wholeDayData?.data) {
      if (
        typeof wholeDayData != "undefined" &&
        wholeDayData?.hasOwnProperty("data") &&
        Object.keys(wholeDayData?.data)?.length &&
        Object.keys(wholeDayData?.data?.drtGraphUpdate)?.length
      ) {
        dispatch(diskResponseTimeGraphDataHandler(wholeDayData));
        setReceivedRtData((preVal) => {
          return {
            ...preVal,
            diskRespTimeGraph: wholeDayData?.data?.drtGraphUpdate?.data,
            diskRespTimeTrendsGraph: wholeDayData?.data?.drtGraphUpdate?.trend,
            values: wholeDayData?.data?.drtGraphUpdate?.values,
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
          diskDataSub?.data?.diskRespTimeGraph?.data?.length
        ) {
          setReceivedRtData((preVal) => {
            let updatedGraphData;
            let updatedTrendsData;
            if (!preVal?.diskRespTimeGraph.length) {
              updatedGraphData = [
                ...diskDataSub?.data?.diskRespTimeGraph?.data,
              ];
            } else {
              const slicedData = preVal?.diskRespTimeGraph?.slice(1);
              updatedGraphData = [
                ...slicedData,
                ...diskDataSub?.data?.diskRespTimeGraph?.data,
              ];
            }
            if (!preVal?.diskRespTimeTrendsGraph.length) {
              updatedTrendsData = [
                ...diskDataSub?.data?.diskRespTimeGraph?.trend,
              ];
            } else {
              // const slicedData = preVal?.diskRespTimeTrendsGraph?.slice(1);
              updatedTrendsData = [
                // ...slicedData,
                ...diskDataSub?.data?.diskRespTimeGraph?.trend,
              ];
            }
            return {
              ...preVal,
              diskRespTimeGraph: updatedGraphData,
              diskRespTimeTrendsGraph: updatedTrendsData,
              values: diskDataSub?.data?.diskRespTimeGraph?.values
                ? diskDataSub?.data?.diskRespTimeGraph?.values
                : preVal.values,
            };
          });
        }
      // }, 3000);

      // return () => {
      //   clearTimeout(updatedArr);
      // };
    }
  }, [diskDataSub]);

  useEffect(() => {
    diskResponseTimeGraphDataMutationHandler(+id );
  }, [id]);

  useEffect(() => {
    if (
      diskDataSub?.loading === false &&
      (!_?.isEmpty(receivedRtData?.diskRespTimeGraph) ||
        !_?.isEmpty(receivedRtData?.diskRespTimeTrendsGraph))
    ) {
      if (
        receivedRtData?.diskRespTimeGraph?.length === 0 ||
        receivedRtData?.diskRespTimeTrendsGraph?.length === 0
      ) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [
    diskDataSub?.loading,
    receivedRtData?.diskRespTimeGraph,
    receivedRtData?.diskRespTimeTrendsGraph,
  ]);

  const DiskResponseTimeData = createChartDataMapping(
    receivedRtData?.diskRespTimeGraph || [],
    "stackedArea",
    "diskResponse"
  );
  const DiskResponseTimeTrends = createChartDataMapping(
    receivedRtData?.diskRespTimeTrendsGraph || [],
    "stackedArea",
    "diskResponseTrends"
  );

  const diskResponseTimeGraphDataMutationHandler = async (id) => {
    try {
      await diskGraphDataMutation({ variables: { drtGraphUpdateId: id } });
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
        (!_.isEmpty(receivedRtData?.diskRespTimeGraph) || !_.isEmpty(receivedRtData?.diskRespTimeTrendsGraph)) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                key={"diskresponse"}
                data={DiskResponseTimeData}
                title={"Disk Response Time"}
                subtitle={systemName}
                yAxisTitle={"ms"}
                xAxisDateFormat={DiskResponseTimeData[0].xValueFormatString}
                isVisible={activeChartView.isMetricsChart}
                showTotal={true}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"disk_response_time"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                key={"diskresponsetrends"}
                data={DiskResponseTimeTrends}
                title={"Disk Response Time with Trends "}
                subtitle={systemName}
                yAxisTitle={"ms"}
                isVisible={activeChartView.isTrendsChart}
                xAxisDateFormat="MMM YYYY"
                showTotal={true}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"disk_response_time"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
          </div>
        )}
      <ChartNoDataImage
        checkData={checkData}
        metric={diskResponseData}
        activeChartView={activeChartView}
        metricName={"Disk Response Time"}
        graphToggle={_.isEmpty(receivedRtData?.diskRespTimeGraph) ? true : false}
        trendGraphToggle={_.isEmpty(receivedRtData?.diskRespTimeTrendsGraph) ? true : false}
      />
    </>
  );
};

export default React.memo(DiskResponseTime);
