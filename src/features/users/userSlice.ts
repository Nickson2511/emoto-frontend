import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "../../services/userAPI";
import type { IUser } from "./types";

interface UserState {
    users: IUser[];
    selectedUser: IUser | null;
    loading: boolean;
}

const initialState: UserState = {
    users: [],
    selectedUser: null,
    loading: false,
};

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const res = await userAPI.getAll();
    const allUsers = res.data.data as IUser[];
    const adminsOnly = allUsers.filter(u => u.role === "admin" || u.role === "superadmin");
    return adminsOnly;
});

export const fetchUserById = createAsyncThunk("users/fetchById", async (id: string) => {
    const res = await userAPI.getById(id);
    return res.data.data as IUser;
});

export const createAdmin = createAsyncThunk(
    "users/createAdmin",
    async (payload: { name: string; email: string; password: string }) => {
        const res = await userAPI.createAdmin(payload);
        return res.data.data as IUser;
    }
);

export const updateUser = createAsyncThunk(
    "users/update",
    async ({ id, payload }: { id: string; payload: Partial<IUser> & { password?: string } }) => {
        const res = await userAPI.update(id, payload);
        return res.data.data as IUser;
    }
);

export const deleteUser = createAsyncThunk("users/delete", async (id: string) => {
    await userAPI.remove(id);
    return id;
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (s) => { s.loading = true })
            .addCase(fetchUsers.fulfilled, (s, a) => {
                s.users = a.payload;
                s.loading = false;
            })
            .addCase(fetchUserById.fulfilled, (s, a) => { s.selectedUser = a.payload })
            .addCase(createAdmin.fulfilled, (s, a) => { s.users.push(a.payload) })
            .addCase(updateUser.fulfilled, (s, a) => {
                s.users = s.users.map(u => (u._id === a.payload._id ? a.payload : u));
            })
            .addCase(deleteUser.fulfilled, (s, a) => {
                s.users = s.users.filter(u => u._id !== a.payload);
            });
    }
});

export default userSlice.reducer;
