import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';
import { NEW_REPORT } from "typeCodes/index";
import { set } from "lodash";


export const fetchCreateReport = createAsyncThunk("addScheduler/fetchCreateReport", async (data) => {
    const response = await baseAPI.post(`/api/scheduler/report`, data);
    return response.data;
});

export const fetchReceipients = createAsyncThunk("addScheduler/fetchReceipients", async () => {
    const response = await baseAPI.get(`/api/scheduler/report/users`);
    return response.data;
})

export const fetchTemplates = createAsyncThunk("addScheduler/fetchTemplates", async ({userId=1, reportType='historical data'}) => {
    const response = await baseAPI.get(`/api/scheduler/report/templates/:${userId}/${reportType}`);
    return response.data;
})

const initialState = {
    report : {
        system : {
            id:0,
            name:''
        },
    user_id:0,
    report_type:'',
    template: {},
    report_name : '',
    report_desc : '',
    report_metrix: {},
    report_schedule : {
        disabled: false, // always enabled
        _frequency : '',
        _hour:'00', //initial time hour
        _minute:'00', //initial time minute
        _days:[],
        _months:[],
        type: '',
        hour: 0,
        minute: '',
        day_of_week: '',
        day_of_month: '',
        day: '',
        frequencyObject : {},
    },
    email_template : '',
    report_period : '',
    pool : [],
    ethernet : '',
    recipients : []},
    templateData: { loading: false, data: [], error: '' },
    recipientsData: { loading: false, data: [], error: '' },
    createReportData : {loading: false, data: [], error: ''}
};

const schedulerSlice = createSlice({
    name: 'addScheduler',
    initialState,
    reducers: {
        setReport: (state, { payload }) => {
            state.report = payload;
        },
        setSystem: (state, { payload }) => {
            state.report.system = payload;
        },
        setReportType: (state, { payload }) => {
            state.report.report_type = payload;
        },
        setTemplate: (state, { payload }) => {
            state.report.template = payload;
        },
        setPeriod: (state, { payload }) => {
            state.report.report_period = payload;
        },
        setMetrics : (state, { payload }) => {
            state.report.report_metrix = payload;
        },
        setSchedule: (state, { payload }) => {
            state.report.report_schedule = payload;
        },
        setRecipients: (state, { payload }) => {
            state.report.recipients = payload;
        },
        setReportName: (state, { payload }) => {
            state.report.report_name = payload;
        },
        setReportDesc: (state, { payload }) => {
            state.report.report_desc = payload;
        }
    },
    extraReducers: builder => {
        
        builder.addCase(fetchCreateReport.pending, state => {
            state.createReportData.loading = true
        })
        builder.addCase(fetchCreateReport.fulfilled, (state, action) => {
            state.createReportData.loading = false
            state.createReportData.data = action.payload
            state.createReportData.error = ''
        })
        builder.addCase(fetchCreateReport.rejected, (state, action) => {
            state.createReportData.loading = false
            state.createReportData.data = []
            state.createReportData.error = action.error.message
        })
        builder.addCase(fetchTemplates.pending, state => {
            state.templateData.loading = true
        })
        builder.addCase(fetchTemplates.fulfilled, (state, action) => {
            state.templateData.loading = false
            state.templateData.data = action.payload
            state.templateData.error = ''
        })
        builder.addCase(fetchTemplates.rejected, (state, action) => {
            state.templateData.loading = false
            state.templateData.data = []
            state.templateData.error = action.error.message
        })
        builder.addCase(fetchReceipients.pending, state => {
            state.recipientsData.loading = true
        })
        builder.addCase(fetchReceipients.fulfilled, (state, action) => {
            state.recipientsData.loading = false
            state.recipientsData.data = action.payload
            state.recipientsData.error = ''
        })
        builder.addCase(fetchReceipients.rejected, (state, action) => {
            state.recipientsData.loading = false
            state.recipientsData.data = []
            state.recipientsData.error = action.error.message
        })
    },
})

export const getTemplates = (state) => state.addScheduler.templateData;
export const getRecipients = (state) => state.addScheduler.recipientsData;
export const getReport = (state) => state.addScheduler.report;
export const getCreateReport = (state) => state.addScheduler.createReportData;
export const getReportSchedule = (state) => state.addScheduler.report.report_schedule;

export const {
    setReport,
    setMetrics,
    setSystem,
    setUserID,
    setReportType,
    setTemplate,
    setPeriod,
    setSchedule,
    setRecipients,
    setReportName,
    setReportDesc,
} = schedulerSlice.actions;

export default schedulerSlice.reducer;