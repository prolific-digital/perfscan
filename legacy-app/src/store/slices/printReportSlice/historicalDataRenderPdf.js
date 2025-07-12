import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchHistoricalDataPdf = createAsyncThunk("histoicalDataPdf/fetchHistoricalDataPdf", async(qd) => {
    let qParam = {...qd};
    const response = await baseAPI.post(`api/renderpdf?`,JSON.stringify(qParam));
    return response.data;
});

const initialState = {
    gothistoricalPdf: {loading:false, data:[], error:''},
};

const historicalDataRenderPdf = createSlice({ 
    name: 'histoicalDataPdf',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchHistoricalDataPdf.pending, state => {
          state.gothistoricalPdf.loading = true
        })
        builder.addCase(fetchHistoricalDataPdf.fulfilled, (state, action) => {
          state.gothistoricalPdf.loading = false
          state.gothistoricalPdf.data = action.payload
          state.gothistoricalPdf.error = ''
        })
        builder.addCase(fetchHistoricalDataPdf.rejected, (state, action) => {
          state.gothistoricalPdf.loading = false
          state.gothistoricalPdf.data = []
          state.gothistoricalPdf.error = action.error.message
        })
    }
})



export const gethistoricalPdf = (state) => state.pdfData.gothistoricalPdf;

//export const getAllShows = (state) => state.movies.shows;
export default historicalDataRenderPdf.reducer;




