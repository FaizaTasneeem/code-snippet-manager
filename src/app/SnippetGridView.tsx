"use client";

import { useRouter } from "next/navigation";
import { Snippet } from "@/types";

function SnippetGridView({ snippetsList }: { snippetsList: Snippet[] }) {
    const router = useRouter();

    function handleTitleClick(snippetId: string) {
        router.push(`snippet/${snippetId}`);
    }

    return (
        <div className="w-full p-8 px-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {snippetsList.map((snippet: Snippet) => {
                return (
                    <div key={snippet.id} className="p-4 flex flex-col border rounded-lg cursor-pointer overflow-hidden" onClick={() => handleTitleClick(snippet.id)}>
                        <div className="flex flex-row justify-between">
                            <span className="truncate">{snippet.title}</span>
                            <span className="truncate">{snippet.language}</span>
                        </div>

                        <div className="mt-4 flex flex-row">
                            {snippet.tags && snippet.tags.map((t, id) => <span key={id} className="mr-2">#{t}</span>)}
                        </div>


                        <div className="truncate">
                            {snippet.code}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SnippetGridView