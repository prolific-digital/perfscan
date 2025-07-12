import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../services/baseApi';

export const fetchAsyncPDSummaryDataCPU = createAsyncThunk("pdexsummary/fetchAsyncPDSummaryDataCPU", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/exrpt/cpu?&pd=true${query}`);
    return response.data;   
});

export const fetchAsyncSummaryDataDisk = createAsyncThunk("pdexsummary/fetchAsyncSummaryDataDisk", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/exrpt/disk?${query}`);
    return response.data;
});

export const fetchAsyncSummaryDataMemory = createAsyncThunk("pdexsummary/fetchAsyncSummaryDataMemory", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/exrpt/memory?${query}`);
    return response.data;
});

export const fetchAsyncSummaryDataOther = createAsyncThunk("pdexsummary/fetchAsyncSummaryDataOther", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/exrpt/other?${query}`);
    return response.data;
});

const initialState = {
    pdsummarydatacpu: {loading:true,data:[], error:''},
    summarydatadisk: {loading:true,data:[], error:''},
    summarydatamemory: {loading:true,data:[], error:''},
    summarydataother: {loading:true,data:[], error:''}
};

const pdTableSlice = createSlice({ 
    name: 'pdexsummary',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncPDSummaryDataCPU.pending, state => {
          state.pdsummarydatacpu.loading = true
        })
        builder.addCase(fetchAsyncPDSummaryDataCPU.fulfilled, (state, action) => {
          state.pdsummarydatacpu.loading = false
          state.pdsummarydatacpu.data = action.payload
          state.pdsummarydatacpu.error = ''
        })
        builder.addCase(fetchAsyncPDSummaryDataCPU.rejected, (state, action) => {
          state.pdsummarydatacpu.loading = false
          state.pdsummarydatacpu.data = []
          state.pdsummarydatacpu.error = action.error.message
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
    },
})


export const getPDExSummaryCPUData = (state) => state.pdexsummary.pdsummarydatacpu;
export const getExSummaryDiskData = (state) => state.pdexsummary.summarydatadisk;
export const getExSummaryMemoryData = (state) => state.pdexsummary.summarydatamemory;
export const getExSummaryOtherData = (state) => state.pdexsummary.summarydataother;

//export const getAllShows = (state) => state.movies.shows;
export default pdTableSlice.reducer;