import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { AxiosError } from "axios";
import Footer from "../../shared/layout/Footer";
import AddressSection from "../../shared/components/checkout/AddressSection";
import { FiPhone, FiLoader } from "react-icons/fi";
import { createOrder, initiateMpesaPayment } from "../../services/orderAPI";
import type { Address } from "../../types/address";



const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart } = useAppSelector((state) => state.cart);
    const { user } = useAppSelector((state) => state.auth);
    const [phone, setPhone] = useState(user?.phone || "");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

    if (!cart || cart.items.length === 0) return null;

    const total = cart.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const handleMpesaPay = async () => {
        setError(null);
        setSuccess(null);

        if (!selectedAddress) {
            setError("Please select a delivery address");
            return;
        }

        if (!phone) {
            setError("Please enter your M-Pesa phone number");
            return;
        }

        try {
            setLoading(true);

            // Create Order
            const order = await createOrder({
                cartId: cart.cartId,
                shippingAddress: selectedAddress._id,
                paymentMethod: "mpesa",
            });

            const orderId = order._id;

            // Initiate M-Pesa STK Push
            const payment = await initiateMpesaPayment({
                orderId,
                phoneNumber: phone,
            });

            setSuccess(
                payment.response?.CustomerMessage ||
                "STK Push sent. Check your phone 📱"
            );
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;

            setError(
                axiosError.response?.data?.message ||
                "Payment initiation failed"
            );

            console.error("PAYMENT ERROR:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">


            <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">

                {/* LEFT SIDE */}
                <div className="space-y-6">

                    {/* ORDER SUMMARY */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3 text-gray-600">
                            {cart.items.map((item) => (
                                <div
                                    key={item.product._id}
                                    className="flex justify-between"
                                >
                                    <span>
                                        {item.product.name} × {item.quantity}
                                    </span>

                                    <span>
                                        KSh{" "}
                                        {(
                                            item.product.price * item.quantity
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>KSh {total.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* ADDRESS SECTION */}
                    <AddressSection
                        onSelect={(address: Address) =>
                            setSelectedAddress(address)
                        }
                    />

                    {/* SELECTED ADDRESS DISPLAY */}
                    {selectedAddress && (
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <p className="text-sm text-green-700">
                                Delivering to:
                            </p>

                            <p className="font-semibold">
                                {selectedAddress.fullName}
                            </p>

                            <p className="text-sm text-gray-600">
                                {selectedAddress.area},{" "}
                                {selectedAddress.city},{" "}
                                {selectedAddress.county}
                            </p>
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE - PAYMENT */}
                <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
                    <h2 className="text-xl font-semibold mb-4">
                        Pay with M-Pesa
                    </h2>

                    <label className="block mb-2 text-gray-600">
                        Phone Number
                    </label>

                    <div className="flex items-center border rounded-lg px-3">
                        <FiPhone className="text-gray-400 mr-2" />

                        <input
                            type="tel"
                            placeholder="07XXXXXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full py-3 outline-none"
                        />
                    </div>

                    {error && (
                        <p className="mt-3 text-red-500 text-sm">{error}</p>
                    )}

                    {success && (
                        <p className="mt-3 text-green-600 text-sm">
                            {success}
                        </p>
                    )}

                    <button
                        onClick={handleMpesaPay}
                        disabled={loading}
                        className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <FiLoader className="animate-spin" />
                                Processing…
                            </>
                        ) : (
                            "Pay Now"
                        )}
                    </button>

                    <button
                        onClick={() => navigate("/cart")}
                        className="w-full mt-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                        Back to Cart
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CheckoutPage;










