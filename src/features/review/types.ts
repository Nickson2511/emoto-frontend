export interface Review {
    _id: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    user: {
        _id: string;
        name: string;
    };
    product: string;
}
