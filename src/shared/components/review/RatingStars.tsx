interface Props {
    value: number;
    onChange?: (v: number) => void;
}

const RatingStars = ({ value, onChange }: Props) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange?.(star)}
                    className={`text-2xl ${star <= value ? "text-yellow-400" : "text-gray-300"
                        }`}
                >
                    ★
                </button>
            ))}
        </div>
    );
};

export default RatingStars;
