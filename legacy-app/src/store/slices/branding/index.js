import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

const initialState = {
  brandingData : {loading:false, data:[], error:''},
  brandConfig : {loading:false, data:[], error:''},
  setBrandConfig : {loading:false, data:[], error:''},
  delLogo : {loading:false, data:[], error:''},
  templateData: { loading: false, data: [], error: '' },
  template : {isEditing: false, id: 0},
};

export const fetchAsyncLogos = createAsyncThunk("branding/fetchAsyncLogos", async(userID = 1) => {
    const response = await baseAPI.get(`api/${userID}/logo/files/`);
    return response.data;
});

export const fetchAsyncConfig = createAsyncThunk("branding/fetchAsyncConfig", async(templateID = 1) => {
  const response = await baseAPI.get(`api/getAppConfig?templateid=${templateID}`);
  return response.data;
});

export const saveAsyncConfig = createAsyncThunk("branding/saveAsyncConfig", async(configdata) => {
  const response = await baseAPI.post(`api/setappconfig`,configdata);
  return response.data;
});

export const deleteAsyncLogo = createAsyncThunk("branding/deleteAsyncLogo", async({userID = 1, sellogo}) => {
        const response = await baseAPI.delete(`api/files/${userID}/logo/${sellogo}`);
        return response.data;
});

export const fetchTemplates = createAsyncThunk("scheduler/fetchTemplates", async ({userId=1, reportType='historical data'}) => {
        const response = await baseAPI.get(`/api/scheduler/report/templates/${userId}/${reportType}`);
        return response.data;
});

const brandingSlice = createSlice({
  name: 'branding',
  initialState,
  reducers: {},
  extraReducers : builder => {
    builder.addCase(fetchAsyncLogos.pending, state => {
        state.brandingData.loading = true
    })
    builder.addCase(fetchAsyncLogos.fulfilled, (state, action) => {
            state.brandingData.loading = false
            state.brandingData.data = action.payload
            state.brandingData.error = ''
    })
    builder.addCase(fetchAsyncLogos.rejected, (state, action) => {
            state.brandingData.loading = false
            state.brandingData.data = []
            state.brandingData.error = action.error.message
    })
    builder.addCase(fetchAsyncConfig.pending, state => {
      state.brandConfig.loading = true
    })
    builder.addCase(fetchAsyncConfig.fulfilled, (state, action) => {
            state.brandConfig.loading = false
            state.brandConfig.data = action.payload
            state.brandConfig.error = ''
    })
    builder.addCase(fetchAsyncConfig.rejected, (state, action) => {
            state.brandConfig.loading = false
            state.brandConfig.data = []
            state.brandConfig.error = action.error.message
    })
    builder.addCase(saveAsyncConfig.pending, state => {
        state.setBrandConfig.loading = true
    })
    builder.addCase(saveAsyncConfig.fulfilled, (state, action) => {
            state.setBrandConfig.loading = false
            state.setBrandConfig.data = action.payload
            state.setBrandConfig.error = ''
    })
    builder.addCase(saveAsyncConfig.rejected, (state, action) => {
            state.setBrandConfig.loading = false
            state.setBrandConfig.data = []
            state.setBrandConfig.error = action.error.message
    })
    builder.addCase(deleteAsyncLogo.pending, state => {
        state.delLogo.loading = true
    })
    builder.addCase(deleteAsyncLogo.fulfilled, (state, action) => {
            state.delLogo.loading = false
            state.delLogo.data = action.payload
            state.delLogo.error = ''
    })
    builder.addCase(deleteAsyncLogo.rejected, (state, action) => {
            state.delLogo.loading = false
            state.delLogo.data = []
            state.delLogo.error = action.error.message
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
}
});


export const getBrandingData = (state) => state.branding.brandingData;
export const getBrandConfigData = (state) => state.branding.brandConfig;
export const setBrandConfigData = (state) => state.branding.setBrandConfig; 
export const delLogoData = (state) => state.branding.delLogo;
export const getTemplates = (state) => state.branding.templateData;

export default brandingSlice.reducer;