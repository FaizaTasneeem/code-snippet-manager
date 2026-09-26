import { eq } from "drizzle-orm";
import { db } from "@/db";
import { snippets, languages, SnippetSelect, SnippetInsert, LanguageSelect, LanguageInsert } from "@/db/schema";


const DEFAULT_LANGUAGES: LanguageInsert[] = [
    { name: "html", color: "#e34f26" },
    { name: "css", color: "#8B5CF6" },
    { name: "js", color: "#f7df1e" },
    { name: "ts", color: "#3178c6" },
    { name: "other", color: "#9ca3af" },
];


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


export const getAll = snippetsWrapper(async () => {
    const snippetsList: SnippetSelect[] = await db.select().from(snippets);
    return snippetsList;
});


export const getAllLanguages = snippetsWrapper(async () => {
    let langList: LanguageSelect[] = await db.select().from(languages);

    if (langList.length === 0) {
        await db.insert(languages).values(DEFAULT_LANGUAGES).onConflictDoNothing();
        langList = await db.select().from(languages);
    }
    return langList;
});


export const getById = snippetsWrapper(async (id: number) => {
    const snippet: SnippetSelect[] | undefined = await db.select().from(snippets).where(eq(snippets.id, id));
    return snippet[0];
});


export const getByLanguage = snippetsWrapper(async (lang: SnippetSelect["language"]) => {
    const snippetsList: SnippetSelect[] = await db.select().from(snippets).where(eq(snippets.language, lang.toLowerCase()));
    return snippetsList ? snippetsList : [];
});


export const getByTitleOrTags = snippetsWrapper(async (q: string, snippetList: SnippetSelect[]) => {
    const snippets: SnippetSelect[] | undefined = snippetList.filter(item => {
        return (
            item.title.toLowerCase().includes(q.toLowerCase()) ||
            item.tags.some(t => t.toLowerCase().includes(q.toLowerCase()))
        )
    });
    return snippets;
});


export const create = snippetsWrapper(async (newSnippet: SnippetInsert) => {
    await db.insert(snippets).values(newSnippet);
    return { success: true };
});


export const createLanguage = snippetsWrapper(async (newLanguage: LanguageInsert) => {
    await db.insert(languages).values(newLanguage);
    return { success: true };
});


export const update = snippetsWrapper(async (id: number, code: string) => {
    await db.update(snippets).set({ code }).where(eq(snippets.id, id));
    return { success: true };
});


export const remove = snippetsWrapper(async (id: number) => {
    await db.delete(snippets).where(eq(snippets.id, id));
    return { success: true };
});