import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "../shared/layout/UserLayout";
import AdminLayout from "../shared/layout/AdminLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RequireAdmin from "../features/auth/RequireAdmin";
import AdminDashboard from "../pages/AdminDashboard";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* USER SIDE */}
                <Route
                    path="/"
                    element={

                        <UserLayout />

                    }
                >
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
                    <Route index element={<AdminDashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
