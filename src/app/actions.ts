"use server";

import { redirect } from "next/navigation";
import { create, remove } from "@/lib/snippets";
import { CreateSnippetInput } from "@/types";

export async function createSnippet(newSnippet: CreateSnippetInput) {
    const createResponse = await create(newSnippet);
    console.log(createResponse);
    redirect("/");
}

export async function deleteSnippet(snippetId: string) {
    const deleteResponse = await remove(snippetId);
    console.log(deleteResponse);
    redirect("/");
}