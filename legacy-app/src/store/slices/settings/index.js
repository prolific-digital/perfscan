import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

const initialState = {
  metrics_global: {},
  metrics_system: {},
  metrics_data_global : {loading:false, data:[], error:''},
  metrics_data_system : {loading:false, data:[], error:''},
  metrics_data_app : {loading: false, data:[], error:''}
};

export const fetchAsyncGlobalMetrics = createAsyncThunk("settings/fetchAsyncGlobalMetrics", async(userID = 1) => {
    const response = await baseAPI.get(`api/metrics/${userID}`);
    return response.data;
});

export const fetchAsyncSystemMetrics = createAsyncThunk("settings/fetchAsyncSystemMetrics", async({systemID = 1, userID = 1}) => {
    const response = await baseAPI.get(`api/metrics/user/${userID}/sys/${systemID}`);
    return response.data;
});

export const fetchAsyncAppMetrics = createAsyncThunk("settings/fetchAsyncAppMetrics", async({systemID = 1, userID = 1,systemID2}) => {
    const response = await baseAPI.get(`api/metrics/app/user/${userID}/sys/${systemID}${systemID2 ? systemID2 : ""}`);
    return response.data;
});

const metricsSlice = createSlice({
    name: 'settings',
  initialState,
  reducers: {
    globalMetrics: (state, { payload }) => {
            state.metrics_global = payload
    },
    systemMetrics: (state, { payload }) => {
            state.metrics_system = payload
        }
    },
    extraReducers : builder => {
        builder.addCase(fetchAsyncGlobalMetrics.pending, state => {
            state.metrics_data_global.loading = true
        })
    builder.addCase(fetchAsyncGlobalMetrics.fulfilled, (state, action) => {
            state.metrics_data_global.loading = false
            state.metrics_data_global.data = action.payload
            state.metrics_data_global.error = ''
        })
    builder.addCase(fetchAsyncGlobalMetrics.rejected, (state, action) => {
            state.metrics_data_global.loading = false
            state.metrics_data_global.data = []
            state.metrics_data_global.error = action.error.message
        })
        builder.addCase(fetchAsyncSystemMetrics.pending, state => {
            state.metrics_data_system.loading = true
        })
    builder.addCase(fetchAsyncSystemMetrics.fulfilled, (state, action) => {
            state.metrics_data_system.loading = false
            state.metrics_data_system.data = action.payload
            state.metrics_data_system.error = ''
        })
    builder.addCase(fetchAsyncSystemMetrics.rejected, (state, action) => {
            state.metrics_data_system.loading = false
            state.metrics_data_system.data = []
            state.metrics_data_system.error = action.error.message
        })
        builder.addCase(fetchAsyncAppMetrics.pending, state => {
            state.metrics_data_app.loading = true
        })
    builder.addCase(fetchAsyncAppMetrics.fulfilled, (state, action) => {
            state.metrics_data_app.loading = false
            state.metrics_data_app.data = action.payload
            state.metrics_data_app.error = ''
        })
    builder.addCase(fetchAsyncAppMetrics.rejected, (state, action) => {
            state.metrics_data_app.loading = false
            state.metrics_data_app.data = []
            state.metrics_data_app.error = action.error.message
        })
    }
})


export const { globalMetrics, systemMetrics } = metricsSlice.actions;

export default metricsSlice.reducer;