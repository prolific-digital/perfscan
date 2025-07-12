import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../../services/baseApi";

export const fetchAsyncTimeLineToggle = createAsyncThunk("timeline/fetchAsyncTimeLineToggle", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseApi.get(`api/whatchanged/timeline?${query}`);
    return response.data;
});

const initialState = {
    timelinedatatoggle : {loading:false,data:[],error:''},
    sliderdata : {}
}

const TimeLineToggleSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {
      setSliderData : (state, {payload}) => {
        state.sliderdata = payload
      }
    },
    extraReducers: builder => {
        builder.addCase(fetchAsyncTimeLineToggle.pending, state => {
          state.timelinedatatoggle.loading = true
        })
        builder.addCase(fetchAsyncTimeLineToggle.fulfilled, (state, action) => {
          state.timelinedatatoggle.loading = false
          state.timelinedatatoggle.data = action.payload
          state.timelinedatatoggle.error = ''
        })
        builder.addCase(fetchAsyncTimeLineToggle.rejected, (state, action) => {
          state.timelinedatatoggle.loading = false
          state.timelinedatatoggle.data = []
          state.timelinedatatoggle.error = action.error.message
        })
    }
})

export const { setSliderData } =   TimeLineToggleSlice.actions;
export const getTimeLineToggleData = (state) => state.timelinetoggle.timelinedatatoggle;

export default TimeLineToggleSlice.reducer;
