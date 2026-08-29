"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Toast from "../ui/Toast";

function CopyToClipBoardButton({ textToCopy }: { textToCopy: string }) {
    const [showModal, setShowModal] = useState(false);

    async function handleCopyToClipBoard() {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setShowModal(true);
            console.log("Code copied to clipboard successfully !");
        }
        catch (error) {
            console.log("Error copying code to clipboard - ", error);
        }
    }

    return (
        <div>
            <div className="cursor-pointer border w-8 h-8 rounded-full flex items-center justify-center" onClick={handleCopyToClipBoard}>
                {!showModal
                    ? <Copy size={16} />
                    : <Check size={16} className="text-green-500" />
                }
            </div>
            {showModal && <Toast showModal={showModal} setShowModal={setShowModal} />}
        </div>
    )
}

export default CopyToClipBoardButton