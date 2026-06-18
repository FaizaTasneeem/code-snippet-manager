import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Snippet } from "@/types";


const dataFilePath = path.join(process.cwd(), "src/data/snippets.json");

export const snippetsWrapper = <Arg extends any[], Return>(fn: (...args: Arg) => Promise<Return>) => {
    return async (...args: Arg) => {
        try {
            return await fn(...args);
        }
        catch (error) {
            console.log(error);
        }

    }
};

export const getAll = snippetsWrapper(async () => {
    const fileContents = await readFile(dataFilePath, "utf-8");

    const snippets: Snippet[] = JSON.parse(fileContents);

    return snippets.map((snippet: Snippet) => {
        return { ...snippet, createdAt: new Date(snippet.createdAt) };
    });
});


export const getById = snippetsWrapper(async (id: string) => {
    const snippetList: Snippet[] | undefined = await getAll();

    const snippet: Snippet | undefined = snippetList?.find(item => item.id === id);

    return snippet;
});



// export const create = snippetsWrapper(async () => {
//     const fileContents = await readFile(dataFilePath, "utf-8");

//     const snippets = JSON.parse(fileContents);

//     return snippets.map((snippet: any) => {
//         return { ...snippet, createdAt: new Date(snippet.createdAt) };
//     });
// });



export const remove = snippetsWrapper(async (id: string) => {
    const snippetList: Snippet[] | undefined = await getAll();

    const newSnippetList: Snippet[] | undefined = snippetList?.filter(item => item.id !== id);

    if (newSnippetList) {
        const snippetStr: string = JSON.stringify(newSnippetList);
        await writeFile(dataFilePath, snippetStr, "utf-8");
    }

});