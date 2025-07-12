import React from "react";
import { useSelector } from "react-redux";
import TopJobsTable from "./TopJobsTable";
import TopJobsPieChart from "./TopJobsPieChart";
import { pieChartToggleState, topJobsToggleState } from "../../../../store/slices/charts/alertChartsSlice";

const TopJobs = ({selectedSystem, id}) => {
  const topJobsToggle = useSelector(topJobsToggleState);
  const pieChartToggle = useSelector(pieChartToggleState);

  return (
    <div>
      {topJobsToggle && <TopJobsTable topJobsToggle={topJobsToggle} selectedSystem={selectedSystem} id={id}/>}
      {pieChartToggle && <TopJobsPieChart pieChartToggle={pieChartToggle} selectedSystem={selectedSystem} id={id}/>}
    </div>
  );
};

export default React.memo(TopJobs);
