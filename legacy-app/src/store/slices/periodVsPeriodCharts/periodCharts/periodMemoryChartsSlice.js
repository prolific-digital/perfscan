import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from "../../../../services/baseApi";

export const fetchAsyncPeriodMachinePoolFaulting = createAsyncThunk("periodMemoryCharts/fetchAsyncPeriodMachinePoolFaulting", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/mcf/graph?`,pqd);
    return response.data;
});

export const fetchAsyncPeriodTotalFaultingRate = createAsyncThunk("periodMemoryCharts/fetchAsyncPeriodTotalFaultingRate", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/totalfaulting/graph?`,pqd);
    return response.data;
});

export const fetchAsyncPeriodTopPoolFaultingRate = createAsyncThunk("periodMemoryCharts/fetchAsyncPeriodTopPoolFaultingRate", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/tpfdata/graph?`,pqd);
    return response.data;
});

export const fetchAsyncPeriodMemorySizeVsFaulting = createAsyncThunk("periodMemoryCharts/fetchAsyncPeriodMemorySizeVsFaulting", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/mvf/graph?`,pqd);
    return response.data;
});

export const fetchAsyncPeriodSpecificPoolFaulting = createAsyncThunk("periodMemoryCharts/fetchAsyncPeriodSpecificPoolFaulting", async(pqd) => {
    const response = await baseAPI.post(`api/periodVSperiod/spfdata/graph?`,pqd);
    return response.data;
});

const initialState = {
    periodMachinePoolFaulting: {loading:false, data:[], error:''},
    periodTotalFaultingRate: {loading:false, data:[], error:''},
    periodTopPoolFaulting: {loading:false, data:[], error:''},
    periodMemoryVsFaulting: {loading:false, data:[], error:''},
    periodSpecificPoolFaulting: {loading:false, data:[], error:''},
};

const periodMemorySlice = createSlice({ 
    name: 'periodMemoryCharts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncPeriodMachinePoolFaulting.pending, state => {
          state.periodMachinePoolFaulting.loading = true
        })
        builder.addCase(fetchAsyncPeriodMachinePoolFaulting.fulfilled, (state, action) => {
          state.periodMachinePoolFaulting.loading = false
          state.periodMachinePoolFaulting.data = action.payload
          state.periodMachinePoolFaulting.error = ''
        })
        builder.addCase(fetchAsyncPeriodMachinePoolFaulting.rejected, (state, action) => {
          state.periodMachinePoolFaulting.loading = false
          state.periodMachinePoolFaulting.data = []
          state.periodMachinePoolFaulting.error = action.error.message
        })

        builder.addCase(fetchAsyncPeriodTotalFaultingRate.pending, state => {
            state.periodTotalFaultingRate.loading = true
        })
        builder.addCase(fetchAsyncPeriodTotalFaultingRate.fulfilled, (state, action) => {
            state.periodTotalFaultingRate.loading = false
            state.periodTotalFaultingRate.data = action.payload
            state.periodTotalFaultingRate.error = ''
        })
        builder.addCase(fetchAsyncPeriodTotalFaultingRate.rejected, (state, action) => {
            state.periodTotalFaultingRate.loading = false
            state.periodTotalFaultingRate.data = []
            state.periodTotalFaultingRate.error = action.error.message
        })

        builder.addCase(fetchAsyncPeriodTopPoolFaultingRate.pending, state => {
            state.periodTopPoolFaulting.loading = true
        })
        builder.addCase(fetchAsyncPeriodTopPoolFaultingRate.fulfilled, (state, action) => {
            state.periodTopPoolFaulting.loading = false
            state.periodTopPoolFaulting.data = action.payload
            state.periodTopPoolFaulting.error = ''
        })
        builder.addCase(fetchAsyncPeriodTopPoolFaultingRate.rejected, (state, action) => {
            state.periodTopPoolFaulting.loading = false
            state.periodTopPoolFaulting.data = []
            state.periodTopPoolFaulting.error = action.error.message
        })

        builder.addCase(fetchAsyncPeriodMemorySizeVsFaulting.pending, state => {
            state.periodMemoryVsFaulting.loading = true
        })
        builder.addCase(fetchAsyncPeriodMemorySizeVsFaulting.fulfilled, (state, action) => {
            state.periodMemoryVsFaulting.loading = false
            state.periodMemoryVsFaulting.data = action.payload
            state.periodMemoryVsFaulting.error = ''
        })
        builder.addCase(fetchAsyncPeriodMemorySizeVsFaulting.rejected, (state, action) => {
            state.periodMemoryVsFaulting.loading = false
            state.periodMemoryVsFaulting.data = []
            state.periodMemoryVsFaulting.error = action.error.message
        })

        builder.addCase(fetchAsyncPeriodSpecificPoolFaulting.pending, state => {
            state.periodSpecificPoolFaulting.loading = true
        })
        builder.addCase(fetchAsyncPeriodSpecificPoolFaulting.fulfilled, (state, action) => {
            state.periodSpecificPoolFaulting.loading = false
            state.periodSpecificPoolFaulting.data = action.payload
            state.periodSpecificPoolFaulting.error = ''
        })
        builder.addCase(fetchAsyncPeriodSpecificPoolFaulting.rejected, (state, action) => {
            state.periodSpecificPoolFaulting.loading = false
            state.periodSpecificPoolFaulting.data = []
            state.periodSpecificPoolFaulting.error = action.error.message
        })
    },
})

export const getPeriodMachinPoolFaultingData = (state) => state.periodMemoryCharts.periodMachinePoolFaulting;
export const getPeriodTotalFaultingRateData = (state) => state.periodMemoryCharts.periodTotalFaultingRate;
export const getTopPoolFaultingData = (state) => state.periodMemoryCharts.periodTopPoolFaulting;
export const getMemoryVsFaultingData = (state) => state.periodMemoryCharts.periodMemoryVsFaulting;
export const getSpecificPoolFaultingData = (state) => state.periodMemoryCharts.periodSpecificPoolFaulting;


export default periodMemorySlice.reducer;




