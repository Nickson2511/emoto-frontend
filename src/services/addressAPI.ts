import api from "./api";
import type { Address } from "../types/address";



export const fetchAddresses = async () => {
    const { data } = await api.get("/addresses");
    return data;
};

export const createAddress = async (address: Partial<Address>) => {
    const { data } = await api.post("/addresses", address);
    return data;
};

export const updateAddress = async (id: string, address: Partial<Address>) => {
    const { data } = await api.patch(`/addresses/${id}`, address);
    return data;
};

export const deleteAddress = async (id: string) => {
    const { data } = await api.delete(`/addresses/${id}`);
    return data;
};

const addressAPI = {
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
};

export default addressAPI;