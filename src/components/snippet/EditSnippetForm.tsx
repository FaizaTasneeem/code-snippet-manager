"use client"

import { useActionState } from "react"
import { updateSnippet } from "@/app/actions";
import EditSaveAndCancel from "./EditSaveAndCancel";

function EditSnippetForm({ snippetId, snippetCode }: { snippetId: number, snippetCode: string }) {
    const updateSnippetWithId = updateSnippet.bind(null, snippetId);
    const [state, formAction, isPending] = useActionState(updateSnippetWithId, null);

    return (
        <form id="snippet-update-form" action={formAction}>
            <textarea
                name="code"
                defaultValue={snippetCode}
                className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <EditSaveAndCancel snippetId={snippetId} isPending={isPending} />
            {state?.error && <div className="text-red-500">{state.error}</div>}
            {isPending && <div className="italic text-gray-600">Saving snippet...</div>}
        </form>
    )
}

export default EditSnippetForm