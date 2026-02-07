import api from "./api";

/* ================= CATEGORIES ================= */

export const fetchCategories = async () => {
    const { data } = await api.get("/categories");
    return data;
};

export const createCategory = async (payload: { name: string }) => {
    const { data } = await api.post("/categories", payload);
    return data;
};

/* ================= SUBCATEGORIES ================= */

export const fetchSubCategoriesByCategory = async (categoryId: string) => {
    const { data } = await api.get(`/subcategories/${categoryId}`);
    return data;
};

export const createSubCategory = async (payload: {
    name: string;
    category: string;
}) => {
    const { data } = await api.post("/subcategories", payload);
    return data;
};
