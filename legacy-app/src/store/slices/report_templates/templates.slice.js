import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAPI from '../../../services/baseApi';

export const fetchTemplates = createAsyncThunk("reportTemplates/fetchTemplates", async ({userId=1}) => {
    const response = await baseAPI.get(`/api/templates/${userId}`);
    return response.data;
})

const initialState = {
    
    templateData: { loading: false, data: [], error: '' },
    cur_template : { isEditing : false, id: 0 }
};

const reportTemplatesSlice = createSlice({
    name: 'reportTemplates',
    initialState,
    reducers: {
        setIsEditing: (state, { payload }) => {
            state.cur_template = payload;
        },
    },
    extraReducers: builder => {
       
        builder.addCase(fetchTemplates.pending, state => {
            state.templateData.loading = true
        })
        builder.addCase(fetchTemplates.fulfilled, (state, action) => {
            state.templateData.loading = false
            state.templateData.data = action.payload
            state.templateData.error = ''
        })
        builder.addCase(fetchTemplates.rejected, (state, action) => {
            state.templateData.loading = false
            state.templateData.data = []
            state.templateData.error = action.error.message
        })
    },
})

export const getTemplates = (state) => state.reportTemplates.templateData;
export const getIsEditing = (state) => state.reportTemplates.cur_template;

export const {
    setIsEditing
} = reportTemplatesSlice.actions;

export default reportTemplatesSlice.reducer;