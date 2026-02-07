import { useState } from "react";

type SubItem = {
    name: string;
    price: number;
    oldPrice?: number;
};

type Category = {
    name: string;
    subcategories: SubItem[];
};

// Example data with prices
const categories: Category[] = [
    {
        name: "Engines",
        subcategories: [
            { name: "Single-Cylinder Engine", price: 250, oldPrice: 300 },
            { name: "Parallel-Twin Engine", price: 400, oldPrice: 450 },
            { name: "V-Twin Engine", price: 600 },
            { name: "Boxer Twin", price: 550, oldPrice: 600 },
            { name: "Electric Motor", price: 700 },
        ],
    },
    {
        name: "Brakes",
        subcategories: [
            { name: "Disc Brake Pads", price: 50, oldPrice: 65 },
            { name: "Rotors", price: 80 },
            { name: "Calipers", price: 90, oldPrice: 100 },
            { name: "Drum Brakes", price: 40 },
            { name: "Brake Levers", price: 30, oldPrice: 35 },
        ],
    },
    {
        name: "Electrical System & Lighting",
        subcategories: [
            { name: "Battery", price: 110, oldPrice: 125 },
            { name: "Starter Motor", price: 98, oldPrice: 112 },
            { name: "Ignition Switch", price: 130, oldPrice: 143 },
            { name: "Wiring Harness", price: 124, oldPrice: 129 },
            { name: "ECU", price: 105, oldPrice: 115 },
            { name: "Alternator", price: 145, oldPrice: 156 },
            { name: "Headlights", price: 90, oldPrice: 99 },
            { name: "Indicators", price: 115, oldPrice: 127 },
        ],
    },

    {
        name: "Suspension & Steering",
        subcategories: [
            { name: "Front Forks", price: 110, oldPrice: 125 },
            { name: "Rear Shock Absorbers", price: 98, oldPrice: 112 },
            { name: "Swingarm", price: 130, oldPrice: 143 },
            { name: "Handlebars", price: 124, oldPrice: 129 },

        ],
    },

    {
        name: "Frame & Body",
        subcategories: [
            { name: "Chassis", price: 110, oldPrice: 125 },
            { name: "Fuel Tank", price: 98, oldPrice: 112 },
            { name: "Seat", price: 130, oldPrice: 143 },
            { name: "Footpegs", price: 124, oldPrice: 129 },
            { name: "Fenders", price: 124, oldPrice: 129 },
            { name: "Fairings", price: 124, oldPrice: 129 },

        ],
    },
    {
        name: "Wheels & Drivetrain",
        subcategories: [
            { name: "Rims", price: 110, oldPrice: 125 },
            { name: "Tires", price: 98, oldPrice: 112 },
            { name: "Chain", price: 130, oldPrice: 143 },
            { name: "Sprockets", price: 124, oldPrice: 129 },


        ],
    },

    {
        name: "Consumables & Filtration",
        subcategories: [
            { name: "Air Filters", price: 110, oldPrice: 125 },
            { name: "Oil Filters", price: 98, oldPrice: 112 },
            { name: "Oil Seals", price: 130, oldPrice: 143 },
            { name: "Gaskets", price: 124, oldPrice: 129 },


        ],
    },

];

const CategoriesBar = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    return (
        <div className="w-full bg-white shadow-sm border-t border-b">
            {/* ================= Desktop ================= */}
            <div className="hidden md:flex relative max-w-7xl mx-auto px-4">
                {categories.map((cat) => (
                    <div
                        key={cat.name}
                        className="relative"
                        onMouseEnter={() => setActiveCategory(cat.name)}
                        onMouseLeave={() => setActiveCategory(null)}
                    >
                        <button className="px-5 py-4 text-base font-semibold hover:text-orange-500 transition">
                            {cat.name}
                        </button>

                        {/* ===== Large Dropdown Card ===== */}
                        {activeCategory === cat.name && (
                            <div className="absolute left-0 top-full mt-2 bg-white shadow-xl border rounded-xl p-6 w-[500px] z-50">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                    {cat.name}
                                </h3>

                                {/* Grid of sub-items */}
                                <div className="grid grid-cols-1 gap-3">
                                    {cat.subcategories.map((sub) => (
                                        <div
                                            key={sub.name}
                                            className="flex justify-between items-center p-3 border rounded-md hover:shadow-md transition cursor-pointer"
                                        >
                                            <span className="text-gray-700 font-medium">{sub.name}</span>
                                            <div className="text-right">
                                                <span className="text-orange-500 font-semibold">
                                                    ${sub.price}
                                                </span>
                                                {sub.oldPrice && (
                                                    <span className="text-gray-400 text-sm line-through ml-1">
                                                        ${sub.oldPrice}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* See all link */}
                                <div className="mt-4 text-right">
                                    <button className="text-sm text-orange-500 font-medium hover:underline flex items-center gap-1">
                                        See All
                                        <span className="inline-block transform rotate-90">▶</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* ================= Mobile ================= */}
            <div className="md:hidden px-3 py-2 overflow-x-auto flex gap-3">
                {categories.map((cat) => (
                    <div key={cat.name} className="relative flex-shrink-0">
                        <button
                            onClick={() =>
                                setActiveCategory(
                                    activeCategory === cat.name ? null : cat.name
                                )
                            }
                            className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-orange-100 hover:text-orange-600 transition"
                        >
                            {cat.name}
                        </button>

                        {/* Mobile expandable card */}
                        {activeCategory === cat.name && (
                            <div className="mt-2 bg-white border rounded-lg shadow-md p-4 w-[260px]">
                                <h3 className="font-semibold text-gray-800 mb-2">{cat.name}</h3>
                                <ul className="space-y-2">
                                    {cat.subcategories.map((sub) => (
                                        <li
                                            key={sub.name}
                                            className="flex justify-between items-center text-sm text-gray-600 hover:text-orange-500 cursor-pointer transition"
                                        >
                                            <span>{sub.name}</span>
                                            <span className="text-orange-500 font-semibold">
                                                ${sub.price}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-3 text-right">
                                    <button className="text-sm text-orange-500 font-medium hover:underline flex items-center gap-1">
                                        See All
                                        <span className="inline-block transform rotate-90">▶</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesBar;
