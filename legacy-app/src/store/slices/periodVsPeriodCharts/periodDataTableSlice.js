import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

// ******* commented endpoint are created for periodvsperiod data caching ***********//

// export const fetchAsyncPeriodDataCPU = createAsyncThunk("perioddata/fetchAsyncPeriodDataCPU", async(pqd) => {
//     const response = await baseAPI.post(`api/periodVSperiod/cpu?`,pqd);
//     return response.data.status;
// });

export const fetchAsyncPeriodDataCPUActual = createAsyncThunk("perioddata/fetchAsyncPeriodDataCPUActual", async(pqd) => {
  const response = await baseAPI.post(`api/periodVSperiod/cpu/data?`,pqd);
  return response.data;
});

/* ^^^^^^^^^^^^^^^ Disk ^^^^^^^^^^^^^^ */

// export const fetchAsyncperiodDataDisk = createAsyncThunk("perioddata/fetchAsyncperiodDataDisk", async(pqd) => {
//   const response = await baseAPI.post(`api/periodVSperiod/disk?`,pqd);
//   return response.data.status;
// });

export const fetchAsyncperiodDataDiskActual = createAsyncThunk("perioddata/fetchAsyncperiodDataDiskActual", async(pqd) => {
  const response = await baseAPI.post(`api/periodVSperiod/disk/data?`,pqd);
  return response.data;
});

/* ^^^^^^^^^^^^^^^ Memory ^^^^^^^^^^^^^^ */

// export const fetchAsyncperiodDataMemory = createAsyncThunk("perioddata/fetchAsyncperiodDataMemory", async(pqd) => {
//   const response = await baseAPI.post(`api/periodVSperiod/memory?`,pqd);
//   return response.data.status;
// });

export const fetchAsyncperiodDataMemoryActual = createAsyncThunk("perioddata/fetchAsyncperiodDataMemoryActual", async(pqd) => {
  const response = await baseAPI.post(`api/periodVSperiod/memory/data?`,pqd);
  return response.data;
});

/* ^^^^^^^^^^^^^^^ Other ^^^^^^^^^^^^^^ */

// export const fetchAsyncperiodDataOther = createAsyncThunk("perioddata/fetchAsyncperiodOther", async(pqd) => {
//   const response = await baseAPI.post(`api/periodVSperiod/other?`,pqd);
//   return response.data.status;
// });

export const fetchAsyncperiodDataOtherActual = createAsyncThunk("perioddata/fetchAsyncperiodDataOtherActual", async(pqd) => {
  const response = await baseAPI.post(`api/periodVSperiod/other/data?`,pqd);
  return response.data;
});

