import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../services/baseApi";

export const fetchAsyncRealTime5250ResponseGraphData = createAsyncThunk(
  "othergraphdata/fetchAsyncRealTime5250ResponseGraphData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(
      `api/realtimemonitor/graphs/response_5250?${query}`
    );
    return response.data;
  }
);

export const fetchAsyncRealTimeTotalTransactionsGraphData = createAsyncThunk(
  "othergraphdata/fetchAsyncRealTimeTotalTransactionsGraphData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(
      `api/realtimemonitor/graphs/total_tansaction?${query}`
    );
    return response.data;
  }
);

export const fetchAsyncRealTimeEthernetUtilizationGraphData = createAsyncThunk(
  "othergraphdata/fetchAsyncRealTimeEthernetUtilizationGraphData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(
      `api/realtimemonitor/graphs/ethernet_line?${query}`
    );
    return response.data;
  }
);

const initialState = {
  realTime5250ResponseData: { loading: true, data: [], error: "" },
  realTimeTotalTransactionsData: { loading: true, data: [], error: "" },
  realTimeEthernetUtilizationData: { loading: true, data: [], error: "" },
};

const summarySlice = createSlice({
  name: "othergraphdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncRealTime5250ResponseGraphData.pending,
      (state) => {
        state.realTime5250ResponseData.loading = true;
      }
    );
    builder.addCase(
      fetchAsyncRealTime5250ResponseGraphData.fulfilled,
      (state, action) => {
        state.realTime5250ResponseData.loading = false;
        state.realTime5250ResponseData.data = action.payload;
        state.realTime5250ResponseData.error = "";
      }
    );
    builder.addCase(
      fetchAsyncRealTime5250ResponseGraphData.rejected,
      (state, action) => {
        state.realTime5250ResponseData.loading = false;
        state.realTime5250ResponseData.data = [];
        state.realTime5250ResponseData.error = action.error.message;
      }
    );
    builder.addCase(
      fetchAsyncRealTimeTotalTransactionsGraphData.pending,
      (state) => {
        state.realTimeTotalTransactionsData.loading = true;
      }
    );
    builder.addCase(
      fetchAsyncRealTimeTotalTransactionsGraphData.fulfilled,
      (state, action) => {
        state.realTimeTotalTransactionsData.loading = false;
        state.realTimeTotalTransactionsData.data = action.payload;
        state.realTimeTotalTransactionsData.error = "";
      }
    );
    builder.addCase(
      fetchAsyncRealTimeTotalTransactionsGraphData.rejected,
      (state, action) => {
        state.realTimeTotalTransactionsData.loading = false;
        state.realTimeTotalTransactionsData.data = [];
        state.realTimeTotalTransactionsData.error = action.error.message;
      }
    );
    builder.addCase(
      fetchAsyncRealTimeEthernetUtilizationGraphData.pending,
      (state) => {
        state.realTimeEthernetUtilizationData.loading = true;
      }
    );
    builder.addCase(
      fetchAsyncRealTimeEthernetUtilizationGraphData.fulfilled,
      (state, action) => {
        state.realTimeEthernetUtilizationData.loading = false;
        state.realTimeEthernetUtilizationData.data = action.payload;
        state.realTimeEthernetUtilizationData.error = "";
      }
    );
    builder.addCase(
      fetchAsyncRealTimeEthernetUtilizationGraphData.rejected,
      (state, action) => {
        state.realTimeEthernetUtilizationData.loading = false;
        state.realTimeEthernetUtilizationData.data = [];
        state.realTimeEthernetUtilizationData.error = action.error.message;
      }
    );
  },
});

export const get5250ResponseGraphData = (state) =>
  state.othergraphdata.realTime5250ResponseData;
export const getTotalTransactionGraphData = (state) =>
  state.othergraphdata.realTimeTotalTransactionsData;
export const getEthernetUtilizationGraphData = (state) =>
  state.othergraphdata.realTimeEthernetUtilizationData;

export default summarySlice.reducer;
