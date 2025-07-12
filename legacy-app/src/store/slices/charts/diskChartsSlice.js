import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchAsyncDiskSpaceUtilization = createAsyncThunk("disk/fetchAsyncDiskSpaceUtilization", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/dsudata?${query}`);
    return response.data;
});

export const fetchAsyncDiskArmUtilization = createAsyncThunk("disk/fetchAsyncDiskArmUtilization", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/daudata?${query}`);
    return response.data;
});

export const fetchAsyncDiskResponse = createAsyncThunk("disk/fetchAsyncDiskResponse", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/drtdata?${query}`);
    return response.data;
});

export const fetchAsyncDiskOperations = createAsyncThunk("disk/fetchAsyncDiskOperations", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/tdodata?${query}`);
    return response.data;
});

export const fetchAsyncReadWriteRatio = createAsyncThunk("disk/fetchAsyncReadWriteRatio", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/rwrdata?${query}`);
    return response.data;
});

export const fetchAsyncCacheHitPerc = createAsyncThunk("disk/fetchAsyncCacheHitPerc", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/chpdata?${query}`);
    return response.data;
});


export const fetchAsyncDiskSpaceUtilizationWC = createAsyncThunk("disk/fetchAsyncDiskSpaceUtilizationWC", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/dsudata/whatschanged?${query}`);
    return response.data;
});

export const fetchAsyncDiskArmUtilizationWC = createAsyncThunk("disk/fetchAsyncDiskArmUtilizationWC", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/daudata/whatschanged?${query}`);
    return response.data;
});

export const fetchAsyncDiskResponseWC = createAsyncThunk("disk/fetchAsyncDiskResponseWC", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/drtdata/whatschanged?${query}`);
    return response.data;
});

export const fetchAsyncDiskOperationsWC = createAsyncThunk("disk/fetchAsyncDiskOperationsWC", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/tdodata/whatschanged?${query}`);
    return response.data;
});

export const fetchAsyncReadWriteRatioWC = createAsyncThunk("disk/fetchAsyncReadWriteRatioWC", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/rwrdata/whatschanged?${query}`);
    return response.data;
});

export const fetchAsyncCacheHitPercWC = createAsyncThunk("disk/fetchAsyncCacheHitPercWC", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/chpdata/whatschanged?${query}`);
    return response.data;
});

const initialState = {
    diskspace: {loading:false, data:[], error:''},
    diskarm: {loading:false, data:[], error:''},
    diskresponse: {loading:false, data:[], error:''},
    diskoperations: {loading:false, data:[], error:''},
    diskreadwrite: {loading:false, data:[], error:''},
    diskcachehit: {loading:false, data:[], error:''},
    diskspaceWC : {loading:false, data:[], error:''},
    diskarmWC: {loading:false, data:[], error:''},
    diskresponseWC: {loading:false, data:[], error:''},
    diskoperationsWC: {loading:false, data:[], error:''},
    diskreadwriteWC: {loading:false, data:[], error:''},
    diskcachehitWC: {loading:false, data:[], error:''},
};

