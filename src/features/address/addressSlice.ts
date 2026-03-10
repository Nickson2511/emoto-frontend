import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressAPI from "../../services/addressAPI";
import type { Address } from "../../services/addressAPI";

interface AddressState {
    addresses: Address[];
    loading: boolean;
}

const initialState: AddressState = {
    addresses: [],
    loading: false,
};

export const fetchAddresses = createAsyncThunk(
    "address/fetch",
    async () => await addressAPI.fetchAddresses()
);

export const createAddress = createAsyncThunk(
    "address/create",
    async (data: Partial<Address>) => await addressAPI.createAddress(data)
);

export const updateAddress = createAsyncThunk(
    "address/update",
    async ({ id, data }: { id: string; data: Partial<Address> }) =>
        await addressAPI.updateAddress(id, data)
);

export const deleteAddress = createAsyncThunk(
    "address/delete",
    async (id: string) => {
        await addressAPI.deleteAddress(id);
        return id;
    }
);

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.addresses = action.payload;
            })
            .addCase(createAddress.fulfilled, (state, action) => {
                state.addresses.push(action.payload);
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.addresses = state.addresses.map((a) =>
                    a._id === action.payload._id ? action.payload : a
                );
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.addresses = state.addresses.filter(
                    (a) => a._id !== action.payload
                );
            });
    },
});

export default addressSlice.reducer;