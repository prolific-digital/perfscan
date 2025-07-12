import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../../services/baseApi";

export const fetchAsyncTimeLine = createAsyncThunk("timeline/fetchAsyncTimeLine", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseApi.get(`api/whatchanged/timeline?${query}`);
    return response.data;
});

export const fetchAsyncCategories = createAsyncThunk("timeline/fetchAsyncCategories", async(qd) => {
  const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
  const response = await baseApi.get(`api/whatchanged/categories?${query}`);
  return response.data;
});

const initialState = {
    timelinedata : {loading:false,data:[],error:''},
    categorydata : {loading:false, data:[], error:''},
    sliderdata : {}
}

const TimeLineSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {
      setSliderData : (state, {payload}) => {
        state.sliderdata = payload
      }
    },
    extraReducers: builder => {
        builder.addCase(fetchAsyncTimeLine.pending, state => {
          state.timelinedata.loading = true
        })
        builder.addCase(fetchAsyncTimeLine.fulfilled, (state, action) => {
          state.timelinedata.loading = false
          state.timelinedata.data = action.payload
          state.timelinedata.error = ''
        })
        builder.addCase(fetchAsyncTimeLine.rejected, (state, action) => {
          state.timelinedata.loading = false
          state.timelinedata.data = []
          state.timelinedata.error = action.error.message
        })
        builder.addCase(fetchAsyncCategories.pending, state => {
          state.categorydata.loading = true
        })
        builder.addCase(fetchAsyncCategories.fulfilled, (state, action) => {
          state.categorydata.loading = false
          state.categorydata.data = action.payload
          state.categorydata.error = ''
        })
        builder.addCase(fetchAsyncCategories.rejected, (state, action) => {
          state.categorydata.loading = false
          state.categorydata.data = []
          state.categorydata.error = action.error.message
        })
    }
})

export const { setSliderData } =   TimeLineSlice.actions;
export const getSliderData = (state) => state.timeline.sliderdata; // States => coming from store/
export const getTimeLineData = (state) => state.timeline.timelinedata;
export const getCategories = (state) => state.timeline.categorydata;

export default TimeLineSlice.reducer;
