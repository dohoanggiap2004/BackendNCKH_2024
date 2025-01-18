// reducers/productSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getColors } from "../actions/colorAction";

const brandSlice = createSlice({
    name: 'colors',
    initialState: {
        colors: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            //get colors
            .addCase(getColors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getColors.fulfilled, (state, action) => {
                state.loading = false;
                state.colors = action.payload;
            })
            .addCase(getColors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // //get brand by id
            // .addCase(getBrandById.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(getBrandById.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.colors = action.payload;
            // })
            // .addCase(getBrandById.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })
            //
            // //post brand
            // .addCase(createBrand.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(createBrand.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.colors.push(action.payload);
            // })
            // .addCase(createBrand.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })
            //
            // //put brand
            // .addCase(updateBrand.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(updateBrand.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const index = state.colors.findIndex(brand => brand.brandId === action.payload.brandId);
            //     if (index > -1) {
            //         state.colors[index] = action.payload;
            //     }
            // })
            // .addCase(updateBrand.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })
            //
            // //delete brand
            // .addCase(deleteBrand.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(deleteBrand.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.colors = state.colors.filter(brand => brand.brandId !== action.payload.brandId);
            // })
            // .addCase(deleteBrand.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // });
    },
});

export default brandSlice.reducer;
