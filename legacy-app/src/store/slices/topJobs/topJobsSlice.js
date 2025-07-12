import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../services/baseApi";

export const fetchAsyncTopJobs = createAsyncThunk("topjobs/fetchAsyncTopJobs", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/topjobs?${query}`);
    return response.data;
});

export const fetchAsyncCpuTopJobsChart = createAsyncThunk("topjobs/fetchAsyncCpuTopJobsChart", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/topjobs/pie?${query}&jobtype=cpu`);
    return response.data;
  });
  export const fetchAsyncTotalIOsTopJobsChart = createAsyncThunk("topjobs/fetchAsyncTotalIOsTopJobsChart", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/topjobs/pie?${query}&jobtype=totalios`);
    return response.data;
  });
  export const fetchAsyncTopJobsChartSyncIOs = createAsyncThunk("topjobs/fetchAsyncTopJobsChartSyncIOs", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/topjobs/pie?${query}&jobtype=syncios`);
    return response.data;
  });
  export const fetchAsyncTopJobsChartAsyncIOs = createAsyncThunk("topjobs/fetchAsyncTopJobsChartAsyncIOs", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/topjobs/pie?${query}&jobtype=asyncios`);
    return response.data;
  }); //faults
  export const fetchAsyncFaultsTopJobsChart = createAsyncThunk("topjobs/fetchAsyncFaultsTopJobsChart", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/topjobs/pie?${query}&jobtype=faults`);
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

const topJobsSlice = createSlice({
    name:'topjobs',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(fetchAsyncTopJobs.pending, state => {
            state.topJobsData.loading = true
          })
          builder.addCase(fetchAsyncTopJobs.fulfilled, (state, action) => {
            state.topJobsData.loading = false
            state.topJobsData.data = action.payload
            state.topJobsData.error = ''
          })
          builder.addCase(fetchAsyncTopJobs.rejected, (state, action) => {
            state.topJobsData.loading = false
            state.topJobsData.data = []
            state.topJobsData.error = action.error.message
          })
          builder.addCase(fetchAsyncCpuTopJobsChart.pending, state => {
            state.cpuTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncCpuTopJobsChart.fulfilled, (state, action) => {
            state.cpuTopJobsChartData.loading = false
            state.cpuTopJobsChartData.data = action.payload
            state.cpuTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncCpuTopJobsChart.rejected, (state, action) => {
            state.cpuTopJobsChartData.loading = false
            state.cpuTopJobsChartData.data = []
            state.cpuTopJobsChartData.error = action.error.message
          })

          builder.addCase(fetchAsyncTotalIOsTopJobsChart.pending, state => {
            state.totalIOsTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncTotalIOsTopJobsChart.fulfilled, (state, action) => {
            state.totalIOsTopJobsChartData.loading = false
            state.totalIOsTopJobsChartData.data = action.payload
            state.totalIOsTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncTotalIOsTopJobsChart.rejected, (state, action) => {
            state.totalIOsTopJobsChartData.loading = false
            state.totalIOsTopJobsChartData.data = []
            state.totalIOsTopJobsChartData.error = action.error.message
          })

          builder.addCase(fetchAsyncTopJobsChartSyncIOs.pending, state => {
            state.syncIOsTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncTopJobsChartSyncIOs.fulfilled, (state, action) => {
            state.syncIOsTopJobsChartData.loading = false
            state.syncIOsTopJobsChartData.data = action.payload
            state.syncIOsTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncTopJobsChartSyncIOs.rejected, (state, action) => {
            state.syncIOsTopJobsChartData.loading = false
            state.syncIOsTopJobsChartData.data = []
            state.syncIOsTopJobsChartData.error = action.error.message
          })

          builder.addCase(fetchAsyncTopJobsChartAsyncIOs.pending, state => {
            state.asyncIOsTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncTopJobsChartAsyncIOs.fulfilled, (state, action) => {
            state.asyncIOsTopJobsChartData.loading = false
            state.asyncIOsTopJobsChartData.data = action.payload
            state.asyncIOsTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncTopJobsChartAsyncIOs.rejected, (state, action) => {
            state.asyncIOsTopJobsChartData.loading = false
            state.asyncIOsTopJobsChartData.data = []
            state.asyncIOsTopJobsChartData.error = action.error.message
          })

          builder.addCase(fetchAsyncFaultsTopJobsChart.pending, state => {
            state.faultsTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncFaultsTopJobsChart.fulfilled, (state, action) => {
            state.faultsTopJobsChartData.loading = false
            state.faultsTopJobsChartData.data = action.payload
            state.faultsTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncFaultsTopJobsChart.rejected, (state, action) => {
            state.faultsTopJobsChartData.loading = false
            state.faultsTopJobsChartData.data = []
            state.faultsTopJobsChartData.error = action.error.message
          })
    }
})

export const getTopJobsData = (state) => state.topjobs.topJobsData;
export const getCpuTopJobsChartData = (state) => state.topjobs.cpuTopJobsChartData;
export const getTotalIOsTopJobsChartData = (state) => state.topjobs.totalIOsTopJobsChartData;
export const getSyncIOsTopJobsChartData = (state) => state.topjobs.syncIOsTopJobsChartData;
export const getAsyncIOsTopJobsChartData = (state) => state.topjobs.asyncIOsTopJobsChartData;
export const getFaultsTopJobsChartData = (state) => state.topjobs.faultsTopJobsChartData;

export default topJobsSlice.reducer;