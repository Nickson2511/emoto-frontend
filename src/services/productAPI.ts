import api from "./api";

export const fetchCategories = async () => {
    const { data } = await api.get("/categories");
    return data;
};


export const fetchSubCategories = async (categoryId: string) => {
    const { data } = await api.get(`/subcategories/${categoryId}`);
    return data;
};


export const createProduct = async (formData: FormData) => {
    const response = await api.post("/products/manage", formData);
    return response.data;
};
