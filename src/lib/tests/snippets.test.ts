import { vi, describe, it, expect, beforeEach } from "vitest";
import { db } from "@/db";
import { snippets } from "@/db/schema";
import {
    getAll, getById, getByTitleOrTags, create, update, remove
} from "../snippets";

vi.mock("@/db", () => (
    {
        db: {
            select: vi.fn(),
            insert: vi.fn(),
            update: vi.fn(),
            delete: vi.fn()
        }
    }
));

const dummySnippets = [
    { id: 1, title: 'React Hook', language: 'ts' as const, tags: ['react', 'frontend'], code: 'const x = 1;', createdAt: new Date().toISOString() },
    { id: 2, title: 'CSS Grid', language: 'css' as const, tags: ['styling', 'grid'], code: '.box { display: grid; }', createdAt: new Date().toISOString() },
];

const newSnippet = {
    title: "Vue Counter",
    language: "ts" as const,
    tags: ["vue", "frontend"],
    code: "const count = ref(0);"
};


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


describe("testing snippets db queries", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns all the snippets from the database", async () => {
        vi.mocked(db.select).mockReturnValue({
            from: vi.fn().mockResolvedValue(dummySnippets)
        } as any);

        const result = await getAll();
        expect(result).toEqual(dummySnippets);
    });

    it("returns the snippet matching the numeric ID from the database", async () => {
        vi.mocked(db.select).mockReturnValue({
            from: vi.fn().mockReturnValue({
                where: vi.fn().mockResolvedValue([dummySnippets.find(snippet => snippet.id === 1)])
            } as any)
        } as any);

        const result = await getById(1);
        expect(result).toEqual(dummySnippets.find(snippet => snippet.id === 1));
    });

    it("returns undefined when the snippet is not found from the database", async () => {
        vi.mocked(db.select).mockReturnValue({
            from: vi.fn().mockReturnValue({
                where: vi.fn().mockResolvedValue([dummySnippets.find(snippet => snippet.id === 3)])
            } as any)
        } as any);

        const result = await getById(3);
        expect(result).toEqual(undefined);
    });

    it("calls `db.insert` with the provided snippet data", async () => {
        const mockValues = vi.fn().mockResolvedValue({ success: true });

        vi.mocked(db.insert).mockReturnValue({
            values: mockValues
        } as any);

        const result = await create(newSnippet);

        expect(db.insert).toHaveBeenCalledWith(snippets);
        expect(mockValues).toHaveBeenCalledWith(newSnippet);
        expect(result).toEqual({ success: true });
    });


    it("calls `db.delete` with the numeric snippet ID", async () => {
        const mockEq = vi.fn((id: number) => dummySnippets.some(snippet => snippet.id === id));

        vi.mocked(db.delete).mockReturnValue({
            where: vi.fn().mockResolvedValue(mockEq(2))
        } as any);

        const result = await remove(2);

        expect(db.delete).toHaveBeenCalledWith(snippets);
        expect(mockEq).toHaveBeenCalledWith(2);
        expect(result).toEqual({ success: true });
    });

});