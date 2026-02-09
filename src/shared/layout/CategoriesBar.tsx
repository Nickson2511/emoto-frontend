import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCategories, getProducts } from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../features/product/types";
import { FiMenu, FiX } from "react-icons/fi";

const CategoriesBar = () => {
    const dispatch = useAppDispatch();
    const { categories, products } = useAppSelector((state) => state.product);
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
    }, [dispatch]);

    // Compute category -> products mapping
    const categoryProducts = useMemo(() => {
        const map: Record<string, Product[]> = {};
        products.forEach((p) => {
            if (!p.category) return;
            const catId = typeof p.category === "string" ? p.category : p.category._id;
            if (!catId) return;
            if (!map[catId]) map[catId] = [];
            map[catId].push(p);
        });
        return map;
    }, [products]);

    const handleMouseEnter = (categoryId: string) => setActiveCategory(categoryId);
    const handleMouseLeave = () => setActiveCategory(null);

    return (
        <div className="w-full bg-white shadow-sm border-t border-b">
            {/* Desktop */}
            <div className="hidden md:flex relative max-w-7xl mx-auto px-4">
                {categories.map((cat) => (
                    <div
                        key={cat._id}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(cat._id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className="px-5 py-4 text-base font-semibold hover:text-orange-500 transition">
                            {cat.name}
                        </button>

                        {activeCategory === cat._id && categoryProducts[cat._id]?.length > 0 && (
                            <div className="absolute left-0 top-full mt-2 bg-white shadow-xl border rounded-xl p-6 w-[500px] max-h-[400px] overflow-y-auto z-50">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                    {cat.name}
                                </h3>

                                <div className="grid grid-cols-1 gap-3">
                                    {categoryProducts[cat._id].map((p) => (
                                        <div
                                            key={p._id}
                                            className="flex justify-between items-center p-3 border rounded-md hover:shadow-md transition cursor-pointer"
                                            onClick={() => navigate(`/products/${p._id}`)}
                                        >
                                            <span className="text-gray-700 font-medium">{p.name}</span>
                                            <div className="text-right">
                                                <span className="text-orange-500 font-semibold">
                                                    KSh {Number(p.price).toLocaleString()}
                                                </span>
                                                {p.oldPrice && (
                                                    <span className="text-gray-400 text-sm line-through ml-1">
                                                        KSh {Number(p.oldPrice).toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 text-right">
                                    <button
                                        className="text-sm text-orange-500 font-medium hover:underline flex items-center gap-1"
                                        onClick={() => navigate("/shop")}
                                    >
                                        See All <span className="inline-block transform rotate-90">▶</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Mobile */}
            <div className="md:hidden px-3 py-2 border-b relative">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Categories</h2>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-2xl text-gray-700"
                    >
                        {mobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="mt-2 flex flex-col gap-2 max-h-[400px] overflow-y-auto">
                        {categories.map((cat) => (
                            <div key={cat._id} className="relative">
                                <button
                                    onClick={() =>
                                        setActiveCategory(activeCategory === cat._id ? null : cat._id)
                                    }
                                    className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-orange-100 hover:text-orange-600 transition flex justify-between items-center"
                                >
                                    {cat.name}
                                    <span>{activeCategory === cat._id ? "▲" : "▼"}</span>
                                </button>

                                {activeCategory === cat._id && categoryProducts[cat._id]?.length > 0 && (
                                    <div className="mt-2 bg-white border rounded-lg shadow-md p-4">
                                        <h3 className="font-semibold text-gray-800 mb-2">{cat.name}</h3>
                                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                                            {categoryProducts[cat._id].map((p) => (
                                                <li
                                                    key={p._id}
                                                    className="flex justify-between items-center text-sm text-gray-600 hover:text-orange-500 cursor-pointer transition"
                                                    onClick={() => navigate(`/products/${p._id}`)}
                                                >
                                                    <span>{p.name}</span>
                                                    <span className="text-orange-500 font-semibold">
                                                        KSh {Number(p.price).toLocaleString()}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesBar;
