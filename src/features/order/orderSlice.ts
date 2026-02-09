import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderApi from "../../services/orderAPI";
import type { Order } from "../../services/orderAPI";

interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
    successMessage: null,
};

// -------------------- THUNKS --------------------

// Fetch all orders (Admin)
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
    return await orderApi.fetchAllOrders();
});

// Update order status (Admin)
export const updateOrderStatus = createAsyncThunk(
    "orders/updateStatus",
    async ({ orderId, status }: { orderId: string; status: string }) => {
        return await orderApi.updateOrderStatus(orderId, status);
    }
);

// Cancel order (Admin)
export const cancelOrder = createAsyncThunk(
    "orders/cancelOrder",
    async (orderId: string) => {
        return await orderApi.cancelOrder(orderId);
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearSuccess: (state) => {
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Orders
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch orders";
            })

            // Update Order Status
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.map((o) =>
                    o._id === action.payload._id ? action.payload : o
                );
                state.successMessage = `Order ${action.payload._id} status updated to ${action.payload.status}`;
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update status";
            })

            // Cancel Order
            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.map((o) =>
                    o._id === action.payload._id ? action.payload : o
                );
                state.successMessage = `Order ${action.payload._id} has been cancelled`;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to cancel order";
            });
    },
});

export const { clearSuccess } = orderSlice.actions;
export default orderSlice.reducer;
