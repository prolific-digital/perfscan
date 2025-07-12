import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  resetPassword: (email) => api.post('/auth/reset-password', { email }),
};

// Systems APIs
export const systemsAPI = {
  getAllSystems: () => api.get('/systems'),
  getSystemById: (id) => api.get(`/systems/${id}`),
  createSystem: (data) => api.post('/systems', data),
  updateSystem: (id, data) => api.put(`/systems/${id}`, data),
  deleteSystem: (id) => api.delete(`/systems/${id}`),
};

// Metrics APIs
export const metricsAPI = {
  getRealTimeMetrics: (systemId) => api.get(`/metrics/realtime/${systemId}`),
  getHistoricalMetrics: (systemId, params) => 
    api.get(`/metrics/historical/${systemId}`, { params }),
  getCapacityData: (systemId, params) => 
    api.get(`/metrics/capacity/${systemId}`, { params }),
};

// Alerts APIs
export const alertsAPI = {
  getAllAlerts: (params) => api.get('/alerts', { params }),
  acknowledgeAlert: (id, data) => api.put(`/alerts/${id}/acknowledge`, data),
  createAlert: (data) => api.post('/alerts', data),
  deleteAlert: (id) => api.delete(`/alerts/${id}`),
  getAlertRules: () => api.get('/alerts/rules'),
  updateAlertRule: (id, data) => api.put(`/alerts/rules/${id}`, data),
};

// Reports APIs
export const reportsAPI = {
  getSavedReports: () => api.get('/reports/saved'),
  getScheduledReports: () => api.get('/reports/scheduled'),
  generateReport: (data) => api.post('/reports/generate', data),
  saveReport: (data) => api.post('/reports/saved', data),
  scheduleReport: (data) => api.post('/reports/scheduled', data),
  deleteReport: (id) => api.delete(`/reports/saved/${id}`),
  getReportTemplates: () => api.get('/reports/templates'),
};

// Users APIs
export const usersAPI = {
  getCurrentUser: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
  updatePreferences: (data) => api.put('/users/me/preferences', data),
  getAllUsers: () => api.get('/users'),
  createUser: (data) => api.post('/users', data),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export default api;