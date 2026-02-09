import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchUsers, deleteUser, updateUser, createAdmin } from "../../features/users/userSlice";
import type { IUser } from "../../features/users/types";
import { useOutletContext } from "react-router-dom";
import { FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import DeleteConfirmModal from "../../shared/components/modals/DeleteConfirmModal";
import SuccessModal from "../../shared/components/modals/SuccessModal";

// Charts
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminUsersPage = () => {
    const dispatch = useAppDispatch();
    const { users, loading } = useAppSelector((s) => s.users);
    const { setIsModalOpen } = useOutletContext<{ setIsModalOpen: (v: boolean) => void }>();

    const [search, setSearch] = useState("");
    const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
    const [deleting, setDeleting] = useState(false);

    const [editingUser, setEditingUser] = useState<IUser | null>(null);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Success modal state
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const adminUsers = useMemo(
        () =>
            users
                .filter((u) => u.role === "admin" || u.role === "superadmin")
                .filter(
                    (u) =>
                        u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase())
                ),
        [users, search]
    );

    // === CRUD HANDLERS ===
    const handleDelete = async () => {
        if (!userToDelete) return;
        setDeleting(true);
        try {
            await dispatch(deleteUser(userToDelete._id));
            setSuccessMessage(`${userToDelete.name} has been deleted successfully.`);
        } finally {
            setDeleting(false);
            setUserToDelete(null);
        }
    };

    const handleEditOpen = (user: IUser) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, password: "" });
        setIsFormOpen(true);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await dispatch(updateUser({ id: editingUser._id, payload: formData }));
                setSuccessMessage(`${formData.name} has been updated successfully.`);
            } else {
                await dispatch(createAdmin(formData));
                setSuccessMessage(`${formData.name} has been created successfully.`);
            }
        } finally {
            setEditingUser(null);
            setFormData({ name: "", email: "", password: "" });
            setIsFormOpen(false);
            setIsModalOpen(false);
        }
    };

    // === CHART DATA ===
    const roleDistribution = {
        labels: ["Super Admins", "Admins"],
        datasets: [
            {
                label: "Users",
                data: [
                    users.filter((u) => u.role === "superadmin").length,
                    users.filter((u) => u.role === "admin").length,
                ],
                backgroundColor: ["#F97316", "#3B82F6"],
                borderWidth: 1,
            },
        ],
    };

    const recentActivity = {
        labels: adminUsers.map((u) => u.name),
        datasets: [
            {
                label: "Joined Day of Month",
                data: adminUsers.map((u) => new Date(u.createdAt).getDate()),
                backgroundColor: "#10B981",
                borderRadius: 4,
            },
        ],
    };

    return (
        <div className="space-y-6">
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Admins", value: adminUsers.length, color: "text-gray-900" },
                    {
                        label: "Super Admins",
                        value: users.filter((u) => u.role === "superadmin").length,
                        color: "text-orange-500",
                    },
                    {
                        label: "Admins",
                        value: users.filter((u) => u.role === "admin").length,
                        color: "text-blue-500",
                    },
                ].map((card) => (
                    <div key={card.label} className="bg-white p-4 rounded-xl shadow flex flex-col">
                        <p className="text-sm text-gray-500">{card.label}</p>
                        <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                    </div>
                ))}

                <div className="bg-white p-4 rounded-xl shadow flex items-center justify-center">
                    <button
                        onClick={() => {
                            setEditingUser(null);
                            setFormData({ name: "", email: "", password: "" });
                            setIsFormOpen(true);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-white hover:bg-primary/80"
                    >
                        <FiPlus /> Add Admin
                    </button>
                </div>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-lg font-medium mb-2">Role Distribution</h3>
                    <div className="w-full h-64 sm:h-80 md:h-64">
                        <Pie
                            data={roleDistribution}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { position: "bottom" } },
                            }}
                        />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="text-lg font-medium mb-2">Recent Join Activity</h3>
                    <div className="w-full h-64 sm:h-80 md:h-64 overflow-x-auto">
                        <Bar
                            data={recentActivity}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: { y: { beginAtZero: true } },
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* SEARCH */}
            <div className="flex justify-start items-center">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search admins..."
                    className="border rounded-lg px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-center">Role</th>
                            <th className="p-3 text-center">Joined</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminUsers.map((user) => (
                            <tr key={user._id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3 text-center capitalize">{user.role}</td>
                                <td className="p-3 text-center">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-3 flex justify-center gap-3">
                                    <button
                                        onClick={() => handleEditOpen(user)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FiEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => setUserToDelete(user)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <p className="p-4 text-center text-gray-500">Loading admins...</p>}
            </div>

            {/* DELETE MODAL */}
            {userToDelete && (
                <DeleteConfirmModal
                    message={`Are you sure you want to delete ${userToDelete.name}? This action cannot be undone.`}
                    onCancel={() => setUserToDelete(null)}
                    onConfirm={handleDelete}
                    loading={deleting}
                />
            )}

            {/* SUCCESS MODAL */}
            {successMessage && (
                <SuccessModal
                    message={successMessage}
                    onClose={() => setSuccessMessage(null)}
                />
            )}

            {/* ADD/EDIT FORM MODAL */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => {
                            setIsFormOpen(false);
                            setEditingUser(null);
                            setIsModalOpen(false);
                        }}
                    />
                    <form
                        className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4 z-10"
                        onSubmit={handleFormSubmit}
                    >
                        <h3 className="text-lg font-bold">{editingUser ? "Edit Admin" : "Add Admin"}</h3>

                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            required={!editingUser}
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsFormOpen(false);
                                    setEditingUser(null);
                                    setIsModalOpen(false);
                                }}
                                className="px-4 py-2 rounded border hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/80">
                                {editingUser ? "Update" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminUsersPage;
