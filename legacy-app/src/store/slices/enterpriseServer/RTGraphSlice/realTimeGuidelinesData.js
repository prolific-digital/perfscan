import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cpuRTGuidelineData: "",
};

const realTimeGuidelinesData = createSlice({
  name: "realtimeguidelinesdata",
  initialState,
  reducers: {
    cpuGuideLineUpdate: (state, { payload }) => {
      state.cpuRTGuidelineData = payload;
    },
  },
});

export const { cpuGuideLineUpdate } = realTimeGuidelinesData.actions;
export const getcpuRTGuidelinesData = (state) => state.realtimeguidelinesdata.cpuRTGuidelineData

export default realTimeGuidelinesData.reducer;
