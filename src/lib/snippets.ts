import { readFile } from "node:fs/promises";
import path from "node:path";


const dataFilePath = path.join(process.cwd(), "src/data/snippets.json");

export const snippetsWrapper = (fn: Function) => {
    return () => {
        try {
            fn();
        }
        catch (error) {
            console.log(error);
        }

    }
}

export const getAll = snippetsWrapper(async () => {
    const fileContents = await readFile(dataFilePath, "utf-8");

    const snippets = JSON.parse(fileContents);

    return snippets.map((snippet: any) => {
        return { ...snippet, createdAt: new Date(snippet.createdAt) };
    });
})


export const getById = snippetsWrapper(async () => {
    const fileContents = await readFile(dataFilePath, "utf-8");

    const snippets = JSON.parse(fileContents);

    return snippets.map((snippet: any) => {
        return { ...snippet, createdAt: new Date(snippet.createdAt) };
    });
})



export const create = snippetsWrapper(async () => {
    const fileContents = await readFile(dataFilePath, "utf-8");

    const snippets = JSON.parse(fileContents);

    return snippets.map((snippet: any) => {
        return { ...snippet, createdAt: new Date(snippet.createdAt) };
    });
})



export const remove = snippetsWrapper(async () => {
    const fileContents = await readFile(dataFilePath, "utf-8");

    const snippets = JSON.parse(fileContents);

    return snippets.map((snippet: any) => {
        return { ...snippet, createdAt: new Date(snippet.createdAt) };
    });
})