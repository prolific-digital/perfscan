import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../services/baseApi";

export const fetchAsyncSystemsAndFrame = createAsyncThunk(
  "systemframe/fetchAsyncSystemsAndFrame",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/systems?${query}`);
    return response.data;
  }
);

export const fetchAsyncFrames = createAsyncThunk(
  "systemframe/fetchAsyncFrames",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/realtimemonitor/frames?${query}`);
    return response.data;
  }
);

export const fetchAsyncFramesLpars = createAsyncThunk(
  "systemframe/fetchAsyncFramesLpars",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(
      `api/realtimemonitor/frames/lpars?${query}`
    );
    return response.data;
  }
);

const initialState = {
  systemFrameList: { loading: true, data: [], error: "" },
  frameList: { loading: true, data: [], error: "" },
  lparList: { loading: true, data: [], error: "" },
};

const systemsFrames = createSlice({
  name: "systemframe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncSystemsAndFrame.pending, (state) => {
      state.systemFrameList.loading = true;
    });
    builder.addCase(fetchAsyncSystemsAndFrame.fulfilled, (state, action) => {
      state.systemFrameList.loading = false;
      state.systemFrameList.data = action.payload;
      state.systemFrameList.error = "";
    });
    builder.addCase(fetchAsyncSystemsAndFrame.rejected, (state, action) => {
      state.systemFrameList.loading = false;
      state.systemFrameList.data = [];
      state.systemFrameList.error = action.error.message;
    });
    builder.addCase(fetchAsyncFrames.pending, (state) => {
      state.frameList.loading = true;
    });
    builder.addCase(fetchAsyncFrames.fulfilled, (state, action) => {
      state.frameList.loading = false;
      state.frameList.data = action.payload;
      state.frameList.error = "";
    });
    builder.addCase(fetchAsyncFrames.rejected, (state, action) => {
      state.frameList.loading = false;
      state.frameList.data = [];
      state.frameList.error = action.error.message;
    });
    builder.addCase(fetchAsyncFramesLpars.pending, (state) => {
      state.lparList.loading = true;
    });
    builder.addCase(fetchAsyncFramesLpars.fulfilled, (state, action) => {
      state.lparList.loading = false;
      state.lparList.data = action.payload;
      state.lparList.error = "";
    });
    builder.addCase(fetchAsyncFramesLpars.rejected, (state, action) => {
      state.lparList.loading = false;
      state.lparList.data = [];
      state.lparList.error = action.error.message;
    });
  },
});

export const getSystemFrameList = (state) => state.systemframe.systemFrameList;
export const getFrameList = (state) => state.systemframe.frameList;
export const getFrameLparList = (state) => state.systemframe.lparList;

export default systemsFrames.reducer;
