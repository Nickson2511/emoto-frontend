import api from "./api";
import type { IUser } from "../features/users/types";



export const userAPI = {
    getAll: async () => api.get("/users"),
    getById: async (id: string) => api.get(`/users/${id}`),
    createAdmin: async (payload: { name: string; email: string; password: string }) =>
        api.post("/users/create-admin", payload),
    update: async (id: string, payload: Partial<IUser> & { password?: string }) =>
        api.put(`/users/${id}`, payload),
    remove: async (id: string) => api.delete(`/users/${id}`),
    me: async () => api.get("/users/me"),
};