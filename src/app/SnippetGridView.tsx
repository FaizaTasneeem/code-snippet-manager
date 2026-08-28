"use client";

import { SnippetSelect } from "@/db/schema";
import { useRouter } from "next/navigation";

function SnippetGridView({ snippetsList }: { snippetsList: SnippetSelect[] | undefined }) {
    const router = useRouter();

    function handleTitleClick(snippetId: number) {
        router.push(`snippet/${snippetId}`);
    }

    return (
        <div className="w-full p-8 px-20 grid grid-cols-1 md:grid-cols-3 gap-4">
            {snippetsList?.map((snippet: SnippetSelect) => {
                return (
                    <div key={snippet.id} className="p-4 bg-[#111827] flex flex-col border border-gray-600 rounded-lg cursor-pointer overflow-hidden" onClick={() => handleTitleClick(snippet.id)}>
                        <div className="flex flex-row justify-between">
                            <span className="truncate">{snippet.title}</span>
                            <span className="px-2 border border-blue-600 rounded-lg text-blue-400 text-sm truncate">{snippet.language}</span>
                        </div>

                        <div className="mt-4 flex flex-row text-blue-400 text-sm">
                            {snippet.tags && snippet.tags.map((t, id) => <span key={id} className="mr-2">#{t}</span>)}
                        </div>


                        <div className="mt-2 w-full h-20 p-2 bg-[#0d1420] border border-gray-500 rounded-lg line-clamp-3 whitespace-pre-wrap">
                            {snippet.code}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SnippetGridView