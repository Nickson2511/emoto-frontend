import RatingStars from "./RatingStars";
import type { Review } from "../../../features/review/types";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { deleteReview } from "../../../features/review/reviewSlice";

const ReviewItem = ({ review }: { review: Review }) => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((s) => s.auth.user?.id);

    const isOwner = userId === review.user._id;

    return (
        <div className="border-b py-4">
            <div className="flex justify-between">
                <p className="font-semibold">{review.user.name}</p>
                {isOwner && (
                    <button
                        onClick={() => dispatch(deleteReview(review._id))}
                        className="text-sm text-red-500"
                    >
                        Delete
                    </button>
                )}
            </div>

            <RatingStars value={review.rating} />

            <p className="text-gray-700 mt-2">{review.comment}</p>

            <p className="text-xs text-gray-400 mt-1">
                {new Date(review.createdAt).toLocaleDateString()}
            </p>
        </div>
    );
};

export default ReviewItem;
