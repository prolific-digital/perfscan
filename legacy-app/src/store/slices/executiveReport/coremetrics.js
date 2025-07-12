// We are just storing the selected metrics in store
// Data fetching for metrics will be handled later
import { createSlice} from '@reduxjs/toolkit';

const initialState = {
  global : {},
  system : []
};

const metricsSlice = createSlice({
    name: 'metrics',
    initialState,
    reducers : {
        global : (state, {payload}) => {
            state.global = payload
        },
        system : (state, {payload}) => {
            state.system = payload
        }
    }
})

export const { global, system } =   metricsSlice.actions;

export default metricsSlice.reducer;