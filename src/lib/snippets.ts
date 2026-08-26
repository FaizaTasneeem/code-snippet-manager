import { db } from "@/db";
import { snippets, SnippetSelect, SnippetInsert } from "@/db/schema";
// import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
// import path from "node:path";
import { z } from "zod";
import { Snippet, CreateSnippetInput } from "@/types";
import { eq } from "drizzle-orm";


// const dataFilePath = path.join(process.cwd(), "src/data/snippets.json");

const dataSchema = z.object({
    id: z.string(),
    title: z.string().min(1, { message: "This field cannot be empty" }),
    language: z.enum(['js', 'ts', 'css', 'html', 'other']),
    tags: z.array(z.string().min(1, { message: "This field cannot be empty" })),
    code: z.string().min(1, { message: "This field cannot be empty" }),
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
    // await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay

    try {
        // const fileContents = await readFile(dataFilePath, "utf-8");

        // const snippets: Snippet[] = fileContents ? JSON.parse(fileContents) : [];

        // return snippets.map((snippet: Snippet) => {
        //     return { ...snippet, createdAt: new Date(snippet.createdAt) };
        // });

        const snippetsList: SnippetSelect[] = await db.select().from(snippets);
        return snippetsList;
    }
    catch (error: any) {
        console.log(error);
    }
};


export const getById = snippetsWrapper(async (id: number) => {
    // const snippetList: SnippetSelect[] | undefined = await getAll();

    // const snippet: SnippetSelect | undefined = snippetList?.find(item => item.id === id);

    const snippet: SnippetSelect[] | undefined = await db.select().from(snippets).where(eq(snippets.id, id));

    return snippet[0];
});



export const getByLanguage = snippetsWrapper(async (lang: string) => {
    const snippetList: SnippetSelect[] | undefined = await getAll();

    const snippets: SnippetSelect[] | undefined = snippetList?.filter(item => item.language === lang);

    return snippets ? snippets : [];

});



export const getByTitleOrTags = snippetsWrapper(async (q: string, snippetList: SnippetSelect[]) => {
    const snippets: SnippetSelect[] | undefined = snippetList.filter(item => {
        return (
            item.title.toLowerCase().includes(q.toLowerCase()) ||
            item.tags.some(t => t.toLowerCase().includes(q.toLowerCase()))
        )
    });

    if (snippets) {
        const strDateSnippets = snippets.map(snippet => ({
            ...snippet,
            createdAt: snippet.createdAt.toString()
        }));
        return strDateSnippets;
    }

    return [];

});



export const create = snippetsWrapper(async (newSnippet: CreateSnippetInput) => {
    // const updatedNewSnippet = {
    //     ...newSnippet,
    //     id: randomUUID(),
    //     createdAt: new Date(),
    // };
    // const validatedSnippet = dataSchema.parse(updatedNewSnippet);

    // const snippetList: Snippet[] = await getAll();

    // snippetList.push(validatedSnippet);

    // if (snippetList) {
    //     const snippetStr: string = JSON.stringify(snippetList);
    //     await writeFile(dataFilePath, snippetStr, "utf-8");
    // }

    await db.insert(snippets).values(newSnippet);

    return { success: true };

});



export const remove = snippetsWrapper(async (id: number) => {
    // const snippetList: Snippet[] = await getAll();

    // const newSnippetList: Snippet[] | undefined = snippetList.filter(item => item.id !== id);

    // if (newSnippetList) {
    //     const snippetStr: string = JSON.stringify(newSnippetList);
    //     await writeFile(dataFilePath, snippetStr, "utf-8");
    // }

    await db.delete(snippets).where(eq(snippets.id, id));

    return { success: true };

});