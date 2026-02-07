import { FiAlertTriangle, FiX } from "react-icons/fi";

interface DeleteConfirmModalProps {
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

const DeleteConfirmModal = ({
    title = "Confirm Delete",
    message,
    onConfirm,
    onCancel,
    loading = false,
}: DeleteConfirmModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
                <FiX
                    size={22}
                    className="absolute top-4 right-4 cursor-pointer hover:text-gray-700"
                    onClick={onCancel}
                />

                <div className="flex flex-col items-center gap-4 text-center">
                    <FiAlertTriangle className="text-red-600" size={48} />

                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-gray-600">{message}</p>

                    <div className="flex gap-3 w-full mt-4">
                        <button
                            onClick={onCancel}
                            className="w-full py-2 rounded border border-gray-300 hover:bg-gray-100"
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="w-full py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
