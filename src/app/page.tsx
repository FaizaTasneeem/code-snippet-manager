import { getAll, getByLanguage, getByTitleOrTags } from "@/lib/snippets";
import Search from "../components/snippet/Search";
import SnippetGridView from "../components/snippet/SnippetGridView";
import { SnippetSelect } from "@/db/schema";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ q?: string, lang?: "js" | "ts" | "html" | "css" | "other" }>
}) {
  const { q, lang = "all" } = await searchParams;

  let snippetsList: SnippetSelect[] | undefined = lang === "all" ? await getAll() : await getByLanguage(lang);

  if (q && snippetsList) {
    snippetsList = await getByTitleOrTags(q, snippetsList);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center font-sans ">
      <div className="w-full flex flex-col px-20 mt-10 font-medium ">
        <h1 className="text-2xl">Code Snippets</h1>
        <h4 className="text-sm text-gray-500 mt-2">Your secure, locally cached developer notebook</h4>
      </div>
      <Search />
      <SnippetGridView snippetsList={snippetsList} />
    </div>
  );
}
