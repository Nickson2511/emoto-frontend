import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reviewAPI } from "../../services/reviewAPI";
import type { Review } from "./types";

interface ReviewState {
    reviews: Review[];
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    reviews: [],
    loading: false,
    error: null,
};

export const fetchProductReviews = createAsyncThunk(
    "reviews/fetchByProduct",
    async (productId: string) => {
        const res = await reviewAPI.getByProduct(productId);
        return res.data as Review[];
    }
);

export const createReview = createAsyncThunk(
    "reviews/create",
    async (payload: { productId: string; rating: number; comment: string }) => {
        const res = await reviewAPI.create(payload);
        return res.data as Review;
    }
);

export const updateReview = createAsyncThunk(
    "reviews/update",
    async ({
        reviewId,
        payload,
    }: {
        reviewId: string;
        payload: { rating: number; comment: string };
    }) => {
        const res = await reviewAPI.update(reviewId, payload);
        return res.data as Review;
    }
);

export const deleteReview = createAsyncThunk(
    "reviews/delete",
    async (reviewId: string) => {
        await reviewAPI.delete(reviewId);
        return reviewId;
    }
);

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        clearReviews: (state) => {
            state.reviews = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductReviews.pending, (s) => {
                s.loading = true;
            })
            .addCase(fetchProductReviews.fulfilled, (s, a) => {
                s.loading = false;
                s.reviews = a.payload;
            })
            .addCase(createReview.fulfilled, (s, a) => {
                s.reviews.unshift(a.payload);
            })
            .addCase(updateReview.fulfilled, (s, a) => {
                s.reviews = s.reviews.map((r) =>
                    r._id === a.payload._id ? a.payload : r
                );
            })
            .addCase(deleteReview.fulfilled, (s, a) => {
                s.reviews = s.reviews.filter((r) => r._id !== a.payload);
            });
    },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
