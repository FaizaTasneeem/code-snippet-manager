"use client";

import { useRouter } from "next/navigation";
import { Snippet } from "@/types";

function SnippetGridView({ snippetsList }: { snippetsList: Snippet[] }) {
    const router = useRouter();

    function handleTitleClick(snippetId: string) {
        router.push(`snippet/${snippetId}`);
    }

    return (
        <div>
            {snippetsList.map((snippet: Snippet) => {
                return (
                    <div key={snippet.id} className="cursor-pointer" onClick={() => handleTitleClick(snippet.id)}>
                        {snippet.title}
                    </div>
                )
            })}
        </div>
    )
}

export default SnippetGridView