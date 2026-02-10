import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import type { Product, ProductSearchParams } from "../features/product/types";
import { normalize } from "./normalize";

// Select all products from the Redux state
const selectAllProducts = (state: RootState) => state.product.products;

/* ===================== FILTERED PRODUCTS SELECTOR ===================== */
export const selectFilteredProducts = (params: ProductSearchParams) =>
    createSelector([selectAllProducts], (products) => {
        // Start with active products only
        let result: Product[] = products.filter(p => p.isActive);

        /* ================= SEARCH ================= */
        if (params.search) {
            const q = normalize(params.search);

            result = result.filter(p => {
                const categoryName =
                    typeof p.category === "string"
                        ? p.category
                        : p.category?.name ?? "";

                return (
                    normalize(p.name).includes(q) ||
                    normalize(p.brand).includes(q) ||
                    normalize(categoryName).includes(q) ||
                    normalize(p.description).includes(q) ||
                    normalize(p.sku).includes(q)
                );
            });
        }

        /* ================= CATEGORY ================= */
        if (params.category) {
            result = result.filter(p => {
                if (!p.category) return false;

                return typeof p.category === "string"
                    ? p.category === params.category
                    : p.category._id === params.category;
            });
        }

        /* ================= BRAND ================= */
        if (params.brand) {
            result = result.filter(p => p.brand === params.brand);
        }

        /* ================= PRICE ================= */
        if (params.minPrice !== undefined) {
            result = result.filter(p => p.price >= params.minPrice!);
        }

        if (params.maxPrice !== undefined) {
            result = result.filter(p => p.price <= params.maxPrice!);
        }

        /* ================= SORT ================= */
        if (params.sortBy) {
            const sortMap: Record<string, (a: Product, b: Product) => number> = {
                price_asc: (a, b) => a.price - b.price,
                price_desc: (a, b) => b.price - a.price,
                newest: (a, b) =>
                    new Date(b.createdAt ?? "").getTime() -
                    new Date(a.createdAt ?? "").getTime(),
            };

            const sortFn = sortMap[params.sortBy];
            if (sortFn) {
                result = [...result].sort(sortFn);
            }
        }

        return result;
    });














// import { createSelector } from "@reduxjs/toolkit";
// import type { RootState } from "../app/store";
// import type { Product, ProductSearchParams } from "../features/product/types";
// import { normalize } from "./normalize";


// const selectAllProducts = (state: RootState) => state.product.products;

// export const selectFilteredProducts = (
//     params: ProductSearchParams
// ) =>
//     createSelector([selectAllProducts], (products) => {
//         let result: Product[] = products.filter(p => p.isActive);

//         /* ================= SEARCH ================= */
//         if (params.search) {
//             const q = normalize(params.search);
//             result = result.filter(p =>
//                 normalize(p.name).includes(q) ||
//                 normalize(p.brand).includes(q) ||
//                 normalize(
//                     typeof p.category === "string"
//                         ? p.category
//                         : p.category.name
//                 ).includes(q) ||
//                 normalize(p.description).includes(q) ||
//                 normalize(p.sku).includes(q)
//             );
//         }

//         /* ================= CATEGORY ================= */
//         if (params.category) {
//             result = result.filter(p =>
//                 typeof p.category === "string"
//                     ? p.category === params.category
//                     : p.category._id === params.category
//             );
//         }

//         /* ================= BRAND ================= */
//         if (params.brand) {
//             result = result.filter(p => p.brand === params.brand);
//         }

//         /* ================= PRICE ================= */
//         if (params.minPrice !== undefined) {
//             result = result.filter(p => p.price >= params.minPrice!);
//         }

//         if (params.maxPrice !== undefined) {
//             result = result.filter(p => p.price <= params.maxPrice!);
//         }

//         /* ================= SORT ================= */
//         if (params.sortBy) {
//             const sortMap: Record<string, (a: Product, b: Product) => number> = {
//                 price_asc: (a, b) => a.price - b.price,
//                 price_desc: (a, b) => b.price - a.price,
//                 newest: (a, b) =>
//                     new Date(b.createdAt!).getTime() -
//                     new Date(a.createdAt!).getTime(),
//             };

//             result = [...result].sort(sortMap[params.sortBy]);
//         }

//         return result;
//     });
