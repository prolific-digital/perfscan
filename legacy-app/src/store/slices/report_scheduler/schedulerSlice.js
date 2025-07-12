import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';
import { NEW_REPORT } from "typeCodes/index";

export const fetchReports = createAsyncThunk("schedulerData/fetchReports", async () => {
    const response = await baseAPI.get(`/api/scheduler/report`);
    return response.data;
});

export const runScheduledReport = createAsyncThunk("schedulerData/runReport", async (id) => {
    const response = await baseAPI.get(`/api/scheduler/run/${id}`);
    return response.data;
})


const initialState = {
    reportsData : { loading: false, data: [], error: ''},
    runReportData : {loading: false, data: [], error: ''},
    cur_report : {isEditing : false, id : 0}
};

const schedulerSlice = createSlice({
    name: 'schedulerData',
    initialState,
    reducers: {
        setIsEditing: (state, { payload }) => {
            state.cur_report = payload;
        },
        setReport : (state, { payload }) => {
            state.report = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchReports.pending, state => {
            state.reportsData.loading = true
        })
        builder.addCase(fetchReports.fulfilled, (state, action) => {
            state.reportsData.loading = false
            state.reportsData.data = action.payload
            state.reportsData.error = ''
        })
        builder.addCase(fetchReports.rejected, (state, action) => {
            state.reportsData.loading = false
            state.reportsData.data = []
            state.reportsData.error = action.error.message
        })
        builder.addCase(runScheduledReport.pending, state => {
            state.runReportData.loading = true
        })
        builder.addCase(runScheduledReport.fulfilled, (state, action) => {
            state.runReportData.loading = false
            state.runReportData.data = action.payload
            state.runReportData.error = ''
        })
        builder.addCase(runScheduledReport.rejected, (state, action) => {
            state.runReportData.loading = false
            state.runReportData.data = []
            state.runReportData.error = action.error.message
        })
    },
})


export const getReportsData = (state) => state.schedulerData.reportsData;
export const getIsEditing = (state) => state.schedulerData.cur_report;
export const getRunReportData = (state) => state.schedulerData.runReportData;

export const {setIsEditing, setReport} = schedulerSlice.actions;

export default schedulerSlice.reducer;