import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../../services/baseApi';

export const fetchAsyncMachinePoolFaultingReports = createAsyncThunk("memoryReport/fetchAsyncMachinePoolFaultingReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/mpf?${query}`);
    return response.data;
});

export const fetchAsyncTotalFaultingRateReports = createAsyncThunk("memoryReport/fetchAsyncTotalFaultingRateReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/tf?${query}`);
    return response.data;
});

export const fetchAsyncTopPoolFaultingRateReports = createAsyncThunk("memoryReport/fetchAsyncTopPoolFaultingRateReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/tpf?${query}`);
    return response.data;
});

export const fetchAsyncMemorySizeVsFaultingReports = createAsyncThunk("memoryReport/fetchAsyncMemorySizeVsFaultingReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/mvf?${query}`);
    return response.data;
});

export const fetchAsyncSpecificPoolFaultingReports = createAsyncThunk("memoryReport/fetchAsyncSpecificPoolFaultingReports", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/fetch/spf?${query}`);
    return response.data;
});


const initialState = {
    machinepoolfaulting: {loading:false, data:[], error:''},
    totalfaultingrate: {loading:false, data:[], error:''},
    toppoolfaulting: {loading:false, data:[], error:''},
    memoryvsfaulting: {loading:false, data:[], error:''},
    specificpoolfaulting: {loading:false, data:[], error:''},
};

const memoryReportSlice = createSlice({
    name: 'memoryReport',
  initialState,
  reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncMachinePoolFaultingReports.pending, state => {
      state.machinepoolfaulting.loading = true;
    });
        builder.addCase(fetchAsyncMachinePoolFaultingReports.fulfilled, (state, action) => {
        state.machinepoolfaulting.loading = false;
        state.machinepoolfaulting.data = action.payload;
          state.machinepoolfaulting.error = '';
        });
    builder.addCase(fetchAsyncMachinePoolFaultingReports.rejected, (state, action) => {
      state.machinepoolfaulting.loading = false;
      state.machinepoolfaulting.data = [];
      state.machinepoolfaulting.error = action.error.message;
    });
        builder.addCase(fetchAsyncTotalFaultingRateReports.pending, state => {
      state.totalfaultingrate.loading = true;
    });
    builder.addCase(fetchAsyncTotalFaultingRateReports.fulfilled, (state, action) => {
      state.totalfaultingrate.loading = false;
      state.totalfaultingrate.data = action.payload;
            state.totalfaultingrate.error = '';
    });
    builder.addCase(fetchAsyncTotalFaultingRateReports.rejected, (state, action) => {
      state.totalfaultingrate.loading = false;
      state.totalfaultingrate.data = [];
      state.totalfaultingrate.error = action.error.message;
    });
    builder.addCase(fetchAsyncTopPoolFaultingRateReports.pending, (state) => {
      state.toppoolfaulting.loading = true;
    });
        builder.addCase(fetchAsyncTopPoolFaultingRateReports.fulfilled, (state, action) => {
        state.toppoolfaulting.loading = false;
        state.toppoolfaulting.data = action.payload;
            state.toppoolfaulting.error = '';
        });
    builder.addCase(fetchAsyncTopPoolFaultingRateReports.rejected, (state, action) => {
      state.toppoolfaulting.loading = false;
            state.toppoolfaulting.data = []
      state.toppoolfaulting.error = action.error.message;
    });
        builder.addCase(fetchAsyncMemorySizeVsFaultingReports.pending, state => {
      state.memoryvsfaulting.loading = true;
    });
        builder.addCase(fetchAsyncMemorySizeVsFaultingReports.fulfilled, (state, action) => {
        state.memoryvsfaulting.loading = false;
        state.memoryvsfaulting.data = action.payload;
            state.memoryvsfaulting.error = '';
        });
        builder.addCase(fetchAsyncMemorySizeVsFaultingReports.rejected, (state, action) => {
        state.memoryvsfaulting.loading = false;
        state.memoryvsfaulting.data = [];
        state.memoryvsfaulting.error = action.error.message;
        });
        builder.addCase(fetchAsyncSpecificPoolFaultingReports.pending, state => {
      state.specificpoolfaulting.loading = true;
    });
        builder.addCase(fetchAsyncSpecificPoolFaultingReports.fulfilled, (state, action) => {
        state.specificpoolfaulting.loading = false;
        state.specificpoolfaulting.data = action.payload;
            state.specificpoolfaulting.error = '';
        });
        builder.addCase(fetchAsyncSpecificPoolFaultingReports.rejected, (state, action) => {
        state.specificpoolfaulting.loading = false;
        state.specificpoolfaulting.data = [];
        state.specificpoolfaulting.error = action.error.message;
        });
  },
})

export const getMachinPoolFaultingDataReports = (state) => state.memoryReports.machinepoolfaulting;
export const getTotalFaultingRateDataReports = (state) => state.memoryReports.totalfaultingrate;
export const getTopPoolFaultingDataReports = (state) => state.memoryReports.toppoolfaulting;
export const getMemoryVsFaultingDataReports = (state) => state.memoryReports.memoryvsfaulting;
export const getSpecificPoolFaultingDataReports = (state) => state.memoryReports.specificpoolfaulting;
export default memoryReportSlice.reducer;
