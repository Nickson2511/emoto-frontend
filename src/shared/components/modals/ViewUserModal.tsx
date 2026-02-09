import { FiX } from "react-icons/fi";
import type { IUser } from "../../../features/users/types";

interface ViewUserModalProps {
    user: IUser;
    onClose: () => void;
}

const ViewUserModal = ({ user, onClose }: ViewUserModalProps) => {
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
            onClick={onClose} // click outside closes modal
        >
            <div
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto animate-scaleIn"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <FiX size={20} />
                </button>

                {/* HEADER */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold">Customer Details</h2>
                    <p className="text-sm text-gray-500">Detailed information about this user</p>
                </div>

                {/* CONTENT */}
                <div className="space-y-4">
                    <Detail label="Name" value={user.name} />
                    <Detail label="Email" value={user.email} />
                    <Detail label="Role" value={user.role} />
                    <Detail label="Provider" value={user.provider} />
                    <Detail label="Joined" value={new Date(user.createdAt).toLocaleString()} />
                    <Detail label="Last Updated" value={new Date(user.updatedAt).toLocaleString()} />
                </div>

                {/* FOOTER */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center border-b pb-2">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="font-medium">{value}</span>
    </div>
);

export default ViewUserModal;
