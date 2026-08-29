import { notFound } from "next/navigation";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getById } from "@/lib/snippets";
import { SnippetSelect } from "@/db/schema";
import DeleteButton from "../../../components/snippet/DeleteButton";
import CopyToClipBoardButton from "../../../components/snippet/CopyToClipBoardButton";

export default async function SingleSnippetPage({ params }: {
    params: Promise<{ snippetId: string }>
}) {

    const { snippetId } = await params;

    const snippet: SnippetSelect | undefined = await getById(Number(snippetId));

    // const getLanguage = (lang: string) => 

    if (!snippet) {
        notFound();
    }

    return (
        <div className="bg-[#111827] w-[90%] mb-8 mt-10 p-6 px-10 flex flex-col justify-center items-center border border-gray-600 rounded-xl">
            <div className="w-full flex flex-col justify-start items-start">
                <div className="w-full mt-4 flex flex-row justify-between text-2xl">
                    <div className="flex flex-col">
                        <span className="flex items-center gap-4">
                            {snippet.title}
                            <span className="bg-blue-900 font-bold text-xs text-blue-400 p-1 px-2 rounded-lg border border-blue-600">{snippet.language.toLocaleUpperCase()}</span>
                        </span>
                        <span className="mt-2 text-sm text-gray-400">Created at - {new Date(snippet.createdAt).toDateString()}</span>
                    </div>
                    <DeleteButton snippetIdToDelete={Number(snippetId)} />
                </div>

                <div className="mt-6 flex flex-row">
                    {snippet.tags && snippet.tags.map(t => <span key={t} className="py-1 px-3 text-cyan-500 rounded-full border border-cyan-600 mr-2">#{t}</span>)}
                </div>

                <div className="w-full p-4 mt-4 border border-gray-700 rounded-xl bg-[#0C0F19]">
                    <div className="flex justify-end">
                        <CopyToClipBoardButton textToCopy={snippet.code} />
                    </div>
                    <div className="mt-4">
                        <SyntaxHighlighter
                            language={snippet.language}
                            style={coldarkDark}
                            customStyle={{ borderRadius: "0.75rem" }}
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