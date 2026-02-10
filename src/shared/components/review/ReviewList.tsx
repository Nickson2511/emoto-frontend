import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchProductReviews } from "../../../features/review/reviewSlice";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";

const ReviewList = ({ productId }: { productId: string }) => {
    const dispatch = useAppDispatch();
    const { reviews, loading } = useAppSelector((s) => s.review);
    const isAuth = useAppSelector((s) => !!s.auth.user);

    useEffect(() => {
        dispatch(fetchProductReviews(productId));
    }, [productId, dispatch]);

    return (
        <div id="reviews" className="mt-10">
            <h2 className="text-xl font-bold mb-4">
                Customer Reviews ({reviews.length})
            </h2>

            {loading && <p>Loading reviews...</p>}

            {!loading && reviews.length === 0 && (
                <p className="text-gray-500">No reviews yet.</p>
            )}

            {reviews.map((r) => (
                <ReviewItem key={r._id} review={r} />
            ))}

            {isAuth && <ReviewForm productId={productId} />}
        </div>
    );
};

export default ReviewList;
