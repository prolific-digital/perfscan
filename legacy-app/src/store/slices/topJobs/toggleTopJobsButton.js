import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    togglePDTopJobsButton:false
}

const toggleJobsButton = createSlice({
    name: "toggleTopJobsSlice",
    initialState,
    reducers:{
        togglePdTopJobs(state, action){
            state.togglePDTopJobsButton = action.payload 
        }
    }
})

export const getToggleValue = (state) => state.toggleTopJobsBtn.togglePDTopJobsButton;

export const counterTogglePDTopJobs = toggleJobsButton.actions.togglePdTopJobs;

export default toggleJobsButton.reducer