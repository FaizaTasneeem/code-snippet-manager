import { notFound } from "next/navigation";
import { getById } from "@/lib/snippets";
import { Snippet } from "@/types";

export default async function SingleSnippetPage({ params }: {
    params: Promise<{ snippetId: string }>
}) {

    const { snippetId } = await params;

    const snippet: Snippet | undefined = await getById(snippetId);

    if (!snippet) {
        notFound();
    }

    return (
        <div className="w-1/2 p-4 px-10 flex flex-col justify-center items-center border rounded-lg">
            <div className="w-full flex flex-col justify-start items-start">
                <div className="w-full flex flex-row justify-between">
                    <span>{snippet.title}</span>
                    <span>{snippet.language}</span>
                </div>

                <div className="mt-4 flex flex-row">
                    {snippet.tags && snippet.tags.map((t, id) => <span key={id} className="mr-2">#{t}</span>)}
                </div>


                <span className="mt-4">{snippet.code}</span>
                <span className="mt-4">{snippet.createdAt.toDateString()}</span>
            </div>
        </div>
    );
}