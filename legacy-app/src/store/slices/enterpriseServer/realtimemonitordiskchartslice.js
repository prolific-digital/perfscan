import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../services/baseApi";

export const fetchAsyncRealTimeDiskSpaceGraphData = createAsyncThunk(
  "diskgraphdata/fetchAsyncRealTimeDiskSpaceGraphData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(
      `api/realtimemonitor/graphs/disk_space?${query}`
    );
    return response.data;
  }
);

export const fetchAsyncRealTimeDiskArmGraphData = createAsyncThunk(
  "diskgraphdata/fetchAsyncRealTimeDiskArmGraphData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(
      `api/realtimemonitor/graphs/disk_arm?${query}`
    );
    return response.data;
  }
);

export const fetchAsyncRealTimeDiskResponseGraphData = createAsyncThunk(
  "diskgraphdata/fetchAsyncRealTimeDiskResponseGraphData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(
      `api/realtimemonitor/graphs/disk_response_time?${query}`
    );
    return response.data;
  }
);

export const fetchAsyncRealTimeDiskOperationsGraphData = createAsyncThunk(
  "diskgraphdata/fetchAsyncRealTimeDiskOperationsGraphData",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(
      `api/realtimemonitor/graphs/disk_operations?${query}`
    );
    return response.data;
  }
);

const initialState = {
  realTimeDiskSpaceData: { loading: true, data: [], error: "" },
  realTimeDiskArmData: { loading: true, data: [], error: "" },
  realTimeDiskResponseData: { loading: true, data: [], error: "" },
  realTimeDiskOperationData: { loading: true, data: [], error: "" },
};

const summarySlice = createSlice({
  name: "diskgraphdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncRealTimeDiskSpaceGraphData.pending, (state) => {
      state.realTimeDiskSpaceData.loading = true;
    });
    builder.addCase(
      fetchAsyncRealTimeDiskSpaceGraphData.fulfilled,
      (state, action) => {
        state.realTimeDiskSpaceData.loading = false;
        state.realTimeDiskSpaceData.data = action.payload;
        state.realTimeDiskSpaceData.error = "";
      }
    );
    builder.addCase(
      fetchAsyncRealTimeDiskSpaceGraphData.rejected,
      (state, action) => {
        state.realTimeDiskSpaceData.loading = false;
        state.realTimeDiskSpaceData.data = [];
        state.realTimeDiskSpaceData.error = action.error.message;
      }
    );
    builder.addCase(fetchAsyncRealTimeDiskArmGraphData.pending, (state) => {
      state.realTimeDiskArmData.loading = true;
    });
    builder.addCase(
      fetchAsyncRealTimeDiskArmGraphData.fulfilled,
      (state, action) => {
        state.realTimeDiskArmData.loading = false;
        state.realTimeDiskArmData.data = action.payload;
        state.realTimeDiskArmData.error = "";
      }
    );
    builder.addCase(
      fetchAsyncRealTimeDiskArmGraphData.rejected,
      (state, action) => {
        state.realTimeDiskArmData.loading = false;
        state.realTimeDiskArmData.data = [];
        state.realTimeDiskArmData.error = action.error.message;
      }
    );
    builder.addCase(
      fetchAsyncRealTimeDiskResponseGraphData.pending,
      (state) => {
        state.realTimeDiskResponseData.loading = true;
      }
    );
    builder.addCase(
      fetchAsyncRealTimeDiskResponseGraphData.fulfilled,
      (state, action) => {
        state.realTimeDiskResponseData.loading = false;
        state.realTimeDiskResponseData.data = action.payload;
        state.realTimeDiskResponseData.error = "";
      }
    );
    builder.addCase(
      fetchAsyncRealTimeDiskResponseGraphData.rejected,
      (state, action) => {
        state.realTimeDiskResponseData.loading = false;
        state.realTimeDiskResponseData.data = [];
        state.realTimeDiskResponseData.error = action.error.message;
      }
    );
    builder.addCase(
      fetchAsyncRealTimeDiskOperationsGraphData.pending,
      (state) => {
        state.realTimeDiskOperationData.loading = true;
      }
    );
    builder.addCase(
      fetchAsyncRealTimeDiskOperationsGraphData.fulfilled,
      (state, action) => {
        state.realTimeDiskOperationData.loading = false;
        state.realTimeDiskOperationData.data = action.payload;
        state.realTimeDiskOperationData.error = "";
      }
    );
    builder.addCase(
      fetchAsyncRealTimeDiskOperationsGraphData.rejected,
      (state, action) => {
        state.realTimeDiskOperationData.loading = false;
        state.realTimeDiskOperationData.data = [];
        state.realTimeDiskOperationData.error = action.error.message;
      }
    );
  },
});

export const getDiskSpaceGraphData = (state) =>
  state.diskgraphdata.realTimeDiskSpaceData;
export const getDiskArmGraphData = (state) =>
  state.diskgraphdata.realTimeDiskArmData;
export const getDiskResponseGraphData = (state) =>
  state.diskgraphdata.realTimeDiskResponseData;
export const getDiskOperationsGraphData = (state) =>
  state.diskgraphdata.realTimeDiskOperationData;

export default summarySlice.reducer;
