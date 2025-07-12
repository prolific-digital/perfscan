import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../../services/baseApi';

export const fetchAsyncCPUUtilizationReports = createAsyncThunk("cpuReport/fetchAsyncCPUUtilizationReports", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/cpu?${query}`);
    return response.data;
});

export const fetchAsyncCPUMSReports = createAsyncThunk("cpuReport/fetchAsyncCPUMSReports", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/cpums?${query}`);
    return response.data;
});

export const fetchAsyncNumCoresReports = createAsyncThunk("cpuReport/fetchAsyncNumCoresReports", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/ncores?${query}`);
    return response.data;
});

export const fetchAsyncCPWReports = createAsyncThunk("cpuReport/fetchAsyncCPWReports", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/cpw?${query}`);
    return response.data;
});

const initialState = {
    cpudata: { loading: false, data: [], error: '' },
    cpumsdata: { loading: false, data: [], error: '' },
    numcoresdata: { loading: false, data: [], error: '' },
    cpwdata: { loading: false, data: [], error: '' },
};

const cpuReportSlice = createSlice({
    name: 'cpuReport',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncCPUUtilizationReports.pending, state => {
            state.cpudata.loading = true
        })
        builder.addCase(fetchAsyncCPUUtilizationReports.fulfilled, (state, action) => {
            state.cpudata.loading = false
            state.cpudata.data = action.payload
            state.cpudata.error = ''
        })
        builder.addCase(fetchAsyncCPUUtilizationReports.rejected, (state, action) => {
            state.cpudata.loading = false
            state.cpudata.data = []
            state.cpudata.error = action.error.message
        })
        builder.addCase(fetchAsyncCPUMSReports.pending, state => {
            state.cpumsdata.loading = true
        })
        builder.addCase(fetchAsyncCPUMSReports.fulfilled, (state, action) => {
            state.cpumsdata.loading = false
            state.cpumsdata.data = action.payload
            state.cpumsdata.error = ''
        })
        builder.addCase(fetchAsyncCPUMSReports.rejected, (state, action) => {
            state.cpumsdata.loading = false
            state.cpumsdata.data = []
            state.cpumsdata.error = action.error.message
        })
        builder.addCase(fetchAsyncNumCoresReports.pending, state => {
            state.numcoresdata.loading = true
        })
        builder.addCase(fetchAsyncNumCoresReports.fulfilled, (state, action) => {
            state.numcoresdata.loading = false
            state.numcoresdata.data = action.payload
            state.numcoresdata.error = ''
        })
        builder.addCase(fetchAsyncNumCoresReports.rejected, (state, action) => {
            state.numcoresdata.loading = false
            state.numcoresdata.data = []
            state.numcoresdata.error = action.error.message
        })
        builder.addCase(fetchAsyncCPWReports.pending, state => {
            state.cpwdata.loading = true
        })
        builder.addCase(fetchAsyncCPWReports.fulfilled, (state, action) => {
            state.cpwdata.loading = false
            state.cpwdata.data = action.payload
            state.cpwdata.error = ''
        })
        builder.addCase(fetchAsyncCPWReports.rejected, (state, action) => {
            state.cpwdata.loading = false
            state.cpwdata.data = []
            state.cpwdata.error = action.error.message
        })
    },
})



export const getCPUUtilDataReports = (state) => state.cpuReports.cpudata;
export const getCPUMsDataReports = (state) => state.cpuReports.cpumsdata;
export const getNumCoresDataReports = (state) => state.cpuReports.numcoresdata;
export const getCPWDataReports = (state) => state.cpuReports.cpwdata;

export default cpuReportSlice.reducer;




