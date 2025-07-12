import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../services/baseApi";

export const fetchAsyncRealTimeTopJobs = createAsyncThunk("topjobs/fetchAsyncRealTimeTopJobs", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/jobs?${query}`);
    return response.data;
});

export const fetchAsyncRealTimeCpuTopJobsChart = createAsyncThunk("topjobs/fetchAsyncRealTimeCpuTopJobsChart", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/pie?${query}&jobtype=cpu`);
    return response.data;
  });
  export const fetchAsyncRealTimeTotalIOsTopJobsChart = createAsyncThunk("topjobs/fetchAsyncRealTimeTotalIOsTopJobsChart", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/pie?${query}&jobtype=totalios`);
    return response.data;
  });
  export const fetchAsyncRealTimeTopJobsChartSyncIOs = createAsyncThunk("topjobs/fetchAsyncRealTimeTopJobsChartSyncIOs", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/pie?${query}&jobtype=syncios`);
    return response.data;
  });
  export const fetchAsyncRealTimeTopJobsChartAsyncIOs = createAsyncThunk("topjobs/fetchAsyncRealTimeTopJobsChartAsyncIOs", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/pie?${query}&jobtype=asyncios`);
    return response.data;
  }); //faults
  export const fetchAsyncRealTimeFaultsTopJobsChart = createAsyncThunk("topjobs/fetchAsyncRealTimeFaultsTopJobsChart", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/pie?${query}&jobtype=faults`);
    return response.data;
  });

const initialState = {
    topJobsData : {loading:false, data:[], error:''},
    cpuTopJobsChartData : {loading:false, data:[], error:''},
    totalIOsTopJobsChartData : {loading:false, data:[], error:''},
    syncIOsTopJobsChartData : {loading:false, data:[], error:''},
    asyncIOsTopJobsChartData : {loading:false, data:[], error:''},
    faultsTopJobsChartData : {loading:false, data:[], error:''},
}

const topJobsRealTimeMonitorSlice = createSlice({
    name:'topJobsRealTimeMonitor',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(fetchAsyncRealTimeTopJobs.pending, state => {
            state.topJobsData.loading = true
          })
          builder.addCase(fetchAsyncRealTimeTopJobs.fulfilled, (state, action) => {
            state.topJobsData.loading = false
            state.topJobsData.data = action.payload
            state.topJobsData.error = ''
          })
          builder.addCase(fetchAsyncRealTimeTopJobs.rejected, (state, action) => {
            state.topJobsData.loading = false
            state.topJobsData.data = []
            state.topJobsData.error = action.error.message
          })
          builder.addCase(fetchAsyncRealTimeCpuTopJobsChart.pending, state => {
            state.cpuTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncRealTimeCpuTopJobsChart.fulfilled, (state, action) => {
            state.cpuTopJobsChartData.loading = false
            state.cpuTopJobsChartData.data = action.payload
            state.cpuTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncRealTimeCpuTopJobsChart.rejected, (state, action) => {
            state.cpuTopJobsChartData.loading = false
            state.cpuTopJobsChartData.data = []
            state.cpuTopJobsChartData.error = action.error.message
          })

          builder.addCase(fetchAsyncRealTimeTotalIOsTopJobsChart.pending, state => {
            state.totalIOsTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncRealTimeTotalIOsTopJobsChart.fulfilled, (state, action) => {
            state.totalIOsTopJobsChartData.loading = false
            state.totalIOsTopJobsChartData.data = action.payload
            state.totalIOsTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncRealTimeTotalIOsTopJobsChart.rejected, (state, action) => {
            state.totalIOsTopJobsChartData.loading = false
            state.totalIOsTopJobsChartData.data = []
            state.totalIOsTopJobsChartData.error = action.error.message
          })

          builder.addCase(fetchAsyncRealTimeTopJobsChartSyncIOs.pending, state => {
            state.syncIOsTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncRealTimeTopJobsChartSyncIOs.fulfilled, (state, action) => {
            state.syncIOsTopJobsChartData.loading = false
            state.syncIOsTopJobsChartData.data = action.payload
            state.syncIOsTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncRealTimeTopJobsChartSyncIOs.rejected, (state, action) => {
            state.syncIOsTopJobsChartData.loading = false
            state.syncIOsTopJobsChartData.data = []
            state.syncIOsTopJobsChartData.error = action.error.message
          })

          builder.addCase(fetchAsyncRealTimeTopJobsChartAsyncIOs.pending, state => {
            state.asyncIOsTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncRealTimeTopJobsChartAsyncIOs.fulfilled, (state, action) => {
            state.asyncIOsTopJobsChartData.loading = false
            state.asyncIOsTopJobsChartData.data = action.payload
            state.asyncIOsTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncRealTimeTopJobsChartAsyncIOs.rejected, (state, action) => {
            state.asyncIOsTopJobsChartData.loading = false
            state.asyncIOsTopJobsChartData.data = []
            state.asyncIOsTopJobsChartData.error = action.error.message
          })

          builder.addCase(fetchAsyncRealTimeFaultsTopJobsChart.pending, state => {
            state.faultsTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncRealTimeFaultsTopJobsChart.fulfilled, (state, action) => {
            state.faultsTopJobsChartData.loading = false
            state.faultsTopJobsChartData.data = action.payload
            state.faultsTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncRealTimeFaultsTopJobsChart.rejected, (state, action) => {
            state.faultsTopJobsChartData.loading = false
            state.faultsTopJobsChartData.data = []
            state.faultsTopJobsChartData.error = action.error.message
          })
    }
})

export const getRealTimeTopJobsData = (state) => state.topJobsRealTimeMonitor.topJobsData;
export const getRealTimeCpuTopJobsChartData = (state) => state.topJobsRealTimeMonitor.cpuTopJobsChartData;
export const getRealTimeTotalIOsTopJobsChartData = (state) => state.topJobsRealTimeMonitor.totalIOsTopJobsChartData;
export const getRealTimeSyncIOsTopJobsChartData = (state) => state.topJobsRealTimeMonitor.syncIOsTopJobsChartData;
export const getRealTimeAsyncIOsTopJobsChartData = (state) => state.topJobsRealTimeMonitor.asyncIOsTopJobsChartData;
export const getRealTimeFaultsTopJobsChartData = (state) => state.topJobsRealTimeMonitor.faultsTopJobsChartData;

export default topJobsRealTimeMonitorSlice.reducer;