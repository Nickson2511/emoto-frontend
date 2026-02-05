import React from "react";
import { ChevronRight, Heart, ShoppingCart } from "lucide-react";

// Product type
type Product = {
    id: number;
    name: string;
    price: number;
    oldPrice?: number; // optional for discount
    image: string;     // path from public folder
    discount?: number; // percent
};

// Example products (static for now)
const products: Product[] = [
    {
        id: 1,
        name: "Motorbike Engine Single-Cylinder",
        price: 320,
        oldPrice: 400,
        image: "/products/engine1.jpg",
        discount: 20,
    },
    {
        id: 2,
        name: "Disc Brake Set",
        price: 120,
        oldPrice: 150,
        image: "/products/brake1.jpg",
        discount: 20,
    },
    {
        id: 3,
        name: "Motorcycle Battery",
        price: 80,
        oldPrice: 100,
        image: "/products/battery1.jpg",
        discount: 20,
    },
    {
        id: 4,
        name: "Shock Absorber Set",
        price: 150,
        oldPrice: 200,
        image: "/products/suspension1.webp",
        discount: 25,
    },
    {
        id: 5,
        name: "Motorcycle Headlight",
        price: 60,
        oldPrice: 80,
        image: "/products/headlight1.jpg",
        discount: 25,
    },
    {
        id: 6,
        name: "Suspension & Steering",
        price: 150,
        oldPrice: 200,
        image: "/products/steering.jpg",
    }
];

const FlashDeals: React.FC = () => {
    return (
        <section className="bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4">

                {/* BIG OUTER CARD */}
                <div className="bg-white rounded-lg shadow-sm p-4">

                    {/* Section header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                            Flash Deals
                        </h2>

                        <button className="flex items-center text-orange-600 text-sm font-medium hover:underline">
                            See all
                            <ChevronRight className="ml-1 w-4 h-4" />
                        </button>
                    </div>

                    {/* Products horizontal scroll */}
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="relative flex-shrink-0 w-40 sm:w-44 md:w-48 bg-white border rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition cursor-pointer"
                            >
                                {/* Discount badge */}
                                {product.discount && (
                                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg z-10">
                                        {product.discount}% OFF
                                    </div>
                                )}

                                {/* Product image */}
                                <div className="w-full h-36 sm:h-40 md:h-44 overflow-hidden rounded-t-lg bg-gray-50">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Product details */}
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
        </section>
    );
};

export default FlashDeals;
