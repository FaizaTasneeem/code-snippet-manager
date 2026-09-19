import { z } from "zod";

export const dataSchema = z.object({
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
