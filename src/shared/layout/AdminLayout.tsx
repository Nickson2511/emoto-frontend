import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../features/auth/authSlice";
import api from "../../services/api";

import { FiLogOut } from "react-icons/fi";

import { useState } from "react";

const AdminLayout = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const handleLogout = async () => {
        try {
            // Call backend logout API
            await api.post("/auth/logout");

            // Clear Redux state and localStorage
            dispatch(logout());

            // Redirect to login page
            navigate("/admin/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold text-primary mb-6">
                        Admin ecommerce
                    </h2>

                    <nav className="space-y-1 text-sm">
                        {/* DASHBOARD */}
                        <NavLink
                            to="/admin"
                            end
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded ${isActive
                                    ? "bg-orange-100 text-primary"
                                    : "hover:bg-gray-100"
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>

                        {/* CATALOG */}
                        <button
                            onClick={() => toggleMenu("catalog")}
                            className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100"
                        >
                            <span>Catalog</span>
                            <span>▾</span>
                        </button>
                        {openMenu === "catalog" && (
                            <div className="ml-4 space-y-1">
                                <NavLink to="/admin/categories" className="block px-3 py-1 hover:underline">
                                    Categories
                                </NavLink>
                                <NavLink to="/admin/products" className="block px-3 py-1 hover:underline">
                                    Products
                                </NavLink>
                            </div>
                        )}

                        {/* ORDERS */}
                        <button
                            onClick={() => toggleMenu("orders")}
                            className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100"
                        >
                            <span>Orders</span>
                            <span>▾</span>
                        </button>
                        {openMenu === "orders" && (
                            <div className="ml-4 space-y-1">
                                <NavLink to="/admin/orders" className="block px-3 py-1 hover:underline">
                                    All Orders
                                </NavLink>
                                <NavLink to="/admin/returns" className="block px-3 py-1 hover:underline">
                                    Returns
                                </NavLink>
                            </div>
                        )}

                        {/* CUSTOMERS */}
                        <NavLink
                            to="/admin/customers"
                            className="block px-3 py-2 rounded hover:bg-gray-100"
                        >
                            Customers
                        </NavLink>

                        {/* REPORTS */}
                        <NavLink
                            to="/admin/reports"
                            className="block px-3 py-2 rounded hover:bg-gray-100"
                        >
                            Reports
                        </NavLink>

                        {/* ROLES & PERMISSIONS */}
                        <button
                            onClick={() => toggleMenu("roles")}
                            className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100"
                        >
                            <span>Roles & Permissions</span>
                            <span>▾</span>
                        </button>
                        {openMenu === "roles" && (
                            <div className="ml-4 space-y-1">
                                <NavLink to="/admin/users" className="block px-3 py-1 hover:underline">
                                    Users
                                </NavLink>
                                <NavLink to="/admin/settings" className="block px-3 py-1 hover:underline">
                                    Settings
                                </NavLink>
                            </div>
                        )}
                    </nav>
                </div>

                {/* LOGOUT */}

                <button
                    onClick={handleLogout}
                    className="mt-6 flex items-center gap-2 px-3 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                >
                    <FiLogOut size={18} />
                    <span>Logout</span>
                </button>


            </aside>

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col">
                {/* TOP PROFILE BAR */}
                <div className="bg-white border-b px-6 py-3 flex justify-end">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="profile"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium">Admin</span>
                    </div>
                </div>

                {/* PAGE CONTENT */}
                <main className="p-6 ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
