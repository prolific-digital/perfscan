import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../services/baseApi";

export const fetchAsyncRealTimeCPUGraphData = createAsyncThunk(
  "cpugraphdata/fetchAsyncRealTimeCPUGraphData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(
      `api/realtimemonitor/graphs/cpudata?${query}`
    );
    return response.data;
  }
);

export const fetchAsyncRealTimeNumCoresGraphData = createAsyncThunk(
  "cpugraphdata/fetchAsyncRealTimeNumCoresGraphData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/graphs/numcores?${query}`);
    return response.data;
  }
);

const initialState = {
  realTimeCpuData: { loading: true, data: [], error: "" },
  realTimenumcoresdata: { loading: true, data: [], error: "" },
};

const summarySlice = createSlice({
  name: "cpugraphdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncRealTimeCPUGraphData.pending, (state) => {
      state.realTimeCpuData.loading = true;
    });
    builder.addCase(
      fetchAsyncRealTimeCPUGraphData.fulfilled,
      (state, action) => {
        state.realTimeCpuData.loading = false;
        state.realTimeCpuData.data = action.payload;
        state.realTimeCpuData.error = "";
      }
    );
    builder.addCase(
      fetchAsyncRealTimeCPUGraphData.rejected,
      (state, action) => {
        state.realTimeCpuData.loading = false;
        state.realTimeCpuData.data = [];
        state.realTimeCpuData.error = action.error.message;
      }
    );
    builder.addCase(fetchAsyncRealTimeNumCoresGraphData.pending, (state) => {
      state.realTimenumcoresdata.loading = true;
    });
    builder.addCase(
      fetchAsyncRealTimeNumCoresGraphData.fulfilled,
      (state, action) => {
        state.realTimenumcoresdata.loading = false;
        state.realTimenumcoresdata.data = action.payload;
        state.realTimenumcoresdata.error = "";
      }
    );
    builder.addCase(
      fetchAsyncRealTimeNumCoresGraphData.rejected,
      (state, action) => {
        state.realTimenumcoresdata.loading = false;
        state.realTimenumcoresdata.data = [];
        state.realTimenumcoresdata.error = action.error.message;
      }
    );
  },
});

export const getCPUDGraphata = (state) => state.cpugraphdata.realTimeCpuData;
export const getNumCoresData = (state) => state.cpugraphdata.realTimenumcoresdata;

export default summarySlice.reducer;
