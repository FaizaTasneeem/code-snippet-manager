import { getAllLanguages } from "@/lib/snippets";
import { LanguageSelect } from "@/db/schema";
import NewSnippetForm from "@/components/snippet/NewSnippetForm";

export default async function NewFormPage() {
    let languageList: LanguageSelect[] | undefined = await getAllLanguages();

    return (
        <div className="w-[90%] mb-10 bg-[#111827] rounded-xl border border-gray-600">
            <div className="w-full flex flex-col px-8 mt-10 font-medium ">
                <h1 className="text-2xl">Create New Snippet</h1>
                <h4 className="text-sm text-gray-500 mt-2">Fill in the metadata and code details below. Validate input formats before saving.</h4>
            </div>

            <NewSnippetForm languageList={languageList} />
        </div>

    );
}