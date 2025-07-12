import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chartList : [],
    chartListTrends : [], 
    activeChartView : {
        isMetricsChart:true, 
        isTrendsChart:true
    },
}

const chartsSlice = createSlice({
    name: 'charts',
    initialState,
    reducers : {
        setChartList : (state, {payload}) => {
            state.chartList.push(payload) 
        },
        setChartListTrends : (state, {payload}) => {
            state.chartListTrends.push(payload)
        },
        setChartViewMetrics : (state, {payload}) => {
            state.activeChartView.isMetricsChart = payload
        },
        setChartViewTrends : (state, {payload}) => {
            state.activeChartView.isTrendsChart = payload
        }
    }
})

export const { setChartList, setChartListTrends, setChartViewMetrics, setChartViewTrends } =   chartsSlice.actions;
export const getChartList = (state) => state.charts.chartList;

export default chartsSlice.reducer;