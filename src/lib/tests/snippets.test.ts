import { describe, it, expect } from "vitest";
import { db } from "@/db";
import { getByTitleOrTags } from "../snippets";

const dummySnippets = [
    { id: 1, title: 'React Hook', language: 'ts' as const, tags: ['react', 'frontend'], code: 'const x = 1;', createdAt: new Date().toISOString() },
    { id: 2, title: 'CSS Grid', language: 'css' as const, tags: ['styling', 'grid'], code: '.box { display: grid; }', createdAt: new Date().toISOString() },
];

describe("testing getByTitleOrTags", () => {
    it("returns matching snippets when searched by title (case-insensitive)", async () => {
        const filteredSnippets = await getByTitleOrTags("react hook", dummySnippets);
        expect(filteredSnippets).toEqual([dummySnippets[0]]);
    });

    it("returns matching snippets when searched by tag (case-insensitive)", async () => {
        const filteredSnippets = await getByTitleOrTags("styling", dummySnippets);
        expect(filteredSnippets).toEqual([dummySnippets[1]]);
    });

    it("returns an empty array `[]` when neither title nor tag matches", async () => {
        const filteredSnippets = await getByTitleOrTags("demo", dummySnippets);
        expect(filteredSnippets).toEqual([]);
    });
});