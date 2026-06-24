"use client";

import { useRouter } from "next/navigation";
import { Snippet } from "@/types";

function SnippetGridView({ snippetsList }: { snippetsList: Snippet[] }) {
    const router = useRouter();

    function handleTitleClick(snippetId: string) {
        router.push(`snippet/${snippetId}`);
    }

    return (
        <div className="p-8 px-50 grid grid-cols-2 md:grid-cols-4 gap-4">
            {snippetsList.map((snippet: Snippet) => {
                return (
                    <div key={snippet.id} className="p-4 flex flex-col border rounded-lg cursor-pointer overflow-hidden" onClick={() => handleTitleClick(snippet.id)}>
                        <div className="flex flex-row justify-between">
                            <span className="truncate">{snippet.title}</span>
                            <span className="truncate">{snippet.language}</span>
                        </div>
                        {snippet.tags}
                        {snippet.code}
                    </div>
                )
            })}
        </div>
    )
}

export default SnippetGridView