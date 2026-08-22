"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

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

    useEffect(() => {
        if (showModal) {
            const timerId = setTimeout(() => {
                setShowModal(false);
            }, 2000)
            return () => clearTimeout(timerId);
        }
    }, [showModal]);

    return (
        <div>
            <div className="cursor-pointer border w-8 h-8 rounded-full flex items-center justify-center" onClick={handleCopyToClipBoard}>
                {!showModal
                    ? <Copy size={16} />
                    : <Check size={16} className="text-green-500" />
                }
            </div>
            {showModal && <div className="fixed inset-x-0 mx-auto w-60 top-10 text-center p-4 border rounded-lg">Code Copied Successfully!</div>}
        </div>
    )
}

export default CopyToClipBoardButton