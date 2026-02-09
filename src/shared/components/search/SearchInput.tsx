import { useState, useEffect } from "react";

interface Props {
    value?: string;
    onSearch: (value: string) => void;
}

const SearchInput = ({ value = '', onSearch }: Props) => {
    const [inputValue, setInputValue] = useState(value);

    // Sync when parent changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    return (
        <input
            value={inputValue}
            onChange={(e) => {
                setInputValue(e.target.value);
                onSearch(e.target.value);
            }}
            placeholder="Search products..."
            className="w-full px-3 py-2 outline-none"
        />
    );
};

export default SearchInput;
