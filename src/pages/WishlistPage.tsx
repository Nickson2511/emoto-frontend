import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { Heart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../shared/layout/Header";


const WishlistPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { products, loading } = useAppSelector(state => state.wishlist);
    const user = useAppSelector(state => state.auth.user);

    useEffect(() => {
        if (user) {
            dispatch(fetchWishlist());
        }
    }, [dispatch, user]);

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto p-8 text-center">
                <h2 className="text-xl font-semibold mb-4">
                    Please login to view your wishlist
                </h2>
                <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 bg-primary text-white rounded-lg"
                >
                    Login
                </button>
            </div>
        );
    }

    if (loading) {
        return <div className="p-8 text-center">Loading wishlist...</div>;
    }

    if (products.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-8 text-center">
                <Heart size={40} className="mx-auto mb-4 text-gray-400" />
                <h2 className="text-xl font-semibold mb-2">
                    Your wishlist is empty
                </h2>
                <p className="text-gray-500 mb-6">
                    Start saving items you love ❤️
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-primary text-white rounded-lg"
                >
                    Browse Products
                </button>
            </div>
        );
    }

    return (

        <div className="max-w-6xl mx-auto p-6">
            <Header />

            <h1 className="text-2xl font-bold mb-6">
                My Wishlist ({products.length})
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div
                        key={product._id}
                        className="border rounded-lg p-4 flex flex-col"
                    >
                        <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="h-40 object-contain mb-4 cursor-pointer"
                            onClick={() => navigate(`/products/${product._id}`)}
                        />

                        <h3 className="font-medium mb-2">
                            {product.name}
                        </h3>

                        <p className="text-sm text-gray-500 mb-4">
                            ${product.price}
                        </p>

                        <button
                            onClick={() => dispatch(removeFromWishlist(product._id))}
                            className="mt-auto flex items-center justify-center gap-2 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg"
                        >
                            <Trash2 size={16} />
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
