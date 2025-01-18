import {createAsyncThunk} from "@reduxjs/toolkit";
import {instanceAxios8000} from "../../config/axiosConfig";

export const getColors = createAsyncThunk('brands/fetchColors', async (_, thunkAPI) => {
    try {
        const response = await instanceAxios8000.get('/api/colors');
        return response.data.data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
});
