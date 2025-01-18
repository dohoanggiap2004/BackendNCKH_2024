import {instanceAxios8000} from "../../config/axiosConfig";
import {createAsyncThunk} from "@reduxjs/toolkit";

// Tạo async thunk để fetch sản phẩm
export const getProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
    try {
        const response = await instanceAxios8000.get('/api/products');
        return response.data.data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getProductById = createAsyncThunk('products/fetchProductById', async (payload, thunkAPI) => {
    try {
        const response = await instanceAxios8000.get(`/api/products/${payload}`);
        return response.data;
    }catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getProductByModel = createAsyncThunk('products/fetchProductByModel', async (payload, thunkAPI) => {
    try {
        const response = await instanceAxios8000.get(`/api/products/search`,{
            params: {
                keyword: payload,

            }
        });
        return response.data.content;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getProductByModel2 = createAsyncThunk('products/fetchProductByModel2', async (payload, thunkAPI) => {
    try {
        const response = await instanceAxios8000.get(`/api/products/search`,{
            params: {
                keyword: payload,
                page: 1,
            }
        });
        return response.data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createProduct = createAsyncThunk('products/createProduct', async (payload, thunkAPI) => {
    try {
        const response = await instanceAxios8000.post('/api/products', payload);
        return response.data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateProduct = createAsyncThunk('products/updateProduct', async (payload, thunkAPI) => {
    try {
        const response = await instanceAxios8000.put(`/api/products`, payload);
        return payload;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (payload, thunkAPI) => {
    try {
        const response = await instanceAxios8000.delete(`/api/products`, {
            data: payload,
        });
        return payload;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
})





