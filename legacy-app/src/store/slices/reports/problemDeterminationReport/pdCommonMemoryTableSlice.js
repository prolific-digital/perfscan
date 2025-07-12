import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../../../services/baseApi";


export const fetchAsyncPdMemoryReportTableSlice = createAsyncThunk("pdcommemoryreport/fetchAsyncPdMemoryReportTableSlice", async (qd)=>{
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseApi.get(`api/fetch/problem_determination?${query}`);
    return response.data;
});

const initialState = {
    pdCommonMemoryData: {loading:true,data:[], error:''}
};

const pdCommonMemoryReportTableSlice = createSlice({
    name: 'pdcommemoryreport',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncPdMemoryReportTableSlice.pending, state => {
            state.pdCommonMemoryData.loading = true
        })
        builder.addCase(fetchAsyncPdMemoryReportTableSlice.fulfilled, (state, action) => {
            state.pdCommonMemoryData.loading = false
            state.pdCommonMemoryData.data = action.payload
            state.pdCommonMemoryData.error = ''
        })
        builder.addCase(fetchAsyncPdMemoryReportTableSlice.rejected, (state, action) => {
            state.pdCommonMemoryData.loading = false
            state.pdCommonMemoryData.data = []
            state.pdCommonMemoryData.error = action.error.message
        })
    }
})

export const getPdCommonMemoryReportTableData = (state) => state.pdcommemoryreport.pdCommonMemoryData;

export default pdCommonMemoryReportTableSlice.reducer;