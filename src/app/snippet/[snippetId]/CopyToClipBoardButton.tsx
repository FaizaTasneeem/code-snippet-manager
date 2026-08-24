"use client";

import { useState, useEffect } from "react";
import { Copy, Check, X } from "lucide-react";

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
            {showModal &&
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="fixed top-20 bg-[#8CBD53] text-center p-4 border border-gray-600 rounded-lg flex gap-4 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Check size={16} className="text-white rounded-full border-2" />
                            Code Copied Successfully!
                        </div>
                        <X size={16} className="cursor-pointer" onClick={() => setShowModal(false)} />
                    </div>
                </div>
            }
        </div>
    )
}

export default CopyToClipBoardButton