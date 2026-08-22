import { notFound } from "next/navigation";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getById } from "@/lib/snippets";
import { Snippet } from "@/types";
import DeleteButton from "./DeleteButton";
import CopyToClipBoardButton from "./CopyToClipBoardButton";

export default async function SingleSnippetPage({ params }: {
    params: Promise<{ snippetId: string }>
}) {

    const { snippetId } = await params;

    const snippet: Snippet | undefined = await getById(snippetId);

    // const getLanguage = (lang: string) => 

    if (!snippet) {
        notFound();
    }

    return (
        <div className="w-[75%] mb-8 p-6 px-10 flex flex-col justify-center items-center border border-gray-500 rounded-lg">
            <div className="w-full flex flex-col justify-start items-start">
                <div className="w-full flex justify-end items-end">
                    <DeleteButton snippetIdToDelete={snippetId} />
                </div>

                <div className="w-full mt-4 flex flex-row justify-between text-2xl">
                    <div className="flex flex-col">
                        <span>{snippet.title}</span>
                        <span className="mt-2 text-sm text-gray-400">Created at - {snippet.createdAt.toDateString()}</span>
                    </div>
                    <span>[{snippet.language}]</span>
                </div>

                <div className="mt-6 flex flex-row">
                    {snippet.tags && snippet.tags.map((t, id) => <span key={id} className="mr-2">#{t}</span>)}
                </div>

                <div className="w-full p-4 mt-4 border border-gray-700 rounded-lg">
                    <div className="flex justify-end">
                        <CopyToClipBoardButton textToCopy={snippet.code} />
                    </div>
                    <div className="mt-4">
                        <SyntaxHighlighter
                            language={snippet.language}
                            style={dracula}
                            showLineNumbers={true}
                        >
                            {snippet.code}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        </div>
    );
}