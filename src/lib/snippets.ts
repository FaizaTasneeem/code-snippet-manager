import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { z } from "zod";
import { Snippet, CreateSnippetInput } from "@/types";


const dataFilePath = path.join(process.cwd(), "src/data/snippets.json");

const dataSchema = z.object({
    id: z.string(),
    title: z.string(),
    language: z.enum(['js', 'ts', 'css', 'html', 'other']),
    tags: z.array(z.string()),
    code: z.string(),
    createdAt: z.date()
});


export const snippetsWrapper = <Arg extends any[], Return>(fn: (...args: Arg) => Promise<Return>) => {
    return async (...args: Arg) => {
        try {
            return await fn(...args);
        }
        catch (error: any) {
            console.log(error);
            throw error;
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



export const getByLanguage = snippetsWrapper(async (lang: string) => {
    const snippetList: Snippet[] = await getAll();

    const snippets: Snippet[] | undefined = snippetList.filter(item => item.language === lang);

    if (snippets) return snippets;

    return [];

});



export const getByTitleOrTags = snippetsWrapper(async (q: string, snippetList: Snippet[]) => {
    const snippets: Snippet[] | undefined = snippetList.filter(item => {
        return (
            item.title.toLowerCase().includes(q.toLowerCase()) ||
            item.tags.some(t => t.toLowerCase().includes(q.toLowerCase()))
        )
    });

    if (snippets) return snippets;

    return [];

});



export const create = snippetsWrapper(async (newSnippet: CreateSnippetInput) => {
    const updatedNewSnippet = {
        ...newSnippet,
        id: randomUUID(),
        createdAt: new Date(),
    };
    const validatedSnippet = dataSchema.parse(updatedNewSnippet);

    const snippetList: Snippet[] = await getAll();

    snippetList.push(validatedSnippet);

    if (snippetList) {
        const snippetStr: string = JSON.stringify(snippetList);
        await writeFile(dataFilePath, snippetStr, "utf-8");
    }

    return { success: true };

});



export const remove = snippetsWrapper(async (id: string) => {
    const snippetList: Snippet[] = await getAll();

    const newSnippetList: Snippet[] | undefined = snippetList.filter(item => item.id !== id);

    if (newSnippetList) {
        const snippetStr: string = JSON.stringify(newSnippetList);
        await writeFile(dataFilePath, snippetStr, "utf-8");
    }

    return { success: true };

});