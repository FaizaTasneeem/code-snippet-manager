"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteSnippet } from "@/app/actions";
import Modal from "../ui/Modal";

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
            {showModal && <Modal setShowModal={setShowModal} handleDelete={handleSnippetDelete} />}
        </div>
    )
}

export default DeleteButton