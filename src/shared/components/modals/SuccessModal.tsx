import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

interface SuccessModalProps {
    message: string;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
                <FiX
                    size={24}
                    className="absolute top-4 right-4 cursor-pointer hover:text-gray-700"
                    onClick={onClose}
                />
                <div className="flex flex-col items-center gap-4">
                    <FiCheck className="text-green-600" size={48} />
                    <h3 className="text-xl font-bold text-center">{message}</h3>
                    <button
                        onClick={onClose}
                        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
