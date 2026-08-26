"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteSnippet } from "@/app/actions";

function DeleteButton({ snippetIdToDelete }: { snippetIdToDelete: number }) {
    const [showModal, setShowModal] = useState(false);

    async function handleSnippetDelete() {
        await deleteSnippet(snippetIdToDelete);
        setShowModal(false);
    }

    return (
        <div>
            <div className="cursor-pointer border w-8 h-8 rounded-lg flex items-center justify-center" onClick={() => setShowModal(true)}>
                <Trash2 size={16} />
            </div>
            {showModal &&
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="w-80 h-fit bg-neutral-900 text-lg text-center p-4 border border-gray-600 rounded-lg flex flex-col gap-8">
                        <div className="">Are you sure you want to delete this snippet?</div>
                        <div className="flex justify-between text-sm">
                            <button className="px-4 py-2 border border-gray-600 rounded-lg cursor-pointer" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-cyan-600 text-black font-semibold border border-cyan-600 rounded-lg cursor-pointer" onClick={handleSnippetDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DeleteButton