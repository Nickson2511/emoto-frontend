import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchSubCategories, fetchProducts } from "../../services/productAPI";
import type { Category, SubCategory, Product } from "./types";



interface ProductState {
    categories: Category[];
    subCategories: SubCategory[];
    products: Product[];
    loading: boolean;
}

const initialState: ProductState = {
    categories: [],
    subCategories: [],
    products: [],
    loading: false,
};

export const getCategories = createAsyncThunk(
    "product/getCategories",
    fetchCategories
);

export const getSubCategories = createAsyncThunk(
    "product/getSubCategories",
    fetchSubCategories
);
export const getProducts = createAsyncThunk(
    "product/getProducts",
    fetchProducts

)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(getSubCategories.fulfilled, (state, action) => {
                state.subCategories = action.payload;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            });
    },
});

export default productSlice.reducer;
