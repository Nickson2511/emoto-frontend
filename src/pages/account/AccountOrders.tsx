import { useEffect, useState } from "react";
import { accountAPI } from "../../services/accountApi";
import type { Order } from "../../types/order";

const AccountOrders = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadOrders = async () => {
            try {
                const res = await accountAPI.getOrders();
                setOrders(res.data);
            } catch (error) {
                console.error("Failed to load orders", error);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();

    }, []);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    return (
        <div>

            <h1 className="text-lg sm:text-xl font-semibold mb-6">
                My Orders
            </h1>

            {orders.length === 0 && (
                <p className="text-gray-500">
                    You have no orders yet.
                </p>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {orders.map((order) => (

                    <div
                        key={order._id}
                        className="border p-4 rounded-lg shadow-sm"
                    >

                        <p className="font-medium text-sm">
                            Order ID: {order._id}
                        </p>

                        <p className="text-sm text-gray-600">
                            Total: KSh {order.totalAmount}
                        </p>

                        <p className="text-sm">
                            Status: {order.status}
                        </p>

                        <p className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default AccountOrders;