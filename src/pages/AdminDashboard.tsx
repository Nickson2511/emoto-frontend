import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

// ===== STAT CARD =====
const StatCard = ({ title, value }: { title: string; value: string }) => (
    <div className="bg-white p-5 rounded shadow-sm">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
);

// ===== CHART DATA =====
const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
        {
            label: "Sales (KSh)",
            data: [12000, 19000, 15000, 22000, 30000, 28000, 35000],
            borderColor: "#f97316",
            backgroundColor: "rgba(249,115,22,0.3)",
            tension: 0.4,
        },
    ],
};

const AdminDashboard = () => {
    return (
        <div className="space-y-6">

            {/* ===== STATS ROW ===== */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Sales" value="KSh 1,926,058" />
                <StatCard title="Total Orders" value="8,790" />
                <StatCard title="Products" value="567" />
                <StatCard title="Customers" value="1,240" />
            </div>

            {/* ===== CHART + ORDER STATUS ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* CHART */}
                <div className="bg-white p-6 rounded shadow-sm lg:col-span-2">
                    <h3 className="font-semibold mb-4">Sales Statistics</h3>
                    <div className="h-64">
                        <Line data={salesData} />
                    </div>
                </div>

                {/* ORDER STATUS */}
                <div className="bg-white p-6 rounded shadow-sm">
                    <h3 className="font-semibold mb-4">Order Status</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between"><span>Pending</span><span>24</span></li>
                        <li className="flex justify-between"><span>Paid</span><span>180</span></li>
                        <li className="flex justify-between"><span>Shipped</span><span>92</span></li>
                        <li className="flex justify-between"><span>Delivered</span><span>340</span></li>
                        <li className="flex justify-between text-red-500"><span>Cancelled</span><span>5</span></li>
                    </ul>
                </div>
            </div>

            {/* ===== RECENT ORDERS + LOW STOCK ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* RECENT ORDERS */}
                <div className="bg-white p-6 rounded shadow-sm">
                    <h3 className="font-semibold mb-4">Recent Orders</h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="pb-2">Order</th>
                                <th>Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td>#1023</td>
                                <td className="text-orange-500">Pending</td>
                                <td>KSh 3,200</td>
                            </tr>
                            <tr className="border-b">
                                <td>#1022</td>
                                <td className="text-green-600">Paid</td>
                                <td>KSh 8,500</td>
                            </tr>
                            <tr>
                                <td>#1021</td>
                                <td className="text-blue-600">Delivered</td>
                                <td>KSh 1,200</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* LOW STOCK */}
                <div className="bg-white p-6 rounded shadow-sm">
                    <h3 className="font-semibold mb-4 text-red-600">Low Stock Alerts</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                            <span>Brake Pads</span>
                            <span className="text-red-500">3 left</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Motorcycle Battery</span>
                            <span className="text-red-500">2 left</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Chain Set</span>
                            <span className="text-red-600 font-semibold">Out of stock</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ===== TOP PRODUCTS + REVIEWS ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* TOP PRODUCTS */}
                <div className="bg-white p-6 rounded shadow-sm">
                    <h3 className="font-semibold mb-4">Top Selling Products</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                            <span>Disc Brake Pads</span>
                            <span>120 sold</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Motorcycle Battery</span>
                            <span>95 sold</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Oil Filter</span>
                            <span>88 sold</span>
                        </li>
                    </ul>
                </div>

                {/* REVIEWS */}
                <div className="bg-white p-6 rounded shadow-sm">
                    <h3 className="font-semibold mb-4">Latest Reviews</h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <p className="font-medium">Brake pads are great</p>
                            <span className="text-yellow-500">⭐⭐⭐⭐</span>
                        </li>
                        <li>
                            <p className="font-medium">Battery arrived late</p>
                            <span className="text-yellow-500">⭐⭐</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ===== QUICK ACTIONS ===== */}
            <div className="bg-white p-6 rounded shadow-sm">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Add Product
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        View Orders
                    </button>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                        Update Stock
                    </button>
                    <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black">
                        Export Report
                    </button>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;









