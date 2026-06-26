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
    <div className="w-full flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Search />
      <SnippetGridView snippetsList={snippetsList} />
    </div>
  );
}
