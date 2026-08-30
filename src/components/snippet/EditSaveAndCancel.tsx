import Link from "next/link"

function EditSaveAndCancel({ snippetId, isEditing }: { snippetId: string, isEditing: boolean }) {
    return (
        <div className="flex gap-2 mt-2 font-bold">
            <Link href={`${snippetId}?edit=${!isEditing}`} className="cursor-pointer px-4 p-2 rounded-xl border border-gray-600 ">Cancel</Link>
            <button form="snippet-update-form" type="submit" className="cursor-pointer px-4 p-2 rounded-xl border border-cyan-500 bg-cyan-500 text-black">Update</button>
        </div>
    )
}

export default EditSaveAndCancel