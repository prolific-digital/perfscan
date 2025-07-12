import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';
import { set } from "lodash";

export const fetchReports = createAsyncThunk("scheduler/fetchReports", async () => {
    const response = await baseAPI.get(`/api/report/`);
    return response.data;
});

export const fetchReport = createAsyncThunk("scheduler/fetchReport", async (id) => {
    const response = await baseAPI.get(`/api/report/${id}`);
    return response.data;
})

export const fetchCreateReport = createAsyncThunk("scheduler/fetchCreateReport", async (data) => {
    const response = await baseAPI.post(`/api/report/`, data);
    return response.data;
});

export const fetchReceipients = createAsyncThunk("scheduler/fetchReceipients", async () => {
    const response = await baseAPI.get(`/api/report/users`);
    return response.data;
})

export const fetchReportReceipients = createAsyncThunk("scheduler/fetchReportReceipients", async (reportId = 0) => {
    const response = await baseAPI.get(`/api/report/users/${reportId}`);
    return response.data;
})

export const fetchTemplates = createAsyncThunk("scheduler/fetchTemplates", async ({userId=1, reportType='historical data'}) => {
    const response = await baseAPI.get(`/api/report/templates/${userId}/${reportType}`);
    return response.data;
})

const initialState = {
    report : {
        system_id: 0,
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
            day: '',
            frequencyObject : {},
        },
        email_template : '',
        report_period : '',
        pool : [],
        ethernet : '',
        recipients : ''
    },
    cur_report : {isEditing : false, id : 0},
    templateData: { loading: false, data: [], error: '' },
    recipientsData: { loading: false, data: [], error: '' },
    reportsData : { loading: false, data: [], error: ''},
    reportData : { loading: false, data: [], error: ''},
    createReportData : {loading: false, data: [], error: ''}
};

const schedulerSlice = createSlice({
    name: 'scheduler',
    initialState,
    reducers: {
        setReport: (state, { payload }) => {
            state.report = payload;
        },
        setSystem: (state, { payload }) => {
            state.report.system_id = payload;
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
        },
        setIsEditing: (state, { payload }) => {
            state.cur_report = payload;
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
        builder.addCase(fetchReport.pending, state => {
            state.reportData.loading = true
        })
        builder.addCase(fetchReport.fulfilled, (state, action) => {
            state.reportData.loading = false
            state.reportData.data = action.payload
            state.reportData.error = ''
        })
        builder.addCase(fetchReport.rejected, (state, action) => {
            state.reportData.loading = false
            state.reportData.data = []
            state.reportData.error = action.error.message
        })
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
        builder.addCase(fetchReportReceipients.pending, state => {
            state.recipientsData.loading = true
        })
        builder.addCase(fetchReportReceipients.fulfilled, (state, action) => {
            state.recipientsData.loading = false
            state.recipientsData.data = action.payload
            state.recipientsData.error = ''
        })
        builder.addCase(fetchReportReceipients.rejected, (state, action) => {
            state.recipientsData.loading = false
            state.recipientsData.data = []
            state.recipientsData.error = action.error.message
        })
    },
})

export const getTemplates = (state) => state.scheduler.templateData;
export const getReportsData = (state) => state.scheduler.reportsData;
export const getRecipients = (state) => state.scheduler.recipientsData;
export const getReport = (state) => state.scheduler.report;
export const getReportData = (state) => state.scheduler.reportData;
export const getCreateReport = (state) => state.scheduler.createReportData;
export const getIsEditing = (state) => state.scheduler.cur_report;

export const {
    setReport,
    setMetrics,
    setSystem,
    setTemplate,
    setPeriod,
    setSchedule,
    setRecipients,
    setReportName,
    setReportDesc,
    setIsEditing
} = schedulerSlice.actions;

export default schedulerSlice.reducer;