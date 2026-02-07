import { useEffect, useState } from "react";
import api from "../../services/api";
import { FiChevronLeft, FiChevronRight, FiTrash2, FiEdit2, FiEye, FiX } from "react-icons/fi";
import { AxiosError } from "axios";
import type { Product as ProductType, Category as CategoryType, SubCategory as SubCategoryType } from "../../features/product/types";
import { fetchCategories, fetchSubCategoriesByCategory } from "../../services/categoryAPI";
import SuccessModal from "../components/modals/SuccessModal";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";


const PRODUCTS_PER_PAGE = 12;

// Type guard to safely check if object has a name property
const isNamedObject = (obj: unknown): obj is { name: string } => {
    return typeof obj === "object" && obj !== null && "name" in obj && typeof (obj as { name: string }).name === "string";
};

const ProductsTable = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Modals
    const [viewProduct, setViewProduct] = useState<ProductType | null>(null);
    const [editProduct, setEditProduct] = useState<ProductType | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);


    // Form state for editing
    const [editForm, setEditForm] = useState<Partial<ProductType>>({});
    const [newImages, setNewImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);


    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await api.get("/products");
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };

        const fetchAllCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };

        fetchProducts();
        fetchAllCategories();
    }, []);

    useEffect(() => {
        if (!editForm.category) {
            setSubCategories([]);
            return;
        }

        const loadSubCategories = async () => {
            try {
                const data = await fetchSubCategoriesByCategory(editForm.category as string);
                setSubCategories(data);
            } catch (err) {
                console.error("Failed to fetch subcategories:", err);
            }
        };

        loadSubCategories();
    }, [editForm.category]);


    // Pagination
    const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);


    const handleDelete = (id: string) => {
        setDeleteProductId(id);
    };

    const confirmDelete = async () => {
        if (!deleteProductId) return;

        try {
            setDeleteLoading(true);
            await api.delete(`/products/${deleteProductId}`);

            setProducts((prev) =>
                prev.filter((p) => p._id !== deleteProductId)
            );

            setSuccessMessage("Product deleted successfully 🎉");
        } catch (err) {
            console.error(err);
            setSuccessMessage("Failed to delete product");
        } finally {
            setDeleteLoading(false);
            setDeleteProductId(null);
        }
    };


    // View modal
    const handleView = (product: ProductType) => {
        setViewProduct(product);
        setModalOpen(true);
    };
    const closeViewModal = () => setModalOpen(false);

    // Edit modal
    const handleEdit = (product: ProductType) => {
        setEditProduct(product);
        setEditForm(product);
        setPreviewImages(product.images || []);
        setEditModalOpen(true);
    };
    const closeEditModal = () => {
        setEditModalOpen(false);
        setEditProduct(null);
        setEditForm({});
        setNewImages([]);
        setPreviewImages([]);
    };

    const handleImageChange = (files: FileList | null) => {
        if (!files) return;
        const arr = Array.from(files);
        setNewImages(arr);
        setPreviewImages(arr.map((f) => URL.createObjectURL(f)));
    };

    // Submit edit
    const submitEdit = async () => {
        if (editForm.oldPrice && editForm.price && Number(editForm.oldPrice) <= Number(editForm.price)) {
            alert("Old price must be greater than price");
            return;
        }

        const fd = new FormData();
        Object.entries(editForm).forEach(([key, value]) => {
            if (value !== undefined) {
                // If category or subCategory, make sure it's a string (ID)
                if (key === "category" || key === "subCategory") {
                    fd.append(key, String(value));
                } else {
                    fd.append(key, String(value));
                }
            }
        });
        newImages.forEach((img) => fd.append("images", img));

        try {
            await api.patch(`/products/${editProduct?._id}`, fd);
            const { data: updatedProducts } = await api.get("/products");
            setProducts(updatedProducts);
            setSuccessMessage("Product updated successfully 🎉"); // <-- show modal
            closeEditModal();
        } catch (err) {
            const errors = err as AxiosError<{ message: string }>;
            console.error(errors);
            setSuccessMessage(errors.response?.data?.message || "Failed to update product"); // show modal for errors too
        }

    };

    return (
        <div className="mt-8 bg-white rounded shadow p-4 w-full">
            <h2 className="text-lg font-bold mb-4">Products List</h2>

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="w-full min-w-[800px] border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border-b">#</th>
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">Brand</th>
                                <th className="px-4 py-2 border-b">Category</th>
                                <th className="px-4 py-2 border-b">Price</th>
                                <th className="px-4 py-2 border-b">Stock</th>
                                <th className="px-4 py-2 border-b">SKU</th>
                                <th className="px-4 py-2 border-b">Active</th>
                                <th className="px-4 py-2 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((p, idx) => (
                                <tr key={p._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{startIndex + idx + 1}</td>
                                    <td className="px-4 py-2 border-b">{p.name}</td>
                                    <td className="px-4 py-2 border-b">{isNamedObject(p.brand) ? p.brand.name : p.brand}</td>
                                    <td className="px-4 py-2 border-b">{isNamedObject(p.category) ? p.category.name : p.category}</td>
                                    <td className="px-4 py-2 border-b">${p.price}</td>
                                    <td className="px-4 py-2 border-b">{p.stock}</td>
                                    <td className="px-4 py-2 border-b">{p.sku}</td>
                                    <td className="px-4 py-2 border-b">{p.isActive ? "Yes" : "No"}</td>
                                    <td className="px-4 py-2 border-b flex items-center gap-2">
                                        <FiEye className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleView(p)} />
                                        <FiEdit2 className="cursor-pointer text-green-600 hover:text-green-800" onClick={() => handleEdit(p)} />
                                        <FiTrash2 className="cursor-pointer text-red-600 hover:text-red-800" onClick={() => handleDelete(p._id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {products.length > PRODUCTS_PER_PAGE && (
                <div className="flex justify-center items-center gap-4 mt-4">
                    <FiChevronLeft onClick={handlePrev} className={`cursor-pointer text-gray-600 hover:text-gray-900 ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : ""}`} size={24} />
                    <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
                    <FiChevronRight onClick={handleNext} className={`cursor-pointer text-gray-600 hover:text-gray-900 ${currentPage === totalPages ? "opacity-30 cursor-not-allowed" : ""}`} size={24} />
                </div>
            )}

            {/* View Modal */}
            {modalOpen && viewProduct && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative overflow-y-auto max-h-[90vh]">
                        <FiX size={24} className="absolute top-4 right-4 cursor-pointer hover:text-gray-700" onClick={closeViewModal} />
                        <h3 className="text-xl font-bold mb-4">{viewProduct.name}</h3>
                        <img src={viewProduct.images?.[0]} alt={viewProduct.name} className="w-full h-48 object-cover rounded mb-4" />
                        <p className="mb-2"><b>Brand:</b> {isNamedObject(viewProduct.brand) ? viewProduct.brand.name : viewProduct.brand}</p>
                        <p className="mb-2"><b>Category:</b> {isNamedObject(viewProduct.category) ? viewProduct.category.name : viewProduct.category}</p>
                        <p className="mb-2"><b>Price:</b> ${viewProduct.price}</p>
                        <p className="mb-2"><b>Stock:</b> {viewProduct.stock}</p>
                        <p className="mb-2"><b>SKU:</b> {viewProduct.sku}</p>
                        <p className="mb-2"><b>Active:</b> {viewProduct.isActive ? "Yes" : "No"}</p>
                        <p className="text-gray-600 mt-2">{viewProduct.description}</p>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModalOpen && editProduct && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
                        <FiX size={24} className="absolute top-4 right-4 cursor-pointer hover:text-gray-700" onClick={closeEditModal} />
                        <h3 className="text-xl font-bold mb-4">Edit Product</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input placeholder="Product Name" className="input" value={editForm.name || ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                            <input placeholder="Brand" className="input" value={editForm.brand || ""} onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })} />
                            <input placeholder="SKU" className="input" value={editForm.sku || ""} onChange={(e) => setEditForm({ ...editForm, sku: e.target.value })} />
                            <input type="number" placeholder="Price" className="input" value={editForm.price ?? ""} onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })} />
                            <input type="number" placeholder="Old Price" className="input" value={editForm.oldPrice ?? ""} onChange={(e) => setEditForm({ ...editForm, oldPrice: Number(e.target.value) })} />
                            <input type="number" placeholder="Stock" className="input" value={editForm.stock ?? ""} onChange={(e) => setEditForm({ ...editForm, stock: Number(e.target.value) })} />

                            {/* Category dropdown */}

                            <select
                                className="input"
                                value={typeof editForm.category === "string" ? editForm.category : editForm.category?._id || ""}
                                onChange={(e) => {
                                    setEditForm({ ...editForm, category: e.target.value });
                                }}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="input"
                                value={typeof editForm.subCategory === "string" ? editForm.subCategory : editForm.subCategory?._id || ""}
                                onChange={(e) => setEditForm({ ...editForm, subCategory: e.target.value })}
                                disabled={!editForm.category}
                            >
                                <option value="">Select SubCategory</option>
                                {subCategories.map((sub) => (
                                    <option key={sub._id} value={sub._id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>



                            <select className="input" value={editForm.isActive ? "true" : "false"} onChange={(e) => setEditForm({ ...editForm, isActive: e.target.value === "true" })}>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>

                        <textarea placeholder="Description" className="input h-24 mt-2" value={editForm.description || ""} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}></textarea>

                        {/* Images */}
                        <div className="mt-2">
                            <p className="font-semibold mb-1">Images</p>
                            <input type="file" multiple onChange={(e) => handleImageChange(e.target.files)} />
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {previewImages.map((img, idx) => (
                                    <img key={idx} src={img} className="w-24 h-24 object-cover rounded border" />
                                ))}
                            </div>
                        </div>

                        <button onClick={submitEdit} className="mt-4 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">Save Changes</button>
                    </div>
                </div>
            )}
            {successMessage && (
                <SuccessModal
                    message={successMessage}
                    onClose={() => setSuccessMessage(null)}
                />
            )}

            {deleteProductId && (
                <DeleteConfirmModal
                    message="This action cannot be undone. Are you sure you want to delete this product?"
                    onCancel={() => setDeleteProductId(null)}
                    onConfirm={confirmDelete}
                    loading={deleteLoading}
                />
            )}


        </div>
    );
};

export default ProductsTable;







