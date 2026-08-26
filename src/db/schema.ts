import { pgTable, serial, text, pgEnum, date } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const languageEnum = pgEnum('language', ['html', 'css', 'js', 'ts', 'other']);

export const snippets = pgTable('snippets', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    language: languageEnum('language').notNull(),
    tags: text('tags').array().notNull().default([]),
    code: text('code').notNull(),
    createdAt: date('createdAt').notNull().defaultNow()
});

export type SnippetType = InferSelectModel<typeof snippets>;
export type NewSnippetType = InferInsertModel<typeof snippets>;