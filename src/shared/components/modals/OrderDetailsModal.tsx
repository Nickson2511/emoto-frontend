import type { Order } from "../../../services/orderAPI";

interface OrderDetailsModalProps {
    order: Order;
    onClose: () => void;
}

const OrderDetailsModal = ({ order, onClose }: OrderDetailsModalProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-11/12 max-w-2xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                >
                    ✕
                </button>
                <h3 className="text-xl font-bold mb-4">Order Details</h3>

                <p>
                    <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                    <strong>User:</strong> {order.user?.name || "Guest"} ({order.user?.email})
                </p>
                <p>
                    <strong>Cart ID:</strong> {order.cartId}
                </p>
                <p>
                    <strong>Total:</strong> ${order.totalAmount}
                </p>
                <p>
                    <strong>Status:</strong> {order.status}
                </p>
                <p>
                    <strong>Payment Method:</strong> {order.paymentMethod}
                </p>
                <p>
                    <strong>Shipping Address:</strong> {order.shippingAddress}
                </p>

                <h4 className="font-semibold mt-4">Items:</h4>
                <ul className="list-disc list-inside">
                    {order.items.map((item) => (
                        <li key={item._id}>
                            {item.product.name} x {item.quantity} (${item.price})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
