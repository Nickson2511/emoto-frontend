import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from "../shared/layout/UserLayout";
import AdminLayout from "../shared/layout/AdminLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import RequireAdmin from "../features/auth/RequireAdmin";
import AdminDashboard from "../pages/AdminDashboard";
import AdminCreateProductPage from "../pages/AdminCreateProductPage";
import AdminCategoriesPage from "../pages/AdminCategoriesPage";

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


                    {/* (Optional later) */}
                    {/* <Route path="categories" element={<AdminCategoriesPage />} /> */}
                    {/* <Route path="orders" element={<AdminOrdersPage />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
