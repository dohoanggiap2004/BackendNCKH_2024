// reducers/productSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getProducts, getProductById, getProductByModel, getProductByModel2, updateProduct, createProduct, deleteProduct} from "../actions/productAction";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        product: '',
        productsSearch: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            //get products
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get product by id
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get product by model
            .addCase(getProductByModel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductByModel.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProductByModel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get product by model2
            .addCase(getProductByModel2.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductByModel2.fulfilled, (state, action) => {
                state.loading = false;
                state.productsSearch = action.payload;
            })
            .addCase(getProductByModel2.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //post product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //put product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(product => product.productId === action.payload.productId);
                if (index > -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //delete product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                console.log(action.payload.productId);
                state.loading = false;
                state.products = state.products.filter(product => product.productId !== action.payload.productId);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
