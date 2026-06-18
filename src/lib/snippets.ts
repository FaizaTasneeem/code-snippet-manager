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

export const getAll = async () => {
    try {
        const fileContents = await readFile(dataFilePath, "utf-8");

        const snippets: Snippet[] = fileContents ? JSON.parse(fileContents) : [];

        return snippets.map((snippet: Snippet) => {
            return { ...snippet, createdAt: new Date(snippet.createdAt) };
        });
    }
    catch (error: any) {
        console.log(error);
        if (error.code === "ENOENT") {
            await writeFile(dataFilePath, "[]", "utf-8");
        }
        return [];
    }
};


export const getById = snippetsWrapper(async (id: string) => {
    const snippetList: Snippet[] = await getAll();

    const snippet: Snippet | undefined = snippetList.find(item => item.id === id);

    return snippet;
});



export const create = snippetsWrapper(async (newSnippet: Snippet) => {
    const snippetList: Snippet[] = await getAll();

    snippetList.push(newSnippet);

    if (snippetList) {
        const snippetStr: string = JSON.stringify(snippetList);
        await writeFile(dataFilePath, snippetStr, "utf-8");
    }

});



export const remove = snippetsWrapper(async (id: string) => {
    const snippetList: Snippet[] = await getAll();

    const newSnippetList: Snippet[] | undefined = snippetList.filter(item => item.id !== id);

    if (newSnippetList) {
        const snippetStr: string = JSON.stringify(newSnippetList);
        await writeFile(dataFilePath, snippetStr, "utf-8");
    }

});