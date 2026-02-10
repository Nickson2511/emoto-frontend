import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from "../shared/layout/UserLayout";
import AdminLayout from "../shared/layout/AdminLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import RequireAdmin from "../features/auth/RequireAdmin";
import AdminDashboard from "../pages/AdminDashboard";
import AdminCreateProductPage from "../pages/AdminCreateProductPage";
import AdminCategoriesPage from "../pages/AdminCategoriesPage";
import ProductsPage from "../pages/products/ProductsPage";
import ProductDetailsPage from "../pages/products/ProductDetailsPage";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import RequireAuth from "../features/auth/RequireAuth";
import AdminCustomersPage from "../pages/admin/AdminCustomersPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminReturnsPage from "../pages/admin/AdminReturnsPage";
import AdminReportsPage from "../pages/admin/AdminReportsPage";
import SettingsPage from "../pages/admin/AdminSettingsPage";
import WishlistPage from "../pages/WishlistPage";
import OrderPage from "../pages/order/OrderPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* AUTH */}
                <Route path="/login" element={<Login />} />

                {/* USER SIDE */}
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/shop" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlists" element={<WishlistPage />} />
                <Route path="/orders" element={<OrderPage />} />


                <Route
                    path="/checkout"
                    element={
                        <RequireAuth>
                            <CheckoutPage />
                        </RequireAuth>
                    }
                />


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

                    <Route path="categories" element={<AdminCategoriesPage />} />

                    { /* USERS */}
                    <Route path="customers" element={<AdminCustomersPage />} />
                    <Route path="users" element={<AdminUsersPage />} />

                    {/*Orders */}
                    <Route path="orders" element={<AdminOrdersPage />} />

                    { /* Returns */}
                    <Route path="returns" element={<AdminReturnsPage />} />

                    {/* Report */}

                    <Route path="reports" element={<AdminReportsPage />} />

                    { /* Settings */}
                    <Route path="settings" element={<SettingsPage />} />



                    {/* (Optional later) */}

                    {/* <Route path="orders" element={<AdminOrdersPage />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
