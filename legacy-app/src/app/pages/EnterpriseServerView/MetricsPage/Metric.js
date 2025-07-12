import { useSelector } from "react-redux";
import MetricsCard from "../../../components/MetricsCard";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

const Metric = ({ metric, toggleMetricGraph, loading, data, scrollIntoViewHandler }) => {
  const graphToggleState = useSelector(
    (state) => state.metricGraphToggle.toggleMetric
  );

  return (
    <>
      <SkeletonLoader loading={loading} />
      <SkeletonLoader loading={loading} />
      <SkeletonLoader loading={loading} />
      <SkeletonLoader loading={loading} />
      <SkeletonLoader loading={loading} />
      <SkeletonLoader loading={loading} />
      <SkeletonLoader loading={loading} />
      <SkeletonLoader loading={loading} />
      <SkeletonLoader loading={loading} />
      <SkeletonLoader loading={loading} />

      {metric?.map((item, idx) => {
        return (
          <MetricsCard
            key={idx}
            cpuData={item}
            graphToggleState={graphToggleState[item.dtype]}
            toggleMetricGraph = {() => toggleMetricGraph(item.dtype)}
            cardClickHandler={() => scrollIntoViewHandler(item.dtype)}
            {...item}
          />
        );
      })}

      {!data?.loading && !data?.data?.metricsUpdate?.length && (
        <p style={{ marginLeft: "0.7rem" }}>No metrics data is available.</p>
      )}
    </>
  );
};

export default Metric;
