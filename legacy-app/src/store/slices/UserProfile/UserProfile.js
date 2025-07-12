import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchUserProfileById = createAsyncThunk("exsummary/fetchUserProfileById", async(qd) => {
    const response = await baseAPI.get(`api/auth/getUserDetails?userId=${qd}`);
    return response.data;
});


const initialState = {
    userProfile: { loading: false, data: {}, error: '' },
};

const userProfile = createSlice({
    name: 'userprofile',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUserProfileById.pending, state => {
            state.userProfile.loading = true
          })
          builder.addCase(fetchUserProfileById.fulfilled, (state, action) => {
            state.userProfile.loading = false
            state.userProfile.data = action.payload
            state.userProfile.error = ''
          })
          builder.addCase(fetchUserProfileById.rejected, (state, action) => {
            state.userProfile.loading = false
            state.userProfile.data = []
            state.userProfile.error = action.error.message
          })
    },
})

export const getUserProfile = (state)=>state.userProfileData.userProfile;

export default userProfile.reducer;