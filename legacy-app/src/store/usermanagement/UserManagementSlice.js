import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../services/baseApi';

export const fetchAsyncUsers = createAsyncThunk("usermanagement/fetchAsyncUsers", async () => {
    const response = await baseAPI.get(`api/auth/getUserDetails`);
    return response.data;
});

export const fetchAsyncUserById = createAsyncThunk("usermanagement/fetchAsyncUserById", async (id) => {
    const response = await baseAPI.get(`api/auth/getUserDetails${id}`);
    return response.data;
});

export const addUser = createAsyncThunk("usermanagement/addUser", async (qd) => {
    // const searchParams = new URLSearchParams(qd);
    // let query = searchParams.toString();
    const response = await baseAPI.post(`api/auth/register?`,qd);
    return response.data;
});

const initialState = {
    allUsers: { loading: false, data: [], error: '' },
    userById: { loading: false, data: [], error: '' },
    addUser: { loading: false, data: [], error: '' },
};

const userManagementSlice = createSlice({
    name: 'usermanagement',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAsyncUsers.pending, state => {
            state.allUsers.loading = true
        })
        builder.addCase(fetchAsyncUsers.fulfilled, (state, action) => {
            state.allUsers.loading = false
            state.allUsers.data = action.payload
            state.allUsers.error = ''
        })
        builder.addCase(fetchAsyncUsers.rejected, (state, action) => {
            state.allUsers.loading = false
            state.allUsers.data = []
            state.allUsers.error = action.error.message
        })
        builder.addCase(fetchAsyncUserById.pending, state => {
            state.userById.loading = true
        })
        builder.addCase(fetchAsyncUserById.fulfilled, (state, action) => {
            state.userById.loading = false
            state.userById.data = action.payload
            state.userById.error = ''
        })
        builder.addCase(fetchAsyncUserById.rejected, (state, action) => {
            state.userById.loading = false
            state.userById.data = []
            state.userById.error = action.error.message
        })
        builder.addCase(addUser.pending, state => {
            state.addUser.loading = true
        })
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.addUser.loading = false
            state.addUser.data = action.payload
            state.addUser.error = ''
        })
        builder.addCase(addUser.rejected, (state, action) => {
            state.addUser.loading = false
            state.addUser.data = []
            state.addUser.error = action.error.message
        })
    },
})

export const getAllUsers = (state) => state.usermgt.allUsers;
export const getUserById = (state) => state.usermgt.userById;
export const addNewUser = (state) => state.usermgt.addUser;

export default userManagementSlice.reducer;