import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../services/baseApi";

export const fetchAsyncRealTimeTotalFaultingGraphData = createAsyncThunk(
  "memorygraphdata/fetchAsyncRealTimeTotalFaultingGraphData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(
      `api/realtimemonitor/graphs/total_faulting?${query}`
    );
    return response.data;
  }
);

export const fetchAsyncRealTimeMemoryPoolData = createAsyncThunk(
  "memorygraphdata/fetchAsyncRealTimeMemoryPoolData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/mfdata?${query}`);
    return response.data;
  }
);

const initialState = {
  realTimeTotalFaultingData: { loading: true, data: [], error: "" },
  realTimeMemoryPoolData: { loading: true, data: [], error: "" },
};

const summarySlice = createSlice({
  name: "memorygraphdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncRealTimeTotalFaultingGraphData.pending,
      (state) => {
        state.realTimeTotalFaultingData.loading = true;
      }
    );
    builder.addCase(
      fetchAsyncRealTimeTotalFaultingGraphData.fulfilled,
      (state, action) => {
        state.realTimeTotalFaultingData.loading = false;
        state.realTimeTotalFaultingData.data = action.payload;
        state.realTimeTotalFaultingData.error = "";
      }
    );
    builder.addCase(
      fetchAsyncRealTimeTotalFaultingGraphData.rejected,
      (state, action) => {
        state.realTimeTotalFaultingData.loading = false;
        state.realTimeTotalFaultingData.data = [];
        state.realTimeTotalFaultingData.error = action.error.message;
      }
    );
    builder.addCase(fetchAsyncRealTimeMemoryPoolData.pending, (state) => {
      state.realTimeMemoryPoolData.loading = true;
    });
    builder.addCase(
      fetchAsyncRealTimeMemoryPoolData.fulfilled,
      (state, action) => {
        state.realTimeMemoryPoolData.loading = false;
        state.realTimeMemoryPoolData.data = action.payload;
        state.realTimeMemoryPoolData.error = "";
      }
    );
    builder.addCase(
      fetchAsyncRealTimeMemoryPoolData.rejected,
      (state, action) => {
        state.realTimeMemoryPoolData.loading = false;
        state.realTimeMemoryPoolData.data = [];
        state.realTimeMemoryPoolData.error = action.error.message;
      }
    );
  },
});

export const getTotalFaultingGraphData = (state) =>
  state.memorygraphdata.realTimeTotalFaultingData;

export const getMemoryPoolData = (state) =>
  state.memorygraphdata.realTimeMemoryPoolData;

export default summarySlice.reducer;
