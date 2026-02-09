import  { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProducts, getCategories } from "../../features/product/productSlice";
import { selectFilteredProducts } from "../../utils/selectors";
import type { ProductSearchParams,  Product } from "../../features/product/types";
import Header from "../../shared/layout/Header";
import { FiChevronRight,  FiMenu, FiX } from "react-icons/fi";
import { Cpu, Zap, Sliders, Wrench, Hexagon, Truck, Droplet } from "lucide-react";
import Footer from "../../shared/layout/Footer";

/* ================= SORT VALUES ================= */
const SORT_VALUES = ["price_asc", "price_desc", "newest"] as const;
type SortBy = typeof SORT_VALUES[number];
const parseSortBy = (value: string | null): SortBy | undefined => {
    if (!value) return undefined;
    return SORT_VALUES.includes(value as SortBy) ? (value as SortBy) : undefined;
};

/* ================= CATEGORY ICON MAP ================= */
const categoryIcons: Record<string, JSX.Element> = {
    Engines: <Cpu size={16} />,
    Brakes: <Sliders size={16} />,
    "Electrical System & Lighting": <Zap size={16} />,
    "Suspension & Steering": <Wrench size={16} />,
    "Frame & Body": <Hexagon size={16} />,
    "Wheels & Drivetrain": <Truck size={16} />,
    "Consumables & Filtration": <Droplet size={16} />,
};

/* ================= SIDEBAR ITEM COMPONENT ================= */
const SidebarItem = ({
    icon,
    label,
    onClick,
}: {
    icon: JSX.Element;
    label: string;
    onClick: () => void;
}) => (
    <button
        onClick={onClick}
        className="flex justify-between items-center w-full p-2 rounded hover:bg-orange-50 transition-colors"
    >
        <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm">{label}</span>
        </div>
        <FiChevronRight className="text-gray-400" />
    </button>
);

/* ================= PRODUCT CARD COMPONENT ================= */
const ProductCard = ({ product, onNavigate }: { product: Product; onNavigate: (id: string) => void }) => (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white">
        <div className="relative" onClick={() => onNavigate(product._id)}>
            <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-48 w-full object-cover"
            />
            
        </div>
        <div className="p-3">
            <p className="text-sm font-medium line-clamp-2">{product.name}</p>
            <p className="text-orange-500 font-semibold">
                KSh {product.price.toLocaleString()}
            </p>
            {product.oldPrice && (
                <p className="text-gray-400 text-xs line-through">
                    KSh {product.oldPrice.toLocaleString()}
                </p>
            )}
        </div>
    </div>
);

const ProductsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    /* ================= FILTER STATE ================= */
    const [params, setParams] = useState<ProductSearchParams>({
        search: searchParams.get("search") || "",
        category: searchParams.get("category") || undefined,
        brand: searchParams.get("brand") || undefined,
        sortBy: parseSortBy(searchParams.get("sortBy")),
        minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
        maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    });

    /* ================= DATA ================= */
    const products = useAppSelector(selectFilteredProducts(params));
    const { categories } = useAppSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, [dispatch]);

    /* ================= SYNC URL ================= */
    useEffect(() => {
        const urlParams: Record<string, string> = {};
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                urlParams[key] = String(value);
            }
        });
        setSearchParams(urlParams);
    }, [params]);

    /* ================= HANDLERS ================= */
    const update = <K extends keyof ProductSearchParams>(key: K, value: ProductSearchParams[K]) => {
        setParams((prev) => ({ ...prev, [key]: value }));
    };
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ================= HEADER ================= */}
            <Header />

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* HAMBURGER FOR MOBILE */}
                <div className="flex items-center justify-between mb-4 md:hidden">
                    <h2 className="text-xl font-semibold">Products</h2>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded hover:bg-gray-200 transition"
                    >
                        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* ================= SIDEBAR ================= */}
                    {sidebarOpen && (
                        <aside className="md:block space-y-6 p-4 border rounded-lg bg-white shadow-md h-fit sticky top-6">
                            <h3 className="font-semibold mb-2 text-gray-700">Categories</h3>
                            <div className="space-y-1">
                                {categories.map((c) => (
                                    <SidebarItem
                                        key={c._id}
                                        icon={categoryIcons[c.name] ?? <FiChevronRight />}
                                        label={c.name}
                                        onClick={() => update("category", c._id)}
                                    />
                                ))}
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2 text-gray-700">Price</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="border p-2 rounded w-full text-sm"
                                        onChange={(e) => update("minPrice", Number(e.target.value))}
                                        value={params.minPrice ?? ""}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="border p-2 rounded w-full text-sm"
                                        onChange={(e) => update("maxPrice", Number(e.target.value))}
                                        value={params.maxPrice ?? ""}
                                    />
                                </div>
                            </div>
                        </aside>
                    )}

                    {/* ================= PRODUCTS GRID ================= */}
                    <main className="md:col-span-3 space-y-4">
                        {/* SORT */}
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-500">{products.length} products found</p>
                            <select
                                onChange={(e) => update("sortBy", parseSortBy(e.target.value))}
                                className="border p-2 text-sm rounded"
                                value={params.sortBy ?? ""}
                            >
                                <option value="">Sort by</option>
                                <option value="price_asc">Price: Low → High</option>
                                <option value="price_desc">Price: High → Low</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>

                        {/* GRID */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((p) => (
                                <ProductCard
                                    key={p._id}
                                    product={p}
                                    onNavigate={(id) => navigate(`/products/${id}`)}
                                />
                            ))}
                        </div>
                    </main>
                </div>
                
            </div>
            <Footer/>
            
            

            
        </div>
    );
};

export default ProductsPage;






