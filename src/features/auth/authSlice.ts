import { createSlice, } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'admin' | 'superadmin';
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
}

const savedAuth = localStorage.getItem("auth");

const initialState: AuthState = savedAuth
    ? JSON.parse(savedAuth)
    : {
        user: null,
        accessToken: null,
    };


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem("auth");
            localStorage.removeItem("guestCartId");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;







