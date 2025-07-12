import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../services/baseApi";

export const fetchAsyncMetricCPUData = createAsyncThunk(
  "metricdata/fetchAsyncMetricCPUData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/cpu?${query}`);
    return response.data;
  }
);

export const fetchAsyncMetricDiskData = createAsyncThunk(
  "metricdata/fetchAsyncMetricDiskData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/disk?${query}`);
    return response.data;
  }
);

export const fetchAsyncMetricMemoryData = createAsyncThunk(
  "metricdata/fetchAsyncMetricMemoryData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/memory?${query}`);
    return response.data;
  }
);

export const fetchAsyncMetricOtherData = createAsyncThunk(
  "metricdata/fetchAsyncMetricOtherData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/others?${query}`);
    return response.data;
  }
);

export const fetchAsyncTopJobsData = createAsyncThunk(
  "metricdata/fetchAsyncTopJobsData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/jobs`);
    return response.data;
  }
);

const initialState = {
  summarydatacpu: { loading: true, data: [], error: "" },
  summarydatadisk: { loading: true, data: [], error: "" },
  summarydatamemory: { loading: true, data: [], error: "" },
  summarydataother: { loading: true, data: [], error: "" },
  summaryTrendCalculation: { loading: true, data: {}, error: "" },
};

const summarySlice = createSlice({
  name: "metricdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMetricCPUData.pending, (state) => {
      state.summarydatacpu.loading = true;
    });
    builder.addCase(fetchAsyncMetricCPUData.fulfilled, (state, action) => {
      state.summarydatacpu.loading = false;
      state.summarydatacpu.data = action.payload;
      state.summarydatacpu.error = "";
    });
    builder.addCase(fetchAsyncMetricCPUData.rejected, (state, action) => {
      state.summarydatacpu.loading = false;
      state.summarydatacpu.data = [];
      state.summarydatacpu.error = action.error.message;
    });
    builder.addCase(fetchAsyncMetricDiskData.pending, (state) => {
      state.summarydatadisk.loading = true;
    });
    builder.addCase(fetchAsyncMetricDiskData.fulfilled, (state, action) => {
      state.summarydatadisk.loading = false;
      state.summarydatadisk.data = action.payload;
      state.summarydatadisk.error = "";
    });
    builder.addCase(fetchAsyncMetricDiskData.rejected, (state, action) => {
      state.summarydatadisk.loading = false;
      state.summarydatadisk.data = [];
      state.summarydatadisk.error = action.error.message;
    });
    builder.addCase(fetchAsyncMetricMemoryData.pending, (state) => {
      state.summarydatamemory.loading = true;
    });
    builder.addCase(fetchAsyncMetricMemoryData.fulfilled, (state, action) => {
      state.summarydatamemory.loading = false;
      state.summarydatamemory.data = action.payload;
      state.summarydatamemory.error = "";
    });
    builder.addCase(fetchAsyncMetricMemoryData.rejected, (state, action) => {
      state.summarydatamemory.loading = false;
      state.summarydatamemory.data = [];
      state.summarydatamemory.error = action.error.message;
    });
    builder.addCase(fetchAsyncMetricOtherData.pending, (state) => {
      state.summarydataother.loading = true;
    });
    builder.addCase(fetchAsyncMetricOtherData.fulfilled, (state, action) => {
      state.summarydataother.loading = false;
      state.summarydataother.data = action.payload;
      state.summarydataother.error = "";
    });
    builder.addCase(fetchAsyncMetricOtherData.rejected, (state, action) => {
      state.summarydataother.loading = false;
      state.summarydataother.data = [];
      state.summarydataother.error = action.error.message;
    });
  },
});

export const getMetricsCPUData = (state) => state.metricdata.summarydatacpu;
export const getMetricsDiskData = (state) => state.metricdata.summarydatadisk;
export const getMetricsMemoryData = (state) =>
  state.metricdata.summarydatamemory;
export const getMetricsOtherData = (state) => state.metricdata.summarydataother;

export default summarySlice.reducer;
