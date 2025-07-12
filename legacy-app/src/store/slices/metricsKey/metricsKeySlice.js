import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../../services/baseApi";

export const fetchAsyncMetricsList = createAsyncThunk("metricslist/fetchAsyncMetricsList", async() => {
    const response = await baseApi.get(`api/mkeys/1/`);
    return response.data;
});

const initialState = {
    metricsData : {loading:false, data:[], error:''},
}

const metricsKeySlice = createSlice({
    name:'metricslist',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(fetchAsyncMetricsList.pending, state => {
            state.metricsData.loading = true
          })
          builder.addCase(fetchAsyncMetricsList.fulfilled, (state, action) => {
            state.metricsData.loading = false
            state.metricsData.data = action.payload
            state.metricsData.error = ''
          })
          builder.addCase(fetchAsyncMetricsList.rejected, (state, action) => {
            state.metricsData.loading = false
            state.metricsData.data = []
            state.metricsData.error = action.error.message
          })
    }
})

export const getMetricsListData = (state) => state.metricslist.metricsData;

export default metricsKeySlice.reducer;
