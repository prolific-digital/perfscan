import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../../services/baseApi";

export const generateUuid = createAsyncThunk(
  "reports/generateUuid",
  async (qd) => {
    const response = await baseAPI.get(`api/getuniqueId`, qd);
    return response.data;
  }
);

export const generateNewReport = createAsyncThunk(
  "reports/generateNewReport",
  async (qd) => {
    const response = await baseAPI.post(`api/save/saveNewReport`, qd);
    return response.data;
  }
);

export const saveExistingReport = createAsyncThunk(
  "reports/saveExistingReport",
  async (qd) => {
    const response = await baseAPI.post(`api/save/moveReport`, qd);
    return response.data;
  }
);

export const deleteTemporaryReport = createAsyncThunk(
  "reports/deleteTemporaryReport",
  async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.delete(`api/save/deleteTempReport?${query}`);
    return response.data;
  }
);

export const pieSaveReport = createAsyncThunk(
  "reports/pieSaveReport",
  async (qd) => {
    // const dates = new URLSearchParams(qd.dates).toString();
    // const remainingQD = {
    //   sysid: qd.sysid,
    //   userId: qd.userId,
    //   sysname: qd.sysname,
    //   rptType: qd.rptType,
    //   fileName: qd.fileName,
    //   saveReport: qd.saveReport,
    //   uniqueid: qd.uniqueid,
    // };
    // const updatedQD =

    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/topjobs/pie/saveReport?${query}`);
    return response.data;
  }
);

const initialState = {
  uuidData: { loading: false, data: {}, error: "" },
  saveReportButtonsData: { loading: false, data: {}, error: "" },
  saveExistingReportData: { loading: false, data: {}, error: "" },
  deleteReportData: { loading: false, data: {}, error: "" },
  pieReports: { loading: false, data: {}, error: "" },
};

const saveNewReportSlice = createSlice({
  name: "savenewreport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(generateUuid.pending, (state) => {
      state.uuidData.loading = true;
    });
    builder.addCase(generateUuid.fulfilled, (state, action) => {
      state.uuidData.loading = false;
      state.uuidData.data = action.payload;
      state.uuidData.error = "";
    });
    builder.addCase(generateUuid.rejected, (state, action) => {
      state.uuidData.loading = false;
      state.uuidData.data = [];
      state.uuidData.error = action.error.message;
    });
    builder.addCase(generateNewReport.pending, (state) => {
      state.saveReportButtonsData.loading = true;
    });
    builder.addCase(generateNewReport.fulfilled, (state, action) => {
      state.saveReportButtonsData.loading = false;
      state.saveReportButtonsData.data = action.payload;
      state.saveReportButtonsData.error = "";
    });
    builder.addCase(generateNewReport.rejected, (state, action) => {
      state.saveReportButtonsData.loading = false;
      state.saveReportButtonsData.data = [];
      state.saveReportButtonsData.error = action.error.message;
    });
    builder.addCase(saveExistingReport.pending, (state) => {
      state.saveExistingReportData.loading = true;
    });
    builder.addCase(saveExistingReport.fulfilled, (state, action) => {
      state.saveExistingReportData.loading = false;
      state.saveExistingReportData.data = action.payload;
      state.saveExistingReportData.error = "";
    });
    builder.addCase(saveExistingReport.rejected, (state, action) => {
      state.saveExistingReportData.loading = false;
      state.saveExistingReportData.data = [];
      state.saveExistingReportData.error = action.error.message;
    });
    builder.addCase(deleteTemporaryReport.pending, (state) => {
      state.deleteReportData.loading = true;
    });
    builder.addCase(deleteTemporaryReport.fulfilled, (state, action) => {
      state.deleteReportData.loading = false;
      state.deleteReportData.data = action.payload;
      state.deleteReportData.error = "";
    });
    builder.addCase(deleteTemporaryReport.rejected, (state, action) => {
      state.deleteReportData.loading = false;
      state.deleteReportData.data = [];
      state.deleteReportData.error = action.error.message;
    });
    builder.addCase(pieSaveReport.pending, (state) => {
      state.pieReports.loading = true;
    });
    builder.addCase(pieSaveReport.fulfilled, (state, action) => {
      state.pieReports.loading = false;
      state.pieReports.data = action.payload;
      state.pieReports.error = "";
    });
    builder.addCase(pieSaveReport.rejected, (state, action) => {
      state.pieReports.loading = false;
      state.pieReports.data = [];
      state.pieReports.error = action.error.message;
    });
  },
});

export const getSaveNewReportData = (state) =>
  state.saveReport.saveReportButtonsData;
export const getUuidData = (state) => state.saveReport.uuidData;
export const getSaveExistingReportData = (state) =>
  state.saveReport.saveExistingReportData;
export const deleteTemporaryReportData = (state) =>
  state.saveReport.deleteReportData;
export const getPieReportData = (state) => state.saveReport.pieReports;

export default saveNewReportSlice.reducer;
