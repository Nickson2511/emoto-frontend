import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    fetchCategories,
    createCategory,
    fetchSubCategoriesByCategory,
    createSubCategory,
} from "../../services/categoryAPI";

export interface Category {
    _id: string;
    name: string;
    isActive: boolean;
}

export interface SubCategory {
    _id: string;
    name: string;
    category: string;
    isActive: boolean;
}

interface CategoryState {
    categories: Category[];
    subCategories: SubCategory[];
    selectedCategory: Category | null;
    loading: boolean;
}

const initialState: CategoryState = {
    categories: [],
    subCategories: [],
    selectedCategory: null,
    loading: false,
};

/* ================= THUNKS ================= */

export const getCategories = createAsyncThunk(
    "category/getCategories",
    fetchCategories
);

export const addCategory = createAsyncThunk(
    "category/addCategory",
    createCategory
);

export const getSubCategories = createAsyncThunk(
    "category/getSubCategories",
    fetchSubCategoriesByCategory
);

export const addSubCategory = createAsyncThunk(
    "category/addSubCategory",
    createSubCategory
);

/* ================= SLICE ================= */

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        selectCategory(state, action) {
            state.selectedCategory = action.payload;
            state.subCategories = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(getSubCategories.fulfilled, (state, action) => {
                state.subCategories = action.payload;
            })
            .addCase(addSubCategory.fulfilled, (state, action) => {
                state.subCategories.push(action.payload);
            });
    },
});

export const { selectCategory } = categorySlice.actions;
export default categorySlice.reducer;
