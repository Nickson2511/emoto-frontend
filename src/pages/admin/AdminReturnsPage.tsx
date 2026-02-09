import { useState, useMemo } from "react";

type ReturnStatus = "pending" | "approved" | "rejected" | "refunded";

interface ReturnItem {
    id: string;
    orderId: string;
    customer: string;
    product: string;
    reason: string;
    amount: number;
    status: ReturnStatus;
    date: string;
}

const MOCK_RETURNS: ReturnItem[] = [
    {
        id: "RET-001",
        orderId: "ORD-90821",
        customer: "John Doe",
        product: "iPhone 13 Pro",
        reason: "Defective item",
        amount: 1200,
        status: "pending",
        date: "2026-02-01",
    },
    {
        id: "RET-002",
        orderId: "ORD-90811",
        customer: "Jane Smith",
        product: "MacBook Air M2",
        reason: "Wrong item delivered",
        amount: 1450,
        status: "approved",
        date: "2026-01-30",
    },
    {
        id: "RET-003",
        orderId: "ORD-90799",
        customer: "Michael Brown",
        product: "AirPods Pro",
        reason: "Changed mind",
        amount: 250,
        status: "refunded",
        date: "2026-01-28",
    },
];

const statusStyles: Record<ReturnStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-blue-100 text-blue-800",
    rejected: "bg-red-100 text-red-800",
    refunded: "bg-green-100 text-green-800",
};

const AdminReturnsPage = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<ReturnStatus | "">("");

    const filteredReturns = useMemo(() => {
        return MOCK_RETURNS.filter((r) => {
            const matchesSearch =
                r.orderId.toLowerCase().includes(search.toLowerCase()) ||
                r.customer.toLowerCase().includes(search.toLowerCase()) ||
                r.product.toLowerCase().includes(search.toLowerCase());

            const matchesStatus = statusFilter ? r.status === statusFilter : true;
            return matchesSearch && matchesStatus;
        });
    }, [search, statusFilter]);

    const stats = useMemo(() => {
        return {
            pending: MOCK_RETURNS.filter((r) => r.status === "pending").length,
            approved: MOCK_RETURNS.filter((r) => r.status === "approved").length,
            refunded: MOCK_RETURNS.filter((r) => r.status === "refunded").length,
        };
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-2xl font-bold">Returns Management</h2>
                <p className="text-sm text-gray-500">
                    Review, approve and manage customer returns
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard label="Pending Returns" value={stats.pending} color="yellow" />
                <StatCard label="Approved Returns" value={stats.approved} color="blue" />
                <StatCard label="Refunded" value={stats.refunded} color="green" />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search by order, customer or product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded w-full sm:max-w-sm focus:ring-2 focus:ring-primary"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ReturnStatus)}
                    className="px-4 py-2 border rounded w-full sm:w-48 focus:ring-2 focus:ring-primary"
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="refunded">Refunded</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left">Return ID</th>
                            <th className="p-3 text-left">Order</th>
                            <th className="p-3 text-left">Customer</th>
                            <th className="p-3 text-left">Product</th>
                            <th className="p-3 text-left">Reason</th>
                            <th className="p-3 text-center">Amount</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReturns.map((ret) => (
                            <tr key={ret.id} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-medium">{ret.id}</td>
                                <td className="p-3">{ret.orderId}</td>
                                <td className="p-3">{ret.customer}</td>
                                <td className="p-3">{ret.product}</td>
                                <td className="p-3 text-gray-600">{ret.reason}</td>
                                <td className="p-3 text-center">${ret.amount}</td>
                                <td className="p-3 text-center">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[ret.status]}`}
                                    >
                                        {ret.status}
                                    </span>
                                </td>
                                <td className="p-3 text-center space-x-2">
                                    {ret.status === "pending" && (
                                        <>
                                            <button className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700">
                                                Approve
                                            </button>
                                            <button className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700">
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {ret.status === "approved" && (
                                        <button className="px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700">
                                            Refund
                                        </button>
                                    )}
                                    {(ret.status === "refunded" || ret.status === "rejected") && (
                                        <span className="text-xs text-gray-400">No actions</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredReturns.length === 0 && (
                    <p className="p-6 text-center text-gray-500">
                        No returns match your filters
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminReturnsPage;

/* ---------- Small stat card ---------- */
const StatCard = ({
    label,
    value,
    color,
}: {
    label: string;
    value: number;
    color: "yellow" | "blue" | "green";
}) => {
    const colors = {
        yellow: "bg-yellow-100 text-yellow-800",
        blue: "bg-blue-100 text-blue-800",
        green: "bg-green-100 text-green-800",
    };

    return (
        <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            <div
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${colors[color]}`}
            >
                {label.split(" ")[0]}
            </div>
        </div>
    );
};
