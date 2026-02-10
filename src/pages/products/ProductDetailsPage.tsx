import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../../features/product/types";
import Header from "../../shared/layout/Header";
import CategoriesBar from "../../shared/layout/CategoriesBar";
import Footer from "../../shared/layout/Footer";
import { FiShoppingCart, FiHeart, FiChevronLeft } from "react-icons/fi";
import { fetchProductById } from "../../services/productAPI";
import { useAppDispatch, useAppSelector } from "../../hooks";
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

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();

    const cart = useAppSelector(state => state.cart.cart);
    const wishlist = useAppSelector(state => state.wishlist.products);

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    /* ================= MODALS ================= */
    const [showCartSuccess, setShowCartSuccess] = useState(false);
    const [showWishlistSuccess, setShowWishlistSuccess] = useState(false);

    /* ================= WISHLIST LOGIC ================= */
    const isWishlisted = wishlist.some(
        item => item._id === product?._id
    );

    const handleWishlistToggle = async () => {
        if (!product) return;

        if (isWishlisted) {
            await dispatch(removeFromWishlist(product._id));
        } else {
            await dispatch(addToWishlist(product._id));
            setShowWishlistSuccess(true);
        }
    };

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

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
            <Header />
            <CategoriesBar/>

            <div
                ref={containerRef}
                className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center md:items-start gap-8"
            >
                {/* ================= IMAGE ================= */}
                <div className="relative w-full md:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden flex justify-center items-center">
                    <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full max-w-md h-auto md:h-[500px] object-cover rounded-xl"
                    />

                    {/* Floating Actions */}
                    <div className="absolute top-4 right-4 flex flex-row md:flex-col gap-3">
                        <div
                            onClick={handleWishlistToggle}
                            className="bg-white p-2 rounded-full shadow hover:bg-orange-50 cursor-pointer transition"
                        >
                            <FiHeart
                                size={24}
                                className={
                                    isWishlisted
                                        ? "text-red-600 fill-red-600"
                                        : "text-gray-400"
                                }
                            />
                        </div>

                        <div
                            onClick={handleAddToCart}
                            className="bg-white p-2 rounded-full shadow hover:bg-orange-50 cursor-pointer transition"
                        >
                            <FiShoppingCart className="text-green-500" size={24} />
                        </div>
                    </div>
                </div>

                {/* ================= DETAILS ================= */}
                <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6 flex flex-col gap-5">
                    <button
                        onClick={() => navigate("/products")}
                        className="flex items-center gap-2 text-sm text-orange-600 hover:underline"
                    >
                        <FiChevronLeft />
                        Back to Products
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

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-gray-200 rounded" onClick={handleDecrease}>-</button>
                        <span>{cartItem ? cartQty : qty}</span>
                        <button className="px-3 py-1 bg-gray-200 rounded" onClick={handleIncrease}>+</button>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center justify-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-lg hover:bg-orange-600"
                        >
                            <FiShoppingCart size={20} />
                            Add to Cart
                        </button>

                        <button
                            onClick={handleWishlistToggle}
                            className="flex items-center justify-center gap-2 border px-5 py-3 rounded-lg hover:bg-gray-100"
                        >
                            <FiHeart
                                size={20}
                                className={
                                    isWishlisted
                                        ? "text-red-600 fill-red-600"
                                        : ""
                                }
                            />
                            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        </button>
                    </div>
                </div>
            </div>

            <Footer />

            {/* CART SUCCESS */}
            {showCartSuccess && (
                <SuccessModal
                    message="Product added to cart successfully!"
                    onClose={() => setShowCartSuccess(false)}
                />
            )}

            {/* WISHLIST SUCCESS */}
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







// import { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import type { Product } from "../../features/product/types";
// import Header from "../../shared/layout/Header";
// import Footer from "../../shared/layout/Footer";
// import { FiShoppingCart, FiHeart, FiChevronLeft } from "react-icons/fi";
// import { fetchProductById } from "../../services/productAPI";
// import { useAppDispatch, useAppSelector } from "../../hooks";
// import {
//     addToCart,
//     fetchCart,
//     updateCartItem,
//     removeCartItem
// } from "../../features/cart/cartSlice";
// import SuccessModal from "../../shared/components/modals/SuccessModal";
// import {
//     addToWishlist,
//     removeFromWishlist,
//     fetchWishlist
// } from "../../features/wishlist/wishlistSlice";

// const ProductDetailsPage = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const containerRef = useRef<HTMLDivElement | null>(null);
//     const dispatch = useAppDispatch();

//     const cart = useAppSelector(state => state.cart.cart);
//     const wishlist = useAppSelector(state => state.wishlist.products);

//     const [product, setProduct] = useState<Product | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [qty, setQty] = useState(1);
//     const [showSuccess, setShowSuccess] = useState(false);

//     /* ================= WISHLIST LOGIC ================= */
//     const isWishlisted = wishlist.some(
//         item => item._id === product?._id
//     );

//     const handleWishlistToggle = async () => {
//         if (!product) return;

//         if (isWishlisted) {
//             await dispatch(removeFromWishlist(product._id));
//         } else {
//             await dispatch(addToWishlist(product._id));
//         }
//     };

//     useEffect(() => {
//         dispatch(fetchWishlist());
//     }, [dispatch]);

