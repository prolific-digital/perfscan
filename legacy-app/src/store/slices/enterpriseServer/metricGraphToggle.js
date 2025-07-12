import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleMetric: {
    cpu_utilization: true,
    no_of_cores: true,
    response_time_5250: true,
    total_transactions: true,
    ethernet_line_utilization: true,
    disk_space_utilization: true,
    disk_arm_utilization: true,
    disk_response_time: true,
    total_disk_ops: true,
    faulting_rate: true,
  },
  selectedSystemState: {},
};

const metricGraphToggleSlice = createSlice({
  name: "metricGraphToggle",
  initialState,
  reducers: {
    toggleGraphMetric: (state, { payload }) => {
      const { metricName, val } = payload;
      state.toggleMetric[metricName] = val;
    },
    selectedSystemData: (state, {payload}) => {
      state.selectedSystemState = payload;
    },
  },
});

export const { toggleGraphMetric, selectedSystemData } =
  metricGraphToggleSlice.actions;
export default metricGraphToggleSlice.reducer;
