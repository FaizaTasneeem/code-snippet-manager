"use client";

import { useState, useEffect } from "react";

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
        setTimeout(() => {
            if (showModal) setShowModal(!showModal);
        }, 2000)

    }, [showModal])

    return (
        <div>
            <div className="cursor-pointer border w-8 h-8 rounded-full flex items-center justify-center" onClick={handleCopyToClipBoard}>C</div>
            {showModal && <div className="fixed top-150 left-1/2 -translate-x-1/2 z-50 p-4 border rounded-lg">Code Copied Successfully!</div>}
        </div>
    )
}

export default CopyToClipBoardButton