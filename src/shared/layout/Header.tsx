import React from "react"
import { Search, User, ShoppingCart, Heart, Package } from "lucide-react"

const Header: React.FC = () => {
    return (
        <header className="w-full border-b border-accent bg-white">

            {/* CENTERED CONTAINER (like Jumia) */}
            <div className="max-w-7xl mx-auto px-4 py-3">

                {/* TOP ROW */}
                <div className="flex items-center justify-between gap-4">

                    {/* LOGO */}
                    <div className="text-2xl font-bold text-primary">
                        eMotoParts
                    </div>

                    {/* SEARCH BAR (hidden on very small screens) */}
                    <div className="hidden sm:flex flex-1 max-w-xl border border-accent rounded-md overflow-hidden">

                        {/* icon inside input */}
                        <div className="px-2 text-gray-400 flex items-center">
                            <Search size={18} />
                        </div>

                        <input
                            type="text"
                            placeholder="Search products, brands and categories"
                            className="flex-1 px-2 py-2 outline-none text-sm"
                        />

                        <button className="bg-primary text-white px-4">
                            Search
                        </button>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-4">

                        {/* ACCOUNT */}
                        <div className="relative group cursor-pointer">

                            <div className="flex items-center gap-1">
                                <User size={20} />
                                <span className="hidden md:block">Account</span>
                            </div>

                            {/* DROPDOWN */}
                            <div className="absolute hidden group-hover:block right-0 mt-2 w-48 bg-white border border-accent shadow-md">

                                <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                                    <User size={16} />
                                    <span>My Account</span>
                                </div>

                                <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                                    <Package size={16} />
                                    <span>Orders</span>
                                </div>

                                <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                                    <Heart size={16} />
                                    <span>Wishlist</span>
                                </div>

                            </div>
                        </div>

                        {/* CART */}
                        <div className="flex items-center gap-1 cursor-pointer">
                            <ShoppingCart size={20} />
                            <span className="hidden md:block">Cart</span>
                        </div>

                    </div>
                </div>

                {/* MOBILE SEARCH (appears under header on small screens) */}
                <div className="mt-3 sm:hidden flex border border-accent rounded-md overflow-hidden">

                    <div className="px-2 text-gray-400 flex items-center">
                        <Search size={18} />
                    </div>

                    <input
                        type="text"
                        placeholder="Search products, brands and categories"
                        className="flex-1 px-2 py-2 outline-none text-sm"
                    />

                    <button className="bg-primary text-white px-4">
                        Search
                    </button>
                </div>

            </div>
        </header>
    )
}

export default Header
