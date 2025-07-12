import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchAsyncETypes = createAsyncThunk("managesystem/fetchAsyncETypes", async () => {
    const response = await baseAPI.get(`api/etypes`);
    return response.data;
});

export const fetchAsyncSpecificETypes = createAsyncThunk("managesystem/fetchAsyncSpecificETypes", async (id) => {
    const response = await baseAPI.get(`api/etypes/${id}`);
    return response.data;
});

export const addEntity = createAsyncThunk("managesystem/addEntity", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.post(`api/entity?${query}`);
    return response.data;
});

const initialState = {
    etypes: { loading: false, data: [], error: '' },
    specificetypes: { loading: false, data: [], error: '' },
    entityData: { loading: false, data: [], error: '' },
};

const manageSystemSlice = createSlice({
    name: 'managesystem',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncETypes.pending, state => {
            state.etypes.loading = true
        })
        builder.addCase(fetchAsyncETypes.fulfilled, (state, action) => {
            state.etypes.loading = false
            state.etypes.data = action.payload
            state.etypes.error = ''
        })
        builder.addCase(fetchAsyncETypes.rejected, (state, action) => {
            state.etypes.loading = false
            state.etypes.data = []
            state.etypes.error = action.error.message
        })
        builder.addCase(fetchAsyncSpecificETypes.pending, state => {
            state.specificetypes.loading = true
        })
        builder.addCase(fetchAsyncSpecificETypes.fulfilled, (state, action) => {
            state.specificetypes.loading = false
            state.specificetypes.data = action.payload
            state.specificetypes.error = ''
        })
        builder.addCase(fetchAsyncSpecificETypes.rejected, (state, action) => {
            state.specificetypes.loading = false
            state.specificetypes.data = []
            state.specificetypes.error = action.error.message
        })
        builder.addCase(addEntity.pending, state => {
            state.entityData.loading = true
        })
        builder.addCase(addEntity.fulfilled, (state, action) => {
            state.entityData.loading = false
            state.entityData.data = action.payload
            state.entityData.error = ''
        })
        builder.addCase(addEntity.rejected, (state, action) => {
            state.entityData.loading = false
            state.entityData.data = []
            state.entityData.error = action.error.message
        })
    },
})

export const getEntityTypesData = (state) => state.managesystem.etypes;
export const getSpecificEntityTypesData = (state) => state.managesystem.specificetypes;
export const postEntityData = (state) => state.managesystem.entityData;

export default manageSystemSlice.reducer;