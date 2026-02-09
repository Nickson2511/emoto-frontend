import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft, Heart, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProducts } from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import type { Product as BaseProduct, Category } from "../../features/product/types";

interface Product extends BaseProduct {
    soldPercent?: number;
}

// Helper to safely get category name
const getCategoryName = (category: Category | string | undefined): string => {
    if (!category) return "";
    if (typeof category === "string") return "";
    return category.name;
};

const TopDeals = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.product) as { products: Product[] };
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // ⏱ Countdown example
    const [timeLeft, setTimeLeft] = useState(3 * 60 * 60 + 45 * 60 + 10);

    useEffect(() => {
        dispatch(getProducts());

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
    }, [dispatch]);

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

    // 🔥 ONLY Frame & Body, Wheels & Drivetrain, Consumables & Filtration
    const topDeals = products.filter((product) => {
        const categoryName = getCategoryName(product.category);
        return (
            categoryName === "Frame & Body" ||
            categoryName === "Wheels & Drivetrain" ||
            categoryName === "Consumables & Filtration"
        );
    });

    if (!topDeals.length) return null;

    return (
        <section className="bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Top Deals</h2>
                            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                                Ends in {formatTime(timeLeft)}
                            </span>
                        </div>

                        <button
                            onClick={() => navigate("/shop")}
                            className="flex items-center text-orange-600 text-sm font-medium hover:underline"
                        >
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
                        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
                            {topDeals.map((product) => {
                                const discount =
                                    product.oldPrice && product.oldPrice > product.price
                                        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
                                        : null;

                                return (
                                    <div
                                        key={product._id}
                                        className="relative flex-shrink-0 w-40 sm:w-44 md:w-48 bg-white border rounded-lg shadow-sm 
                                                    hover:shadow-md hover:scale-105 transition cursor-pointer"
                                        onClick={() => navigate(`/products/${product._id}`)}
                                    >
                                        {/* Discount badge */}
                                        {discount && (
                                            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg z-10">
                                                {discount}% OFF
                                            </div>
                                        )}

                                        {/* Image */}
                                        <div className="w-full h-36 sm:h-40 md:h-44 overflow-hidden rounded-t-lg bg-gray-50">
                                            <img
                                                src={product.images?.[0]}
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
                                                    KSh {Number(product.price).toLocaleString()}
                                                </span>

                                                {product.oldPrice && (
                                                    <span className="text-xs sm:text-sm line-through text-gray-400">
                                                        KSh {Number(product.oldPrice).toLocaleString()}
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
                                                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                                                />
                                                <ShoppingCart
                                                    size={16}
                                                    className="text-gray-500 hover:text-green-500 cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopDeals;
