import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchAsyncCPUUtilization = createAsyncThunk("cpu/fetchAsyncCPUUtilization", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/cpudata?${query}`);
    return response.data;
});

export const fetchAsyncCPUMS = createAsyncThunk("cpu/fetchAsyncCPUMS", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/cpumsdata?${query}`);
    return response.data;
});

export const fetchAsyncNumCores = createAsyncThunk("cpu/fetchAsyncNumCores", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/ncoresdata?${query}`);
    return response.data;
});

export const fetchAsyncCPW = createAsyncThunk("cpu/fetchAsyncCPW", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/cpw?${query}`);
    return response.data;
});

export const fetchAsyncWhatsChangedCPUUtilization = createAsyncThunk("cpu/fetchAsyncWhatsChangedCPUUtilization", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/cpudata/whatschanged?${query}`);
    return response.data;
});

export const fetchAsyncWhatsChangedCPUMS = createAsyncThunk("cpu/fetchAsyncWhatsChangedCPUMS", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/cpumsdata/whatschanged?${query}`);
    return response.data;
});

export const fetchAsyncWhatsChangedNumCores = createAsyncThunk("cpu/fetchAsyncWhatsChangedNumCores", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/ncoresdata/whatschanged?${query}`);
    return response.data;
});

export const fetchAsyncWhatsChangedCPW = createAsyncThunk("cpu/fetchAsyncWhatsChangedCPW", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/cpudata/whatschanged?${query}`);
    return response.data;
});

const initialState = {
    cpudata: {loading:false, data:[], error:''},
    cpumsdata: {loading:false, data:[], error:''},
    numcoresdata: {loading:false, data:[], error:''},
    cpwdata: {loading:false, data:[], error:''},
    whatchangedcpudata: {loading:false, data:[], error:''},
    whatchangedcpumsdata: {loading:false, data:[], error:''},
    whatchangednumcoresdata: {loading:false, data:[], error:''},
    whatchangedcpwdata: {loading:false, data:[], error:''},
};

const cpuSlice = createSlice({ 
    name: 'cpu',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncCPUUtilization.pending, state => {
          state.cpudata.loading = true
        })
        builder.addCase(fetchAsyncCPUUtilization.fulfilled, (state, action) => {
          state.cpudata.loading = false
          state.cpudata.data = action.payload
          state.cpudata.error = ''
        })
        builder.addCase(fetchAsyncCPUUtilization.rejected, (state, action) => {
          state.cpudata.loading = false
          state.cpudata.data = []
          state.cpudata.error = action.error.message
        })
        builder.addCase(fetchAsyncCPUMS.pending, state => {
            state.cpumsdata.loading = true
        })
        builder.addCase(fetchAsyncCPUMS.fulfilled, (state, action) => {
            state.cpumsdata.loading = false
            state.cpumsdata.data = action.payload
            state.cpumsdata.error = ''
        })
        builder.addCase(fetchAsyncCPUMS.rejected, (state, action) => {
            state.cpumsdata.loading = false
            state.cpumsdata.data = []
            state.cpumsdata.error = action.error.message
        })
        builder.addCase(fetchAsyncNumCores.pending, state => {
            state.numcoresdata.loading = true
        })
        builder.addCase(fetchAsyncNumCores.fulfilled, (state, action) => {
            state.numcoresdata.loading = false
            state.numcoresdata.data = action.payload
            state.numcoresdata.error = ''
        })
        builder.addCase(fetchAsyncNumCores.rejected, (state, action) => {
            state.numcoresdata.loading = false
            state.numcoresdata.data = []
            state.numcoresdata.error = action.error.message
        })
        builder.addCase(fetchAsyncWhatsChangedCPUUtilization.pending, state => {
            state.whatchangedcpudata.loading = true
        })
        builder.addCase(fetchAsyncWhatsChangedCPUUtilization.fulfilled, (state, action) => {
            state.whatchangedcpudata.loading = false
            state.whatchangedcpudata.data = action.payload
            state.whatchangedcpudata.error = ''
        })
        builder.addCase(fetchAsyncWhatsChangedCPUUtilization.rejected, (state, action) => {
            state.whatchangedcpudata.loading = false
            state.whatchangedcpudata.data = []
            state.whatchangedcpudata.error = action.error.message
        })
        builder.addCase(fetchAsyncWhatsChangedCPUMS.pending, state => {
            state.whatchangedcpumsdata.loading = true
        })
        builder.addCase(fetchAsyncWhatsChangedCPUMS.fulfilled, (state, action) => {
            state.whatchangedcpumsdata.loading = false
            state.whatchangedcpumsdata.data = action.payload
            state.whatchangedcpumsdata.error = ''
        })
        builder.addCase(fetchAsyncWhatsChangedCPUMS.rejected, (state, action) => {
            state.whatchangedcpumsdata.loading = false
            state.whatchangedcpumsdata.data = []
            state.whatchangedcpumsdata.error = action.error.message
        })
        builder.addCase(fetchAsyncWhatsChangedNumCores.pending, state => {
            state.whatchangednumcoresdata.loading = true
        })
        builder.addCase(fetchAsyncWhatsChangedNumCores.fulfilled, (state, action) => {
            state.whatchangednumcoresdata.loading = false
            state.whatchangednumcoresdata.data = action.payload
            state.whatchangednumcoresdata.error = ''
        })
        builder.addCase(fetchAsyncWhatsChangedNumCores.rejected, (state, action) => {
            state.whatchangednumcoresdata.loading = false
            state.whatchangednumcoresdata.data = []
            state.whatchangednumcoresdata.error = action.error.message
        })
        builder.addCase(fetchAsyncCPW.pending, state => {
            state.cpwdata.loading = true
          })
        builder.addCase(fetchAsyncCPW.fulfilled, (state, action) => {
            state.cpwdata.loading = false
            state.cpwdata.data = action.payload
            state.cpwdata.error = ''
        })
        builder.addCase(fetchAsyncCPW.rejected, (state, action) => {
            state.cpwdata.loading = false
            state.cpwdata.data = []
            state.cpwdata.error = action.error.message
        })
        builder.addCase(fetchAsyncWhatsChangedCPW.pending, state => {
            state.whatchangedcpwdata.loading = true
        })
        builder.addCase(fetchAsyncWhatsChangedCPW.fulfilled, (state, action) => {
            state.whatchangedcpwdata.loading = false
            state.whatchangedcpwdata.data = action.payload
            state.whatchangedcpwdata.error = ''
        })
        builder.addCase(fetchAsyncWhatsChangedCPW.rejected, (state, action) => {
            state.whatchangedcpwdata.loading = false
            state.whatchangedcpwdata.data = []
            state.whatchangedcpwdata.error = action.error.message
        })
    },
})



export const getCPUUtilData = (state) => state.cpu.cpudata;
export const getCPUMsData = (state) => state.cpu.cpumsdata;
export const getNumCoresData = (state) => state.cpu.numcoresdata;
export const getCPWData = (state) => state.cpu.cpwdata;
export const getWhatChangedCPUData = (state) => state.cpu.whatchangedcpudata;
export const getWhatChangedCPUMsData = (state) => state.cpu.whatchangedcpumsdata;
export const getWhatsChangedNumCoresData = (state) => state.cpu.whatchangednumcoresdata;
export const getWhatChangedCPWData = (state) => state.cpu.whatchangedcpwdata;


//export const getAllShows = (state) => state.movies.shows;
export default cpuSlice.reducer;




