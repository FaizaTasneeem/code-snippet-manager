import { Pencil } from "lucide-react"
import Link from "next/link"

function UpdateButton({ snippetId, isEditing }: { snippetId: string, isEditing: boolean }) {
    return (
        <Link href={`${snippetId}?edit=${!isEditing}`} className="cursor-pointer border w-8 h-8 rounded-lg flex items-center justify-center">
            <Pencil size={16} />
        </Link>
    )
}

export default UpdateButton