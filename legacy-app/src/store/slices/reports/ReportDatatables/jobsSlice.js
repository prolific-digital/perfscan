import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchAsyncTopJobs = createAsyncThunk("jobs/fetchAsyncTopJobs", async(qd) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`api/topjobs?${query}`);
    return response.data;
});
//TODO : Check API for query parameters
export const fetchAsyncJob = createAsyncThunk("exsummary/fetchAsyncSummaryDataDisk", async(qd, jobType) => {
    const searchParams = new URLSearchParams(qd);
    let query = searchParams.toString();
    const response = await baseAPI.get(`/api/topjobs/pie?${query}&jobtype=${jobType}`);
    return response.data;
});

const initialState = {
    topjobs: {loading:true,data:[], error:''},
    job: {loading:true,data:[], error:''}
};

const jobsSlice = createSlice({ 
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncTopJobs.pending, state => {
          state.topjobs.loading = true
        })
        builder.addCase(fetchAsyncTopJobs.fulfilled, (state, action) => {
          state.topjobs.loading = false
          state.topjobs.data = action.payload
          state.topjobs.error = ''
        })
        builder.addCase(fetchAsyncTopJobs.rejected, (state, action) => {
          state.topjobs.loading = false
          state.topjobs.data = []
          state.topjobs.error = action.error.message
        })
        builder.addCase(fetchAsyncJob.pending, state => {
            state.job.loading = true
        })
        builder.addCase(fetchAsyncJob.fulfilled, (state, action) => {
            state.job.loading = false
            state.job.data = action.payload
            state.job.error = ''
        })
        builder.addCase(fetchAsyncJob.rejected, (state, action) => {
            state.job.loading = false
            state.job.data = []
            state.job.error = action.error.message
        })
    },
})


export const getTopJobsData = (state) => state.jobs.topjobs;
export const getJobData = (state) => state.jobs.job;

//export const getAllShows = (state) => state.movies.shows;
export default jobsSlice.reducer;