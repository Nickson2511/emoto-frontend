import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft, Heart, ShoppingCart } from "lucide-react";

// Product type
type Product = {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    discount?: number;
    soldPercent?: number;
};

// Example Top Deals products
const products: Product[] = [
    {
        id: 1,
        name: "Heavy Duty Motorbike Engine",
        price: 450,
        oldPrice: 600,
        image: "/products/engine2.jpg",
        discount: 25,
        soldPercent: 75,
    },
    {
        id: 2,
        name: "Hydraulic Disc Brake Kit",
        price: 180,
        oldPrice: 250,
        image: "/products/Hydraulic Disc Brake Kit.jpg",
        discount: 28,
        soldPercent: 60,
    },
    {
        id: 3,
        name: "High Capacity Motorcycle Battery",
        price: 110,
        oldPrice: 150,
        image: "/products/battery2.jpg",
        discount: 27,
        soldPercent: 85,
    },
    {
        id: 4,
        name: "Premium Shock Absorber",
        price: 220,
        oldPrice: 300,
        image: "/products/suspension2.avif",
        discount: 26,
        soldPercent: 45,
    },
    {
        id: 5,
        name: "LED Motorcycle Headlight",
        price: 95,
        oldPrice: 130,
        image: "/products/headlight2.avif",
        discount: 27,
        soldPercent: 70,
    },
    {
        id: 6,
        name: "Steering & Suspension Set",
        price: 200,
        oldPrice: 260,
        image: "/products/steering2.jpg",
        discount: 23,
        soldPercent: 35,
    },
];

const TopDeals: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // ⏱ Countdown time in seconds (example: 3h 45m 10s)
    const [timeLeft, setTimeLeft] = useState(3 * 60 * 60 + 45 * 60 + 10);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format time to HH:MM:SS
    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <section className="bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4">

                {/* BIG OUTER CARD */}
                <div className="bg-white rounded-lg shadow-sm p-4">

                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                                Top Deals
                            </h2>

                            {/* LIVE Countdown */}
                            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                                Ends in {formatTime(timeLeft)}
                            </span>
                        </div>

                        <button className="flex items-center text-orange-600 text-sm font-medium hover:underline">
                            See all
                            <ChevronRight className="ml-1 w-4 h-4" />
                        </button>
                    </div>

                    {/* SCROLL AREA */}
                    <div className="relative">
                        {/* Left arrow */}
                        <button
                            onClick={scrollLeft}
                            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-100 z-20"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {/* Right arrow */}
                        <button
                            onClick={scrollRight}
                            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-100 z-20"
                        >
                            <ChevronRight size={18} />
                        </button>

                        {/* PRODUCTS */}
                        <div
                            ref={scrollRef}
                            className="flex gap-4 overflow-x-auto scrollbar-hide py-2"
                        >
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="relative flex-shrink-0 w-40 sm:w-44 md:w-48 bg-white border rounded-lg shadow-sm 
                                    hover:shadow-md hover:scale-105 transition cursor-pointer"
                                >
                                    {/* Discount badge */}
                                    {product.discount && (
                                        <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg z-10">
                                            {product.discount}% OFF
                                        </div>
                                    )}

                                    {/* Image */}
                                    <div className="w-full h-36 sm:h-40 md:h-44 overflow-hidden rounded-t-lg bg-gray-50">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="px-2 py-2 flex flex-col gap-1">
                                        <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center gap-2">
                                            <span className="text-sm sm:text-base font-semibold text-orange-500">
                                                ${product.price}
                                            </span>

                                            {product.oldPrice && (
                                                <span className="text-xs sm:text-sm line-through text-gray-400">
                                                    ${product.oldPrice}
                                                </span>
                                            )}
                                        </div>

                                        {/* Progress bar */}
                                        {product.soldPercent !== undefined && (
                                            <div className="mt-1">
                                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-orange-500"
                                                        style={{ width: `${product.soldPercent}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {product.soldPercent}% sold
                                                </p>
                                            </div>
                                        )}

                                        {/* Icons */}
                                        <div className="flex items-center justify-between mt-1">
                                            <Heart
                                                size={16}
                                                className="text-gray-500 hover:text-red-500"
                                            />
                                            <ShoppingCart
                                                size={16}
                                                className="text-gray-500 hover:text-green-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default TopDeals;
