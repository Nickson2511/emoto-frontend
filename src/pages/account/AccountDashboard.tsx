import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAccountDashboard } from "../../features/account/accountSlice";

interface StatCardProps {
    title: string;
    value: number;
}

const AccountDashboard = () => {

    const dispatch = useAppDispatch();

    const { user, stats, recentOrders } =
        useAppSelector((state) => state.account);

    useEffect(() => {
        dispatch(fetchAccountDashboard());
    }, [dispatch]);

    return (
        <div>

            <h1 className="text-xl sm:text-2xl font-bold mb-6">
                Welcome back {user?.name}
            </h1>

            {stats && (

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                    <StatCard title="Orders" value={stats.totalOrders} />

                    <StatCard title="Wishlist" value={stats.wishlistItems} />

                    <StatCard title="Addresses" value={stats.addresses} />

                    <StatCard title="Cart Items" value={stats.cartItems} />

                </div>
            )}

            <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Recent Orders
            </h2>

            <div className="space-y-4">

                {recentOrders?.map((order) => (

                    <div
                        key={order._id}
                        className="border p-4 rounded-lg shadow-sm"
                    >

                        <p className="font-medium text-sm sm:text-base">
                            Order ID: {order._id}
                        </p>

                        <p className="text-sm text-gray-600">
                            Total: KSh {order.totalAmount}
                        </p>

                        <p className="text-sm">
                            Status: {order.status}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
};

const StatCard = ({ title, value }: StatCardProps) => (
    <div className="bg-gray-50 p-4 rounded border text-center">

        <p className="text-sm text-gray-500">
            {title}
        </p>

        <p className="text-lg sm:text-xl font-bold">
            {value}
        </p>

    </div>
);

export default AccountDashboard;