const initialState = {
    // perioddatacpu: {loading:true,status:'', error:''},
    perioddatacpuactual: {loading:true,data:[], error:''},

    // perioddatadisk: {loading:true,status:'', error:''},
    perioddatadiskactual: {loading:true,data:[], error:''},

    // perioddatamemory: {loading:true,status:'', error:''},
    perioddatamemoryactual: {loading:true,data:[], error:''},

    // perioddataother: {loading:true,status:'', error:''},
    perioddataotheractual: {loading:true,data:[], error:''}
    
};


     const periodDataSlice = createSlice({ 
        name: 'perioddata',
        initialState,
        reducers: {},
        extraReducers: builder => {
            // builder.addCase(fetchAsyncPeriodDataCPU.pending, state => {
            //   state.perioddatacpu.loading = true
            // })
            // builder.addCase(fetchAsyncPeriodDataCPU.fulfilled, (state, action) => {
            //   state.perioddatacpu.loading = false
            //   state.perioddatacpu.status = action.payload
            //   state.perioddatacpu.error = ''
            // })
            // builder.addCase(fetchAsyncPeriodDataCPU.rejected, (state, action) => {
            //   state.perioddatacpu.loading = false
            //   state.perioddatacpu.status = ''
            //   state.perioddatacpu.error = action.error.message
            // })
            builder.addCase(fetchAsyncPeriodDataCPUActual.pending, state => {
              state.perioddatacpuactual.loading = true
            })
            builder.addCase(fetchAsyncPeriodDataCPUActual.fulfilled, (state, action) => {
              state.perioddatacpuactual.loading = false
              state.perioddatacpuactual.data = action.payload
              state.perioddatacpuactual.error = ''
            })
            builder.addCase(fetchAsyncPeriodDataCPUActual.rejected, (state, action) => {
              state.perioddatacpuactual.loading = false
              state.perioddatacpuactual.data = []
              state.perioddatacpuactual.error = action.error.message
            })
            /* ########### Disk ############# */

            // builder.addCase(fetchAsyncperiodDataDisk.pending, state => {
            //     state.perioddatadisk.loading = true
            // })
            // builder.addCase(fetchAsyncperiodDataDisk.fulfilled, (state, action) => {
            //     state.perioddatadisk.loading = false
            //     state.perioddatadisk.status = action.payload
            //     state.perioddatadisk.error = ''
            // })
            // builder.addCase(fetchAsyncperiodDataDisk.rejected, (state, action) => {
            //     state.perioddatadisk.loading = false
            //     state.perioddatadisk.status = ''
            //     state.perioddatadisk.error = action.error.message
            // })
            builder.addCase(fetchAsyncperiodDataDiskActual.pending, state => {
              state.perioddatadiskactual.loading = true
            })
            builder.addCase(fetchAsyncperiodDataDiskActual.fulfilled, (state, action) => {
                state.perioddatadiskactual.loading = false
                state.perioddatadiskactual.data = action.payload
                state.perioddatadiskactual.error = ''
            })
            builder.addCase(fetchAsyncperiodDataDiskActual.rejected, (state, action) => {
                state.perioddatadiskactual.loading = false
                state.perioddatadiskactual.data = []
                state.perioddatadiskactual.error = action.error.message
            })
            /* ########### Memory ############## */
            // builder.addCase(fetchAsyncperiodDataMemory.pending, state => {
            //     state.perioddatamemory.loading = true
            // })
            // builder.addCase(fetchAsyncperiodDataMemory.fulfilled, (state, action) => {
            //     state.perioddatamemory.loading = false
            //     state.perioddatamemory.status = action.payload
            //     state.perioddatamemory.error = ''
            // })
            // builder.addCase(fetchAsyncperiodDataMemory.rejected, (state, action) => {
            //     state.perioddatamemory.loading = false
            //     state.perioddatamemory.status = ''
            //     state.perioddatamemory.error = action.error.message
            // }) 

            builder.addCase(fetchAsyncperiodDataMemoryActual.pending, state => {
                state.perioddatamemoryactual.loading = true
            })
            builder.addCase(fetchAsyncperiodDataMemoryActual.fulfilled, (state, action) => {
                state.perioddatamemoryactual.loading = false
                state.perioddatamemoryactual.data = action.payload
                state.perioddatamemoryactual.error = ''
            })
            builder.addCase(fetchAsyncperiodDataMemoryActual.rejected, (state, action) => {
                state.perioddatamemoryactual.loading = false
                state.perioddatamemoryactual.data = []
                state.perioddatamemoryactual.error = action.error.message
            }) 
            /* ########### Other ############## */
            // builder.addCase(fetchAsyncperiodDataOther.pending, state => {
            //     state.perioddataother.loading = true
            // })
            // builder.addCase(fetchAsyncperiodDataOther.fulfilled, (state, action) => {
            //     state.perioddataother.loading = false
            //     state.perioddataother.status = action.payload
            //     state.perioddataother.error = ''
            // })
            // builder.addCase(fetchAsyncperiodDataOther.rejected, (state, action) => {
            //     state.perioddataother.loading = false
            //     state.perioddataother.status = ''
            //     state.perioddataother.error = action.error.message
            // })

            builder.addCase(fetchAsyncperiodDataOtherActual.pending, state => {
              state.perioddataotheractual.loading = true
          })
          builder.addCase(fetchAsyncperiodDataOtherActual.fulfilled, (state, action) => {
              state.perioddataotheractual.loading = false
              state.perioddataotheractual.data = action.payload
              state.perioddataotheractual.error = ''
          })
          builder.addCase(fetchAsyncperiodDataOtherActual.rejected, (state, action) => {
              state.perioddataotheractual.loading = false
              state.perioddataotheractual.data = []
              state.perioddataotheractual.error = action.error.message
          }) 
        },
    })

    // export const getPeriodCPUData = (state) => state.perioddata.perioddatacpu;
    export const getPeriodCPUDataActual = (state) => state.perioddata.perioddatacpuactual;

    // export const getPeriodDiskData = (state) => state.perioddata.perioddatadisk;
    export const getPeriodDiskDataActual = (state) => state.perioddata.perioddatadiskactual;

    // export const getPeriodMemoryData = (state) => state.perioddata.perioddatamemory;
    export const getPeriodMemoryDataActual = (state) => state.perioddata.perioddatamemoryactual;

    // export const getPeriodOtherData = (state) => state.perioddata.perioddataother;
    export const getPeriodOtherDataActual = (state) => state.perioddata.perioddataotheractual;

    export default periodDataSlice.reducer;
