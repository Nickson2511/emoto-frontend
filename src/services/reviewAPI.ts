import api from "./api";

export const reviewAPI = {
    create: (payload: { productId: string; rating: number; comment: string }) =>
        api.post("/reviews", payload),

    getByProduct: (productId: string) =>
        api.get(`/reviews/product/${productId}`),

    update: (reviewId: string, payload: { rating: number; comment: string }) =>
        api.patch(`/reviews/${reviewId}`, payload),

    delete: (reviewId: string) =>
        api.delete(`/reviews/${reviewId}`),
};
