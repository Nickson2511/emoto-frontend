import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProducts } from "../../features/product/productSlice";
import type { Product } from "../../features/product/types";

/* ================= PRODUCT CARD ================= */

const ProductCard = ({
    product,
    onNavigate,
}: {
    product: Product;
    onNavigate: (id: string) => void;
}) => (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
        <div onClick={() => onNavigate(product._id)}>
            <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-48 w-full object-cover"
            />
        </div>

        <div className="p-3">
            <p className="text-sm font-medium line-clamp-2">{product.name}</p>

            <p className="text-orange-500 font-semibold mt-1">
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

/* ================= PRODUCTS GRID ================= */

const ProductsGrid = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { products } = useAppSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto py-10">

            {/* SECTION TITLE */}
            <h2 className="text-2xl font-semibold mb-6">
                Find All Products
            </h2>

            {/* BIG CARD CONTAINER (like Jumia) */}
            <div className="bg-white shadow-md rounded-xl p-6">

                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                    {products.map((product: Product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onNavigate={(id) => navigate(`/products/${id}`)}
                        />
                    ))}

                </div>

            </div>
        </div>
    );
};

export default ProductsGrid;







