import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: 10
}

const commonSlice = createSlice({
    name: 'common', // Actions
    initialState,
    reducers : {
        setActiveTab : (state, {payload}) => {
            state.activeTab = payload
        }
    }
})

export const { setActiveTab } =   commonSlice.actions;
export const getActiveTab = (state) => state.common.activeTab; // States => coming from store/index.js

export default commonSlice.reducer;