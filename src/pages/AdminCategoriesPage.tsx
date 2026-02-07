import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
    getCategories,
    addCategory,
    selectCategory,
    getSubCategories,
    addSubCategory,
} from "../features/category/categorySlice";

const AdminCategoriesPage = () => {
    const dispatch = useAppDispatch();
    const { categories, subCategories, selectedCategory } =
        useAppSelector((state) => state.category);

    const [categoryName, setCategoryName] = useState("");
    const [subCategoryName, setSubCategoryName] = useState("");

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const createCategoryHandler = () => {
        if (!categoryName.trim()) return;
        dispatch(addCategory({ name: categoryName }));
        setCategoryName("");
    };

    const createSubCategoryHandler = () => {
        if (!subCategoryName.trim() || !selectedCategory) return;

        dispatch(
            addSubCategory({
                name: subCategoryName,
                category: selectedCategory._id,
            })
        );
        setSubCategoryName("");
    };

    return (
        <div className="h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ================= LEFT: CATEGORIES ================= */}
            <div className="lg:col-span-4 xl:col-span-3 bg-white border rounded-xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b">
                    <h2 className="text-base font-semibold text-gray-800">
                        Categories
                    </h2>

                    {/* Create Category */}
                    <div className="mt-4 space-y-2">
                        <input
                            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Category name"
                            value={categoryName}
                            onChange={(e) =>
                                setCategoryName(e.target.value)
                            }
                        />
                        <button
                            onClick={createCategoryHandler}
                            className="w-full bg-orange-500 text-white py-2 rounded-md text-sm hover:bg-orange-600 transition"
                        >
                            Create Category
                        </button>
                    </div>
                </div>

                {/* Category List */}
                <div className="flex-1 overflow-y-auto">
                    {categories.length === 0 ? (
                        <div className="p-4 text-sm text-gray-400">
                            No categories created yet
                        </div>
                    ) : (
                        <ul className="divide-y">
                            {categories.map((cat) => (
                                <li key={cat._id}>
                                    <button
                                        onClick={() => {
                                            dispatch(selectCategory(cat));
                                            dispatch(
                                                getSubCategories(cat._id)
                                            );
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm transition ${
                                            selectedCategory?._id ===
                                            cat._id
                                                ? "bg-orange-50 text-orange-700 font-medium"
                                                : "hover:bg-gray-50"
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* ================= RIGHT: SUBCATEGORIES ================= */}
            <div className="lg:col-span-8 xl:col-span-9 bg-white border rounded-xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-gray-800">
                            Subcategories
                        </h2>
                        {selectedCategory && (
                            <p className="text-sm text-gray-500">
                                Category:{" "}
                                <span className="font-medium text-gray-700">
                                    {selectedCategory.name}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {!selectedCategory ? (
                        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                            Select a category to view and manage subcategories
                        </div>
                    ) : (
                        <>
                            {/* Create Subcategory */}
                            <div className="mb-6 flex gap-3 max-w-xl">
                                <input
                                    className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Subcategory name"
                                    value={subCategoryName}
                                    onChange={(e) =>
                                        setSubCategoryName(
                                            e.target.value
                                        )
                                    }
                                />
                                <button
                                    onClick={createSubCategoryHandler}
                                    className="bg-orange-500 text-white px-5 rounded-md text-sm hover:bg-orange-600 transition"
                                >
                                    Add
                                </button>
                            </div>

                            {/* Subcategory List */}
                            {subCategories.length === 0 ? (
                                <div className="text-sm text-gray-400">
                                    No subcategories for this category
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {subCategories.map((sub) => (
                                        <div
                                            key={sub._id}
                                            className="border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition"
                                        >
                                            <span className="text-sm font-medium text-gray-800">
                                                {sub.name}
                                            </span>
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                                Active
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCategoriesPage;





