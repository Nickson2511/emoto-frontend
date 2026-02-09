import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProducts } from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";

import type { Category } from "../../features/product/types";

// Helper to safely read populated category
const getCategoryName = (
    category: Category | string | undefined
): string => {
    if (!category) return "";
    if (typeof category === "string") return "";
    return category.name;
};

const FeaturedProducts = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.product);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    //  ONLY Engines & Brakes
    const featuredProducts = products.filter((p) => {
        const categoryName = getCategoryName(p.category);
        return categoryName === "Engines" || categoryName === "Brakes";
    });

    if (!featuredProducts.length) return null;

    return (
        <section className="bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                            Featured Products
                        </h2>

                        <button
                            onClick={() => navigate("/shop")}
                            className="flex items-center text-orange-600 text-sm font-medium hover:underline"
                        >
                            See all
                            <ChevronRight className="ml-1 w-4 h-4" />
                        </button>
                    </div>

                    {/* Products */}
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
                        {featuredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="relative flex-shrink-0 w-40 sm:w-44 md:w-48 bg-white border rounded-lg shadow-sm 
                                            hover:shadow-md hover:scale-105 transition cursor-pointer"
                                onClick={() => navigate(`/products/${product._id}`)}
                            >
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