const diskSlice = createSlice({ 
    name: 'disk',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncDiskSpaceUtilization.pending, state => {
          state.diskspace.loading = true
        })
        builder.addCase(fetchAsyncDiskSpaceUtilization.fulfilled, (state, action) => {
          state.diskspace.loading = false
          state.diskspace.data = action.payload
          state.diskspace.error = ''
        })
        builder.addCase(fetchAsyncDiskSpaceUtilization.rejected, (state, action) => {
          state.diskspace.loading = false
          state.diskspace.data = []
          state.diskspace.error = action.error.message
        })
        builder.addCase(fetchAsyncDiskArmUtilization.pending, state => {
            state.diskarm.loading = true
        })
        builder.addCase(fetchAsyncDiskArmUtilization.fulfilled, (state, action) => {
            state.diskarm.loading = false
            state.diskarm.data = action.payload
            state.diskarm.error = ''
        })
        builder.addCase(fetchAsyncDiskArmUtilization.rejected, (state, action) => {
            state.diskarm.loading = false
            state.diskarm.data = []
            state.diskarm.error = action.error.message
        })
        builder.addCase(fetchAsyncDiskResponse.pending, state => {
            state.diskresponse.loading = true
        })
        builder.addCase(fetchAsyncDiskResponse.fulfilled, (state, action) => {
            state.diskresponse.loading = false
            state.diskresponse.data = action.payload
            state.diskresponse.error = ''
        })
        builder.addCase(fetchAsyncDiskResponse.rejected, (state, action) => {
            state.diskresponse.loading = false
            state.diskresponse.data = []
            state.diskresponse.error = action.error.message
        })
        builder.addCase(fetchAsyncDiskOperations.pending, state => {
            state.diskoperations.loading = true
        })
        builder.addCase(fetchAsyncDiskOperations.fulfilled, (state, action) => {
            state.diskoperations.loading = false
            state.diskoperations.data = action.payload
            state.diskoperations.error = ''
        })
        builder.addCase(fetchAsyncDiskOperations.rejected, (state, action) => {
            state.diskoperations.loading = false
            state.diskoperations.data = []
            state.diskoperations.error = action.error.message
        })
        builder.addCase(fetchAsyncReadWriteRatio.pending, state => {
            state.diskreadwrite.loading = true
        })
        builder.addCase(fetchAsyncReadWriteRatio.fulfilled, (state, action) => {
            state.diskreadwrite.loading = false
            state.diskreadwrite.data = action.payload
            state.diskreadwrite.error = ''
        })
        builder.addCase(fetchAsyncReadWriteRatio.rejected, (state, action) => {
            state.diskreadwrite.loading = false
            state.diskreadwrite.data = []
            state.diskreadwrite.error = action.error.message
        })
        builder.addCase(fetchAsyncCacheHitPerc.pending, state => {
            state.diskcachehit.loading = true
        })
        builder.addCase(fetchAsyncCacheHitPerc.fulfilled, (state, action) => {
            state.diskcachehit.loading = false
            state.diskcachehit.data = action.payload
            state.diskcachehit.error = ''
        })
        builder.addCase(fetchAsyncCacheHitPerc.rejected, (state, action) => {
            state.diskcachehit.loading = false
            state.diskcachehit.data = []
            state.diskcachehit.error = action.error.message
        })
        builder.addCase(fetchAsyncDiskSpaceUtilizationWC.pending, state => {
            state.diskspaceWC.loading = true
        })
        builder.addCase(fetchAsyncDiskSpaceUtilizationWC.fulfilled, (state, action) => {
            state.diskspaceWC.loading = false
            state.diskspaceWC.data = action.payload
            state.diskspaceWC.error = ''
        })
        builder.addCase(fetchAsyncDiskSpaceUtilizationWC.rejected, (state, action) => {
            state.diskspaceWC.loading = false
            state.diskspaceWC.data = []
            state.diskspaceWC.error = action.error.message
        })
        builder.addCase(fetchAsyncDiskArmUtilizationWC.pending, state => {
            state.diskarmWC.loading = true
        })
        builder.addCase(fetchAsyncDiskArmUtilizationWC.fulfilled, (state, action) => {
            state.diskarmWC.loading = false
            state.diskarmWC.data = action.payload
            state.diskarmWC.error = ''
        })
        builder.addCase(fetchAsyncDiskArmUtilizationWC.rejected, (state, action) => {
            state.diskarmWC.loading = false
            state.diskarmWC.data = []
            state.diskarmWC.error = action.error.message
        })
        builder.addCase(fetchAsyncDiskResponseWC.pending, state => {
            state.diskresponseWC.loading = true
        })
        builder.addCase(fetchAsyncDiskResponseWC.fulfilled, (state, action) => {
            state.diskresponseWC.loading = false
            state.diskresponseWC.data = action.payload
            state.diskresponseWC.error = ''
        })
        builder.addCase(fetchAsyncDiskResponseWC.rejected, (state, action) => {
            state.diskresponseWC.loading = false
            state.diskresponseWC.data = []
            state.diskresponseWC.error = action.error.message
        })
        builder.addCase(fetchAsyncDiskOperationsWC.pending, state => {
            state.diskoperationsWC.loading = true
        })
        builder.addCase(fetchAsyncDiskOperationsWC.fulfilled, (state, action) => {
            state.diskoperationsWC.loading = false
            state.diskoperationsWC.data = action.payload
            state.diskoperationsWC.error = ''
        })
        builder.addCase(fetchAsyncDiskOperationsWC.rejected, (state, action) => {
            state.diskoperationsWC.loading = false
            state.diskoperationsWC.data = []
            state.diskoperationsWC.error = action.error.message
        })
        builder.addCase(fetchAsyncReadWriteRatioWC.pending, state => {
            state.diskreadwriteWC.loading = true
        })
        builder.addCase(fetchAsyncReadWriteRatioWC.fulfilled, (state, action) => {
            state.diskreadwriteWC.loading = false
            state.diskreadwriteWC.data = action.payload
            state.diskreadwriteWC.error = ''
        })
        builder.addCase(fetchAsyncReadWriteRatioWC.rejected, (state, action) => {
            state.diskreadwriteWC.loading = false
            state.diskreadwriteWC.data = []
            state.diskreadwriteWC.error = action.error.message
        }) 
        builder.addCase(fetchAsyncCacheHitPercWC.pending, state => {
            state.diskcachehitWC.loading = true
        })
        builder.addCase(fetchAsyncCacheHitPercWC.fulfilled, (state, action) => {
            state.diskcachehitWC.loading = false
            state.diskcachehitWC.data = action.payload
            state.diskcachehitWC.error = ''
        })
        builder.addCase(fetchAsyncCacheHitPercWC.rejected, (state, action) => {
            state.diskcachehitWC.loading = false
            state.diskcachehitWC.data = []
            state.diskcachehitWC.error = action.error.message
        })
    },
})

export const getDiskSpaceData = (state) => state.disk.diskspace;
export const getDiskArmData = (state) => state.disk.diskarm;
export const getDiskResponseData = (state) => state.disk.diskresponse;
export const getDiskOperationsData = (state) => state.disk.diskoperations;
export const getDiskReadWriteData = (state) => state.disk.diskreadwrite;
export const getDiskCacheHitData = (state) => state.disk.diskcachehit;
export const getDiskSpaceDataWC = (state) => state.disk.diskspaceWC;
export const getDiskArmDataWC = (state) => state.disk.diskarmWC;
export const getDiskResponseDataWC = (state) => state.disk.diskresponseWC;
export const getDiskOperationsDataWC = (state) => state.disk.diskoperationsWC;
export const getDiskReadWriteDataWC = (state) => state.disk.diskreadwriteWC;
export const getDiskCacheHitDataWC = (state) => state.disk.diskcachehitWC;

export default diskSlice.reducer;




