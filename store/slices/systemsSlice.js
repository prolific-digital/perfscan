import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  systems: [],
  selectedSystem: null,
  loading: false,
  error: null,
  filters: {
    status: 'all',
    health: 'all',
    location: 'all',
  },
};

const systemsSlice = createSlice({
  name: 'systems',
  initialState,
  reducers: {
    fetchSystemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSystemsSuccess: (state, action) => {
      state.loading = false;
      state.systems = action.payload;
      state.error = null;
    },
    fetchSystemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectSystem: (state, action) => {
      state.selectedSystem = action.payload;
    },
    updateSystemStatus: (state, action) => {
      const { systemId, status } = action.payload;
      const system = state.systems.find(s => s.id === systemId);
      if (system) {
        system.status = status;
      }
    },
    updateSystemHealth: (state, action) => {
      const { systemId, health } = action.payload;
      const system = state.systems.find(s => s.id === systemId);
      if (system) {
        system.health = health;
      }
    },
    setSystemFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetSystemFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  fetchSystemsStart,
  fetchSystemsSuccess,
  fetchSystemsFailure,
  selectSystem,
  updateSystemStatus,
  updateSystemHealth,
  setSystemFilter,
  resetSystemFilters,
} = systemsSlice.actions;

export default systemsSlice.reducer;

// Selectors
export const selectAllSystems = (state) => state.systems.systems;
export const selectSelectedSystem = (state) => state.systems.selectedSystem;
export const selectSystemsLoading = (state) => state.systems.loading;
export const selectSystemsError = (state) => state.systems.error;
export const selectSystemFilters = (state) => state.systems.filters;

// Filtered systems selector
export const selectFilteredSystems = (state) => {
  const { systems, filters } = state.systems;
  
  return systems.filter(system => {
    if (filters.status !== 'all' && system.status !== filters.status) return false;
    if (filters.health !== 'all' && system.health !== filters.health) return false;
    if (filters.location !== 'all' && system.location !== filters.location) return false;
    return true;
  });
};