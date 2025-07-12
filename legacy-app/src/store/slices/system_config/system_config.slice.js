import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';
import { da } from "date-fns/locale";

export const fetchIBMSystems = createAsyncThunk("sysConfig/fetchmodals", async () => {
    const response = await baseAPI.get(`/api/ibmModal`);
    return response.data;
});

export const fetchIBMSystem = createAsyncThunk("sysConfig/fetchmodal", async (id) => {
    const response = await baseAPI.get(`/api/ibmModal/${id}`);
    return response.data;
});

export const createIBMSystems = createAsyncThunk("sysConfig/createmodals", async (qd) => {
    const response = await baseAPI.post(`/api/ibmModal`, qd);
    return response.data;
});

export const updateIBMSystems = createAsyncThunk("sysConfig/updatemodals", async (qd) => {
    const data = JSON.parse(qd);
    const response = await baseAPI.put(`/api/ibmModal/${data.model_config_id}`, qd);
    return response.data;
});

export const deleteIBMSystems = createAsyncThunk("sysConfig/deleltemodals", async (id) => {
    const response = await baseAPI.delete(`/api/ibmModal/${id}`);
    return response.data;
});
const initialState = {    
    ibmSystemsData: { loading: false, data: [], error: '' },
    ibmSystemData: { loading:false, data:[], error: ''},
    updateSystemData : {loading:false, data:[], error: ''},
    createSystemData : {loading: false, data:[], error: ''},
    deleteSystemsData : {loading: false, data:[], error: ''}
};

const sysConfigSlice = createSlice({
    name: 'sysConfig',
    initialState,
    reducers: {
        setIsEditing: (state, { payload }) => {
            state.cur_template = payload;
        },
    },
    extraReducers: builder => {
       
        builder.addCase(fetchIBMSystems.pending, state => {
            state.ibmSystemsData.loading = true
        })
        builder.addCase(fetchIBMSystems.fulfilled, (state, action) => {
            state.ibmSystemsData.loading = false
            state.ibmSystemsData.data = action.payload
            state.ibmSystemsData.error = ''
        })
        builder.addCase(fetchIBMSystems.rejected, (state, action) => {
            state.ibmSystemsData.loading = false
            state.ibmSystemsData.data = []
            state.ibmSystemsData.error = action.error.message
        })
        builder.addCase(fetchIBMSystem.pending, state => {
            state.ibmSystemData.loading = true
        })
        builder.addCase(fetchIBMSystem.fulfilled, (state, action) => {
            state.ibmSystemData.loading = false
            state.ibmSystemData.data = action.payload
            state.ibmSystemData.error = ''
        })
        builder.addCase(fetchIBMSystem.rejected, (state, action) => {
            state.ibmSystemData.loading = false
            state.ibmSystemData.data = []
            state.ibmSystemData.error = action.error.message
        })
        builder.addCase(updateIBMSystems.pending, state => {
            state.updateSystemData.loading = true
        })
        builder.addCase(updateIBMSystems.fulfilled, (state, action) => {
            state.updateSystemData.loading = false
            state.updateSystemData.data = action.payload
            state.updateSystemData.error = ''
        })
        builder.addCase(updateIBMSystems.rejected, (state, action) => {
            state.updateSystemData.loading = false
            state.updateSystemData.data = []
            state.updateSystemData.error = action.error.message
        })
        builder.addCase(createIBMSystems.pending, state => {
            state.createSystemData.loading = true
        })
        builder.addCase(createIBMSystems.fulfilled, (state, action) => {
            state.createSystemData.loading = false
            state.createSystemData.data = action.payload
            state.createSystemData.error = ''
        })
        builder.addCase(createIBMSystems.rejected, (state, action) => {
            state.createSystemData.loading = false
            state.createSystemData.data = []
            state.createSystemData.error = action.error.message
        })
        builder.addCase(deleteIBMSystems.pending, state => {
            state.deleteSystemsData.loading = true
        })
        builder.addCase(deleteIBMSystems.fulfilled, (state, action) => {
            state.deleteSystemsData.loading = false
            state.deleteSystemsData.data = action.payload
            state.deleteSystemsData.error = ''
        })
        builder.addCase(deleteIBMSystems.rejected, (state, action) => {
            state.deleteSystemsData.loading = false
            state.deleteSystemsData.data = []
            state.deleteSystemsData.error = action.error.message
        })
    },
})
//console.log("state is", state);

export const getIBMModals = (state) => state.sysConfig.ibmSystemsData;
export const getIBMModal = (state) => state.sysConfig.ibmSystemData;
export const getUpdateData = (state) => state.sysConfig.updateSystemData;
export const getCreateData = (state) => state.sysConfig.createSystemData;
export const getDeleteData = (state) => state.sysConfig.deleteSystemsData;

{/* ToDo -- Update actions
export const {
    setIsEditing
} = ibmModalsSlice.actions;
*/}
export default sysConfigSlice.reducer;