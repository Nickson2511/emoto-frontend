import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Layouts */
import UserLayout from "../shared/layout/UserLayout";
import AdminLayout from "../shared/layout/AdminLayout";

/* Auth Guards */
import RequireAuth from "../features/auth/RequireAuth";
import RequireAdmin from "../features/auth/RequireAdmin";

/* Auth Pages */
import Login from "../pages/Login";

/* User Pages */
import Home from "../pages/Home";
import ProductsPage from "../pages/products/ProductsPage";
import ProductDetailsPage from "../pages/products/ProductDetailsPage";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import WishlistPage from "../pages/WishlistPage";
import OrderPage from "../pages/order/OrderPage";

/* Account Pages */
import AccountLayout from "../pages/account/AccountLayout";
import AccountDashboard from "../pages/account/AccountDashboard";
import AccountOrders from "../pages/account/AccountOrders";
import AccountAddresses from "../pages/account/AccountAddresses";
import AccountProfile from "../pages/account/AccountProfile";

/* Admin Pages */
import AdminDashboard from "../pages/AdminDashboard";
import AdminCreateProductPage from "../pages/AdminCreateProductPage";
import AdminCategoriesPage from "../pages/AdminCategoriesPage";
import AdminCustomersPage from "../pages/admin/AdminCustomersPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminReturnsPage from "../pages/admin/AdminReturnsPage";
import AdminReportsPage from "../pages/admin/AdminReportsPage";
import SettingsPage from "../pages/admin/AdminSettingsPage";

const AppRouter = () => {
    return (
        <BrowserRouter>

            <Routes>

                {/* AUTH */}
                <Route path="/login" element={<Login />} />

                {/* USER SIDE */}
                <Route path="/" element={<UserLayout />}>

                    {/* HOME */}
                    <Route index element={<Home />} />

                    {/* PRODUCTS */}
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="shop" element={<ProductsPage />} />
                    <Route path="products/:id" element={<ProductDetailsPage />} />

                    {/* CART */}
                    <Route path="cart" element={<CartPage />} />

                    {/* WISHLIST */}
                    <Route path="wishlists" element={<WishlistPage />} />

                    {/* ORDERS */}
                    <Route path="orders" element={<OrderPage />} />

                    {/* CHECKOUT (AUTH REQUIRED) */}
                    <Route
                        path="checkout"
                        element={
                            <RequireAuth>
                                <CheckoutPage />
                            </RequireAuth>
                        }
                    />

                    {/* ACCOUNT SECTION */}
                    <Route
                        path="account"
                        element={
                            <RequireAuth>
                                <AccountLayout />
                            </RequireAuth>
                        }
                    >
                        <Route index element={<AccountDashboard />} />
                        <Route path="orders" element={<AccountOrders />} />
                        <Route path="addresses" element={<AccountAddresses />} />
                        <Route path="profile" element={<AccountProfile />} />
                    </Route>

                </Route>

                {/* ADMIN SIDE */}
                <Route
                    path="/admin"
                    element={
                        <RequireAdmin>
                            <AdminLayout />
                        </RequireAdmin>
                    }
                >

                    {/* DASHBOARD */}
                    <Route index element={<AdminDashboard />} />

                    {/* PRODUCTS */}
                    <Route path="products" element={<AdminCreateProductPage />} />

                    {/* CATEGORIES */}
                    <Route path="categories" element={<AdminCategoriesPage />} />

                    {/* CUSTOMERS */}
                    <Route path="customers" element={<AdminCustomersPage />} />

                    {/* USERS */}
                    <Route path="users" element={<AdminUsersPage />} />

                    {/* ORDERS */}
                    <Route path="orders" element={<AdminOrdersPage />} />

                    {/* RETURNS */}
                    <Route path="returns" element={<AdminReturnsPage />} />

                    {/* REPORTS */}
                    <Route path="reports" element={<AdminReportsPage />} />

                    {/* SETTINGS */}
                    <Route path="settings" element={<SettingsPage />} />

                </Route>

            </Routes>

        </BrowserRouter>
    );
};

export default AppRouter;




