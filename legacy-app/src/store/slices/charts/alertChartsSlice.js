import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChartView: {
    isMetricsChart: true,
    isTrendsChart: true,
    isShowGuidelines: true,
  },
  topJobsToggle: true,
  pieChartToggle: true,
};

const alertChartsSlice = createSlice({
  name: "alertcharts",
  initialState,
  reducers: {
    setChartViewMetrics: (state, { payload }) => {
      state.activeChartView.isMetricsChart = payload;
    },
    setChartViewTrends: (state, { payload }) => {
      state.activeChartView.isTrendsChart = payload;
    },
    setToggleGuidelines: (state, { payload }) => {
      state.activeChartView.isShowGuidelines = payload;
    },
    setTopJobsToggle: (state, { payload }) => {
      state.topJobsToggle = payload;
    },
    setPieChartToggle: (state, { payload }) => {
      state.pieChartToggle = payload;
    },
  },
});

export const {
  setChartViewMetrics,
  setChartViewTrends,
  setToggleGuidelines,
  setTopJobsToggle,
  setPieChartToggle,
} = alertChartsSlice.actions;

export const getAlertChartList = (state) => state.alertcharts.activeChartView;
export const topJobsToggleState = (state) => state.alertcharts.topJobsToggle;
export const pieChartToggleState = (state) => state.alertcharts.pieChartToggle;

export default alertChartsSlice.reducer;
