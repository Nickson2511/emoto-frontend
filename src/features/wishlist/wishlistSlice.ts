import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addToWishlistAPI,
    fetchWishlistAPI,
    removeFromWishlistAPI,
    clearWishlistAPI
} from "../../services/wishlistAPI";
import type { Product } from "../product/types";

interface WishlistState {
    products: Product[];
    loading: boolean;
}

const initialState: WishlistState = {
    products: [],
    loading: false,
};

/* ================= THUNKS ================= */
export const fetchWishlist = createAsyncThunk(
    "wishlist/fetch",
    fetchWishlistAPI
);

export const addToWishlist = createAsyncThunk(
    "wishlist/add",
    async (productId: string) => addToWishlistAPI(productId)
);

export const removeFromWishlist = createAsyncThunk(
    "wishlist/remove",
    async (productId: string) => removeFromWishlistAPI(productId)
);

export const clearWishlist = createAsyncThunk(
    "wishlist/clear",
    clearWishlistAPI
);

/* ================= SLICE ================= */
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.products = action.payload.products || [];
                state.loading = false;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.products = action.payload.products;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.products = action.payload.products;
            })
            .addCase(clearWishlist.fulfilled, (state) => {
                state.products = [];
            });
    },
});

export default wishlistSlice.reducer;
