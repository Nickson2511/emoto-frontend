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

        {/* PRODUCT IMAGE */}
        <div onClick={() => onNavigate(product._id)}>
            <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-60 sm:h-52 md:h-48 w-full object-cover"
            />
        </div>

        {/* PRODUCT INFO */}
        <div className="p-4">

            {/* PRODUCT NAME */}
            <p className="text-sm font-medium line-clamp-2">
                {product.name}
            </p>

            {/* PRICE */}
            <p className="text-orange-500 font-semibold mt-2 text-base">
                KSh {product.price.toLocaleString()}
            </p>

            {/* OLD PRICE */}
            {product.oldPrice && (
                <p className="text-gray-400 text-sm line-through">
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
        <div className="max-w-7xl mx-auto py-10 px-4">

            {/* SECTION TITLE */}
            <h2 className="text-2xl font-semibold mb-6">
                Find All Products
            </h2>

            {/* BIG CARD CONTAINER (Jumia style section) */}
            <div className="bg-white shadow-md rounded-xl p-6">

                {/* PRODUCTS GRID */}
                <div className="grid 
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    gap-6">

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