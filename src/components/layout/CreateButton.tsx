import Link from "next/link";

export default function CreateButton() {

    return (
        <div>
            <Link href="/new" className="bg-cyan-500 py-2 px-4 text-black text-sm font-bold rounded-lg cursor-pointer">+ New Snippet</Link>
        </div>
    )
}
