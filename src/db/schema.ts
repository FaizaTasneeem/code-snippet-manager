import { pgTable, serial, text, pgEnum, date, integer } from "drizzle-orm/pg-core";

export const languageEnum = pgEnum('language', ['html', 'css', 'js', 'ts', 'other']);

export const languages = pgTable('languages', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    color: text('color').notNull(),
});

export const snippets = pgTable('snippets', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    // language: languageEnum('language').notNull(),
    language: text('language').notNull().references(() => languages.name, { onDelete: 'cascade' }),
    tags: text('tags').array().notNull().default([]),
    code: text('code').notNull(),
    createdAt: date('created_at').notNull().defaultNow()
});

export type SnippetSelect = typeof snippets.$inferSelect;
export type SnippetInsert = typeof snippets.$inferInsert;

export type LanguageSelect = typeof languages.$inferSelect;
export type LanguageInsert = typeof languages.$inferInsert;