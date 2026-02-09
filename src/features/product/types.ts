export interface Category {
    _id: string;
    name: string;
}

export interface SubCategory {
    _id: string;
    name: string;
    category: string;
}


export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    oldPrice: number;
    stock: number;
    images: string[];
    category: Category | string;
    subCategory: SubCategory | string;
    brand: string;
    condition: string;
    isActive: boolean;
    sku: string;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
    rating?: number;
    numReviews?: number;
}

export interface ProductSearchParams {
    search?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: "price_asc" | "price_desc" | "newest";
}


