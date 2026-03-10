import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
    fetchAddresses,
    createAddress,
    deleteAddress,
} from "../../../features/address/addressSlice";
import type { Address } from "../../../services/addressAPI";

type AddressSectionProps = {
    onSelect: (address: Address) => void;
};

const AddressSection = ({ onSelect }: AddressSectionProps) => {
    const dispatch = useAppDispatch();
    const { addresses, loading } = useAppSelector((state) => state.address);

    const [form, setForm] = useState<Partial<Address>>({
        fullName: "",
        phoneNumber: "",
        county: "",
        city: "",
        area: "",
        building: "",
        landmark: "",
    });

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);

    const handleCreate = () => {
        dispatch(createAddress(form));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Delivery Address
            </h2>

            {/* ADDRESS LIST */}
            <div className="space-y-3 mb-6">
                {loading && (
                    <p className="text-sm text-gray-500">Loading addresses...</p>
                )}

                {addresses.length === 0 && !loading && (
                    <p className="text-sm text-gray-500">
                        No saved addresses yet.
                    </p>
                )}

                {addresses.map((a) => (
                    <div
                        key={a._id}
                        className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                        {/* ADDRESS DETAILS */}
                        <div>
                            <p className="font-semibold">{a.fullName}</p>

                            <p className="text-sm text-gray-600">
                                {a.area}, {a.city}, {a.county}
                            </p>

                            {a.building && (
                                <p className="text-xs text-gray-500">
                                    Building: {a.building}
                                </p>
                            )}
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => onSelect(a)}
                                className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                            >
                                Deliver Here
                            </button>

                            <button
                                onClick={() => dispatch(deleteAddress(a._id))}
                                className="px-3 py-1 text-sm text-red-500 hover:text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ADD ADDRESS FORM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                    placeholder="Full Name"
                    className="border p-2 rounded text-sm"
                    onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                    }
                />

                <input
                    placeholder="Phone Number"
                    className="border p-2 rounded text-sm"
                    onChange={(e) =>
                        setForm({ ...form, phoneNumber: e.target.value })
                    }
                />

                <input
                    placeholder="County"
                    className="border p-2 rounded text-sm"
                    onChange={(e) =>
                        setForm({ ...form, county: e.target.value })
                    }
                />

                <input
                    placeholder="City"
                    className="border p-2 rounded text-sm"
                    onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                    }
                />

                <input
                    placeholder="Area"
                    className="border p-2 rounded text-sm"
                    onChange={(e) =>
                        setForm({ ...form, area: e.target.value })
                    }
                />

                <input
                    placeholder="Building (Optional)"
                    className="border p-2 rounded text-sm"
                    onChange={(e) =>
                        setForm({ ...form, building: e.target.value })
                    }
                />

                <input
                    placeholder="Landmark (Optional)"
                    className="border p-2 rounded text-sm sm:col-span-2"
                    onChange={(e) =>
                        setForm({ ...form, landmark: e.target.value })
                    }
                />

                <button
                    onClick={handleCreate}
                    className="sm:col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Save Address
                </button>
            </div>
        </div>
    );
};

export default AddressSection;