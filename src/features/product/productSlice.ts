import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchSubCategories } from "../../services/productAPI";
import type { Category, SubCategory } from "./types";

interface ProductState {
    categories: Category[];
    subCategories: SubCategory[];
    loading: boolean;
}

const initialState: ProductState = {
    categories: [],
    subCategories: [],
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
            });
    },
});

export default productSlice.reducer;