//     /* ================= FETCH PRODUCT ================= */
//     useEffect(() => {
//         const getProduct = async () => {
//             try {
//                 if (!id) return;
//                 const data = await fetchProductById(id);
//                 setProduct(data);
//             } catch (error) {
//                 console.error(error);
//                 setProduct(null);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         getProduct();
//     }, [id]);

//     /* ================= CART ================= */
//     useEffect(() => {
//         containerRef.current?.scrollIntoView({ behavior: "smooth" });
//         dispatch(fetchCart());
//     }, [product, dispatch]);

//     const cartItem = cart?.items.find(
//         item => item.product._id === product?._id
//     );

//     const cartQty = cartItem?.quantity ?? 0;

//     useEffect(() => {
//         if (cartItem) {
//             setQty(cartItem.quantity);
//         }
//     }, [cartItem]);

//     const handleAddToCart = async () => {
//         if (!product) return;

//         if (cartItem) {
//             await dispatch(
//                 updateCartItem({
//                     productId: product._id,
//                     quantity: cartItem.quantity + 1,
//                 })
//             );
//         } else {
//             await dispatch(
//                 addToCart({
//                     productId: product._id,
//                     quantity: qty,
//                 })
//             );
//         }

//         setShowSuccess(true);
//     };

//     const handleIncrease = async () => {
//         if (!product) return;

//         if (cartItem) {
//             await dispatch(
//                 updateCartItem({
//                     productId: product._id,
//                     quantity: cartItem.quantity + 1,
//                 })
//             );
//         } else {
//             setQty(prev => prev + 1);
//         }
//     };

//     const handleDecrease = async () => {
//         if (!product) return;

//         if (cartItem) {
//             if (cartItem.quantity === 1) {
//                 await dispatch(removeCartItem(product._id));
//                 setQty(1);
//             } else {
//                 await dispatch(
//                     updateCartItem({
//                         productId: product._id,
//                         quantity: cartItem.quantity - 1,
//                     })
//                 );
//             }
//         } else {
//             setQty(prev => Math.max(prev - 1, 1));
//         }
//     };

//     /* ================= UI STATES ================= */
//     if (loading)
//         return <p className="p-6 text-center text-gray-600">Loading product...</p>;

//     if (!product)
//         return <p className="p-6 text-center text-gray-600">Product not found</p>;

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Header />

//             <div
//                 ref={containerRef}
//                 className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center md:items-start gap-8"
//             >
//                 {/* ================= IMAGE ================= */}
//                 <div className="relative w-full md:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden flex justify-center items-center">
//                     <img
//                         src={product.images?.[0]}
//                         alt={product.name}
//                         className="w-full max-w-md h-auto md:h-[500px] object-cover rounded-xl"
//                     />

//                     {/* Floating Actions */}
//                     <div className="absolute top-4 right-4 flex flex-row md:flex-col gap-3">
//                         <div
//                             onClick={handleWishlistToggle}
//                             className="bg-white p-2 rounded-full shadow hover:bg-orange-50 cursor-pointer transition"
//                         >
//                             <FiHeart
//                                 size={24}
//                                 className={
//                                     isWishlisted
//                                         ? "text-red-600 fill-red-600"
//                                         : "text-gray-400"
//                                 }
//                             />
//                         </div>

//                         <div
//                             onClick={handleAddToCart}
//                             className="bg-white p-2 rounded-full shadow hover:bg-orange-50 cursor-pointer transition"
//                         >
//                             <FiShoppingCart className="text-green-500" size={24} />
//                         </div>
//                     </div>
//                 </div>

//                 {/* ================= DETAILS ================= */}
//                 <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6 flex flex-col gap-5">
//                     <button
//                         onClick={() => navigate("/products")}
//                         className="flex items-center gap-2 text-sm text-orange-600 hover:underline"
//                     >
//                         <FiChevronLeft />
//                         Back to Products
//                     </button>

//                     <h1 className="text-3xl font-bold">{product.name}</h1>
//                     <p className="text-gray-600">{product.description}</p>

//                     <p className="text-2xl font-bold text-orange-500">
//                         KSh {product.price.toLocaleString()}
//                     </p>

//                     <p
//                         className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"
//                             }`}
//                     >
//                         {product.stock > 0 ? "In Stock" : "Out of Stock"}
//                     </p>

//                     {/* Quantity */}
//                     <div className="flex items-center gap-2">
//                         <button className="px-3 py-1 bg-gray-200 rounded" onClick={handleDecrease}>-</button>
//                         <span>{cartItem ? cartQty : qty}</span>
//                         <button className="px-3 py-1 bg-gray-200 rounded" onClick={handleIncrease}>+</button>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex flex-col sm:flex-row gap-3 mt-4">
//                         <button
//                             onClick={handleAddToCart}
//                             className="flex items-center justify-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-lg hover:bg-orange-600"
//                         >
//                             <FiShoppingCart size={20} />
//                             Add to Cart
//                         </button>

//                         <button
//                             onClick={handleWishlistToggle}
//                             className="flex items-center justify-center gap-2 border px-5 py-3 rounded-lg hover:bg-gray-100"
//                         >
//                             <FiHeart
//                                 size={20}
//                                 className={
//                                     isWishlisted
//                                         ? "text-red-600 fill-red-600"
//                                         : ""
//                                 }
//                             />
//                             {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <Footer />

//             {showSuccess && (
//                 <SuccessModal
//                     message="Product added to cart successfully!"
//                     onClose={() => setShowSuccess(false)}
//                 />
//             )}
//         </div>
//     );
// };

// export default ProductDetailsPage;





