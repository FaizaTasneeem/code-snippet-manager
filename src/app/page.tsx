import { getAll, getAllLanguages, getByLanguage, getByTitleOrTags } from "@/lib/snippets";
import Search from "../components/snippet/Search";
import SnippetGridView from "../components/snippet/SnippetGridView";
import { SnippetSelect, LanguageSelect } from "@/db/schema";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ q?: string, lang?: "js" | "ts" | "html" | "css" | "other" }>
}) {
  const { q, lang = "all" } = await searchParams;

  let snippetsList: SnippetSelect[] | undefined = lang === "all" ? await getAll() : await getByLanguage(lang);
  let languageList: LanguageSelect[] | undefined = await getAllLanguages();

  if (q && snippetsList) {
    snippetsList = await getByTitleOrTags(q, snippetsList);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center font-sans ">
      <div className="w-full flex justify-between items-start px-20 mt-10 font-medium ">
        <div className="flex flex-col">
          <h1 className="text-2xl">Code Snippets</h1>
          <h4 className="text-sm text-gray-500 mt-2">Your second brain for reusable code — access trusted snippets instantly without retyping boilerplates.</h4>
        </div>
        <h4 className="p-2 py-1 bg-[#111827] text-center text-xs text-cyan-500 mt-2 border border-gray-500 rounded-full">
          Total: {snippetsList?.length ?? 0} snippet(s)
        </h4>
      </div>
      <Search languageList={languageList} />
      <SnippetGridView snippetsList={snippetsList} languageList={languageList} />
    </div>
  );
}
