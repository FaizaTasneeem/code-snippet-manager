import Link from "next/link";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SnippetSelect, LanguageSelect } from "@/db/schema";

function SnippetGridView({
    snippetsList,
    languageList
}: {
    snippetsList: SnippetSelect[] | undefined,
    languageList: LanguageSelect[] | undefined
}) {
    console.log(languageList);
    return (
        <div className="w-full p-8 px-20 grid grid-cols-1 md:grid-cols-3 gap-4">
            {snippetsList?.map((snippet: SnippetSelect) => {
                return (
                    <Link href={`snippet/${snippet.id}`} key={snippet.id} className="p-4 bg-[#111827] flex flex-col border border-gray-600 rounded-lg cursor-pointer overflow-hidden" >
                        <div className="flex flex-row justify-between">
                            <span className="truncate">{snippet.title}</span>
                            <span
                                style={{
                                    borderColor: languageList?.find(lang => lang.name === snippet.language)?.color,
                                    color: languageList?.find(lang => lang.name === snippet.language)?.color
                                }}
                                className={`px-2 border rounded-lg text-sm truncate`}
                            >
                                {snippet.language}
                            </span>
                        </div>

                        <div className="mt-4 flex flex-row text-blue-400 text-sm">
                            {snippet.tags && snippet.tags.map(t => <span key={t} className="mr-2">#{t}</span>)}
                        </div>


                        <div className="mt-2 w-full h-20 p-2 bg-[#0d1420] border border-gray-500 rounded-lg line-clamp-3 whitespace-pre-wrap">
                            <SyntaxHighlighter
                                language={snippet.language}
                                style={coldarkDark}
                                customStyle={{ background: "transparent", backgroundColor: "transparent", margin: 0, padding: 0, fontSize: "0.7rem" }}
                            >
                                {snippet.code}
                            </SyntaxHighlighter>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default SnippetGridView