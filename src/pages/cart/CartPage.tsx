import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    fetchCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} from "../../features/cart/cartSlice";
import type { CartItem } from "../../features/cart/cartSlice";
import Header from "../../shared/layout/Header";
import Footer from "../../shared/layout/Footer";

const CartPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { cart, loading } = useAppSelector((state) => state.cart);

    const [optimisticQuantities, setOptimisticQuantities] = useState<
        Record<string, number>
    >({});

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleQtyChange = (productId: string, qty: number) => {
        if (qty < 1) return;
        setOptimisticQuantities((prev) => ({ ...prev, [productId]: qty }));
        dispatch(updateCartItem({ productId, quantity: qty }));
    };

    const handleRemove = (productId: string) => {
        dispatch(removeCartItem(productId));
        setOptimisticQuantities((prev) => {
            const copy = { ...prev };
            delete copy[productId];
            return copy;
        });
    };

    const total =
        cart?.items.reduce((acc, item) => {
            const qty = optimisticQuantities[item.product._id] ?? item.quantity;
            return acc + item.product.price * qty;
        }, 0) ?? 0;

    if (loading) {
        return <p className="p-8 text-center text-gray-500">Loading cart…</p>;
    }

    if (!cart || cart.items.length === 0) {
        return (
            <>
                <Header />
                <div className="min-h-[60vh] flex items-center justify-center">
                    <p className="text-xl text-gray-500">
                        Your cart is empty. Start shopping 🛒
                    </p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CART ITEMS */}
                <div className="lg:col-span-2 space-y-4">
                    <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

                    {cart.items.map((item: CartItem) => {
                        const product = item.product;
                        const qty =
                            optimisticQuantities[product._id] ?? item.quantity;

                        return (
                            <div
                                key={product._id}
                                className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-4"
                            >
                                {/* Product Info */}
                                <div className="flex-1">
                                    <p className="font-semibold text-lg">{product.name}</p>
                                    <p className="text-gray-500 mt-1">
                                        KSh {product.price.toLocaleString()}
                                    </p>
                                </div>

                                {/* Quantity Control */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center border rounded-lg overflow-hidden">
                                        <button
                                            onClick={() =>
                                                handleQtyChange(product._id, qty - 1)
                                            }
                                            className="px-3 py-2 hover:bg-gray-100"
                                        >
                                            <FiMinus />
                                        </button>
                                        <span className="px-4 font-medium">{qty}</span>
                                        <button
                                            onClick={() =>
                                                handleQtyChange(product._id, qty + 1)
                                            }
                                            className="px-3 py-2 hover:bg-gray-100"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => handleRemove(product._id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        title="Remove item"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>

                                {/* Item Total */}
                                <div className="sm:text-right font-semibold text-lg">
                                    KSh {(product.price * qty).toLocaleString()}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ORDER SUMMARY */}
                <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    <div className="flex justify-between mb-3 text-gray-600">
                        <span>Items</span>
                        <span>{cart.items.length}</span>
                    </div>

                    <div className="flex justify-between mb-4 font-bold text-lg">
                        <span>Total</span>
                        <span>KSh {total.toLocaleString()}</span>
                    </div>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                    >
                        Proceed to Checkout
                    </button>

                    <button
                        onClick={() => dispatch(clearCart())}
                        className="w-full mt-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CartPage;










