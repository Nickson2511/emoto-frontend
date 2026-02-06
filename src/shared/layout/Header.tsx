import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    User,
    ShoppingCart,
    Heart,
    Package,
    LogOut
} from 'lucide-react';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    const [accountOpen, setAccountOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        setAccountOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setAccountOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="w-full bg-white border-b border-accent sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">

                {/* LOGO */}
                <div
                    className="text-2xl font-bold text-primary cursor-pointer whitespace-nowrap"
                    onClick={() => navigate('/')}
                >
                    eMotoParts
                </div>

                {/* SEARCH (DESKTOP) */}
                <div className="flex-1 hidden md:flex items-center border border-accent rounded-lg overflow-hidden bg-gray-50">
                    <div className="px-3 text-gray-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search products, brands and categories"
                        className="flex-1 px-2 py-2 bg-transparent outline-none text-sm"
                    />
                    <button className="bg-primary text-white px-5 py-2 text-sm hover:bg-primary/90">
                        Search
                    </button>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex items-center gap-3 sm:gap-5 ml-auto">

                    {/* ACCOUNT */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setAccountOpen(prev => !prev)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 focus:outline-none"
                        >
                            <User size={20} />
                            <span className="hidden sm:block text-sm font-medium">
                                {user ? user.name : 'Account'}
                            </span>
                        </button>

                        {/* DROPDOWN */}
                        {accountOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white border border-accent rounded-lg shadow-lg overflow-hidden animate-fade-in">

                                {user ? (
                                    <>
                                        <DropdownItem
                                            icon={<User size={16} />}
                                            label="My Account"
                                            onClick={() => {
                                                navigate('/account');
                                                setAccountOpen(false);
                                            }}
                                        />
                                        <DropdownItem
                                            icon={<Package size={16} />}
                                            label="Orders"
                                            onClick={() => {
                                                navigate('/orders');
                                                setAccountOpen(false);
                                            }}
                                        />
                                        <DropdownItem
                                            icon={<Heart size={16} />}
                                            label="Wishlist"
                                            onClick={() => {
                                                navigate('/wishlists');
                                                setAccountOpen(false);
                                            }}
                                        />
                                        <div className="border-t">
                                            <DropdownItem
                                                icon={<LogOut size={16} />}
                                                label="Logout"
                                                danger
                                                onClick={handleLogout}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <DropdownItem
                                            label="Login"
                                            onClick={() => {
                                                navigate('/login');
                                                setAccountOpen(false);
                                            }}
                                        />
                                        <DropdownItem
                                            label="Register"
                                            onClick={() => {
                                                navigate('/register');
                                                setAccountOpen(false);
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* CART */}
                    <button
                        onClick={() => navigate('/cart')}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                        <ShoppingCart size={20} />
                        <span className="hidden sm:block text-sm font-medium">
                            Cart
                        </span>
                    </button>
                </div>
            </div>

            {/* SEARCH (MOBILE) */}
            <div className="md:hidden px-4 pb-3">
                <div className="flex items-center border border-accent rounded-lg overflow-hidden bg-gray-50">
                    <div className="px-3 text-gray-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="flex-1 px-2 py-2 bg-transparent outline-none text-sm"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;

/* ===================== */
/* REUSABLE DROPDOWN ITEM */
/* ===================== */

const DropdownItem = ({
    icon,
    label,
    onClick,
    danger = false,
}: {
    icon?: React.ReactNode;
    label: string;
    onClick: () => void;
    danger?: boolean;
}) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left
        ${danger ? 'text-red-600 hover:bg-red-50' : 'hover:bg-gray-100'}`}
    >
        {icon}
        <span>{label}</span>
    </button>
);






// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import type { RootState } from '../../app/store';
// import { logout } from '../../features/auth/authSlice';
// import { useNavigate } from 'react-router-dom';
// import { Search, User, ShoppingCart, Heart, Package } from 'lucide-react';

// const Header: React.FC = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const user = useSelector((state: RootState) => state.auth.user);

//     const handleLogout = () => {
//         dispatch(logout());
//         navigate('/');
//     };

//     return (
//         <header className="w-full border-b border-accent bg-white">
//             <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//                 <div className="text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>
//                     eMotoParts
//                 </div>

//                 <div className="flex-1 mx-4 hidden sm:flex items-center border border-accent rounded overflow-hidden">
//                     <div className="px-2 text-gray-400 flex items-center">
//                         <Search size={18} />
//                     </div>
//                     <input
//                         type="text"
//                         placeholder="Search products, brands and categories"
//                         className="flex-1 px-2 py-2 outline-none text-sm"
//                     />
//                     <button className="bg-primary text-white px-4">Search</button>
//                 </div>

//                 <div className="flex items-center gap-4">
//                     <div className="relative group cursor-pointer">
//                         <div className="flex items-center gap-1">
//                             <User size={20} />
//                             <span className="hidden md:block">{user ? user.name : 'Account'}</span>
//                         </div>

//                         {/* Dropdown */}
//                         {user ? (
//                             <div className="absolute hidden group-hover:block right-0 mt-2 w-48 bg-white border border-accent shadow-md">
//                                 <div
//                                     className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                                     onClick={() => navigate('/')}
//                                 >
//                                     <User size={16} />
//                                     <span>My Account</span>
//                                 </div>
//                                 <div
//                                     className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                                     onClick={() => navigate('/orders')}
//                                 >
//                                     <Package size={16} />
//                                     <span>Orders</span>
//                                 </div>
//                                 <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/wishlists')}>
//                                     <Heart size={16} />
//                                     <span>Wishlist</span>
//                                 </div>

//                                 <div
//                                     className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                                     onClick={handleLogout}
//                                 >
//                                     <span>Logout</span>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="absolute hidden group-hover:block right-0 mt-2 w-36 bg-white border border-accent shadow-md">
//                                 <div
//                                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                                     onClick={() => navigate('/login')}
//                                 >
//                                     Login / Register
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate('/cart')}>
//                         <ShoppingCart size={20} />
//                         <span className="hidden md:block">Cart</span>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;
