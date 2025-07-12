import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../services/baseApi";

export const fetchAsyncPdMemoryTableSlice = createAsyncThunk("pdcommemory/fetchAsyncPdMemoryTableSlice", async (qd)=>{
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseApi.get(`api/pdm?${query}`);
    return response.data;
});

const initialState = {
    pdCommonMemoryData: {loading:true,data:[], error:''}
};

const pdCommonMemoryTableSlice = createSlice({
    name: 'pdcommemory',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncPdMemoryTableSlice.pending, state => {
            state.pdCommonMemoryData.loading = true
        })
        builder.addCase(fetchAsyncPdMemoryTableSlice.fulfilled, (state, action) => {
            state.pdCommonMemoryData.loading = false
            state.pdCommonMemoryData.data = action.payload
            state.pdCommonMemoryData.error = ''
        })
        builder.addCase(fetchAsyncPdMemoryTableSlice.rejected, (state, action) => {
            state.pdCommonMemoryData.loading = false
            state.pdCommonMemoryData.data = []
            state.pdCommonMemoryData.error = action.error.message
        })
    }
})

export const getPdCommonMemoryTableData = (state) => state.pdcommemory.pdCommonMemoryData;

export default pdCommonMemoryTableSlice.reducer;