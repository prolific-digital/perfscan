import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchAsyncTimeLine = createAsyncThunk("whatschanged/fetchAsyncTimeLine", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/whatchanged/timeline?${query}`);
    return response.data;
});

const initialState = {
    timeline: {loading:false, data:[], error:''}
};

const whatsChangedSlice = createSlice({ 
    name: 'whatschanged',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncTimeLine.pending, state => {
          state.timeline.loading = true
        })
        builder.addCase(fetchAsyncTimeLine.fulfilled, (state, action) => {
          state.timeline.loading = false
          state.timeline.data = action.payload
          state.timeline.error = ''
        })
        builder.addCase(fetchAsyncTimeLine.rejected, (state, action) => {
          state.timeline.loading = false
          state.timeline.data = []
          state.timeline.error = action.error.message
        })
    },
})

export const getTimeLineData = (state) => state.whatschanged.timeline;

export default whatsChangedSlice.reducer;