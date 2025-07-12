import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: [],
  events: [],
  alertRules: [],
  loading: false,
  error: null,
  filters: {
    severity: 'all',
    acknowledged: 'all',
    systemId: 'all',
  },
  unreadCount: 0,
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    fetchAlertsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAlertsSuccess: (state, action) => {
      state.loading = false;
      state.alerts = action.payload.alerts || [];
      state.events = action.payload.events || [];
      state.alertRules = action.payload.alertRules || [];
      state.unreadCount = action.payload.alerts?.filter(a => !a.acknowledged).length || 0;
      state.error = null;
    },
    fetchAlertsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addAlert: (state, action) => {
      state.alerts.unshift(action.payload);
      if (!action.payload.acknowledged) {
        state.unreadCount += 1;
      }
    },
    acknowledgeAlert: (state, action) => {
      const alert = state.alerts.find(a => a.id === action.payload.alertId);
      if (alert && !alert.acknowledged) {
        alert.acknowledged = true;
        alert.acknowledgedBy = action.payload.user;
        alert.acknowledgedAt = new Date().toISOString();
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    clearAlert: (state, action) => {
      state.alerts = state.alerts.filter(a => a.id !== action.payload);
    },
    addEvent: (state, action) => {
      state.events.unshift(action.payload);
    },
    setAlertFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetAlertFilters: (state) => {
      state.filters = initialState.filters;
    },
    updateAlertRule: (state, action) => {
      const index = state.alertRules.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.alertRules[index] = action.payload;
      }
    },
  },
});

export const {
  fetchAlertsStart,
  fetchAlertsSuccess,
  fetchAlertsFailure,
  addAlert,
  acknowledgeAlert,
  clearAlert,
  addEvent,
  setAlertFilter,
  resetAlertFilters,
  updateAlertRule,
} = alertsSlice.actions;

export default alertsSlice.reducer;

// Selectors
export const selectAllAlerts = (state) => state.alerts.alerts;
export const selectAllEvents = (state) => state.alerts.events;
export const selectAlertRules = (state) => state.alerts.alertRules;
export const selectAlertsLoading = (state) => state.alerts.loading;
export const selectAlertsError = (state) => state.alerts.error;
export const selectAlertFilters = (state) => state.alerts.filters;
export const selectUnreadAlertCount = (state) => state.alerts.unreadCount;

// Filtered alerts selector
export const selectFilteredAlerts = (state) => {
  const { alerts, filters } = state.alerts;
  
  return alerts.filter(alert => {
    if (filters.severity !== 'all' && alert.severity !== filters.severity) return false;
    if (filters.acknowledged !== 'all') {
      const isAcknowledged = alert.acknowledged;
      if (filters.acknowledged === 'true' && !isAcknowledged) return false;
      if (filters.acknowledged === 'false' && isAcknowledged) return false;
    }
    if (filters.systemId !== 'all' && alert.systemId !== Number(filters.systemId)) return false;
    return true;
  });
};