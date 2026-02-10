import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../product/types";
import type { RootState } from "../../app/store";
import api from "../../services/api";

export interface CartItem {
    product: Product;
    quantity: number;
    price: number;
    _id?: string;
}

export interface Cart {
    _id?: string;
    cartId: string;
    items: CartItem[];
    totalAmount?: number;
}

interface CartState {
    cart: Cart | null;
    loading: boolean;
    error?: string;
}

const initialState: CartState = {
    cart: null,
    loading: false,
};

const getCartId = (state: RootState) => {
    const user = state.auth.user;

    if (user) {
        // Use the logged-in user's unique ID as the cartId
        return `user_${user.id}`;
    }

    // Guest user logic
    let guestCartId = localStorage.getItem("guestCartId");
    if (!guestCartId) {
        guestCartId = `guest_${Date.now()}`;
        localStorage.setItem("guestCartId", guestCartId);
    }
    return guestCartId;
};

// const getCartId = () => {
//     let cartId = localStorage.getItem("cartId");
//     if (!cartId) {
//         cartId = `guest_${Date.now()}`;
//         localStorage.setItem("cartId", cartId);
//     }
//     return cartId;
// };

// Add item to cart

export const addToCart = createAsyncThunk(
    "cart/add",
    async ({ productId, quantity }: { productId: string; quantity: number }, { getState }) => {
        const state = getState() as RootState;
        const cartId = getCartId(state);
        const { data } = await api.post("/cart/add", { cartId, productId, quantity });
        return data;
    }
);
// export const addToCart = createAsyncThunk(
//     "cart/add",
//     async ({ productId, quantity }: { productId: string; quantity: number }) => {
//         const cartId = getCartId();
//         const { data } = await api.post("/cart/add", { cartId, productId, quantity });
//         return data;
//     }
// );

// Get cart
export const fetchCart = createAsyncThunk("cart/fetch", async (_, { getState }) => {
    const state = getState() as RootState;
    const cartId = getCartId(state);
    const { data } = await api.get(`/cart?cartId=${cartId}`);
    return data;
});

// export const fetchCart = createAsyncThunk("cart/fetch", async () => {
//     const cartId = getCartId();
//     const { data } = await api.get(`/cart?cartId=${cartId}`);
//     return data;
// });

// Update item quantity
export const updateCartItem = createAsyncThunk(
    "cart/update",
    async ({ productId, quantity }: { productId: string; quantity: number }, { getState }) => {
        const state = getState() as RootState;
        const cartId = getCartId(state);
        const { data } = await api.patch("/cart/update", { cartId, productId, quantity });
        return data;
    }
);

// Remove item

export const removeCartItem = createAsyncThunk(
    "cart/remove",
    async (productId: string, { getState }) => {
        const state = getState() as RootState;
        const cartId = getCartId(state);
        const { data } = await api.delete("/cart/remove", {
            data: { cartId, productId },
        });
        return data;
    }
);
// export const removeCartItem = createAsyncThunk(
//     "cart/remove",
//     async (productId: string) => {
//         const cartId = getCartId();
//         const { data } = await api.delete("/cart/remove", { data: { cartId, productId } });
//         return data;
//     }
// );

// Clear cart

export const clearCart = createAsyncThunk("cart/clear", async (_, { getState }) => {
    const state = getState() as RootState;
    const cartId = getCartId(state);
    const { data } = await api.delete("/cart/clear", { data: { cartId } });
    return data;
});
// export const clearCart = createAsyncThunk("cart/clear", async () => {
//     const cartId = getCartId();
//     const { data } = await api.delete("/cart/clear", { data: { cartId } });
//     return data;
// });

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => { state.loading = true; })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
                state.cart = action.payload;
                state.loading = false;
            })
            .addCase(addToCart.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

            .addCase(fetchCart.pending, (state) => { state.loading = true; })
            .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart>) => { state.cart = action.payload; state.loading = false; })
            .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

            .addCase(updateCartItem.fulfilled, (state, action: PayloadAction<Cart>) => { state.cart = action.payload; })
            .addCase(removeCartItem.fulfilled, (state, action: PayloadAction<Cart>) => { state.cart = action.payload; })
            .addCase(clearCart.fulfilled, (state) => { state.cart = null; });
    },
});

export default cartSlice.reducer;
