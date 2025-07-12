import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../../services/baseApi';

export const fetchAsyncDiskSpaceUtilizationReports = createAsyncThunk("diskReport/fetchAsyncDiskSpaceUtilizationReports", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/dsu?${query}`);
    return response.data;
});

export const fetchAsyncDiskArmUtilizationReports = createAsyncThunk("diskReport/fetchAsyncDiskArmUtilizationReports", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/dau?${query}`);
    return response.data;
});

export const fetchAsyncDiskResponseReports = createAsyncThunk("diskReport/fetchAsyncDiskResponseReports", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/drt?${query}`);
    return response.data;
});

export const fetchAsyncDiskOperationsReports = createAsyncThunk("diskReport/fetchAsyncDiskOperationsReports", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/tdo?${query}`);
    return response.data;
});

export const fetchAsyncReadWriteRatioReports = createAsyncThunk("diskReport/fetchAsyncReadWriteRatioReports", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/rwr?${query}`);
    return response.data;
});

export const fetchAsyncCacheHitPercReports = createAsyncThunk("diskReport/fetchAsyncCacheHitPercReports", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/chp?${query}`);
    return response.data;
});

const initialState = {
    diskspace: { loading: false, data: [], error: '' },
    diskarm: { loading: false, data: [], error: '' },
    diskresponse: { loading: false, data: [], error: '' },
    diskoperations: { loading: false, data: [], error: '' },
    diskreadwrite: { loading: false, data: [], error: '' },
    diskcachehit: { loading: false, data: [], error: '' },
};

const diskReportSlice = createSlice({
    name: 'diskReport',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncDiskSpaceUtilizationReports.pending, state => {
            state.diskspace.loading = true
        })
        builder.addCase(fetchAsyncDiskSpaceUtilizationReports.fulfilled, (state, action) => {
            state.diskspace.loading = false
            state.diskspace.data = action.payload
            state.diskspace.error = ''
        })
        builder.addCase(fetchAsyncDiskSpaceUtilizationReports.rejected, (state, action) => {
            state.diskspace.loading = false
            state.diskspace.data = []
            state.diskspace.error = action.error.message
        })
        builder.addCase(fetchAsyncDiskArmUtilizationReports.pending, state => {
            state.diskarm.loading = true
        })
        builder.addCase(fetchAsyncDiskArmUtilizationReports.fulfilled, (state, action) => {
            state.diskarm.loading = false
            state.diskarm.data = action.payload
            state.diskarm.error = ''
        })
        builder.addCase(fetchAsyncDiskArmUtilizationReports.rejected, (state, action) => {
            state.diskarm.loading = false
            state.diskarm.data = []
            state.diskarm.error = action.error.message
        })
        builder.addCase(fetchAsyncDiskResponseReports.pending, state => {
            state.diskresponse.loading = true
        })
        builder.addCase(fetchAsyncDiskResponseReports.fulfilled, (state, action) => {
            state.diskresponse.loading = false
            state.diskresponse.data = action.payload
            state.diskresponse.error = ''
        })
        builder.addCase(fetchAsyncDiskResponseReports.rejected, (state, action) => {
            state.diskresponse.loading = false
            state.diskresponse.data = []
            state.diskresponse.error = action.error.message
        })
        builder.addCase(fetchAsyncDiskOperationsReports.pending, state => {
            state.diskoperations.loading = true
        })
        builder.addCase(fetchAsyncDiskOperationsReports.fulfilled, (state, action) => {
            state.diskoperations.loading = false
            state.diskoperations.data = action.payload
            state.diskoperations.error = ''
        })
        builder.addCase(fetchAsyncDiskOperationsReports.rejected, (state, action) => {
            state.diskoperations.loading = false
            state.diskoperations.data = []
            state.diskoperations.error = action.error.message
        })
        builder.addCase(fetchAsyncReadWriteRatioReports.pending, state => {
            state.diskreadwrite.loading = true
        })
        builder.addCase(fetchAsyncReadWriteRatioReports.fulfilled, (state, action) => {
            state.diskreadwrite.loading = false
            state.diskreadwrite.data = action.payload
            state.diskreadwrite.error = ''
        })
        builder.addCase(fetchAsyncReadWriteRatioReports.rejected, (state, action) => {
            state.diskreadwrite.loading = false
            state.diskreadwrite.data = []
            state.diskreadwrite.error = action.error.message
        })
        builder.addCase(fetchAsyncCacheHitPercReports.pending, state => {
            state.diskcachehit.loading = true
        })
        builder.addCase(fetchAsyncCacheHitPercReports.fulfilled, (state, action) => {
            state.diskcachehit.loading = false
            state.diskcachehit.data = action.payload
            state.diskcachehit.error = ''
        })
        builder.addCase(fetchAsyncCacheHitPercReports.rejected, (state, action) => {
            state.diskcachehit.loading = false
            state.diskcachehit.data = []
            state.diskcachehit.error = action.error.message
        })
        },
})

export const getDiskSpaceDataReports = (state) => state.diskReports.diskspace;
export const getDiskArmDataReports = (state) => state.diskReports.diskarm;
export const getDiskResponseDataReports = (state) => state.diskReports.diskresponse;
export const getDiskOperationsDataReports = (state) => state.diskReports.diskoperations;
export const getDiskReadWriteDataReports = (state) => state.diskReports.diskreadwrite;
export const getDiskCacheHitDataReports = (state) => state.diskReports.diskcachehit;
export default diskReportSlice.reducer;




