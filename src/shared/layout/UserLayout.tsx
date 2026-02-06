import { Outlet } from "react-router-dom";
import Header from "./Header";
import CategoriesBar from "./CategoriesBar";
import Footer from "./Footer";

const UserLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="sticky top-0 z-50">
                <Header />
                <CategoriesBar />
            </div>

            <main>
                <Outlet /> {/* USER PAGES render here */}
            </main>

            <Footer />
        </div>
    );
};

export default UserLayout;
