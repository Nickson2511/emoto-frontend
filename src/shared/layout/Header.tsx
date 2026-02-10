import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import type { RootState } from '../../app/store';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

import SearchResults from '../components/search/SearchResults';
import SearchInput from '../components/search/SearchInput';
import type { ProductSearchParams } from '../../features/product/types';

import {
    Search,
    User,
    ShoppingCart,
    Heart,
    Package,
    LogOut
} from 'lucide-react';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector((state: RootState) => state.auth.user);

    /* ================= CART ================= */
    const cart = useAppSelector(state => state.cart.cart);
    const totalItems =
        cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

    /* ================= WISHLIST ================= */
    const wishlist = useAppSelector(state => state.wishlist);
    const wishlistCount = wishlist.products.length;

    /* ================= STATE ================= */
    const [accountOpen, setAccountOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const searchRef = useRef<HTMLDivElement | null>(null);

    const [searchParams, setSearchParams] = useState<ProductSearchParams>({
        search: '',
        sortBy: 'newest',
    });

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        setAccountOpen(false);
    };

    /* ================= CLOSE DROPDOWNS ================= */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setAccountOpen(false);
            }

            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="w-full bg-white border-b border-accent sticky top-0 z-50">
            {/* ================= TOP BAR ================= */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">

                {/* LOGO */}
                <div
                    className="text-2xl font-bold text-primary cursor-pointer whitespace-nowrap"
                    onClick={() => navigate('/')}
                >
                    eMotoParts
                </div>

                {/* ================= SEARCH (DESKTOP & TABLET) ================= */}
                <div
                    ref={searchRef}
                    className="relative flex-1 hidden md:flex items-center border border-accent rounded-lg bg-gray-50"
                >
                    <div className="px-3 text-gray-400">
                        <Search size={18} />
                    </div>

                    <SearchInput
                        value={searchParams.search}
                        onSearch={(value) => {
                            setSearchParams(prev => ({
                                ...prev,
                                search: value,
                            }));
                            setSearchOpen(!!value);
                        }}
                    />

                    {searchOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-accent rounded-lg shadow-lg z-50">
                            <SearchResults
                                params={searchParams}
                                onSelect={() => {
                                    setSearchOpen(false);
                                    setSearchParams({
                                        search: '',
                                        sortBy: 'newest',
                                    });
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* ================= RIGHT ACTIONS ================= */}
                <div className="flex items-center gap-3 sm:gap-5 ml-auto">

                    {/* MOBILE SEARCH ICON */}
                    <button
                        onClick={() => setSearchOpen(prev => !prev)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <Search size={20} />
                    </button>

                    {/* WISHLIST */}
                    <button
                        onClick={() => navigate('/wishlists')}
                        className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                        <Heart size={20} />
                        <span className="hidden sm:block text-sm font-medium">
                            Wishlist
                        </span>

                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {wishlistCount}
                            </span>
                        )}
                    </button>

                    {/* CART */}
                    <button
                        onClick={() => navigate('/cart')}
                        className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                        <ShoppingCart size={20} />
                        <span className="hidden sm:block text-sm font-medium">
                            Cart
                        </span>

                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {/* ACCOUNT */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setAccountOpen(prev => !prev)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
                        >
                            <User size={20} />
                            <span className="hidden sm:block text-sm font-medium">
                                {user ? user.name : 'Account'}
                            </span>
                        </button>

                        {accountOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white border border-accent rounded-lg shadow-lg overflow-hidden">
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
                                            onClick={() => navigate('/wishlists')}
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
                                                navigate('/login', {
                                                    state: { mode: 'register' },
                                                });
                                                setAccountOpen(false);
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ================= MOBILE SEARCH PANEL ================= */}
            {searchOpen && (
                <div className="md:hidden border-t border-accent bg-white px-4 py-3">
                    <div className="relative flex items-center border border-accent rounded-lg bg-gray-50">
                        <div className="px-3 text-gray-400">
                            <Search size={18} />
                        </div>

                        <SearchInput
                            value={searchParams.search}
                            onSearch={(value) => {
                                setSearchParams(prev => ({
                                    ...prev,
                                    search: value,
                                }));
                            }}
                        />
                    </div>

                    {searchParams.search && (
                        <div className="mt-2 bg-white border border-accent rounded-lg shadow-lg">
                            <SearchResults
                                params={searchParams}
                                onSelect={() => {
                                    setSearchOpen(false);
                                    setSearchParams({
                                        search: '',
                                        sortBy: 'newest',
                                    });
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
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


















