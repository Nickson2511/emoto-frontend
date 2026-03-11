import { Outlet } from "react-router-dom";
import AccountSidebar from "./AccountSidebar";

const AccountLayout = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <div className="flex flex-col lg:flex-row gap-6">

                {/* Sidebar */}
                <div className="lg:w-64 w-full">
                    <AccountSidebar />
                </div>

                {/* Content */}
                <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg border">
                    <Outlet />
                </div>

            </div>

        </div>
    );
};

export default AccountLayout;