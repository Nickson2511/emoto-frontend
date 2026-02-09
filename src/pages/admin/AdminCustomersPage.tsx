import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchUsers, deleteUser } from "../../features/users/userSlice";
import { FiTrash2, FiEye } from "react-icons/fi";
import ViewUserModal from "../../shared/components/modals/ViewUserModal";
import DeleteConfirmModal from "../../shared/components/modals/DeleteConfirmModal";
import type { IUser } from "../../features/users/types";
import { useOutletContext } from "react-router-dom";

const AdminCustomersPage = () => {
    const dispatch = useAppDispatch();
    const { users, loading } = useAppSelector((s) => s.users);

    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
    const [deleting, setDeleting] = useState(false);

    const { setIsModalOpen } = useOutletContext<{ setIsModalOpen: (v: boolean) => void }>();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const filtered = useMemo(
        () =>
            users.filter(
                (u) =>
                    u.name.toLowerCase().includes(search.toLowerCase()) ||
                    u.email.toLowerCase().includes(search.toLowerCase())
            ),
        [users, search]
    );

    const handleOpenModal = (user: IUser) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        if (!userToDelete) return;
        setDeleting(true);
        try {
            await dispatch(deleteUser(userToDelete._id));
        } finally {
            setDeleting(false);
            setUserToDelete(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Total Customers</p>
                    <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Customers</p>
                    <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Active Today</p>
                    <p className="text-2xl font-bold text-green-600">+8</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Growth</p>
                    <p className="text-2xl font-bold text-green-600">+12%</p>
                </div>
            </div>

            {/* SEARCH */}
            <div className="flex justify-between items-center">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search customers..."
                    className="border rounded-lg px-4 py-2 w-80"
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
                            <th className="p-3 text-center">Provider</th>
                            <th className="p-3 text-center">Joined</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((user) => (
                            <tr key={user._id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3 text-center capitalize">{user.role}</td>
                                <td className="p-3 text-center">{user.provider}</td>
                                <td className="p-3 text-center">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-3 flex justify-center gap-3">
                                    <button
                                        onClick={() => handleOpenModal(user)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FiEye size={18} />
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

                {loading && (
                    <p className="p-4 text-center text-gray-500">
                        Loading customers...
                    </p>
                )}
            </div>

            {/* VIEW USER MODAL */}
            {selectedUser && (
                <ViewUserModal
                    user={selectedUser}
                    onClose={handleCloseModal}
                />
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {userToDelete && (
                <DeleteConfirmModal
                    message={`Are you sure you want to delete ${userToDelete.name}? This action cannot be undone.`}
                    onCancel={() => setUserToDelete(null)}
                    onConfirm={handleDelete}
                    loading={deleting}
                />
            )}
        </div>
    );
};

export default AdminCustomersPage;
