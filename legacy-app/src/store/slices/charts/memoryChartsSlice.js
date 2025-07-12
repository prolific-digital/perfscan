import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchAsyncMachinePoolFaulting = createAsyncThunk("memory/fetchAsyncMachinePoolFaulting", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/mpfdata?${query}`);
    return response.data;
});

export const fetchAsyncMachinePoolFaultingWhatsChanged = createAsyncThunk("memory/fetchAsyncMachinePoolFaultingWhatsChanged", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/mpfdata/whatschanged?${query}`);
    return response.data;
});

export const fetchAsyncTotalFaultingRate = createAsyncThunk("memory/fetchAsyncTotalFaultingRate", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/frdata?${query}`);
    return response.data;
});

export const fetchAsyncTotalFaultingRateWhatsChanged = createAsyncThunk("memory/fetchAsyncTotalFaultingRateWhatsChanged", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/frdata/whatschanged?${query}`);
    return response.data;
});

export const fetchAsyncTopPoolFaultingRate = createAsyncThunk("memory/fetchAsyncTopPoolFaultingRate", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/tpfrdata?${query}`);
    return response.data;
});

export const fetchAsyncTopPoolFaultingRateWhatsChanged = createAsyncThunk("memory/fetchAsyncTopPoolFaultingRateWhatsChanged", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/tpfrdata/whatschanged?${query}`);
    return response.data;
});

export const fetchAsyncMemorySizeVsFaulting = createAsyncThunk("memory/fetchAsyncMemorySizeVsFaulting", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/mvfdata?${query}`);
    return response.data;
});

export const fetchAsyncMemorySizeVsFaultingWhatsChanged = createAsyncThunk("memory/fetchAsyncMemorySizeVsFaultingWhatsChanged", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/mvfdata/whatschanged?${query}`);
    return response.data;
});

export const fetchAsyncSpecificPoolFaulting = createAsyncThunk("memory/fetchAsyncSpecificPoolFaulting", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/spfdata?${query}`);
    return response.data;
});

export const fetchAsyncSpecificPoolFaultingWhatsChanged = createAsyncThunk("memory/fetchAsyncSpecificPoolFaultingWhatsChanged", async (qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/spfdata/whatschanged?${query}`);
    return response.data;
});

const initialState = {
    machinepoolfaulting: {loading:false, data:[], error:''},
    totalfaultingrate: {loading:false, data:[], error:''},
    toppoolfaulting: {loading:false, data:[], error:''},
    memoryvsfaulting: {loading:false, data:[], error:''},
    specificpoolfaulting: {loading:false, data:[], error:''},
  machinepoolfaultingWC: { loading: false, data: [], error: "" },
  totalfaultingrateWC: { loading: false, data: [], error: "" },
  toppoolfaultingWC: { loading: false, data: [], error: "" },
  memoryvsfaultingWC: { loading: false, data: [], error: "" },
  specificpoolfaultingWC: { loading: false, data: [], error: "" },
};

