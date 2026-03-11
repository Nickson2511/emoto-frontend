import { NavLink } from "react-router-dom";

const AccountSidebar = () => {

    const linkClass =
        "block px-4 py-3 rounded hover:bg-gray-100 transition";

    return (
        <div className="bg-white border rounded-lg p-4">

            <h2 className="text-lg font-semibold mb-4">
                My Account
            </h2>

            <nav className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2">

                <NavLink to="/account" className={linkClass}>
                    Dashboard
                </NavLink>

                <NavLink to="/account/orders" className={linkClass}>
                    Orders
                </NavLink>

                <NavLink to="/account/addresses" className={linkClass}>
                    Addresses
                </NavLink>

                <NavLink to="/account/profile" className={linkClass}>
                    Profile
                </NavLink>

            </nav>

        </div>
    );
};

export default AccountSidebar;