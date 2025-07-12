import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchIBMSystems = createAsyncThunk("ibmMdoals/fetchmodals", async () => {
    const response = await baseAPI.get(`/api/ibmModal`);
    return response.data;
});

export const createIBMSystems = createAsyncThunk("ibmMdoals/createmodals", async (qd) => {
    const response = await baseAPI.post(`/api/ibmModal`, qd);
    return response.data;
});

export const updateIBMSystems = createAsyncThunk("ibmMdoals/updatemodals", async (id) => {
    const response = await baseAPI.put(`/api/ibmModal/${id}`);
    return response.data;
});

export const deleteIBMSystems = createAsyncThunk("ibmMdoals/deleltemodals", async ({id}) => {
    const response = await baseAPI.delete(`/api/ibmModal/${id}`);
    return response.data;
});
const initialState = {    
    ibmSystemsData: { loading: false, data: [], error: '' }
};

const ibmModalsSlice = createSlice({
    name: 'ibmModals',
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
    },
})

export const getIBMModals = (state) => state.ibmModals.ibmSystemsData;

{/* ToDo -- Update actions
export const {
    setIsEditing
} = ibmModalsSlice.actions;
*/}
export default ibmModalsSlice.reducer;