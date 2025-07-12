import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchAsyncSummaryDataCPU = createAsyncThunk("exsummary/fetchAsyncSummaryDataCPU", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/exrpt/cpu?${query}`);
    return response.data;
});

export const fetchAsyncSummaryDataDisk = createAsyncThunk("exsummary/fetchAsyncSummaryDataDisk", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/exrpt/disk?${query}`);
    return response.data;
});

export const fetchAsyncSummaryDataMemory = createAsyncThunk("exsummary/fetchAsyncSummaryDataMemory", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/exrpt/memory?${query}`);
    return response.data;
});

export const fetchAsyncSummaryDataOther = createAsyncThunk("exsummary/fetchAsyncSummaryDataOther", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/exrpt/other?${query}`);
    return response.data;
});

export const fetchAsyncTrendCalculations = createAsyncThunk("exsummary/fetchAsyncTrendCalculations", async(qd) => {
    // const searchParams = new URLSearchParams(qd);
    // let query = searchParams.toString();
    const response = await baseAPI.get(`api/trendsummary/${qd.sysid}`);
    return response.data;
});

const initialState = {
    summarydatacpu: {loading:true,data:[], error:''},
    summarydatadisk: {loading:true,data:[], error:''},
    summarydatamemory: {loading:true,data:[], error:''},
    summarydataother: {loading:true,data:[], error:''},
    summaryTrendCalculation: {loading:true,data:{}, error:''},
};

const summarySlice = createSlice({ 
    name: 'exsummary',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncSummaryDataCPU.pending, state => {
          state.summarydatacpu.loading = true
        })
        builder.addCase(fetchAsyncSummaryDataCPU.fulfilled, (state, action) => {
          state.summarydatacpu.loading = false
          state.summarydatacpu.data = action.payload
          state.summarydatacpu.error = ''
        })
        builder.addCase(fetchAsyncSummaryDataCPU.rejected, (state, action) => {
          state.summarydatacpu.loading = false
          state.summarydatacpu.data = []
          state.summarydatacpu.error = action.error.message
        })
        builder.addCase(fetchAsyncSummaryDataDisk.pending, state => {
            state.summarydatadisk.loading = true
        })
        builder.addCase(fetchAsyncSummaryDataDisk.fulfilled, (state, action) => {
            state.summarydatadisk.loading = false
            state.summarydatadisk.data = action.payload
            state.summarydatadisk.error = ''
        })
        builder.addCase(fetchAsyncSummaryDataDisk.rejected, (state, action) => {
            state.summarydatadisk.loading = false
            state.summarydatadisk.data = []
            state.summarydatadisk.error = action.error.message
        })
        builder.addCase(fetchAsyncSummaryDataMemory.pending, state => {
            state.summarydatamemory.loading = true
        })
        builder.addCase(fetchAsyncSummaryDataMemory.fulfilled, (state, action) => {
            state.summarydatamemory.loading = false
            state.summarydatamemory.data = action.payload
            state.summarydatamemory.error = ''
        })
        builder.addCase(fetchAsyncSummaryDataMemory.rejected, (state, action) => {
            state.summarydatamemory.loading = false
            state.summarydatamemory.data = []
            state.summarydatamemory.error = action.error.message
        })
        builder.addCase(fetchAsyncSummaryDataOther.pending, state => {
            state.summarydataother.loading = true
        })
        builder.addCase(fetchAsyncSummaryDataOther.fulfilled, (state, action) => {
            state.summarydataother.loading = false
            state.summarydataother.data = action.payload
            state.summarydataother.error = ''
        })
        builder.addCase(fetchAsyncSummaryDataOther.rejected, (state, action) => {
            state.summarydataother.loading = false
            state.summarydataother.data = []
            state.summarydataother.error = action.error.message
        })
        builder.addCase(fetchAsyncTrendCalculations.pending, state => {
            state.summaryTrendCalculation.loading = true
        })
        builder.addCase(fetchAsyncTrendCalculations.fulfilled, (state, action) => {
            state.summaryTrendCalculation.loading = false
            state.summaryTrendCalculation.data = action.payload
            state.summaryTrendCalculation.error = ''
        })
        builder.addCase(fetchAsyncTrendCalculations.rejected, (state, action) => {
            state.summaryTrendCalculation.loading = false
            state.summaryTrendCalculation.data = {}
            state.summaryTrendCalculation.error = action.error.message
        })
    },
})


export const getExSummaryCPUData = (state) => state.exsummary.summarydatacpu;
export const getExSummaryDiskData = (state) => state.exsummary.summarydatadisk;
export const getExSummaryMemoryData = (state) => state.exsummary.summarydatamemory;
export const getExSummaryOtherData = (state) => state.exsummary.summarydataother;
export const getExSummaryTrendCalculation = (state) => state.exsummary.summaryTrendCalculation;

export default summarySlice.reducer;