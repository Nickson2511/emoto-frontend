import { useAppSelector } from "../../../hooks";
import { selectFilteredProducts } from "../../../utils/selectors";
import type { ProductSearchParams } from "../../../features/product/types";
import { useNavigate } from "react-router-dom";

interface Props {
    params: ProductSearchParams;
    onSelect?: () => void; // optional callback from parent
}

const SearchResults = ({ params, onSelect }: Props) => {
    const navigate = useNavigate();
    const products = useAppSelector(selectFilteredProducts(params));

    if (!products.length) {
        return <p className="p-4 text-sm text-gray-500">No results found</p>;
    }

    const handleClick = () => {
        navigate(`/products/`); // navigate
        onSelect?.(); // close dropdown
    };

    return (
        <ul className="max-h-96 overflow-y-auto">
            {products.map((p) => (
                <li
                    key={p._id}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleClick()}
                >
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-gray-500">
                        {p.brand} • KSh {p.price.toLocaleString()}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;
