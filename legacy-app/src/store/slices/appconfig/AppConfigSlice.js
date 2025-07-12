import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';


export const fetchAsyncCPConfig = createAsyncThunk("appconfig/fetchAsyncCPConfig", async(qd) => {
    const response = await baseAPI.get(`/api/appconfig/cp`);
    return response.data;
});

export const fetchAsyncGlobalConfig = createAsyncThunk("appconfig/fetchAsyncGlobalConfig", async(qd) => {
  const response = await baseAPI.get(`/api/appconfig/global`);
  return response.data;
});

export const updateCPConfig = createAsyncThunk("appconfig/updateCPConfig", async({ id, qd }) => {
  const response = await baseAPI.post(`/api/appconfig/${id}`, qd);
  return response.data;
});

export const updateGlobalConfig = createAsyncThunk("appconfig/updateGlobalConfig", async({ id, qd }) => {
  const response = await baseAPI.post(`/api/appconfig/${id}`, qd);
  return response.data;
});

const initialState = {
    cpConfig : {loading:false, data:[], error:''},
    globalConfig:{loading:false, data:[], error:''},
    updConfig : {loading:false, data:[], error: ''},
    updGlobalConfig : {loading:false, data:[], error: ''}
}
const AppConfigSlice = createSlice({
    name: 'appConfig',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder.addCase(fetchAsyncCPConfig.pending, state => {
        state.cpConfig.loading = true
      })
      builder.addCase(fetchAsyncCPConfig.fulfilled, (state, action) => {
        state.cpConfig.loading = false
        state.cpConfig.data = action.payload
        state.cpConfig.error = ''
      })
      builder.addCase(fetchAsyncCPConfig.rejected, (state, action) => {
        state.cpConfig.loading = false
        state.cpConfig.data = []
        state.cpConfig.error = action.error.message
      })
      builder.addCase(fetchAsyncGlobalConfig.pending, state => {
        state.globalConfig.loading = true
      })
      builder.addCase(fetchAsyncGlobalConfig.fulfilled, (state, action) => {
        state.globalConfig.loading = false
        state.globalConfig.data = action.payload
        state.globalConfig.error = ''
      })
      builder.addCase(fetchAsyncGlobalConfig.rejected, (state, action) => {
        state.globalConfig.loading = false
        state.globalConfig.data = []
        state.globalConfig.error = action.error.message
      })
      builder.addCase(updateCPConfig.pending, state => {
        state.updConfig.loading = true
      })
      builder.addCase(updateCPConfig.fulfilled, (state, action) => {
        state.updConfig.loading = false
        state.updConfig.data = action.payload
        state.updConfig.error = ''
      })
      builder.addCase(updateCPConfig.rejected, (state, action) => {
        state.updConfig.loading = false
        state.updConfig.data = []
        state.updConfig.error = action.error.message
      })
      builder.addCase(updateGlobalConfig.pending, state => {
        state.updGlobalConfig.loading = true
      })
      builder.addCase(updateGlobalConfig.fulfilled, (state, action) => {
        state.updGlobalConfig.loading = false
        state.updGlobalConfig.data = action.payload
        state.updGlobalConfig.error = ''
      })
      builder.addCase(updateGlobalConfig.rejected, (state, action) => {
        state.updGlobalConfig.loading = false
        state.updGlobalConfig.data = []
        state.updGlobalConfig.error = action.error.message
      })
    }
})

export const getCapacityConfig = (state) => state.appConfig.cpConfig;
export const getGlobalConfig = (state) => state.appConfig.globalConfig;
export const updateConfig = (state) => state.appConfig.updConfig;
export const updateGlobalConfigData = (state) => state.appConfig.updGlobalConfig;

export default AppConfigSlice.reducer;