import { z } from "zod";

export const createSchema = (validLangList: string[]) => (
    z.object({
        title: z.preprocess(
            (title: string) => (title.trim()),
            z.string().min(1, { message: "This field cannot be empty" })
        ),
        language: z.preprocess(
            (lang: string) => (lang.trim().toLowerCase()),
            z.string().refine(
                (val) => (validLangList.includes(val.toLowerCase())),
                { message: `Must be 1 of the listed language: ${validLangList.join(", ")}` }
            )
        ),
        tags: z.preprocess(
            (tags: string) => (tags.trim() ? tags.split(",").map(t => t.trim()).filter(t => t.length > 0) : []),
            z.array(z.string()).min(1, { message: "This field cannot be empty" })
        ),
        code: z.preprocess(
            (code: string) => (code.trim()),
            z.string().min(1, { message: "This field cannot be empty" })
        ),
    })
);

export const langSchema = z.object({
    name: z.preprocess(
        (name: string) => (name.trim().toLowerCase()),
        z.string().min(1, { message: "This field cannot be empty" })
    ),
    color: z.preprocess(
        (color: string) => (color.trim()),
        z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, { message: "Must be a valid hex color (e.g. #3b82f6)" })
    ),
});
