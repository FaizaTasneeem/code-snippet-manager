"use client";

import { deleteSnippet } from "@/app/actions";

function DeleteButton({ snippetIdToDelete }: { snippetIdToDelete: string }) {

    async function handleSnippetDelete() {
        await deleteSnippet(snippetIdToDelete);
    }

    return (
        <div className="cursor-pointer border w-8 h-8 rounded-lg flex items-center justify-center" onClick={handleSnippetDelete}>D</div>
    )
}

export default DeleteButton