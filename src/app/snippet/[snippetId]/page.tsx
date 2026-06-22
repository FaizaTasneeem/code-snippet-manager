import { getById } from "@/lib/snippets";
import { Snippet } from "@/types";

export default async function SingleSnippetPage({ params }: {
    params: Promise<{ snippetId: string }>
}) {

    const { snippetId } = await params;

    const snippet: Snippet | undefined = await getById(snippetId);

    return (
        <div className="w-1/2 p-4 flex flex-col justify-center items-center border rounded-lg">
            {snippet &&
                <div className="flex flex-col justify-center items-center">
                    <span>{snippet.title}</span>
                    <span>{snippet.language}</span>
                    <span>{snippet.tags}</span>
                    <span>{snippet.code}</span>
                    <span>{snippet.createdAt.toDateString()}</span>
                </div>
            }
        </div>
    );
}