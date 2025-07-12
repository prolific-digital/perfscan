import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  realtime: {},
  historical: {},
  loading: false,
  error: null,
  selectedMetrics: ['cpu', 'memory', 'disk', 'response5250'],
  dateRange: {
    start: null,
    end: null,
    preset: 'last_7_days',
  },
  refreshInterval: 30000, // 30 seconds
  lastUpdate: null,
};

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    fetchMetricsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMetricsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.lastUpdate = new Date().toISOString();
    },
    fetchMetricsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRealtimeMetrics: (state, action) => {
      const { systemId, metrics } = action.payload;
      state.realtime[systemId] = {
        ...state.realtime[systemId],
        ...metrics,
        timestamp: new Date().toISOString(),
      };
      state.lastUpdate = new Date().toISOString();
    },
    setHistoricalMetrics: (state, action) => {
      const { systemId, metrics } = action.payload;
      state.historical[systemId] = metrics;
    },
    selectMetrics: (state, action) => {
      state.selectedMetrics = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setRefreshInterval: (state, action) => {
      state.refreshInterval = action.payload;
    },
    clearMetrics: (state) => {
      state.realtime = {};
      state.historical = {};
      state.lastUpdate = null;
    },
  },
});

export const {
  fetchMetricsStart,
  fetchMetricsSuccess,
  fetchMetricsFailure,
  updateRealtimeMetrics,
  setHistoricalMetrics,
  selectMetrics,
  setDateRange,
  setRefreshInterval,
  clearMetrics,
} = metricsSlice.actions;

export default metricsSlice.reducer;

// Selectors
export const selectRealtimeMetrics = (state, systemId) => 
  state.metrics.realtime[systemId] || null;

export const selectHistoricalMetrics = (state, systemId) => 
  state.metrics.historical[systemId] || null;

export const selectMetricsLoading = (state) => state.metrics.loading;
export const selectMetricsError = (state) => state.metrics.error;
export const selectSelectedMetrics = (state) => state.metrics.selectedMetrics;
export const selectDateRange = (state) => state.metrics.dateRange;
export const selectRefreshInterval = (state) => state.metrics.refreshInterval;
export const selectLastUpdate = (state) => state.metrics.lastUpdate;