export const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 rounded px-1">
                {part}
            </mark>
        ) : (
            part
        )
    );
};
