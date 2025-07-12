import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../../services/baseApi';

export const fetchAsyncSummaryDataCPUReport = createAsyncThunk("exsummary/fetchAsyncSummaryDataCPUReport", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/exrpt_cpu?${query}`);
    return response.data;
});

export const fetchAsyncSummaryDataDiskReport = createAsyncThunk("exsummary/fetchAsyncSummaryDataDiskReport", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/exrpt_disk?${query}`);
    return response.data;
});

export const fetchAsyncSummaryDataMemoryReport = createAsyncThunk("exsummary/fetchAsyncSummaryDataMemoryReport", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/exrpt_memory?${query}`);
    return response.data;
});

export const fetchAsyncSummaryDataOtherReport = createAsyncThunk("exsummary/fetchAsyncSummaryDataOtherReport", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/exrpt_other?${query}`);
    return response.data;
});

export const fetchAsyncTrendCalculationsReport = createAsyncThunk("exsummary/fetchAsyncTrendCalculationsReport", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/trends?${query}`);
    return response.data;
});

const initialState = {
    summarydatacpu: {loading:true,data:[], error:''},
    summarydatadisk: {loading:true,data:[], error:''},
    summarydatamemory: {loading:true,data:[], error:''},
    summarydataother: {loading:true,data:[], error:''},
    summaryTrendCalculation: {loading:true,data:{}, error:''},
};

const executiveSummaryReportSlice = createSlice({ 
    name: 'exsummaryreport',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncSummaryDataCPUReport.pending, state => {
          state.summarydatacpu.loading = true
        })
        builder.addCase(fetchAsyncSummaryDataCPUReport.fulfilled, (state, action) => {
          state.summarydatacpu.loading = false
          state.summarydatacpu.data = action.payload
          state.summarydatacpu.error = ''
        })
        builder.addCase(fetchAsyncSummaryDataCPUReport.rejected, (state, action) => {
          state.summarydatacpu.loading = false
          state.summarydatacpu.data = []
          state.summarydatacpu.error = action.error.message
        })
        builder.addCase(fetchAsyncSummaryDataDiskReport.pending, state => {
            state.summarydatadisk.loading = true
        })
        builder.addCase(fetchAsyncSummaryDataDiskReport.fulfilled, (state, action) => {
            state.summarydatadisk.loading = false
            state.summarydatadisk.data = action.payload
            state.summarydatadisk.error = ''
        })
        builder.addCase(fetchAsyncSummaryDataDiskReport.rejected, (state, action) => {
            state.summarydatadisk.loading = false
            state.summarydatadisk.data = []
            state.summarydatadisk.error = action.error.message
        })
        builder.addCase(fetchAsyncSummaryDataMemoryReport.pending, state => {
            state.summarydatamemory.loading = true
        })
        builder.addCase(fetchAsyncSummaryDataMemoryReport.fulfilled, (state, action) => {
            state.summarydatamemory.loading = false
            state.summarydatamemory.data = action.payload
            state.summarydatamemory.error = ''
        })
        builder.addCase(fetchAsyncSummaryDataMemoryReport.rejected, (state, action) => {
            state.summarydatamemory.loading = false
            state.summarydatamemory.data = []
            state.summarydatamemory.error = action.error.message
        })
        builder.addCase(fetchAsyncSummaryDataOtherReport.pending, state => {
            state.summarydataother.loading = true
        })
        builder.addCase(fetchAsyncSummaryDataOtherReport.fulfilled, (state, action) => {
            state.summarydataother.loading = false
            state.summarydataother.data = action.payload
            state.summarydataother.error = ''
        })
        builder.addCase(fetchAsyncSummaryDataOtherReport.rejected, (state, action) => {
            state.summarydataother.loading = false
            state.summarydataother.data = []
            state.summarydataother.error = action.error.message
        })
        builder.addCase(fetchAsyncTrendCalculationsReport.pending, state => {
            state.summaryTrendCalculation.loading = true
        })
        builder.addCase(fetchAsyncTrendCalculationsReport.fulfilled, (state, action) => {
            state.summaryTrendCalculation.loading = false
            state.summaryTrendCalculation.data = action.payload
            state.summaryTrendCalculation.error = ''
        })
        builder.addCase(fetchAsyncTrendCalculationsReport.rejected, (state, action) => {
            state.summaryTrendCalculation.loading = false
            state.summaryTrendCalculation.data = {}
            state.summaryTrendCalculation.error = action.error.message
        })
    },
})


export const getExSummaryCPUDataReport = (state) => state.exsummaryReports.summarydatacpu;
export const getExSummaryDiskDataReport = (state) => state.exsummaryReports.summarydatadisk;
export const getExSummaryMemoryDataReport = (state) => state.exsummaryReports.summarydatamemory;
export const getExSummaryOtherDataReport = (state) => state.exsummaryReports.summarydataother;
export const getExSummaryTrendCalculationReport = (state) => state.exsummaryReports.summaryTrendCalculation;

//export const getAllShows = (state) => state.movies.shows;
export default executiveSummaryReportSlice.reducer;