import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';
import { NEW_REPORT } from "typeCodes/index";


export const fetchEditReport = createAsyncThunk("editScheduler/fetchEditReport", async (data) => {
    const response = await baseAPI.put(`/api/scheduler/report/`, data);
    return response.data;
});

export const fetchReport = createAsyncThunk("editScheduler/fetchReport", async (id) => {
    const response = await baseAPI.get(`/api/scheduler/report/${id}`);
    return response.data;
})

export const fetchReportReceipients = createAsyncThunk("editScheduler/fetchReportReceipients", async (reportId = 0) => {
    console.log("Feth Report Reciepients", reportId);
    
    const response = await baseAPI.get(`/api/scheduler/report/users/${reportId}`);
    return response.data;
})

export const fetchTemplates = createAsyncThunk("editScheduler/fetchTemplates", async ({userId=1, reportType='historical data'}) => {
    const response = await baseAPI.get(`/api/scheduler/report/templates/${userId}/${reportType}`);
    return response.data;
})

const initialState = {
    report :
    {
        report_id: 0,
        cronicle_jobid : '',
        report_name: "",
        report_description: "",
        report_type: {name: 'Historical', code: 'historical'},
        report_schedule: {
            disabled: false, // always enabled
            frequency : '',
            days:[],
            months:[],
            day: "",
            hour: "00",
            type: "",
            minute: "00",
            day_of_week: "",
            day_of_month: '',
            day: '',
            frequencyObject : {},
        },
        report_metrix: {
            cpu_ms: true,
            no_of_cores: true,
            faulting_rate: true,
            cache_hit_perc: false,
            total_disk_ops: true,
            cpu_utilization: true,
            read_write_ratio: true,
            executing_summary: true,
            disk_response_time: true,
            pool_faulting_rate: false,
            response_time_5250: true,
            total_transactions: true,
            disk_arm_utilization: true,
            memory_size_faulting: true,
            top_jobs_utilisation: true,
            machine_pool_faulting: true,
            system_specifications: true,
            disk_space_utilization: true,
            top_pool_faulting_rate: true,
            ethernet_line_utilization: false
        },
        system: {
            id: 0,
            entity_name: "",
            entity_description: ""
        },
        template: {
            template_name: "",
            config_id: 0,
            sel_template: ""
        },
        report_period: {
            name: "currentweek",
            code: "currentweek"
        },
        pool:null,
        ethernet: null,
        recipients: []
    },
    current_report : {isEditing : false, id : 0},
    templateData: { loading: false, data: [], error: '' },
    recipientsData: { loading: false, data: [], error: '' },
    reportData : { loading: false, data: [], error: ''}, //used for fetching the report data
    editReportData : { loading: false, data: [], error: ''}, //used for fetching the edit report information
};

const schedulerSlice = createSlice({
    name: 'editScheduler',
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
            state.report.report_description = payload;
        },
        setEditReportData : (state, { payload }) => {
            state.editReportData = payload;
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchEditReport.pending, state => {
            state.editReportData.loading = true
        })
        builder.addCase(fetchEditReport.fulfilled, (state, action) => {
            state.editReportData.loading = false
            state.editReportData.data = action.payload
            state.editReportData.error = ''
        })
        builder.addCase(fetchEditReport.rejected, (state, action) => {
            state.editReportData.loading = false
            state.editReportData.data = []
            state.editReportData.error = action.error.message
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

export const getTemplates = (state) => state.editScheduler.templateData;
export const getReportRecipients = (state) => state.editScheduler.recipientsData;
export const getReport = (state) => state.editScheduler.report; //Report data local for editing

export const getReportData = (state) => state.editScheduler.reportData; //Report Data from Server
export const getEditReportData = (state) => state.editScheduler.editReportData; //Edit Report Data from Server

export const {
    setReport,
    setMetrics,
    setSystem,
    setReportType,
    setTemplate,
    setPeriod,
    setSchedule,
    setRecipients,
    setReportName,
    setReportDesc,
    setEditReportData,
} = schedulerSlice.actions;

export default schedulerSlice.reducer;