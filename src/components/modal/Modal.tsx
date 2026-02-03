import { Check } from "lucide-react";
import type React from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    closeButtonTitle?: string;
    children: React.ReactNode;
    Icon?: React.ReactNode;
    maxWidth?: string;
}

const Modal = ({ isOpen, onClose, Icon, title, closeButtonTitle, children, maxWidth = "max-w-md" }: Props) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className={`flex flex-col items-center bg-primary rounded-lg shadow-lg p-6 ${maxWidth} w-full`}>
                {Icon || <div className="p-4 mb-5 bg-secondary rounded-full"> <Check className="text-primary" size={30} strokeWidth={4} /> </div>}
                {title && <h2 className="text-xl font-bold text-white mb-4 text-center">{title}</h2>}
                {children}
                <button
                    className="px-8 py-2 text-primary font-bold bg-secondary w-fit rounded-sm hover:text-gray-700" onClick={onClose}>
                    {closeButtonTitle || "Okay"}
                </button>
            </div>
        </div>
    )
}

export default Modal
