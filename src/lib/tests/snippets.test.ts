import { vi, describe, it, expect, beforeEach } from "vitest";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { snippets } from "@/db/schema";
import { getAll, getById, getByTitleOrTags, create, update, remove } from "../snippets";
import { dataSchema } from "../../app/actions";


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
    { id: 3, title: 'HTML', language: 'css' as const, tags: [], code: '.box { display: grid; }', createdAt: new Date().toISOString() },
];

const newSnippet = {
    title: "Vue Counter",
    language: "ts" as const,
    tags: ["vue", "frontend"],
    code: "const count = ref(0);"
};

const newCode = "const count = ref(0);";


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

    it("matches on title and does not crash when a snippet has empty tags []", async () => {
        const filteredSnippets = await getByTitleOrTags("HTML", dummySnippets);
        expect(filteredSnippets).toEqual([dummySnippets[2]]);
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
                where: vi.fn().mockResolvedValue([dummySnippets.find(snippet => snippet.id === 4)])
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

    it("calls `db.update` with the numeric snippet ID and updated code", async () => {
        const mockSet = vi.fn();
        const mockWhere = vi.fn().mockResolvedValue([]);

        vi.mocked(db.update).mockReturnValue({
            set: mockSet.mockReturnValue({
                where: mockWhere
            })
        } as any);

        const result = await update(2, newCode);

        expect(db.update).toHaveBeenCalledWith(snippets);
        expect(mockSet).toHaveBeenCalledWith({ code: newCode });
        expect(mockWhere).toHaveBeenCalledWith(eq(snippets.id, 2));
        expect(result).toEqual({ success: true });
    });

    it("calls `db.delete` with the numeric snippet ID", async () => {
        const mockWhere = vi.fn().mockResolvedValue([]);

        vi.mocked(db.delete).mockReturnValue({
            where: mockWhere
        } as any);

        const result = await remove(2);

        expect(db.delete).toHaveBeenCalledWith(snippets);
        expect(mockWhere).toHaveBeenCalledWith(eq(snippets.id, 2));
        expect(result).toEqual({ success: true });
    });

});


describe("dataSchema validation", () => {
    it("rejects snippets with empty or whitespace-only title with an error message", () => {
        const emptyTitleData = {
            title: "   ",
            language: "ts",
            code: "const x = 1;",
            tags: "typescript, test",
        };

        expect(() => dataSchema.parse(emptyTitleData)).toThrow("This field cannot be empty");
    });

    it("rejects snippets with an invalid language option", () => {
        const invalidLanguageData = {
            title: "Valid Title",
            language: "python",
            code: "print('hello')",
            tags: "python, test",
        };

        expect(() => dataSchema.parse(invalidLanguageData)).toThrow();
    });
});