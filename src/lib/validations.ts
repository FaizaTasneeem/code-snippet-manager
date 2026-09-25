import { z } from "zod";

export const dataSchema = z.object({
    title: z.preprocess(
        (title: string) => (title.trim()),
        z.string().min(1, { message: "This field cannot be empty" })
    ),
    language: z.string(),
    tags: z.preprocess(
        (tags: string) => (tags.trim() ? tags.split(",").map(t => t.trim()).filter(t => t.length > 0) : []),
        z.array(z.string()).min(1, { message: "This field cannot be empty" })
    ),
    code: z.preprocess(
        (code: string) => (code.trim()),
        z.string().min(1, { message: "This field cannot be empty" })
    ),
});

export const langSchema = z.object({
    name: z.preprocess(
        (name: string) => (name.trim()),
        z.string().min(1, { message: "This field cannot be empty" })
    ),
    color: z.preprocess(
        (color: string) => (color.trim()),
        z.string().min(1, { message: "This field cannot be empty" })
    ),
});
