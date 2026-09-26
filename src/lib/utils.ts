const PRISM_LANGUAGE_MAP: Record<string, string> = {
    "c++": "cpp",
    "c#": "csharp",
    "cs": "csharp",
    "golang": "go",
    "shell": "bash",
    "sh": "bash",
    "yml": "yaml",
    "other": "text",
};

export function mapLanguageToPrism(lang?: string): string {
    if (!lang) return "text";
    return PRISM_LANGUAGE_MAP[lang.trim().toLowerCase()] ?? lang.trim().toLowerCase();
}
