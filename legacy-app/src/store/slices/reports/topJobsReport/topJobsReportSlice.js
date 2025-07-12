import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../../services/baseApi";

export const fetchAsyncTopJobsReports = createAsyncThunk("topjobs/fetchAsyncTopJobsReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/topjobs?${query}`);
    return response.data;
});

export const fetchAsyncCpuTopJobsChartReports = createAsyncThunk("topjobs/fetchAsyncCpuTopJobsChartReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/topjobsPie?${query}&jobtype=cpu`);
    return response.data;
  });
  export const fetchAsyncTotalIOsTopJobsChartReports = createAsyncThunk("topjobs/fetchAsyncTotalIOsTopJobsChartReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/topjobsPie?${query}&jobtype=totalios`);
    return response.data;
  });
  export const fetchAsyncTopJobsChartSyncIOsReports = createAsyncThunk("topjobs/fetchAsyncTopJobsChartSyncIOsReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/topjobsPie?${query}&jobtype=syncios`);
    return response.data;
  });
  export const fetchAsyncTopJobsChartAsyncIOsReports = createAsyncThunk("topjobs/fetchAsyncTopJobsChartAsyncIOsReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/topjobsPie?${query}&jobtype=asyncios`);
    return response.data;
  }); //faults
  export const fetchAsyncFaultsTopJobsChartReports = createAsyncThunk("topjobs/fetchAsyncFaultsTopJobsChartReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/topjobsPie?${query}&jobtype=faults`);
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

const topJobsReportSlice = createSlice({
    name:'topjobsReports',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(fetchAsyncTopJobsReports.pending, state => {
            state.topJobsData.loading = true
          })
          builder.addCase(fetchAsyncTopJobsReports.fulfilled, (state, action) => {
            state.topJobsData.loading = false
            state.topJobsData.data = action.payload
            state.topJobsData.error = ''
          })
          builder.addCase(fetchAsyncTopJobsReports.rejected, (state, action) => {
            state.topJobsData.loading = false
            state.topJobsData.data = []
            state.topJobsData.error = action.error.message
          })
          builder.addCase(fetchAsyncCpuTopJobsChartReports.pending, state => {
            state.cpuTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncCpuTopJobsChartReports.fulfilled, (state, action) => {
            state.cpuTopJobsChartData.loading = false
            state.cpuTopJobsChartData.data = action.payload
            state.cpuTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncCpuTopJobsChartReports.rejected, (state, action) => {
            state.cpuTopJobsChartData.loading = false
            state.cpuTopJobsChartData.data = []
            state.cpuTopJobsChartData.error = action.error.message
          })

          builder.addCase(fetchAsyncTotalIOsTopJobsChartReports.pending, state => {
            state.totalIOsTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncTotalIOsTopJobsChartReports.fulfilled, (state, action) => {
            state.totalIOsTopJobsChartData.loading = false
            state.totalIOsTopJobsChartData.data = action.payload
            state.totalIOsTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncTotalIOsTopJobsChartReports.rejected, (state, action) => {
            state.totalIOsTopJobsChartData.loading = false
            state.totalIOsTopJobsChartData.data = []
            state.totalIOsTopJobsChartData.error = action.error.message
          })

          builder.addCase(fetchAsyncTopJobsChartSyncIOsReports.pending, state => {
            state.syncIOsTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncTopJobsChartSyncIOsReports.fulfilled, (state, action) => {
            state.syncIOsTopJobsChartData.loading = false
            state.syncIOsTopJobsChartData.data = action.payload
            state.syncIOsTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncTopJobsChartSyncIOsReports.rejected, (state, action) => {
            state.syncIOsTopJobsChartData.loading = false
            state.syncIOsTopJobsChartData.data = []
            state.syncIOsTopJobsChartData.error = action.error.message
          })

          builder.addCase(fetchAsyncTopJobsChartAsyncIOsReports.pending, state => {
            state.asyncIOsTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncTopJobsChartAsyncIOsReports.fulfilled, (state, action) => {
            state.asyncIOsTopJobsChartData.loading = false
            state.asyncIOsTopJobsChartData.data = action.payload
            state.asyncIOsTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncTopJobsChartAsyncIOsReports.rejected, (state, action) => {
            state.asyncIOsTopJobsChartData.loading = false
            state.asyncIOsTopJobsChartData.data = []
            state.asyncIOsTopJobsChartData.error = action.error.message
          })

          builder.addCase(fetchAsyncFaultsTopJobsChartReports.pending, state => {
            state.faultsTopJobsChartData.loading = true
          })
          builder.addCase(fetchAsyncFaultsTopJobsChartReports.fulfilled, (state, action) => {
            state.faultsTopJobsChartData.loading = false
            state.faultsTopJobsChartData.data = action.payload
            state.faultsTopJobsChartData.error = ''
          })
          builder.addCase(fetchAsyncFaultsTopJobsChartReports.rejected, (state, action) => {
            state.faultsTopJobsChartData.loading = false
            state.faultsTopJobsChartData.data = []
            state.faultsTopJobsChartData.error = action.error.message
          })
    }
})

export const getTopJobsDataReport = (state) => state.topJobsReports.topJobsData;
export const getCpuTopJobsChartDataReport = (state) => state.topJobsReports.cpuTopJobsChartData;
export const getTotalIOsTopJobsChartDataReport = (state) => state.topJobsReports.totalIOsTopJobsChartData;
export const getSyncIOsTopJobsChartDataReport = (state) => state.topJobsReports.syncIOsTopJobsChartData;
export const getAsyncIOsTopJobsChartDataReport = (state) => state.topJobsReports.asyncIOsTopJobsChartData;
export const getFaultsTopJobsChartDataReport = (state) => state.topJobsReports.faultsTopJobsChartData;

export default topJobsReportSlice.reducer;