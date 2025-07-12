// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import baseApi from "../../services/baseApi";

// export const fetchAsyncPdMemoryTableSlice = createAsyncThunk("pdcomonmem/fetchAsyncPdMemoryTableSlice", async (sysid)=>{
//     // const searchParams = new URLSearchParams(qd);
//     // let query = searchParams.toString();
//     const response = await baseApi.get(`api/pdm?&sysid=${sysid}`);
//     return response.data;
// });

// const initialState = {
//     pdcommonmemory: {loading:true,data:[], error:''}
// };

// const pdMemoryTableSlice = createSlice({
//     name: 'pdCommonMemoryData',
//     initialState,
//     reducers: {},
//     extraReducers: builder => {
//         builder.addCase(fetchAsyncPdMemoryTableSlice.pending, state => {
//             state.pdcommonmemory.loading = true
//         })
//         builder.addCase(fetchAsyncPdMemoryTableSlice.fulfilled, (state, action) => {
//             state.pdcommonmemory.loading = false
//             state.pdcommonmemory.data = action.payload
//             state.pdcommonmemory.error = ''
//         })
//         builder.addCase(fetchAsyncPdMemoryTableSlice.rejected, (state, action) => {
//             state.pdcommonmemory.loading = false
//             state.pdcommonmemory.data = []
//             state.pdcommonmemory.error = action.error
//         })
//     }
// })

// export const getPdCommonMemoryTableData = (state) => state.pdcomonmem.pdcommonmemory;

// export default pdMemoryTableSlice.reducer;