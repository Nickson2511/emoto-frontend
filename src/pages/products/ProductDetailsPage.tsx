import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../../features/product/types";
import Header from "../../shared/layout/Header";
import Footer from "../../shared/layout/Footer";
import { FiShoppingCart, FiHeart, FiChevronLeft } from "react-icons/fi";
import { fetchProductById } from "../../services/productAPI";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addToCart, fetchCart, updateCartItem, removeCartItem } from "../../features/cart/cartSlice";
import SuccessModal from "../../shared/components/modals/SuccessModal";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.cart.cart);
    console.log("this is your cart", cart);

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    // Success modal state
    const [showSuccess, setShowSuccess] = useState(false);

    // Fetch product
    useEffect(() => {
        const getProduct = async () => {
            try {
                if (!id) return;
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (error) {
                console.error(error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    // Fetch cart on mount and scroll
    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth" });
        dispatch(fetchCart());
    }, [product, dispatch]);

    const handleAddToCart = async () => {
        if (!product) return;

        if (cartItem) {
            // If already in cart, just increase by 1
            await dispatch(
                updateCartItem({
                    productId: product._id,
                    quantity: cartItem.quantity + 1,
                })
            );
        } else {
            // First time add
            await dispatch(
                addToCart({
                    productId: product._id,
                    quantity: qty,
                })
            );
        }

        setShowSuccess(true);
    };

    const cartItem = cart?.items.find(
        item => item.product._id === product?._id
    );

    const cartQty = cartItem?.quantity ?? 0;

    useEffect(() => {
        if (cartItem) {
            setQty(cartItem.quantity);
        }
    }, [cartItem]);

    const handleIncrease = async () => {
        if (!product) return;

        if (cartItem) {
            // Already in cart → update cart directly
            await dispatch(
                updateCartItem({
                    productId: product._id,
                    quantity: cartItem.quantity + 1,
                })
            );
        } else {
            // Not in cart yet → just update local qty
            setQty(prev => prev + 1);
        }
    };

    const handleDecrease = async () => {
        if (!product) return;

        if (cartItem) {
            if (cartItem.quantity === 1) {
                // Quantity would hit 0 → remove item
                await dispatch(removeCartItem(product._id));
                setQty(1); // reset UI qty
            } else {
                await dispatch(
                    updateCartItem({
                        productId: product._id,
                        quantity: cartItem.quantity - 1,
                    })
                );
            }
        } else {
            setQty(prev => Math.max(prev - 1, 1));
        }
    };




    if (loading) return <p className="p-6 text-center text-gray-600">Loading product...</p>;
    if (!product) return <p className="p-6 text-center text-gray-600">Product not found</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header /> {/* Header now auto-updates when cart changes */}

            <div
                ref={containerRef}
                className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-6"
            >
                {/* Product Image */}
                <div className="relative w-full md:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden flex justify-center items-center">
                    <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full max-w-md h-auto md:h-[500px] object-cover rounded-xl"
                    />
                    <div className="absolute top-4 right-4 flex flex-row md:flex-col gap-3">
                        <div className="bg-white p-2 rounded-full shadow hover:bg-orange-50 cursor-pointer transition">
                            <FiHeart className="text-red-500" size={24} />
                        </div>
                        <div
                            className="bg-white p-2 rounded-full shadow hover:bg-orange-50 cursor-pointer transition"
                            onClick={handleAddToCart}
                        >
                            <FiShoppingCart className="text-green-500" size={24} />
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col gap-5">
                    <button
                        onClick={() => navigate("/products")}
                        className="flex items-center gap-2 text-sm text-orange-600 hover:underline self-start"
                    >
                        <FiChevronLeft />
                        Back to Products
                    </button>

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
                    <p className="text-gray-600 text-sm sm:text-md">{product.description}</p>

                    <div className="flex items-center gap-4 flex-wrap">
                        <p className="text-xl sm:text-2xl font-bold text-orange-500">
                            KSh {product.price.toLocaleString()}
                        </p>
                        {product.oldPrice && (
                            <p className="text-gray-400 text-base line-through">
                                KSh {product.oldPrice.toLocaleString()}
                            </p>
                        )}
                    </div>

                    <p className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                        <button
                            className="px-3 py-1 bg-gray-200 rounded"
                            onClick={handleDecrease}
                        >
                            -
                        </button>

                        <span>{cartItem ? cartQty : qty}</span>

                        <button
                            className="px-3 py-1 bg-gray-200 rounded"
                            onClick={handleIncrease}
                        >
                            +
                        </button>
                    </div>


                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center justify-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-lg shadow hover:bg-orange-600 w-full sm:w-auto"
                        >
                            <FiShoppingCart size={20} />
                            <span className="font-medium">Add to Cart</span>
                        </button>

                        <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-5 py-3 rounded-lg shadow hover:bg-gray-100 w-full sm:w-auto">
                            <FiHeart size={20} />
                            <span className="font-medium">Add to Wishlist</span>
                        </button>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Success Modal */}
            {showSuccess && (
                <SuccessModal
                    message="Product added to cart successfully!"
                    onClose={() => setShowSuccess(false)}
                />
            )}
        </div>
    );
};

export default ProductDetailsPage;
