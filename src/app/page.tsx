import { Snippet } from "@/types";
import { getAll } from "@/lib/snippets";
import SnippetGridView from "./SnippetGridView";

export default async function Home() {
  const snippetsList: Snippet[] = await getAll();

  return (
    <div className="w-full flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <SnippetGridView snippetsList={snippetsList} />
    </div>
  );
}
