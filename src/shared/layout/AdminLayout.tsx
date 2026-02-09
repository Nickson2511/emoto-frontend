import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../features/auth/authSlice";
import api from "../../services/api";
import { FiLogOut, FiMenu, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

// Lucide icons
import {
    LayoutDashboard,
    Boxes,
    Tags,
    Package,
    ShoppingCart,
    ClipboardList,
    Undo2,
    Users,
    BarChart3,
    Shield,
    UserCog,
    Settings,
} from "lucide-react";

const AdminLayout = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true); // sidebar collapsed/expanded
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // small screen sidebar
    const [setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            dispatch(logout());
            navigate("/admin/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navItemBase = "flex items-center gap-3 px-3 py-2 rounded transition";

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* MOBILE SIDEBAR OVERLAY */}
            <div
                className={`fixed inset-0 z-50 md:hidden bg-black bg-opacity-30 transition-opacity ${mobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setMobileSidebarOpen(false)}
            />

            {/* SIDEBAR */}
            <aside
                className={`fixed z-50 top-0 left-0 h-full bg-white border-r p-4 flex flex-col justify-between transition-transform
          ${sidebarOpen ? "w-64" : "w-16"} 
          md:translate-x-0
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    {sidebarOpen && <h2 className="text-xl font-bold text-primary">Admin Ecommerce</h2>}
                    <button
                        className="md:hidden text-gray-700 hover:text-gray-900"
                        onClick={() => setMobileSidebarOpen(false)}
                    >
                        <FiChevronLeft size={24} />
                    </button>
                </div>

                {/* NAVIGATION */}
                <nav className="flex-1 flex flex-col">
                    {/* DASHBOARD - STAYS AT TOP */}
                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            `${navItemBase} ${isActive ? "bg-orange-100 text-primary" : "hover:bg-gray-100"}`
                        }
                    >
                        <LayoutDashboard size={18} />
                        {sidebarOpen && "Dashboard"}
                    </NavLink>

                    {/* REST OF MENU ITEMS - PUSHED DOWN */}
                    <div className="mt-6 flex-1 flex flex-col justify-start space-y-1 text-sm">
                        {/* Catalog */}
                        <button
                            onClick={() => toggleMenu("catalog")}
                            className={`${navItemBase} w-full justify-between hover:bg-gray-100`}
                        >
                            <span className="flex items-center gap-3">
                                <Boxes size={18} />
                                {sidebarOpen && "Catalog"}
                            </span>
                        </button>
                        {openMenu === "catalog" && sidebarOpen && (
                            <div className="ml-7 space-y-1">
                                <NavLink
                                    to="/admin/categories"
                                    className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
                                >
                                    <Tags size={16} />
                                    Categories
                                </NavLink>
                                <NavLink
                                    to="/admin/products"
                                    className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
                                >
                                    <Package size={16} />
                                    Products
                                </NavLink>
                            </div>
                        )}

                        {/* Orders */}
                        <button
                            onClick={() => toggleMenu("orders")}
                            className={`${navItemBase} w-full justify-between hover:bg-gray-100`}
                        >
                            <span className="flex items-center gap-3">
                                <ShoppingCart size={18} />
                                {sidebarOpen && "Orders"}
                            </span>
                        </button>
                        {openMenu === "orders" && sidebarOpen && (
                            <div className="ml-7 space-y-1">
                                <NavLink
                                    to="/admin/orders"
                                    className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
                                >
                                    <ClipboardList size={16} />
                                    All Orders
                                </NavLink>
                                <NavLink
                                    to="/admin/returns"
                                    className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
                                >
                                    <Undo2 size={16} />
                                    Returns
                                </NavLink>
                            </div>
                        )}

                        {/* Customers */}
                        <NavLink
                            to="/admin/customers"
                            className={({ isActive }) =>
                                `${navItemBase} ${isActive ? "bg-orange-100 text-primary" : "hover:bg-gray-100"}`
                            }
                        >
                            <Users size={18} />
                            {sidebarOpen && "Customers"}
                        </NavLink>

                        {/* Reports */}
                        <NavLink
                            to="/admin/reports"
                            className={({ isActive }) =>
                                `${navItemBase} ${isActive ? "bg-orange-100 text-primary" : "hover:bg-gray-100"}`
                            }
                        >
                            <BarChart3 size={18} />
                            {sidebarOpen && "Reports"}
                        </NavLink>

                        {/* Roles */}
                        <button
                            onClick={() => toggleMenu("roles")}
                            className={`${navItemBase} w-full justify-between hover:bg-gray-100`}
                        >
                            <span className="flex items-center gap-3">
                                <Shield size={18} />
                                {sidebarOpen && "Roles & Permissions"}
                            </span>
                        </button>
                        {openMenu === "roles" && sidebarOpen && (
                            <div className="ml-7 space-y-1">
                                <NavLink
                                    to="/admin/users"
                                    className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
                                >
                                    <UserCog size={16} />
                                    Users
                                </NavLink>
                                <NavLink
                                    to="/admin/settings"
                                    className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
                                >
                                    <Settings size={16} />
                                    Settings
                                </NavLink>
                            </div>
                        )}
                    </div>
                </nav>

                {/* LOGOUT */}
                <button
                    onClick={handleLogout}
                    className="mt-6 flex items-center gap-2 px-3 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                >
                    <FiLogOut size={18} />
                    {sidebarOpen && "Logout"}
                </button>

                {/* SIDEBAR TOGGLE */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-0 p-1 bg-gray-200 rounded-l hover:bg-gray-300 hidden md:flex"
                >
                    {sidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
                </button>
            </aside>

            {/* MAIN AREA */}
            <div className={`flex-1 flex flex-col transition-all ${sidebarOpen ? "md:ml-64" : "md:ml-16"}`}>
                {/* TOP BAR */}
                <div className="bg-white border-b px-6 py-3 flex justify-between md:justify-end">
                    <button
                        className="md:hidden text-gray-700 hover:text-gray-900"
                        onClick={() => setMobileSidebarOpen(true)}
                    >
                        <FiMenu size={24} />
                    </button>
                    <div className="flex items-center gap-2">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="profile"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium">Admin</span>
                    </div>
                </div>

                {/* CONTENT */}
                <main className="p-6">
                    <Outlet context={{ setIsModalOpen }} />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
