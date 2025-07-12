import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedReports: [],
  scheduledReports: [],
  reportTemplates: [],
  currentReport: null,
  generating: false,
  loading: false,
  error: null,
  filters: {
    type: 'all',
    createdBy: 'all',
  },
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    fetchReportsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReportsSuccess: (state, action) => {
      state.loading = false;
      state.savedReports = action.payload.savedReports || [];
      state.scheduledReports = action.payload.scheduledReports || [];
      state.reportTemplates = action.payload.reportTemplates || [];
      state.error = null;
    },
    fetchReportsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    generateReportStart: (state) => {
      state.generating = true;
      state.error = null;
    },
    generateReportSuccess: (state, action) => {
      state.generating = false;
      state.currentReport = action.payload;
      state.error = null;
    },
    generateReportFailure: (state, action) => {
      state.generating = false;
      state.error = action.payload;
    },
    saveReport: (state, action) => {
      state.savedReports.unshift(action.payload);
    },
    updateReport: (state, action) => {
      const index = state.savedReports.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.savedReports[index] = action.payload;
      }
    },
    deleteReport: (state, action) => {
      state.savedReports = state.savedReports.filter(r => r.id !== action.payload);
    },
    scheduleReport: (state, action) => {
      state.scheduledReports.push(action.payload);
    },
    updateScheduledReport: (state, action) => {
      const index = state.scheduledReports.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.scheduledReports[index] = action.payload;
      }
    },
    deleteScheduledReport: (state, action) => {
      state.scheduledReports = state.scheduledReports.filter(r => r.id !== action.payload);
    },
    setReportFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetReportFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearCurrentReport: (state) => {
      state.currentReport = null;
    },
  },
});

export const {
  fetchReportsStart,
  fetchReportsSuccess,
  fetchReportsFailure,
  generateReportStart,
  generateReportSuccess,
  generateReportFailure,
  saveReport,
  updateReport,
  deleteReport,
  scheduleReport,
  updateScheduledReport,
  deleteScheduledReport,
  setReportFilter,
  resetReportFilters,
  clearCurrentReport,
} = reportsSlice.actions;

export default reportsSlice.reducer;

// Selectors
export const selectSavedReports = (state) => state.reports.savedReports;
export const selectScheduledReports = (state) => state.reports.scheduledReports;
export const selectReportTemplates = (state) => state.reports.reportTemplates;
export const selectCurrentReport = (state) => state.reports.currentReport;
export const selectReportGenerating = (state) => state.reports.generating;
export const selectReportsLoading = (state) => state.reports.loading;
export const selectReportsError = (state) => state.reports.error;
export const selectReportFilters = (state) => state.reports.filters;

// Filtered reports selector
export const selectFilteredReports = (state) => {
  const { savedReports, filters } = state.reports;
  
  return savedReports.filter(report => {
    if (filters.type !== 'all' && report.type !== filters.type) return false;
    if (filters.createdBy !== 'all' && report.createdBy !== filters.createdBy) return false;
    return true;
  });
};