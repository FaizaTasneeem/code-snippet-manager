"use server";

import { create } from "@/lib/snippets";
import { CreateSnippetInput } from "@/types";

export async function createSnippet(newSnippet: CreateSnippetInput) {
    return await create(newSnippet);
}