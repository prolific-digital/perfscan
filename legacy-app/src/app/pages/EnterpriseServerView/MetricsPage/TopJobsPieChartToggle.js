import { FormGroup, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  topJobsToggleState,
  pieChartToggleState,
  setTopJobsToggle,
  setPieChartToggle,
} from "../../../../store/slices/charts/alertChartsSlice";

const TopJobsPieChartToggle = () => {
  const dispatch = useDispatch();

  const topJobsToggle = useSelector(topJobsToggleState);
  const pieChartToggle = useSelector(pieChartToggleState);

  const topJobsPieChartToggleHandler = (e) => {
    const name = e.target.name;
    if (name === "isTopJobs") {
      dispatch(setTopJobsToggle(!topJobsToggle));
    }
    if (name === "isPieChart") {
      dispatch(setPieChartToggle(!pieChartToggle));
    }
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <FormGroup check>
        <Input
          type="checkbox"
          name={"isTopJobs"}
          id={"isTopJobs"}
          checked={topJobsToggle}
          onChange={(e) => topJobsPieChartToggleHandler(e)}
        />
        <Label check for="isMetricsChart">
          TopJobs Table
        </Label>
      </FormGroup>
      <FormGroup check>
        <Input
          type="checkbox"
          name={"isPieChart"}
          id={"isPieChart"}
          checked={pieChartToggle}
          onChange={(e) => topJobsPieChartToggleHandler(e)}
        />
        <Label check for="isTrendsChart">
          Pie Charts
        </Label>
      </FormGroup>
    </div>
  );
};

export default TopJobsPieChartToggle;
