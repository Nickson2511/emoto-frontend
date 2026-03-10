import api from "./api";

export type Address = {
    _id: string;
    fullName: string;
    phoneNumber: string;
    county: string;
    city: string;
    area: string;
    building?: string;
    landmark?: string;
    isDefault?: boolean;
};

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