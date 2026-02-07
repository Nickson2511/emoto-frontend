import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import SuccessModal from "../shared/components/modals/SuccessModal";
import ProductsTable from "../shared/ui/ProductsTable";
import {
    getCategories,
    getSubCategories,
} from "../features/product/productSlice";
import { createProduct } from "../services/productAPI";

interface ProductForm {
    name?: string;
    description?: string;
    price?: string;
    oldPrice?: string;
    stock?: string;
    brand?: string;
    sku?: string;
    category?: string;
    subCategory?: string;
}

const AdminCreateProductPage = () => {
    const dispatch = useAppDispatch();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { categories, subCategories } = useAppSelector(
        (state) => state.product
    );

    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!user || user.role !== "admin") {
            setErrorMessage("Unauthorized access");
            window.location.href = "/";
        }
    }, [user]);

    const [form, setForm] = useState<ProductForm>({});
    const [images, setImages] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);
    

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleCategoryChange = (id: string) => {
        setForm((prev) => ({
            ...prev,
            category: id,
            subCategory: undefined,
        }));

        dispatch(getSubCategories(id));
    };

    const handleImages = (files: FileList | null) => {
        if (!files) return;

        const arr = Array.from(files);
        setImages(arr);
        setPreview(arr.map((file) => URL.createObjectURL(file)));
    };

    const submit = async () => {
        
        if (
            form.oldPrice &&
            form.price &&
            Number(form.oldPrice) <= Number(form.price)
        ) {
            setErrorMessage("Old price must be greater than the current price");
            return;
        }

        const fd = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (value) fd.append(key, value);
        });

        images.forEach((img) => fd.append("images", img));

        try {
            setSubmitting(true);
            await createProduct(fd);
            setSuccessMessage("Product created successfully 🎉");
            setForm({});
            setImages([]);
            setPreview([]);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ===== MAIN FORM ===== */}
            <div className="lg:col-span-2 bg-white p-6 rounded shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-primary">
                    Add New Product
                </h2>

                {/* PRODUCT INFO */}
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        placeholder="Product Name"
                        className="input"
                        value={form.name ?? ""}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        placeholder="Brand (e.g Honda)"
                        className="input"
                        value={form.brand ?? ""}
                        onChange={(e) =>
                            setForm({ ...form, brand: e.target.value })
                        }
                    />
                </div>

                <textarea
                    placeholder="Product Description"
                    className="input h-24"
                    value={form.description ?? ""}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />

                {/* CATEGORY */}
                <div className="grid md:grid-cols-2 gap-4">
                    <select
                        className="input"
                        value={form.category ?? ""}
                        onChange={(e) =>
                            handleCategoryChange(e.target.value)
                        }
                    >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="input"
                        value={form.subCategory ?? ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                subCategory: e.target.value,
                            })
                        }
                        disabled={!subCategories.length}
                    >
                        <option value="">Select Subcategory</option>
                        {subCategories.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* PRICING */}
                <div className="grid md:grid-cols-4 gap-4">
                    <input
                        type="number"
                        placeholder="Price (Selling)"
                        className="input"
                        value={form.price ?? ""}
                        onChange={(e) =>
                            setForm({ ...form, price: e.target.value })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Old Price (Optional)"
                        className="input"
                        value={form.oldPrice ?? ""}
                        onChange={(e) =>
                            setForm({ ...form, oldPrice: e.target.value })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Stock"
                        className="input"
                        value={form.stock ?? ""}
                        onChange={(e) =>
                            setForm({ ...form, stock: e.target.value })
                        }
                    />

                    <input
                        placeholder="SKU"
                        className="input"
                        value={form.sku ?? ""}
                        onChange={(e) =>
                            setForm({ ...form, sku: e.target.value })
                        }
                    />
                </div>

                {/* PRICE HINT */}
                <p className="text-sm text-gray-500">
                    💡 Leave <b>Old Price</b> empty if the product is not on sale.
                    Old price must be higher than the selling price.
                </p>

                {/* IMAGES */}
                <input
                    type="file"
                    multiple
                    onChange={(e) => handleImages(e.target.files)}
                />

                <button
                    onClick={submit}
                    disabled={submitting}
                    className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 disabled:opacity-50"
                >
                    {submitting ? "Creating..." : "Create Product"}
                </button>
            </div>

            {/* ===== SIDE PANEL ===== */}
            <div className="bg-white p-6 rounded shadow-sm space-y-4">
                <h3 className="font-semibold">Product Preview</h3>

                <div className="grid grid-cols-2 gap-2">
                    {preview.map((img) => (
                        <img
                            key={img}
                            src={img}
                            className="rounded border object-cover"
                        />
                    ))}
                </div>

                <div className="text-sm text-gray-500">
                    <p>✔ Showing discounts increases conversion</p>
                    <p>✔ Clear images improve trust</p>
                    <p>✔ Correct pricing avoids admin errors</p>
                </div>

            </div>
            <div className="lg:col-span-3">
                <ProductsTable />
            </div>
            {successMessage && (
    <SuccessModal
        message={successMessage}
        onClose={() => setSuccessMessage(null)}
    />
)}

{errorMessage && (
    <SuccessModal
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
    />
)}

        </div>

    );
};

export default AdminCreateProductPage;





