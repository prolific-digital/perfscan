import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchExistingReportsButtonsData = createAsyncThunk("reports/fetchExistingReportsButtonsData", async (userID) => {
    const response = await baseAPI.get(`api/reports/reportTypes/${userID}`);
    return response.data;
})

const initialState = {
    existingreportsbuttonsdata: { loading: false, data: [], error: '' },

};

const existingReports = createSlice({
    name: 'reports',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchExistingReportsButtonsData.pending, state => {
            state.existingreportsbuttonsdata.loading = true
        })
        builder.addCase(fetchExistingReportsButtonsData.fulfilled, (state, action) => {
            state.existingreportsbuttonsdata.loading = false
            state.existingreportsbuttonsdata.data = action.payload
            state.existingreportsbuttonsdata.error = ''
        })
        builder.addCase(fetchExistingReportsButtonsData.rejected, (state, action) => {
            state.existingreportsbuttonsdata.loading = false
            state.existingreportsbuttonsdata.data = []
            state.existingreportsbuttonsdata.error = action.error.message
        })
    },
})

export default existingReports.reducer;