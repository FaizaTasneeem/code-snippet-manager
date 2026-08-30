"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Toast from "../ui/Toast";

function CopyToClipBoardButton({ textToCopy }: { textToCopy: string }) {
    const [showToast, setShowToast] = useState(false);

    async function handleCopyToClipBoard() {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setShowToast(true);
            console.log("Code copied to clipboard successfully !");
        }
        catch (error) {
            console.log("Error copying code to clipboard - ", error);
        }
    }

    return (
        <div>
            <div className="cursor-pointer border w-8 h-8 rounded-full flex items-center justify-center" onClick={handleCopyToClipBoard}>
                {!showToast
                    ? <Copy size={16} />
                    : <Check size={16} className="text-green-500" />
                }
            </div>
            {showToast && <Toast showModal={showToast} setShowModal={setShowToast} />}
        </div>
    )
}

export default CopyToClipBoardButton