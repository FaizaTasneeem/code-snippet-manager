"use server";

import { redirect } from "next/navigation";
import { create } from "@/lib/snippets";
import { CreateSnippetInput } from "@/types";

export async function createSnippet(newSnippet: CreateSnippetInput) {
    const createResponse = await create(newSnippet);
    console.log(createResponse);
    redirect("/");
}