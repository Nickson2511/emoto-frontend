import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchOrders, updateOrderStatus, cancelOrder, clearSuccess } from "../../features/order/orderSlice";
import SuccessModal from "../../shared/components/modals/SuccessModal";
import OrdersTable from "../../shared/components/admin/OrdersTable";

const AdminOrdersPage = () => {
    const dispatch = useAppDispatch();
    const { orders, loading, successMessage } = useAppSelector((s) => s.order);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const filteredOrders = useMemo(() => {
        return orders.filter((o) => {
            const matchesSearch =
                o._id.includes(search) ||
                o.cartId.includes(search) ||
                o.user?.name?.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter ? o.status === statusFilter : true;
            return matchesSearch && matchesStatus;
        });
    }, [orders, search, statusFilter]);

    const handleStatusChange = (orderId: string, status: string) => {
        setUpdatingOrderId(orderId);
        dispatch(updateOrderStatus({ orderId, status })).finally(() =>
            setUpdatingOrderId(null)
        );
    };

    const handleCancelOrder = (orderId: string) => {
        dispatch(cancelOrder(orderId));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">All Orders</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Search by Order ID, Cart ID, User"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                    value={statusFilter || ""}
                    onChange={(e) => setStatusFilter(e.target.value || null)}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders Table */}
            <OrdersTable
                orders={filteredOrders}
                loading={loading}
                onStatusChange={handleStatusChange}
                onCancelOrder={handleCancelOrder}
                updatingOrderId={updatingOrderId}
            />

            {/* Success Modal */}
            {successMessage && (
                <SuccessModal
                    message={successMessage}
                    onClose={() => dispatch(clearSuccess())}
                />
            )}
        </div>
    );
};

export default AdminOrdersPage;

















// import { useEffect, useState, useMemo } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks";
// import { fetchOrders, updateOrderStatus, cancelOrder, clearSuccess } from "../../features/order/orderSlice";

// //import { FiX, FiCheck } from "react-icons/fi";
// import SuccessModal from "../../shared/components/modals/SuccessModal";

// const AdminOrdersPage = () => {
//     const dispatch = useAppDispatch();
//     const { orders, loading, successMessage } = useAppSelector((s) => s.order);

//     const [search, setSearch] = useState("");
//     const [statusFilter, setStatusFilter] = useState<string | null>(null);
//     const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

//     useEffect(() => {
//         dispatch(fetchOrders());
//     }, [dispatch]);

//     const filteredOrders = useMemo(() => {
//         return orders.filter((o) => {
//             const matchesSearch =
//                 o._id.includes(search) ||
//                 o.cartId.includes(search) ||
//                 o.user?.name?.toLowerCase().includes(search.toLowerCase());
//             const matchesStatus = statusFilter ? o.status === statusFilter : true;
//             return matchesSearch && matchesStatus;
//         });
//     }, [orders, search, statusFilter]);

//     const handleStatusChange = (orderId: string, status: string) => {
//         setUpdatingOrderId(orderId);
//         dispatch(updateOrderStatus({ orderId, status })).finally(() => setUpdatingOrderId(null));
//     };

//     const handleCancelOrder = (orderId: string) => {
//         dispatch(cancelOrder(orderId));
//     };

//     return (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-bold">All Orders</h2>

//             {/* Filters */}
//             <div className="flex flex-wrap gap-4">
//                 <input
//                     type="text"
//                     placeholder="Search by Order ID, Cart ID, User"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="px-4 py-2 border rounded w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-primary"
//                 />
//                 <select
//                     value={statusFilter || ""}
//                     onChange={(e) => setStatusFilter(e.target.value || null)}
//                     className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
//                 >
//                     <option value="">All Status</option>
//                     <option value="pending">Pending</option>
//                     <option value="shipped">Shipped</option>
//                     <option value="delivered">Delivered</option>
//                     <option value="cancelled">Cancelled</option>
//                 </select>
//             </div>

//             {/* Orders Table */}
//             <div className="overflow-x-auto bg-white rounded-xl shadow">
//                 <table className="min-w-full text-sm">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="p-3 text-left">Order ID</th>
//                             <th className="p-3 text-left">User</th>
//                             <th className="p-3 text-left">Cart ID</th>
//                             <th className="p-3 text-center">Total</th>
//                             <th className="p-3 text-center">Status</th>
//                             <th className="p-3 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredOrders.map((order) => (
//                             <tr key={order._id} className="border-t hover:bg-gray-50">
//                                 <td className="p-3">{order._id}</td>
//                                 <td className="p-3">{order.user?.name || "Guest"}</td>
//                                 <td className="p-3">{order.cartId}</td>
//                                 <td className="p-3 text-center">${order.totalAmount}</td>
//                                 <td className="p-3 text-center capitalize">{order.status}</td>
//                                 <td className="p-3 flex gap-2 flex-wrap">
//                                     {order.status === "pending" && (
//                                         <>
//                                             <button
//                                                 onClick={() => handleStatusChange(order._id, "shipped")}
//                                                 disabled={updatingOrderId === order._id}
//                                                 className="px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
//                                             >
//                                                 Ship
//                                             </button>
//                                             <button
//                                                 onClick={() => handleCancelOrder(order._id)}
//                                                 className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </>
//                                     )}
//                                     {order.status === "shipped" && (
//                                         <button
//                                             onClick={() => handleStatusChange(order._id, "delivered")}
//                                             disabled={updatingOrderId === order._id}
//                                             className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700"
//                                         >
//                                             Deliver
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {loading && <p className="p-4 text-center text-gray-500">Loading orders...</p>}
//             </div>

//             {/* Success Modal */}
//             {successMessage && (
//                 <SuccessModal
//                     message={successMessage}
//                     onClose={() => dispatch(clearSuccess())}
//                 />
//             )}
//         </div>
//     );
// };

// export default AdminOrdersPage;