const memorySlice = createSlice({
    name: 'memory',
  initialState,
  reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncMachinePoolFaulting.pending, state => {
      state.machinepoolfaulting.loading = true;
    });
        builder.addCase(fetchAsyncMachinePoolFaulting.fulfilled, (state, action) => {
        state.machinepoolfaulting.loading = false;
        state.machinepoolfaulting.data = action.payload;
          state.machinepoolfaulting.error = '';
        });
    builder.addCase(fetchAsyncMachinePoolFaulting.rejected, (state, action) => {
      state.machinepoolfaulting.loading = false;
      state.machinepoolfaulting.data = [];
      state.machinepoolfaulting.error = action.error.message;
    });
        builder.addCase(fetchAsyncMachinePoolFaultingWhatsChanged.pending, state => {
        state.machinepoolfaultingWC.loading = true;
        });
        builder.addCase(fetchAsyncMachinePoolFaultingWhatsChanged.fulfilled, (state, action) => {
        state.machinepoolfaultingWC.loading = false;
        state.machinepoolfaultingWC.data = action.payload;
        state.machinepoolfaultingWC.error = "";
        });
        builder.addCase(fetchAsyncMachinePoolFaultingWhatsChanged.rejected, (state, action) => {
        state.machinepoolfaultingWC.loading = false;
        state.machinepoolfaultingWC.data = [];
        state.machinepoolfaultingWC.error = action.error.message;
        });
        builder.addCase(fetchAsyncTotalFaultingRate.pending, state => {
      state.totalfaultingrate.loading = true;
    });
    builder.addCase(fetchAsyncTotalFaultingRate.fulfilled, (state, action) => {
      state.totalfaultingrate.loading = false;
      state.totalfaultingrate.data = action.payload;
            state.totalfaultingrate.error = '';
    });
    builder.addCase(fetchAsyncTotalFaultingRate.rejected, (state, action) => {
      state.totalfaultingrate.loading = false;
      state.totalfaultingrate.data = [];
      state.totalfaultingrate.error = action.error.message;
    });
        builder.addCase(fetchAsyncTotalFaultingRateWhatsChanged.pending, state => {
        state.totalfaultingrateWC.loading = true;
        });
        builder.addCase(fetchAsyncTotalFaultingRateWhatsChanged.fulfilled, (state, action) => {
        state.totalfaultingrateWC.loading = false;
        state.totalfaultingrateWC.data = action.payload;
        state.totalfaultingrateWC.error = "";
        });
        builder.addCase(fetchAsyncTotalFaultingRateWhatsChanged.rejected, (state, action) => {
        state.totalfaultingrateWC.loading = false;
        state.totalfaultingrateWC.data = [];
        state.totalfaultingrateWC.error = action.error.message;
        });
    builder.addCase(fetchAsyncTopPoolFaultingRate.pending, (state) => {
      state.toppoolfaulting.loading = true;
    });
        builder.addCase(fetchAsyncTopPoolFaultingRate.fulfilled, (state, action) => {
        state.toppoolfaulting.loading = false;
        state.toppoolfaulting.data = action.payload;
            state.toppoolfaulting.error = '';
        });
    builder.addCase(fetchAsyncTopPoolFaultingRate.rejected, (state, action) => {
      state.toppoolfaulting.loading = false;
            state.toppoolfaulting.data = []
      state.toppoolfaulting.error = action.error.message;
    });
        builder.addCase(fetchAsyncTopPoolFaultingRateWhatsChanged.pending,(state) => {
        state.toppoolfaultingWC.loading = true;
        });
        builder.addCase(fetchAsyncTopPoolFaultingRateWhatsChanged.fulfilled, (state, action) => {
        state.toppoolfaultingWC.loading = false;
        state.toppoolfaultingWC.data = action.payload;
        state.toppoolfaultingWC.error = "";
        });
        builder.addCase(fetchAsyncTopPoolFaultingRateWhatsChanged.rejected, (state, action) => {
        state.toppoolfaultingWC.loading = false;
        state.toppoolfaultingWC.data = [];
        state.toppoolfaultingWC.error = action.error.message;
        });
        builder.addCase(fetchAsyncMemorySizeVsFaulting.pending, state => {
      state.memoryvsfaulting.loading = true;
    });
        builder.addCase(fetchAsyncMemorySizeVsFaulting.fulfilled, (state, action) => {
        state.memoryvsfaulting.loading = false;
        state.memoryvsfaulting.data = action.payload;
            state.memoryvsfaulting.error = '';
        });
        builder.addCase(fetchAsyncMemorySizeVsFaulting.rejected, (state, action) => {
        state.memoryvsfaulting.loading = false;
        state.memoryvsfaulting.data = [];
        state.memoryvsfaulting.error = action.error.message;
        });
        builder.addCase(fetchAsyncMemorySizeVsFaultingWhatsChanged.pending, state => {
        state.memoryvsfaultingWC.loading = true;
        });
        builder.addCase(fetchAsyncMemorySizeVsFaultingWhatsChanged.fulfilled, (state, action) => {
        state.memoryvsfaultingWC.loading = false;
        state.memoryvsfaultingWC.data = action.payload;
        state.memoryvsfaultingWC.error = "";
        });
        builder.addCase(fetchAsyncMemorySizeVsFaultingWhatsChanged.rejected, (state, action) => {
        state.memoryvsfaultingWC.loading = false;
        state.memoryvsfaultingWC.data = [];
        state.memoryvsfaultingWC.error = action.error.message;
        });
        builder.addCase(fetchAsyncSpecificPoolFaulting.pending, state => {
      state.specificpoolfaulting.loading = true;
    });
        builder.addCase(fetchAsyncSpecificPoolFaulting.fulfilled, (state, action) => {
        state.specificpoolfaulting.loading = false;
        state.specificpoolfaulting.data = action.payload;
            state.specificpoolfaulting.error = '';
        });
        builder.addCase(fetchAsyncSpecificPoolFaulting.rejected, (state, action) => {
        state.specificpoolfaulting.loading = false;
        state.specificpoolfaulting.data = [];
        state.specificpoolfaulting.error = action.error.message;
        });
        builder.addCase(fetchAsyncSpecificPoolFaultingWhatsChanged.pending, (state) => {
        state.specificpoolfaultingWC.loading = true;
        });
        builder.addCase(fetchAsyncSpecificPoolFaultingWhatsChanged.fulfilled, (state, action) => {
        state.specificpoolfaultingWC.loading = false;
        state.specificpoolfaultingWC.data = action.payload;
        state.specificpoolfaultingWC.error = "";
        });
        builder.addCase(fetchAsyncSpecificPoolFaultingWhatsChanged.rejected, (state, action) => {
        state.specificpoolfaultingWC.loading = false;
        state.specificpoolfaultingWC.data = [];
        state.specificpoolfaultingWC.error = action.error.message;
        });
  },
})

export const getMachinPoolFaultingData = (state) => state.memory.machinepoolfaulting;
export const getTotalFaultingRateData = (state) => state.memory.totalfaultingrate;
export const getTopPoolFaultingData = (state) => state.memory.toppoolfaulting;
export const getMemoryVsFaultingData = (state) => state.memory.memoryvsfaulting;
export const getSpecificPoolFaultingData = (state) => state.memory.specificpoolfaulting;
export const getMachinPoolFaultingDataWc = (state) => state.memory.machinepoolfaultingWC;
export const getTotalFaultingRateDataWc = (state) => state.memory.totalfaultingrateWC;
export const getTopPoolFaultingDataWc = (state) => state.memory.toppoolfaultingWC;
export const getMemoryVsFaultingDataWc = (state) => state.memory.memoryvsfaultingWC;
export const getSpecificPoolFaultingDataWc = (state) => state.memory.specificpoolfaultingWC;

export default memorySlice.reducer;
