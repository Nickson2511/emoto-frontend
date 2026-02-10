import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchMyOrders, cancelOrder } from "../../features/order/orderSlice";
import Header from "../../shared/layout/Header";
import Footer from "../../shared/layout/Footer";
import { FiPackage, FiX } from "react-icons/fi";
import SuccessModal from "../../shared/components/modals/SuccessModal";

const OrderPage = () => {
    const dispatch = useAppDispatch();
    const { orders, loading, successMessage } = useAppSelector(
        (state) => state.order
    );

    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    const handleCancel = (orderId: string, status: string) => {
        if (status === "shipped" || status === "delivered") return;
        dispatch(cancelOrder(orderId));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FiPackage />
                    My Orders
                </h1>

                {loading && (
                    <p className="text-center text-gray-600">
                        Loading your orders...
                    </p>
                )}

                {!loading && orders.length === 0 && (
                    <p className="text-center text-gray-500">
                        You have no orders yet.
                    </p>
                )}

                <div className="flex flex-col gap-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-lg shadow p-5"
                        >
                            {/* Order Header */}
                            <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
                                <div>
                                    <p className="font-semibold">
                                        Order #{order._id.slice(-6)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium w-fit
                                        ${order.status === "pending" && "bg-yellow-100 text-yellow-700"}
                                        ${order.status === "shipped" && "bg-blue-100 text-blue-700"}
                                        ${order.status === "delivered" && "bg-green-100 text-green-700"}
                                        ${order.status === "cancelled" && "bg-red-100 text-red-700"}
                                    `}
                                >
                                    {order.status.toUpperCase()}
                                </span>
                            </div>

                            {/* Items */}
                            <div className="divide-y">
                                {order.items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex gap-4 py-4 items-center"
                                    >
                                        <img
                                            src={item.product.images?.[0]}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />

                                        <div className="flex-1">
                                            <p className="font-medium">
                                                {item.product.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-semibold text-orange-600">
                                            KSh{" "}
                                            {(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                                <p className="font-bold text-lg">
                                    Total: KSh {order.totalAmount.toLocaleString()}
                                </p>

                                {order.status === "pending" && (
                                    <button
                                        onClick={() =>
                                            handleCancel(order._id, order.status)
                                        }
                                        className="flex items-center gap-2 text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50"
                                    >
                                        <FiX />
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />

            {successMessage && (
                <SuccessModal
                    message={successMessage}
                    onClose={() => dispatch({ type: "orders/clearSuccess" })}
                />
            )}
        </div>
    );
};

export default OrderPage;
