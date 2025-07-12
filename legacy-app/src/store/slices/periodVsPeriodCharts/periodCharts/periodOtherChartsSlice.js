import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../../services/baseApi";


export const fetchAsyncPeriodResponse5250 = createAsyncThunk("periodOtherCharts/fetchAsyncPeriodResponse5250", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/5250/graph?`,pqd);
    return response.data;
});

export const fetchAsyncPeriodTotalTransaction = createAsyncThunk("periodOtherCharts/fetchAsyncPeriodTotalTransaction", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/totdata/graph?`,pqd);
    return response.data;
});

export const fetchAsyncPeriodEthernetUtilization = createAsyncThunk("periodOtherCharts/fetchAsyncPeriodEthernetUtilization", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/ethrnetline/graph?`,pqd);
    return response.data;
});



const initialState = {
    periodResponse5250: {loading:false, data:[], error:''},
    periodTotalTransaction: {loading:false, data:[], error:''},
    periodEthernetline: {loading:false, data:[], error:''}
};

const periodOtherSlice = createSlice({ 
    name: 'periodOtherCharts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncPeriodResponse5250.pending, state => {
          state.periodResponse5250.loading = true
        })
        builder.addCase(fetchAsyncPeriodResponse5250.fulfilled, (state, action) => {
          state.periodResponse5250.loading = false
          state.periodResponse5250.data = action.payload
          state.periodResponse5250.error = ''
        })
        builder.addCase(fetchAsyncPeriodResponse5250.rejected, (state, action) => {
          state.periodResponse5250.loading = false
          state.periodResponse5250.data = []
          state.periodResponse5250.error = action.error.message
        })
        builder.addCase(fetchAsyncPeriodTotalTransaction.pending, state => {
            state.periodTotalTransaction.loading = true
        })
        builder.addCase(fetchAsyncPeriodTotalTransaction.fulfilled, (state, action) => {
            state.periodTotalTransaction.loading = false
            state.periodTotalTransaction.data = action.payload
            state.periodTotalTransaction.error = ''
        })
        builder.addCase(fetchAsyncPeriodTotalTransaction.rejected, (state, action) => {
            state.periodTotalTransaction.loading = false
            state.periodTotalTransaction.data = []
            state.periodTotalTransaction.error = action.error.message
        })
        builder.addCase(fetchAsyncPeriodEthernetUtilization.pending, state => {
            state.periodEthernetline.loading = true
        })
        builder.addCase(fetchAsyncPeriodEthernetUtilization.fulfilled, (state, action) => {
            state.periodEthernetline.loading = false
            state.periodEthernetline.data = action.payload
            state.periodEthernetline.error = ''
        })
        builder.addCase(fetchAsyncPeriodEthernetUtilization.rejected, (state, action) => {
            state.periodEthernetline.loading = false
            state.periodEthernetline.data = []
            state.periodEthernetline.error = action.error.message
        })
    },
})

export const getPeriodResponse5250Data = (state) => state.periodOtherCharts.periodResponse5250;
export const getPeriodTotalTransactionsData = (state) => state.periodOtherCharts.periodTotalTransaction;
export const getPeriodEthernetLineData = (state) => state.periodOtherCharts.periodEthernetline;


export default periodOtherSlice.reducer;




