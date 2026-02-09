import api from "./api";

export const fetchCategories = async () => {
    const { data } = await api.get("/categories");
    return data;
};

export const fetchProducts = async () => {
    const { data } = await api.get("/products");
    return data;
}


export const fetchSubCategories = async (categoryId: string) => {
    const { data } = await api.get(`/subcategories/${categoryId}`);
    return data;
};


export const createProduct = async (formData: FormData) => {
    const response = await api.post("/products/manage", formData);
    return response.data;
};

export const fetchProductById = async (id: string) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};


export const searchProducts = async (query: string) => {
    const { data } = await api.get(
        `/products?search=${encodeURIComponent(query)}`
    );
    return data;
};
