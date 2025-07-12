import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//Local imports to be put separtely.

import ChartView from "../../common/ChartView";
import GridLoader from "react-spinners/GridLoader";
import ChartViewTrend from "../../common/ChartViewTrend";
import ChartNoDataImage from "../NodataImage/ChartNoDataImage";
import { createChartDataMapping } from "../../../../helpers/commonHelper";
import { CPUGRAPH } from "../../../pages/GraphQL/Subscriptions/CPUSubscription";
import { cpuGraphTrigger } from "../../../pages/GraphQL/Mutations/CPUGraphMutation";
import {
  cpuGphData,
  cpuGraphDataHandler,
} from "../../../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";

import { useSubscription, useMutation } from "@apollo/client";

const CPUUtilization = ({ activeChartView, selectedSystem, id, sysName }) => {
  const dispatch = useDispatch();
  const cpuData = useSelector(cpuGphData);
  const [checkData, setCheckData] = useState(true); //new
  const [receivedRtData, setReceivedRtData] = useState({
    cpuGraph: [],
    cpuTrendsGraph: [],
    values: [],
  });

  const systemName = sysName;
  const [cpuGraphDataMutation, wholeDayData] = useMutation(cpuGraphTrigger);
  const cpuDataSub = useSubscription(CPUGRAPH, {
    variables: { cpuGraphId: +id },
  });


  useEffect(() => {
    if (wholeDayData && !wholeDayData?.loading && wholeDayData?.data) {
      if (
        typeof wholeDayData != "undefined" &&
        wholeDayData?.hasOwnProperty("data") &&
        Object.keys(wholeDayData?.data)?.length &&
        Object.keys(wholeDayData?.data?.cpuUtilzationGraph)?.length
      ) {
        dispatch(cpuGraphDataHandler(wholeDayData));
        setReceivedRtData((preVal) => {
          return {
            ...preVal,
            cpuGraph: wholeDayData?.data?.cpuUtilzationGraph?.data,
            cpuTrendsGraph: wholeDayData?.data?.cpuUtilzationGraph?.trend,
            values: wholeDayData?.data?.cpuUtilzationGraph?.values,
          };
        });
      }
    }
  }, [wholeDayData.loading]);

  useEffect(() => {
    if (cpuDataSub && !cpuDataSub?.loading && cpuDataSub?.data) {
      // const updatedArr = setTimeout(() => {
        if (
          !cpuDataSub?.loading &&
          typeof cpuDataSub === "object" &&
          cpuDataSub?.data?.cpuGraph?.data?.length
        ) {
          setReceivedRtData((preVal) => {
            let updatedGraphData;
            let updatedTrendsData;
            if (!preVal?.cpuGraph.length) {
              updatedGraphData = [...cpuDataSub?.data?.cpuGraph?.data];
            } else {
              const slicedData = preVal?.cpuGraph?.slice(1);
              updatedGraphData = [
                ...slicedData,
                ...cpuDataSub?.data?.cpuGraph?.data,
              ];
            }
            if (!preVal?.cpuTrendsGraph.length) {
              updatedTrendsData = [...cpuDataSub?.data?.cpuGraph?.trend];
            } else {
              // const slicedData = preVal?.cpuTrendsGraph?.slice(1);
              updatedTrendsData = [
                // ...slicedData,
                ...cpuDataSub?.data?.cpuGraph?.trend,
              ];
            }
            return {
              ...preVal,
              cpuGraph: updatedGraphData,
              cpuTrendsGraph: updatedTrendsData,
              values: cpuDataSub?.data?.cpuGraph?.values
                ? cpuDataSub?.data?.cpuGraph?.values
                : preVal.values,
            };
          });
        }
      // }, 3000);

      // return () => {
      //   clearTimeout(updatedArr);
      // };
    }
  }, [cpuDataSub?.data]);

  const cpuUtilization = createChartDataMapping(
    receivedRtData?.cpuGraph || [],
    "stackedArea",
    "cpuUtilization"
  );

  const cpuUtilizationTrends = createChartDataMapping(
    receivedRtData?.cpuTrendsGraph || [],
    "stackedArea",
    "cpuUtilizationTrends"
  );

  const cpuGraphDataMutationHandler = async (id) => {
    try {
      await cpuGraphDataMutation({ variables: { cpuUtilzationGraphId: id } });
    } catch (error) {
      console.log(error);
      if (error.name === "AbortError") {
      } else {
        console.error(error);
      }
    }
  };
  
  useEffect(() => {
    cpuGraphDataMutationHandler(+id);
  }, [id]);

  useEffect(() => {
    if (
      !cpuDataSub?.loading &&
      (!_?.isEmpty(receivedRtData?.cpuGraph) ||
        !_?.isEmpty(receivedRtData?.cpuTrendsGraph))
    ) {
      if (
        receivedRtData?.cpuGraph?.length === 0 ||
        receivedRtData?.cpuTrendsGraph?.length === 0
      ) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
    }
  }, [
    cpuDataSub?.loading,
    receivedRtData?.cpuGraph,
    receivedRtData?.cpuTrendsGraph,
  ]);
  

  return (
    <>
      {cpuData?.loading && (
        <div className="chart_container">
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
          <div style={{ display: "block", margin: "auto" }}>
            <GridLoader color="#366bd6" />
          </div>
        </div>
      )}
      {!cpuData?.loading &&
        (!_.isEmpty(receivedRtData?.cpuGraph) || !_.isEmpty(receivedRtData?.cpuTrendsGraph)) &&
        checkData && (
          <div className="chart_container">
            {activeChartView.isMetricsChart && (
              <ChartView
                key={"cpuutilization"}
                data={cpuUtilization}
                title={"CPU Utilization"}
                subtitle={systemName}
                yAxisTitle={"Utilization"}
                xAxisDateFormat={cpuUtilization[0]?.xValueFormatString}
                isVisible={activeChartView.isMetricsChart}
                showTotal={false}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"cpu_utilization"}
                minimum={0}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
            {activeChartView.isTrendsChart && (
              <ChartViewTrend
                key={"cpuutilizationtrends"}
                data={cpuUtilizationTrends}
                title={"CPU Utilization with Trends"}
                subtitle={systemName}
                yAxisTitle={"Utilization"}
                isVisible={true}
                xAxisDateFormat={cpuUtilization[0].xValueFormatString}
                showTotal={true}
                minimum={0}
                stripLineToggle={activeChartView.isShowGuidelines}
                metricType={"cpu_utilization"}
                criticalUtilizationValue={receivedRtData}
                rtData={true}
              />
            )}
          </div>
        )}
      <ChartNoDataImage
        metric={cpuData}
        checkData={checkData}
        activeChartView={activeChartView}
        metricName={"CPU Utilization"}
        graphToggle={_.isEmpty(receivedRtData?.cpuGraph) ? true : false}
        trendGraphToggle={_.isEmpty(receivedRtData?.cpuTrendsGraph) ? true : false}
      />
    </>
  );
};

export default React.memo(CPUUtilization);
