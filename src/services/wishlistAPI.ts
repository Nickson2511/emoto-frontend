import api from "./api";

/* ================= ADD TO WISHLIST ================= */
export const addToWishlistAPI = async (productId: string) => {
    const { data } = await api.post("/wishlists", { productId });
    return data;
};

/* ================= GET WISHLIST ================= */
export const fetchWishlistAPI = async () => {
    const { data } = await api.get("/wishlists");
    return data;
};

/* ================= REMOVE ONE PRODUCT ================= */
export const removeFromWishlistAPI = async (productId: string) => {
    const { data } = await api.delete(`/wishlist/${productId}`);
    return data;
};

/* ================= CLEAR WISHLIST ================= */
export const clearWishlistAPI = async () => {
    const { data } = await api.delete("/wishlist");
    return data;
};
