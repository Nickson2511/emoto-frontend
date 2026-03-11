import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { accountAPI } from "../../services/accountApi";
import type { AccountState } from "./types";
import type { User } from "../users/types";
import type { Address } from "../../types/address";
import type { Order } from "../../types/order";
import type { AccountStats } from "./types";

interface DashboardResponse {
    user: User;
    stats: AccountStats;
    defaultAddress: Address | null;
    recentOrders: Order[];
}

const initialState: AccountState = {
    user: null,
    stats: null,
    defaultAddress: null,
    recentOrders: [],
    loading: false,
};

export const fetchAccountDashboard = createAsyncThunk<
    DashboardResponse
>(
    "account/dashboard",
    async () => {
        const res = await accountAPI.getDashboard();
        return res.data.data;
    }
);

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAccountDashboard.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchAccountDashboard.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.stats = action.payload.stats;
            state.defaultAddress = action.payload.defaultAddress;
            state.recentOrders = action.payload.recentOrders;
        });

        builder.addCase(fetchAccountDashboard.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default accountSlice.reducer;