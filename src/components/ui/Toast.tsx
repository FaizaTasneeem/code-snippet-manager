import { useEffect } from "react";

import { Check, X } from "lucide-react";

function Toast({ showModal, setShowModal }: { showModal: boolean, setShowModal: (val: boolean) => void }) {

    useEffect(() => {
        if (showModal) {
            const timerId = setTimeout(() => {
                setShowModal(false);
            }, 2000)
            return () => clearTimeout(timerId);
        }
    }, [showModal]);

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed top-20 bg-[#8CBD53] text-center p-4 border border-gray-600 rounded-lg flex gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Check size={16} className="text-white rounded-full border-2" />
                    Code Copied Successfully!
                </div>
                <X size={16} className="cursor-pointer" onClick={() => setShowModal(false)} />
            </div>
        </div>
    )
}

export default Toast