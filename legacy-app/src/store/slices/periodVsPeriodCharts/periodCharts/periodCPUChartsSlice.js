import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../../../services/baseApi";

export const fetchAsyncPeriodCPUUtilization = createAsyncThunk("periodCPUCharts/fetchAsyncPeriodCPUUtilization", async(pqd) => {
    const response = await baseApi.post(`api/periodVSperiod/cpu/graph?`,pqd);
    return response.data;
});
export const fetchAsyncPeriodCPUMS = createAsyncThunk("periodCPUCharts/fetchAsyncPeriodCPUMS", async(pqd) => {
    const response = await baseApi.post(`api/periodVSperiod/cpums/graph?`,pqd);
    return response.data;
});
export const fetchAsyncPeriodNumCores = createAsyncThunk("periodCPUCharts/fetchAsyncPeriodNumCores", async(pqd) => {
    const response = await baseApi.post(`api/periodVSperiod/ncores/graph?`,pqd);
    return response.data;
});

export const fetchAsyncPeriodCPW = createAsyncThunk("periodCPUCharts/fetchAsyncPeriodCPW", async(pqd) => {
    const response = await baseApi.post(`api/periodVSperiod/cpw/graph?`,pqd);
    return response.data;
});

const initialState = {
    cpuChartData: {loading:false, data:[], error:''},
    cpumsChartData: {loading:false, data:[], error:''},
    numCoresChartData: {loading:false, data:[], error:''},
    cpwChartData: {loading:false, data:[], error:''},
};

const periodCPUSlice = createSlice({ 
    name: 'periodCPUCharts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncPeriodCPUUtilization.pending, state => {
          state.cpuChartData.loading = true
        })
        builder.addCase(fetchAsyncPeriodCPUUtilization.fulfilled, (state, action) => {
          state.cpuChartData.loading = false
          state.cpuChartData.data = action.payload
          state.cpuChartData.error = ''
        })
        builder.addCase(fetchAsyncPeriodCPUUtilization.rejected, (state, action) => {
          state.cpuChartData.loading = false
          state.cpuChartData.data = []
          state.cpuChartData.error = action.error.message
        })
        builder.addCase(fetchAsyncPeriodCPUMS.pending, state => {
            state.cpumsChartData.loading = true
        })
        builder.addCase(fetchAsyncPeriodCPUMS.fulfilled, (state, action) => {
            state.cpumsChartData.loading = false
            state.cpumsChartData.data = action.payload
            state.cpumsChartData.error = ''
        })
        builder.addCase(fetchAsyncPeriodCPUMS.rejected, (state, action) => {
            state.cpumsChartData.loading = false
            state.cpumsChartData.data = []
            state.cpumsChartData.error = action.error.message
        })
        builder.addCase(fetchAsyncPeriodNumCores.pending, state => {
            state.numCoresChartData.loading = true
        })
        builder.addCase(fetchAsyncPeriodNumCores.fulfilled, (state, action) => {
            state.numCoresChartData.loading = false
            state.numCoresChartData.data = action.payload
            state.numCoresChartData.error = ''
        })
        builder.addCase(fetchAsyncPeriodNumCores.rejected, (state, action) => {
            state.numCoresChartData.loading = false
            state.numCoresChartData.data = []
            state.numCoresChartData.error = action.error.message
        })
        builder.addCase(fetchAsyncPeriodCPW.pending, state => {
            state.cpwChartData.loading = true
        })
        builder.addCase(fetchAsyncPeriodCPW.fulfilled, (state, action) => {
            state.cpwChartData.loading = false
            state.cpwChartData.data = action.payload
            state.cpwChartData.error = ''
        })
        builder.addCase(fetchAsyncPeriodCPW.rejected, (state, action) => {
            state.cpwChartData.loading = false
            state.cpwChartData.data = []
            state.cpwChartData.error = action.error.message
        })
    },
})

export const getCPUUtilizationData = (state) => state.periodCPUCharts.cpuChartData;
export const getCPUMsChartData = (state) => state.periodCPUCharts.cpumsChartData;
export const getNumCoresChartData = (state) => state.periodCPUCharts.numCoresChartData;
export const getCPWChartData = (state) => state.periodCPUCharts.cpwChartData;

export default periodCPUSlice.reducer;




