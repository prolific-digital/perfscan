import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../../services/baseApi";

export const fetchAsyncPeriodDiskSpaceUtilization = createAsyncThunk("periodDiskCharts/fetchAsyncPeriodDiskSpaceUtilization", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/dsu/graph?`,pqd);
    return response.data;
});

export const fetchAsyncPeriodDiskArmUtilization = createAsyncThunk("periodDiskCharts/fetchAsyncPeriodDiskArmUtilization", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/dau/graph?`,pqd);
    return response.data;
});

export const fetchAsyncPeriodDiskResponse = createAsyncThunk("periodDiskCharts/fetchAsyncPeriodDiskResponse", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/drt/graph?`,pqd);
    return response.data;
});

export const fetchAsyncPeriodDiskOperations = createAsyncThunk("periodDiskCharts/fetchAsyncPeriodDiskOperations", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/tdo/graph?`,pqd);
    return response.data;
});

export const fetchAsyncPeriodReadWriteRatio = createAsyncThunk("periodDiskCharts/fetchAsyncPeriodReadWriteRatio", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/rwr/graph?`,pqd);
    return response.data;
});

export const fetchAsyncPeriodCacheHitPerc = createAsyncThunk("periodDiskCharts/fetchAsyncPeriodCacheHitPerc", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/chp/graph?`,pqd);
    return response.data;
});

const initialState = {
    perioddiskspace: {loading:false, data:[], error:''},
    perioddiskarm: {loading:false, data:[], error:''},
    perioddiskresponse: {loading:false, data:[], error:''},
    periodDiskoperations: {loading:false, data:[], error:''},
    periodDiskReadWrite: {loading:false, data:[], error:''},
    periodDiskCacheHit: {loading:false, data:[], error:''},
};

const periodDiskSlice = createSlice({ 
    name: 'periodDiskCharts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncPeriodDiskSpaceUtilization.pending, state => {
          state.perioddiskspace.loading = true
        })
        builder.addCase(fetchAsyncPeriodDiskSpaceUtilization.fulfilled, (state, action) => {
          state.perioddiskspace.loading = false
          state.perioddiskspace.data = action.payload
          state.perioddiskspace.error = ''
        })
        builder.addCase(fetchAsyncPeriodDiskSpaceUtilization.rejected, (state, action) => {
          state.perioddiskspace.loading = false
          state.perioddiskspace.data = []
          state.perioddiskspace.error = action.error.message
        })
        builder.addCase(fetchAsyncPeriodDiskArmUtilization.pending, state => {
            state.perioddiskarm.loading = true
        })
        builder.addCase(fetchAsyncPeriodDiskArmUtilization.fulfilled, (state, action) => {
            state.perioddiskarm.loading = false
            state.perioddiskarm.data = action.payload
            state.perioddiskarm.error = ''
        })
        builder.addCase(fetchAsyncPeriodDiskArmUtilization.rejected, (state, action) => {
            state.perioddiskarm.loading = false
            state.perioddiskarm.data = []
            state.perioddiskarm.error = action.error.message
        })
        builder.addCase(fetchAsyncPeriodDiskResponse.pending, state => {
            state.perioddiskresponse.loading = true
        })
        builder.addCase(fetchAsyncPeriodDiskResponse.fulfilled, (state, action) => {
            state.perioddiskresponse.loading = false
            state.perioddiskresponse.data = action.payload
            state.perioddiskresponse.error = ''
        })
        builder.addCase(fetchAsyncPeriodDiskResponse.rejected, (state, action) => {
            state.perioddiskresponse.loading = false
            state.perioddiskresponse.data = []
            state.perioddiskresponse.error = action.error.message
        })
        builder.addCase(fetchAsyncPeriodDiskOperations.pending, state => {
            state.periodDiskoperations.loading = true
        })
        builder.addCase(fetchAsyncPeriodDiskOperations.fulfilled, (state, action) => {
            state.periodDiskoperations.loading = false
            state.periodDiskoperations.data = action.payload
            state.periodDiskoperations.error = ''
        })
        builder.addCase(fetchAsyncPeriodDiskOperations.rejected, (state, action) => {
            state.periodDiskoperations.loading = false
            state.periodDiskoperations.data = []
            state.periodDiskoperations.error = action.error.message
        })
        builder.addCase(fetchAsyncPeriodReadWriteRatio.pending, state => {
            state.periodDiskReadWrite.loading = true
        })
        builder.addCase(fetchAsyncPeriodReadWriteRatio.fulfilled, (state, action) => {
            state.periodDiskReadWrite.loading = false
            state.periodDiskReadWrite.data = action.payload
            state.periodDiskReadWrite.error = ''
        })
        builder.addCase(fetchAsyncPeriodReadWriteRatio.rejected, (state, action) => {
            state.periodDiskReadWrite.loading = false
            state.periodDiskReadWrite.data = []
            state.periodDiskReadWrite.error = action.error.message
        })
        builder.addCase(fetchAsyncPeriodCacheHitPerc.pending, state => {
            state.periodDiskCacheHit.loading = true
        })
        builder.addCase(fetchAsyncPeriodCacheHitPerc.fulfilled, (state, action) => {
            state.periodDiskCacheHit.loading = false
            state.periodDiskCacheHit.data = action.payload
            state.periodDiskCacheHit.error = ''
        })
        builder.addCase(fetchAsyncPeriodCacheHitPerc.rejected, (state, action) => {
            state.periodDiskCacheHit.loading = false
            state.periodDiskCacheHit.data = []
            state.periodDiskCacheHit.error = action.error.message
        })
    },
})

export const getPeriodDiskSpaceData = (state) => state.periodDiskCharts.perioddiskspace;
export const getPeriodDiskArmData = (state) => state.periodDiskCharts.perioddiskarm;
export const getPeriodDiskResponseData = (state) => state.periodDiskCharts.perioddiskresponse;
export const getPeriodDiskOperationsData = (state) => state.periodDiskCharts.periodDiskoperations;
export const getPeriodDiskReadWriteData = (state) => state.periodDiskCharts.periodDiskReadWrite;
export const getDiskCacheHitData = (state) => state.periodDiskCharts.periodDiskCacheHit;

export default periodDiskSlice.reducer;




