import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { AxiosError } from "axios";
import Header from "../../shared/layout/Header";
import Footer from "../../shared/layout/Footer";
import { FiPhone, FiLoader } from "react-icons/fi";
import { createOrder, initiateMpesaPayment } from "../../services/orderAPI";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart } = useAppSelector((state) => state.cart);
    const { user } = useAppSelector((state) => state.auth);

    const [phone, setPhone] = useState(user?.phone || "");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    if (!cart || cart.items.length === 0) return null;

    const total = cart.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const handleMpesaPay = async () => {
        setError(null);
        setSuccess(null);

        if (!phone) {
            setError("Please enter your M-Pesa phone number");
            return;
        }

        try {
            setLoading(true);

            //  Create order
            const order = await createOrder({
                cartId: cart.cartId,
                shippingAddress: "123 Nairobi Street, Nairobi, Kenya", 
                paymentMethod: "mpesa",
            });

            const orderId = order._id;

            //  Initiate M-Pesa STK Push
            const payment = await initiateMpesaPayment({
                orderId,
                phoneNumber: phone,
            });

            setSuccess(payment.response?.CustomerMessage || "STK Push sent. Check your phone 📱");
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "Payment failed");
            console.error("PAYMENT ERROR:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
                {/* ORDER SUMMARY */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    <div className="space-y-3 text-gray-600">
                        {cart.items.map((item) => (
                            <div key={item.product._id} className="flex justify-between">
                                <span>
                                    {item.product.name} × {item.quantity}
                                </span>
                                <span>
                                    KSh {(item.product.price * item.quantity).toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>KSh {total.toLocaleString()}</span>
                    </div>
                </div>

                {/* PAYMENT */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Pay with M-Pesa</h2>

                    <label className="block mb-2 text-gray-600">Phone Number</label>
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

                    {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
                    {success && <p className="mt-3 text-green-600 text-sm">{success}</p>}

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














