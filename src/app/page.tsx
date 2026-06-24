import { Snippet } from "@/types";
import { getAll } from "@/lib/snippets";
import Search from "./Search";
import SnippetGridView from "./SnippetGridView";

export default async function Home() {
  const snippetsList: Snippet[] = await getAll();

  return (
    <div className="w-full flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Search />
      <SnippetGridView snippetsList={snippetsList} />
    </div>
  );
}
