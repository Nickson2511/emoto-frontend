import { useEffect, useState } from "react";
import { accountAPI } from "../../services/accountApi";
import type { Address } from "../../types/address";

const AccountAddresses = () => {

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);

    const loadAddresses = async () => {

        try {
            const res = await accountAPI.getAddresses();
            setAddresses(res.data);
        } catch (error) {
            console.error("Failed to load addresses", error);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        loadAddresses();
    }, []);

    if (loading) {
        return <p>Loading addresses...</p>;
    }

    return (
        <div>

            <h1 className="text-lg sm:text-xl font-semibold mb-6">
                My Addresses
            </h1>

            {addresses.length === 0 && (
                <p className="text-gray-500">
                    No saved addresses yet.
                </p>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {addresses.map((addr) => (

                    <div
                        key={addr._id}
                        className="border p-4 rounded-lg shadow-sm"
                    >

                        <p className="font-medium">
                            {addr.fullName}
                        </p>

                        <p className="text-sm text-gray-600">
                            {addr.phoneNumber}
                        </p>

                        <p className="text-sm">
                            {addr.city}, {addr.county}
                        </p>

                        <p className="text-sm text-gray-500">
                            {addr.area}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default AccountAddresses;