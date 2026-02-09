import { useState } from "react";
import type { Order } from "../../../services/orderAPI";
import OrderDetailsModal from "../modals/OrderDetailsModal";

interface OrdersTableProps {
    orders: Order[];
    loading: boolean;
    onStatusChange: (orderId: string, status: string) => void;
    onCancelOrder: (orderId: string) => void;
    updatingOrderId: string | null;
}

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};

const OrdersTable = ({
    orders,
    loading,
    onStatusChange,
    onCancelOrder,
    updatingOrderId,
}: OrdersTableProps) => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-3 text-left">Order ID</th>
                        <th className="p-3 text-left">User</th>
                        <th className="p-3 text-left">Cart ID</th>
                        <th className="p-3 text-center">Total</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr
                            key={order._id}
                            className="border-t hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedOrder(order)}
                        >
                            <td className="p-3">{order._id}</td>
                            <td className="p-3">{order.user?.name || "Guest"}</td>
                            <td className="p-3">{order.cartId}</td>
                            <td className="p-3 text-center">${order.totalAmount}</td>
                            <td className="p-3 text-center">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}
                                >
                                    {order.status}
                                </span>
                            </td>
                            <td className="p-3 flex gap-2 flex-wrap">
                                {order.status === "pending" && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onStatusChange(order._id, "shipped");
                                            }}
                                            disabled={updatingOrderId === order._id}
                                            className="px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Ship
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onCancelOrder(order._id);
                                            }}
                                            className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                                {order.status === "shipped" && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onStatusChange(order._id, "delivered");
                                        }}
                                        disabled={updatingOrderId === order._id}
                                        className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                                    >
                                        Deliver
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {loading && <p className="p-4 text-center text-gray-500">Loading orders...</p>}

            {/* Order details modal */}
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    );
};

export default OrdersTable;
