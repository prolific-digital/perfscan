import Metric from "./Metric";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { METRICS_UPDATED_DATA } from "../../GraphQL/Mutations/MetricMutation";
import { METRICSDATASub } from "../../GraphQL/Subscriptions/MetricSubscription";
import { toggleGraphMetric } from "../../../../store/slices/enterpriseServer/metricGraphToggle";

import { useSubscription, useMutation } from "@apollo/client";

const Metrics = ({ selectedSystem, id, scrollIntoViewHandler }) => {
  const dispatch = useDispatch();

  const graphToggleState = useSelector(
    (state) => state.metricGraphToggle.toggleMetric
  );
  const [metricData, setMetricData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metricDataMutation, data] = useMutation(METRICS_UPDATED_DATA);
  const receivedRtMetricData = useSubscription(METRICSDATASub, {
    variables: { metricsUpdatesId: +id },
  });

  useEffect(() => {
    if (data && !data?.loading && data?.data) {
      if (
        typeof data != "undefined" &&
        data?.hasOwnProperty("data") &&
        Object.keys(data?.data)?.length &&
        Object.keys(data?.data?.metricsUpdate)?.length
      ) {
        setLoading(false);
        setMetricData(data?.data?.metricsUpdate);
      }
    }
  }, [data?.loading]);

  useEffect(() => {
    if (
      receivedRtMetricData &&
      !receivedRtMetricData?.loading &&
      receivedRtMetricData?.data
    ) {
      const updatedArr = setTimeout(() => {
        if (
          !receivedRtMetricData?.loading &&
          typeof receivedRtMetricData === "object" &&
          receivedRtMetricData?.data?.metricsUpdates?.length
        ) {
          setMetricData(receivedRtMetricData?.data?.metricsUpdates);
        }
      }, 3000);

      return () => {
        clearTimeout(updatedArr);
      };
    }
  }, [receivedRtMetricData]);

  const metricDataMutationHandler = async (id) => {
    try {
      setLoading(true);
      await metricDataMutation({
        variables: { metricsUpdateId: id },
      });
      //  setMetricData(data)
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("aborted");
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    metricDataMutationHandler(+id);
  }, [id]);

  const toggleMetricGraph = (metricName) => {
    dispatch(
      toggleGraphMetric({ metricName, val: !graphToggleState[metricName] })
    );
  };

  return (
    <div className="metrics_card_wrapper">
      <Metric
        metric={metricData}
        loading={loading}
        data={data}
        scrollIntoViewHandler={scrollIntoViewHandler}
        toggleMetricGraph={toggleMetricGraph}
      />
    </div>
  );
};

export default Metrics;
