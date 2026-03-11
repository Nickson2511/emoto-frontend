import type { Product } from "../features/product/types";

export type Order = {
    _id: string;
    user?: {
        _id: string;
        name: string;
        email: string;
    };
    cartId: string;
    items: Array<{
        product: Product;
        quantity: number;
        price: number;
        _id: string;
    }>;
    totalAmount: number;
    status: string;
    shippingAddress: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
};
