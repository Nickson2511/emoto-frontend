import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../../features/product/types";
import { FiShoppingCart, FiHeart, FiChevronLeft } from "react-icons/fi";
import { fetchProductById } from "../../services/productAPI";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ReviewList from "../../shared/components/review/ReviewList";
import {
    addToCart,
    fetchCart,
    updateCartItem,
    removeCartItem
} from "../../features/cart/cartSlice";
import SuccessModal from "../../shared/components/modals/SuccessModal";
import {
    addToWishlist,
    removeFromWishlist,
    fetchWishlist
} from "../../features/wishlist/wishlistSlice";
import { fetchProductReviews } from "../../features/review/reviewSlice";

const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => !!state.auth.user);

    const cart = useAppSelector(state => state.cart.cart);
    const wishlist = useAppSelector(state => state.wishlist.products);
    const { loading: reviewsLoading } = useAppSelector(
        state => state.review
    );

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    /* ================= MODALS ================= */
    const [showCartSuccess, setShowCartSuccess] = useState(false);
    const [showWishlistSuccess, setShowWishlistSuccess] = useState(false);

    /* ================= WISHLIST ================= */
    const isWishlisted = wishlist.some(
        item => item._id === product?._id
    );

    useEffect(() => {
        if (isAuth) dispatch(fetchWishlist());
    }, [dispatch, isAuth]);

    const handleWishlistToggle = async () => {
        if (!product) return;
        if (!isAuth) {
            navigate("/login");
            return;
        }

        if (isWishlisted) {
            await dispatch(removeFromWishlist(product._id));
        } else {
            await dispatch(addToWishlist(product._id));
            setShowWishlistSuccess(true);
        }
    };

    /* ================= FETCH REVIEWS ================= */
    useEffect(() => {
        if (id) {
            dispatch(fetchProductReviews(id));
        }
    }, [id, dispatch]);

    /* ================= FETCH PRODUCT ================= */
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

    /* ================= CART ================= */
    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth" });
        dispatch(fetchCart());
    }, [product, dispatch]);

    const cartItem = cart?.items.find(
        item => item.product._id === product?._id
    );

    const cartQty = cartItem?.quantity ?? 0;

    useEffect(() => {
        if (cartItem) {
            setQty(cartItem.quantity);
        }
    }, [cartItem]);

    const handleAddToCart = async () => {
        if (!product) return;

        if (cartItem) {
            await dispatch(
                updateCartItem({
                    productId: product._id,
                    quantity: cartItem.quantity + 1,
                })
            );
        } else {
            await dispatch(
                addToCart({
                    productId: product._id,
                    quantity: qty,
                })
            );
        }

        setShowCartSuccess(true);
    };

    const handleIncrease = async () => {
        if (!product) return;

        if (cartItem) {
            await dispatch(
                updateCartItem({
                    productId: product._id,
                    quantity: cartItem.quantity + 1,
                })
            );
        } else {
            setQty(prev => prev + 1);
        }
    };

    const handleDecrease = async () => {
        if (!product) return;

        if (cartItem) {
            if (cartItem.quantity === 1) {
                await dispatch(removeCartItem(product._id));
                setQty(1);
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

    /* ================= UI STATES ================= */
    if (loading)
        return <p className="p-6 text-center text-gray-600">Loading product...</p>;

    if (!product)
        return <p className="p-6 text-center text-gray-600">Product not found</p>;

    return (
        <div className="min-h-screen bg-gray-50">



            {/* ================= PRODUCT ================= */}
            <div
                ref={containerRef}
                className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8"
            >
                {/* IMAGE */}
                <div className="relative w-full md:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden flex justify-center items-center">
                    <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full max-w-md h-auto md:h-[500px] object-cover"
                    />

                    <div className="absolute top-4 right-4 flex gap-3">
                        <button
                            onClick={handleWishlistToggle}
                            className="bg-white p-2 rounded-full shadow"
                        >
                            <FiHeart
                                size={22}
                                className={
                                    isWishlisted
                                        ? "text-red-600 fill-red-600"
                                        : "text-gray-400"
                                }
                            />
                        </button>

                        <button
                            onClick={handleAddToCart}
                            className="bg-white p-2 rounded-full shadow"
                        >
                            <FiShoppingCart size={22} className="text-green-500" />
                        </button>
                    </div>
                </div>

                {/* DETAILS */}
                <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6 space-y-4">
                    <button
                        onClick={() => navigate("/products")}
                        className="flex items-center gap-2 text-sm text-orange-600"
                    >
                        <FiChevronLeft /> Back to Products
                    </button>

                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-600">{product.description}</p>

                    <p className="text-2xl font-bold text-orange-500">
                        KSh {product.price.toLocaleString()}
                    </p>

                    <p
                        className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"
                            }`}
                    >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-2">
                        <button onClick={handleDecrease} className="px-3 py-1 bg-gray-200 rounded">-</button>
                        <span>{cartItem ? cartQty : qty}</span>
                        <button onClick={handleIncrease} className="px-3 py-1 bg-gray-200 rounded">+</button>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-orange-500 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                        >
                            <FiShoppingCart /> Add to Cart
                        </button>

                        <button
                            onClick={handleWishlistToggle}
                            className="flex-1 border py-3 rounded-lg flex items-center justify-center gap-2"
                        >
                            <FiHeart
                                className={isWishlisted ? "text-red-600 fill-red-600" : ""}
                            />
                            Wishlist
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= REVIEWS ================= */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

                {reviewsLoading ? (
                    <p className="text-gray-500">Loading reviews...</p>
                ) : (
                    <ReviewList productId={product._id} />

                )}
            </div>



            {/* ================= MODALS ================= */}
            {showCartSuccess && (
                <SuccessModal
                    message="Product added to cart successfully!"
                    onClose={() => setShowCartSuccess(false)}
                />
            )}

            {showWishlistSuccess && (
                <SuccessModal
                    message="Product added to wishlist successfully!"
                    onClose={() => setShowWishlistSuccess(false)}
                />
            )}
        </div>
    );
};

export default ProductDetailsPage;














