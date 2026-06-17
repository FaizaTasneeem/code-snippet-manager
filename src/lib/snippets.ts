import { readFile } from "node:fs/promises";
import path from "node:path";


const dataFilePath = path.join(process.cwd(), "src/data/snippets.json");

export const snippetsWrapper = async (fn) => {
    try {
        await fn();
    }
    catch (error) {
        console.log(error);
    }
}

export async function getAll() {
    const fileContents = await readFile(dataFilePath, "utf-8");

    const snippets = JSON.parse(fileContents);

    return snippets.map((snippet: any) => {
        return { ...snippet, createdAt: new Date(snippet.createdAt) };
    });
}

export async function getById() {

}

export async function create() {

}

export async function remove() {

}
