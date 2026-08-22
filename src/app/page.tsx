import { Snippet } from "@/types";
import { getAll, getByLanguage, getByTitleOrTags } from "@/lib/snippets";
import Search from "./Search";
import SnippetGridView from "./SnippetGridView";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ q?: string, lang?: "js" | "ts" | "html" | "css" | "other" }>
}) {
  const { q, lang = "all" } = await searchParams;

  let snippetsList: Snippet[] = lang === "all" ? await getAll() : await getByLanguage(lang);

  if (q) {
    snippetsList = await getByTitleOrTags(q, snippetsList);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center font-sans ">
      <div className="w-full flex flex-col px-20 mt-10 font-medium ">
        <h1 className="text-xl">Code Snippets</h1>
        <h4 className="text-sm text-gray-500 mt-2">Your secure, locally cached developer notebook</h4>
      </div>
      <Search />
      <SnippetGridView snippetsList={snippetsList} />
    </div>
  );
}
