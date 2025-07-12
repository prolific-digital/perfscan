import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  theme: 'light',
  notifications: [],
  activeTab: 'historical-data',
  loading: {
    global: false,
    components: {},
  },
  modals: {
    alertDetails: { open: false, data: null },
    systemDetails: { open: false, data: null },
    reportGeneration: { open: false, data: null },
    settings: { open: false },
  },
  toast: {
    show: false,
    message: '',
    type: 'info',
    duration: 5000,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setComponentLoading: (state, action) => {
      const { component, loading } = action.payload;
      state.loading.components[component] = loading;
    },
    openModal: (state, action) => {
      const { modal, data } = action.payload;
      state.modals[modal] = { open: true, data: data || null };
    },
    closeModal: (state, action) => {
      const modal = action.payload;
      state.modals[modal] = { open: false, data: null };
    },
    showToast: (state, action) => {
      const { message, type = 'info', duration = 5000 } = action.payload;
      state.toast = { show: true, message, type, duration };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  setActiveTab,
  setGlobalLoading,
  setComponentLoading,
  openModal,
  closeModal,
  showToast,
  hideToast,
  addNotification,
  removeNotification,
  clearAllNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;

// Selectors
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectTheme = (state) => state.ui.theme;
export const selectActiveTab = (state) => state.ui.activeTab;
export const selectGlobalLoading = (state) => state.ui.loading.global;
export const selectComponentLoading = (state, component) => 
  state.ui.loading.components[component] || false;
export const selectModal = (state, modal) => state.ui.modals[modal];
export const selectToast = (state) => state.ui.toast;
export const selectNotifications = (state) => state.ui.notifications;