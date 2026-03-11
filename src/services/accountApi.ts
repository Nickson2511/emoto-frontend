import api from "./api";
import type { Address } from "../types/address";



/**
 * Payload when creating a new address
 */
export interface CreateAddressPayload {
    fullName: string;
    phoneNumber: string;
    county: string;
    city: string;
    area: string;
    building?: string;
    landmark?: string;
    isDefault?: boolean;
}


export type UpdateAddressPayload = Partial<CreateAddressPayload>;

export const accountAPI = {
    /**
     * Get account dashboard info
     */
    getDashboard: () => api.get("/account"),

    /**
     * Get user orders
     */
    getOrders: () => api.get("/orders/my"),

    /**
     * Get saved addresses
     */
    getAddresses: () => api.get<Address[]>("/addresses"),

    /**
     * Create new address
     */
    createAddress: (data: CreateAddressPayload) =>
        api.post<Address>("/addresses", data),

    /**
     * Update address
     */
    updateAddress: (id: string, data: UpdateAddressPayload) =>
        api.patch<Address>(`/addresses/${id}`, data),

    /**
     * Delete address
     */
    deleteAddress: (id: string) => api.delete(`/addresses/${id}`),
};