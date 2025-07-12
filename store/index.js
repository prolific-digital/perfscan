import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import systemsReducer from './slices/systemsSlice';
import metricsReducer from './slices/metricsSlice';
import alertsReducer from './slices/alertsSlice';
import reportsReducer from './slices/reportsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    systems: systemsReducer,
    metrics: metricsReducer,
    alerts: alertsReducer,
    reports: reportsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['metrics/updateRealtime'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['metrics.lastUpdate'],
      },
    }),
});

export default store;