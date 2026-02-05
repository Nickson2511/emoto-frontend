import React from "react";
import { ChevronRight } from "lucide-react";

// Type definition for each category/item
type Category = {
    name: string;
    image: string;
    price: number;
    oldPrice: number;
};

// List of featured categories/items
const categories: Category[] = [
    { name: "Engines", image: "/categories/engines.jpeg", price: 12000, oldPrice: 15000 },
    { name: "Brakes", image: "/categories/brakes.jpeg", price: 4500, oldPrice: 6000 },
    { name: "Electrical", image: "/categories/electrical.jpeg", price: 3200, oldPrice: 4000 },
    { name: "Suspension", image: "/categories/suspension.jpeg", price: 9800, oldPrice: 12000 },
    { name: "Wheels & Drivetrain", image: "/categories/wheels.jpg", price: 15000, oldPrice: 18000 },
    { name: "Frame & Body", image: "/categories/frame.jpg", price: 7000, oldPrice: 9000 },
    { name: "Consumables", image: "/categories/consumables.jpg", price: 1500, oldPrice: 2000 },
];

const FeaturedCategories: React.FC = () => {
    return (
        <section className="bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4">

                {/* BIG OUTER CARD (same as Flash Deals) */}
                <div className="bg-white rounded-lg shadow-sm p-4">

                    {/* Section header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                            Featured Categories
                        </h2>

                        <button className="flex items-center text-orange-600 text-sm font-medium hover:underline">
                            See all
                            <ChevronRight className="ml-1 w-4 h-4" />
                        </button>
                    </div>

                    {/* Categories horizontal scroll (same as Flash Deals) */}
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
                        {categories.map((cat) => (
                            <div
                                key={cat.name}
                                className="relative flex-shrink-0 w-40 sm:w-44 md:w-48 bg-white border rounded-lg shadow-sm 
                                            hover:shadow-md hover:scale-105 transition cursor-pointer"
                            >
                                {/* Image */}
                                <div className="w-full h-36 sm:h-40 md:h-44 overflow-hidden rounded-t-lg bg-gray-50">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="px-2 py-2 flex flex-col gap-1">
                                    {/* Name */}
                                    <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2">
                                        {cat.name}
                                    </h3>

                                    {/* Price */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm sm:text-base font-semibold text-orange-500">
                                            KSh {cat.price.toLocaleString()}
                                        </span>
                                        <span className="text-xs sm:text-sm line-through text-gray-400">
                                            KSh {cat.oldPrice.toLocaleString()}
                                        </span>
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

export default FeaturedCategories;
