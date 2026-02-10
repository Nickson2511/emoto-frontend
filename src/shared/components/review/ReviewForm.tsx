import { useState } from "react";
import RatingStars from "./RatingStars";
import { useAppDispatch } from "../../../hooks";
import { createReview } from "../../../features/review/reviewSlice";

const ReviewForm = ({ productId }: { productId: string }) => {
    const dispatch = useAppDispatch();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const submit = () => {
        if (!comment.trim()) return;
        dispatch(createReview({ productId, rating, comment }));
        setComment("");
    };

    return (
        <div className="border p-4 rounded-lg mt-4">
            <h3 className="font-semibold mb-2">Write a review</h3>

            <RatingStars value={rating} onChange={setRating} />

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border rounded p-2 mt-2"
                rows={3}
                placeholder="Share your experience..."
            />

            <button
                onClick={submit}
                className="mt-3 bg-orange-600 text-white px-4 py-2 rounded"
            >
                Submit Review
            </button>
        </div>
    );
};

export default ReviewForm;
