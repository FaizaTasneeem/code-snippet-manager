import Link from "next/link"

function EditSaveAndCancel({ snippetId, isPending }: { snippetId: number, isPending: boolean }) {
    return (
        <div className="flex justify-end gap-2 mt-2 font-bold">
            <Link href={`${snippetId}`} className="cursor-pointer px-4 p-2 rounded-xl border border-gray-600 ">Cancel</Link>
            <button form="snippet-update-form" type="submit" disabled={isPending} className="cursor-pointer px-4 p-2 rounded-xl border border-cyan-500 bg-cyan-500 text-black">Update</button>
        </div>
    )
}

export default EditSaveAndCancel