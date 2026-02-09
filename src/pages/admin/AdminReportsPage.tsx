import { useMemo, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// ---------------------- MOCK DATA ---------------------

const MOCK_SALES_TREND = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [5000, 7000, 8000, 12000, 14000, 18000],
};

const MOCK_ORDER_STATUS = {
    labels: ["Pending", "Shipped", "Delivered", "Cancelled"],
    data: [32, 78, 120, 18],
};

const MOCK_REVENUE_BY_CATEGORY = {
    labels: ["Engine Parts", "Brakes", "Accessories", "Tires", "Electric"],
    data: [45000, 22000, 18000, 12000, 8000],
};

const MOCK_RECENT_STATS = [
    { metric: "Total Orders", value: 348 },
    { metric: "Total Revenue", value: "$145,230" },
    { metric: "New Customers", value: 104 },
    { metric: "Returns", value: 22 },
];

// ---------------------- COMPONENT ---------------------

const AdminReportsPage = () => {
    const [dateRange, setDateRange] = useState("Last 30 Days");

    const salesTrendData = useMemo(
        () => ({
            labels: MOCK_SALES_TREND.labels,
            datasets: [
                {
                    label: "Sales ($)",
                    data: MOCK_SALES_TREND.data,
                    borderColor: "#3B82F6",
                    backgroundColor: "#3B82F6",
                    fill: true,
                    tension: 0.3,
                },
            ],
        }),
        []
    );

    const orderStatusData = useMemo(
        () => ({
            labels: MOCK_ORDER_STATUS.labels,
            datasets: [
                {
                    label: "# Orders",
                    data: MOCK_ORDER_STATUS.data,
                    backgroundColor: ["#FBBF24", "#3B82F6", "#10B981", "#EF4444"],
                },
            ],
        }),
        []
    );

    const revenueCategoryData = useMemo(
        () => ({
            labels: MOCK_REVENUE_BY_CATEGORY.labels,
            datasets: [
                {
                    label: "Revenue",
                    data: MOCK_REVENUE_BY_CATEGORY.data,
                    backgroundColor: [
                        "#2563EB",
                        "#F59E0B",
                        "#10B981",
                        "#EF4444",
                        "#8B5CF6",
                    ],
                },
            ],
        }),
        []
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h2 className="text-2xl font-bold">Analytics & Reports</h2>
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>All Time</option>
                </select>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_RECENT_STATS.map((stat) => (
                    <div
                        key={stat.metric}
                        className="bg-white p-4 rounded-xl shadow flex flex-col justify-between"
                    >
                        <p className="text-sm text-gray-500">{stat.metric}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Sales Trend Chart */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-medium mb-4">Sales Trend</h3>
                <div className="h-64">
                    <Line
                        data={salesTrendData}
                        options={{
                            responsive: true,
                            plugins: { legend: { display: false } },
                        }}
                    />
                </div>
            </div>

            {/* Mixed Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Orders by Status */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-medium mb-4">Orders by Status</h3>
                    <div className="h-56">
                        <Bar
                            data={orderStatusData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Revenue Category Breakdown */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-medium mb-4">Revenue by Category</h3>
                    <div className="h-56">
                        <Pie
                            data={revenueCategoryData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: "bottom" },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Optional Recent Orders Table */}
            <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
                <h3 className="text-lg font-medium mb-2">Recent Orders Snapshot</h3>
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-2 text-left">Order ID</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-right">Revenue</th>
                            <th className="p-2 text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: "ORD-90021", status: "Delivered", revenue: "$1,250", date: "2026-02-11" },
                            { id: "ORD-90019", status: "Pending", revenue: "$520", date: "2026-02-10" },
                            { id: "ORD-90015", status: "Shipped", revenue: "$865", date: "2026-02-09" },
                        ].map((row) => (
                            <tr key={row.id} className="border-t hover:bg-gray-50">
                                <td className="p-2">{row.id}</td>
                                <td className="p-2 capitalize">{row.status}</td>
                                <td className="p-2 text-right">{row.revenue}</td>
                                <td className="p-2 text-right">{row.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminReportsPage;
