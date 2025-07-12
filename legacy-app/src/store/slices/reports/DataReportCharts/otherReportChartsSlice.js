import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../../services/baseApi';

export const fetchAsyncResponse5250Reports = createAsyncThunk("otherReport/fetchAsyncResponse5250Reports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/_5250?${query}`);
    return response.data;
  }
);

export const fetchAsyncTotalTransactionReports = createAsyncThunk("otherReport/fetchAsyncTotalTransactionReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/tot?${query}`);
    return response.data;
});


export const fetchAsyncEthernetUtilizationReports = createAsyncThunk("otherReport/fetchAsyncEthernetUtilizationReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/ethernet?${query}`);
    return response.data;
});

const initialState = {
  response5250: { loading: false, data: [], error: "" },
  totaltransaction: { loading: false, data: [], error: "" },
  ethernetline: { loading: false, data: [], error: "" },
  response5250WC: { loading: false, data: [], error: "" },
  totaltransactionWC: { loading: false, data: [], error: "" },
  ethernetlineWC: { loading: false, data: [], error: "" },
};

const otherReportSlice = createSlice({
    name: 'otherReport',
  initialState,
  reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncResponse5250Reports.pending, state => {
      state.response5250.loading = true;
    });
    builder.addCase(fetchAsyncResponse5250Reports.fulfilled, (state, action) => {
      state.response5250.loading = false;
      state.response5250.data = action.payload;
          state.response5250.error = '';
    });
    builder.addCase(fetchAsyncResponse5250Reports.rejected, (state, action) => {
      state.response5250.loading = false;
      state.response5250.data = [];
      state.response5250.error = action.error.message;
    });
	 	builder.addCase(fetchAsyncTotalTransactionReports.pending, state => {
      state.totaltransaction.loading = true;
    });
    builder.addCase(fetchAsyncTotalTransactionReports.fulfilled, (state, action) => {
      state.totaltransaction.loading = false;
      state.totaltransaction.data = action.payload;
            state.totaltransaction.error = '';
    });
    builder.addCase(fetchAsyncTotalTransactionReports.rejected, (state, action) => {
      state.totaltransaction.loading = false;
      state.totaltransaction.data = [];
      state.totaltransaction.error = action.error.message;
    });
        builder.addCase(fetchAsyncEthernetUtilizationReports.pending, state => {
      state.ethernetline.loading = true;
    });
        builder.addCase(fetchAsyncEthernetUtilizationReports.fulfilled, (state, action) => {
        state.ethernetline.loading = false;
        state.ethernetline.data = action.payload;
            state.ethernetline.error = '';
        });
    builder.addCase(fetchAsyncEthernetUtilizationReports.rejected, (state, action) => {
      state.ethernetline.loading = false;
      state.ethernetline.data = [];
      state.ethernetline.error = action.error.message;
    });
    },
});

export const getResponse5250DataReports = (state) => state.otherReports.response5250;
export const getTotalTransactionsDataReports = (state) => state.otherReports.totaltransaction;
export const getEthernetLineDataReports = (state) => state.otherReports.ethernetline;
export default otherReportSlice.reducer;
