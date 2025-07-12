import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chartList: [],
  chartListTrends: [],
  activeChartView: {
    isMetricsChart: true,
    isTrendsChart: true,
    isShowGuidelines: true,
  },
};

const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    setChartList: (state, { payload }) => {
      state.chartList.push(payload);
    },
    setChartListTrends: (state, { payload }) => {
      state.chartListTrends.push(payload);
    },
    setChartViewMetrics: (state, { payload }) => {
      state.activeChartView.isMetricsChart = payload;
    },
    setChartViewTrends: (state, { payload }) => {
      state.activeChartView.isTrendsChart = payload;
    },
    setToggleGuidelines: (state, { payload }) => {
        state.activeChartView.isShowGuidelines = payload;
      },
  },
});

export const {
  setChartList,
  setChartListTrends,
  setChartViewMetrics,
  setChartViewTrends,
  setToggleGuidelines
} = chartsSlice.actions;
export const getChartList = (state) => state.charts.activeChartView;

export default chartsSlice.reducer;
