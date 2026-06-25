import { Snippet } from "@/types";
import { getAll, getByLanguage } from "@/lib/snippets";
import Search from "./Search";
import SnippetGridView from "./SnippetGridView";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ lang?: "js" | "ts" | "html" | "css" | "other" }>
}) {
  const { lang = "all" } = await searchParams;

  const snippetsList: Snippet[] = lang === "all" ? await getAll() : await getByLanguage(lang);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Search />
      <SnippetGridView snippetsList={snippetsList} />
    </div>
  );
}
