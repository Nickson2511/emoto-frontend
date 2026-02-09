import api from "./api";
import type { Product } from "../features/product/types";

// -------------------- USER ENDPOINTS --------------------

// Create a new order (checkout)
export const createOrder = async ({
    cartId,
    shippingAddress,
    paymentMethod,
}: {
    cartId: string;
    shippingAddress: string;
    paymentMethod: string;
}) => {
    if (!cartId) throw new Error("Cart ID is missing");
    const { data } = await api.post("/orders/create", {
        cartId,
        shippingAddress,
        paymentMethod,
    });
    return data;
};

// Initiate M-Pesa payment
export const initiateMpesaPayment = async ({
    orderId,
    phoneNumber,
}: {
    orderId: string;
    phoneNumber: string;
}) => {
    const { data } = await api.post("/checkout/mpesa", {
        orderId,
        phoneNumber,
    });
    return data;
};

// Fetch all orders for logged-in user
export const fetchMyOrders = async () => {
    const { data } = await api.get("/orders/my");
    return data;
};

// Fetch single order by ID
export const fetchOrderById = async (orderId: string) => {
    const { data } = await api.get(`/orders/${orderId}`);
    return data;
};

// Cancel order (user or admin)
export const cancelOrder = async (orderId: string) => {
    const { data } = await api.patch(`/orders/cancel/${orderId}`);
    return data;
};

// -------------------- ADMIN ENDPOINTS --------------------

// Get all orders (Admin)
export const fetchAllOrders = async () => {
    const { data } = await api.get("/orders/admin/all");
    return data;
};

// Update order status (Admin)
export const updateOrderStatus = async (orderId: string, status: string) => {
    const { data } = await api.patch(`/orders/admin/status/${orderId}`, { status });
    return data;
};


const orderApi = {
    createOrder,
    initiateMpesaPayment,
    fetchMyOrders,
    fetchOrderById,
    cancelOrder,
    fetchAllOrders,
    updateOrderStatus,
};

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

export default orderApi;




// import api from "./api";

// // Create a new order
// export const createOrder = async ({
//     cartId,
//     shippingAddress,
//     paymentMethod,
// }: {
//     cartId: string;
//     shippingAddress: string;
//     paymentMethod: string;
//     }) => {
//     if (!cartId) throw new Error("Cart ID is missing");
//     const { data } = await api.post("/orders/create", {
//         cartId,
//         shippingAddress,
//         paymentMethod,
//     });
//     return data;
// };

// // Initiate M-Pesa payment
// export const initiateMpesaPayment = async ({
//     orderId,
//     phoneNumber,
// }: {
//     orderId: string;
//     phoneNumber: string;
// }) => {
//     const { data } = await api.post("/checkout/mpesa", {
//         orderId,
//         phoneNumber,
//     });
//     return data;
// };

// // Fetch all 
// export const fetchOrders = async () => {
//     const { data } = await api.get("/orders");
//     return data;
// };

// // Fetch single order by ID 
// export const fetchOrderById = async (orderId: string) => {
//     const { data } = await api.get(`/orders/${orderId}`);
//     return data;
// };
