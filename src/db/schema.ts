import { pgTable, serial, text, pgEnum, date } from "drizzle-orm/pg-core";

export const languageEnum = pgEnum('language', ['html', 'css', 'js', 'ts', 'other']);

export const snippets = pgTable('snippets', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    language: languageEnum('language').notNull(),
    tags: text('tags').array().notNull().default([]),
    code: text('code').notNull(),
    createdAt: date('created_at').notNull().defaultNow()
});

export type SnippetSelect = typeof snippets.$inferSelect;
export type SnippetInsert = typeof snippets.$inferInsert;