import { Snippet } from "@/types";
import { getAll } from "@/lib/snippets";

export default async function Home() {
  const snippetsList: Snippet[] = await getAll();

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {snippetsList.map((snippet) => {
        return (
          <div key={snippet.id}>
            {snippet.title}
          </div>
        )
      })}
    </div>
  );
}
