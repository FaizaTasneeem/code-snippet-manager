"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { create, remove, update } from "@/lib/snippets";

type formDataType = {
    title: string,
    language: "html" | "css" | "js" | "ts" | "other",
    code: string,
    tags: string
}

const dataSchema = z.object({
    title: z.preprocess(
        (title: string) => (title.trim()),
        z.string().min(1, { message: "This field cannot be empty" })
    ),
    language: z.enum(['html', 'css', 'js', 'ts', 'other']),
    tags: z.preprocess(
        (tags: string) => (tags.trim() ? tags.split(",").map(t => t.trim()).filter(t => t.length > 0) : []),
        z.array(z.string()).min(1, { message: "This field cannot be empty" })
    ),
    code: z.preprocess(
        (code: string) => (code.trim()),
        z.string().min(1, { message: "This field cannot be empty" })
    ),
});

export async function createSnippet(_previousState: any, newSnippetFormData: FormData) {
    const rawData = Object.fromEntries(newSnippetFormData) as formDataType;

    try {
        const validatedSnippet = dataSchema.parse(rawData);
        const createResponse = await create(validatedSnippet);
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
            return { ...rawData, error: issueList };
        }
        return {
            ...rawData,
            error: [{
                errorField: null,
                errorMsg: error instanceof Error ? error.message : "An unexpected error occurred.",
            }]
        };
    }

    revalidatePath("/");
    redirect("/");
}

export async function updateSnippet(snippetId: number, _previousState: any, formData: FormData) {
    try {
        const code = formData.get("code") as string;
        const updateResponse = await update(snippetId, code);
        console.log(updateResponse);
    }
    catch (error) {
        console.log("Caught error in server action while updating snippet: ", error);
        return {
            error: error instanceof Error ? error.message : "Failed to update snippet"
        };
    }

    revalidatePath(`/snippet/${snippetId}`);
    redirect(`/snippet/${snippetId}`);
}

export async function deleteSnippet(snippetId: number) {
    try {
        const deleteResponse = await remove(snippetId);
        console.log(deleteResponse);
    }
    catch (error) {
        console.log("Caught error in server action while deleting: ", error);
        return {
            error: error instanceof Error ? error.message : "Failed to delete snippet"
        };
    }

    revalidatePath("/");
    redirect("/");
}