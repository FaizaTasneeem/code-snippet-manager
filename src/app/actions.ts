"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { create, remove } from "@/lib/snippets";

type formDataType = {
    title: string,
    language: "js" | "ts" | "css" | "html" | "other",
    code: string,
    tags: string
}

export async function createSnippet(_previousState: any, newSnippetFormData: FormData) {
    const { title, language, code, tags } = Object.fromEntries(newSnippetFormData) as formDataType;
    try {
        const tagsList = tags ? tags.split(",").map(t => t.trim()) : [];

        const createResponse = await create({
            title: title.trim(),
            language,
            code: code.trim(),
            tags: tagsList
        });
        console.log(createResponse);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            const issueListWithDuplicate = error.issues.map(issue => {
                return {
                    errorField: issue.path[0],
                    errorMsg: issue.message
                }
            })
            const issueList = [...new Set(issueListWithDuplicate)];
            return { title, language, code, tags, error: issueList };
        }
        return {
            title, language, code, tags,
            error: [{
                errorField: null,
                errorMsg: error instanceof Error ? error.message : "An unexpected error occurred.",
            }]
        };
    }

    revalidatePath("/");
    redirect("/");
}

export async function deleteSnippet(snippetId: number) {
    try {
        const deleteResponse = await remove(snippetId);
        console.log(deleteResponse);
    }
    catch (error) {
        console.log("Caught error in server action while deleting: ", error);
        return { error };
    }

    revalidatePath("/");
    redirect("/");
}