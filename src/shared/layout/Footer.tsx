import React from "react";
import { Mail } from "lucide-react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-10">

            {/* TOP NEWSLETTER BAR */}
            <div className="border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Logo + text */}
                    <div>
                        <h2 className="text-2xl font-bold text-white">eMotoParts</h2>
                        <p className="text-sm mt-2">
                            Get access to exclusive deals and updates from eMotoParts.
                        </p>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <p className="text-sm mb-2 font-semibold text-white">
                            NEW TO EMOTOPARTS?
                        </p>
                        <p className="text-xs mb-3">
                            Subscribe to our newsletter to get updates on your favorite bike parts.
                        </p>

                        <div className="flex">
                            <div className="flex items-center bg-white text-gray-600 px-2 rounded-l-md">
                                <Mail size={16} />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-2 py-2 text-sm w-full outline-none text-black"
                            />
                            <button className="bg-primary px-4 text-white rounded-r-md">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* App promo */}
                    <div>
                        <p className="text-sm font-semibold text-white mb-2">
                            DOWNLOAD EMOTOPARTS APP
                        </p>
                        <p className="text-xs mb-3">
                            Shop faster and easier with our mobile app.
                        </p>

                        <div className="flex gap-2">
                            <div className="bg-black text-white px-3 py-2 rounded text-xs">
                                Google Play
                            </div>
                            <div className="bg-black text-white px-3 py-2 rounded text-xs">
                                App Store
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* LINKS SECTION */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-sm">

                <div>
                    <h3 className="font-semibold text-white mb-3">HELP CENTER</h3>
                    <ul className="space-y-2">
                        <li className="hover:underline cursor-pointer">Help Center</li>
                        <li className="hover:underline cursor-pointer">Contact Us</li>
                        <li className="hover:underline cursor-pointer">How to Buy</li>
                        <li className="hover:underline cursor-pointer">Returns & Refunds</li>
                        <li className="hover:underline cursor-pointer">Delivery Information</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-3">ABOUT EMOTOPARTS</h3>
                    <ul className="space-y-2">
                        <li className="hover:underline cursor-pointer">About Us</li>
                        <li className="hover:underline cursor-pointer">Careers</li>
                        <li className="hover:underline cursor-pointer">Terms & Conditions</li>
                        <li className="hover:underline cursor-pointer">Privacy Policy</li>
                        <li className="hover:underline cursor-pointer">Flash Sales</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-3">EMOTOPARTS SERVICES</h3>
                    <ul className="space-y-2">
                        <li className="hover:underline cursor-pointer">Sell on eMotoParts</li>
                        <li className="hover:underline cursor-pointer">eMotoParts Logistics</li>
                        <li className="hover:underline cursor-pointer">Official Stores</li>
                        <li className="hover:underline cursor-pointer">Affiliate Program</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-3">PAYMENT METHODS</h3>
                    <ul className="space-y-2">
                        <li className="hover:underline cursor-pointer">M-Pesa</li>
                        <li className="hover:underline cursor-pointer">Visa</li>
                        <li className="hover:underline cursor-pointer">Mastercard</li>
                        <li className="hover:underline cursor-pointer">Cash on Delivery</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-3">COUNTRIES</h3>
                    <ul className="space-y-2">
                        <li className="hover:underline cursor-pointer">Kenya</li>
                        <li className="hover:underline cursor-pointer">Uganda</li>
                        <li className="hover:underline cursor-pointer">Tanzania</li>
                        <li className="hover:underline cursor-pointer">Rwanda</li>
                    </ul>
                </div>

            </div>

            {/* BOTTOM BAR */}
            <div className="bg-black text-center text-xs text-gray-400 py-4">
                © {new Date().getFullYear()} eMotoParts. All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;
