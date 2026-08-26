export type Snippet = {
    id: number;
    title: string;
    language: 'js' | 'ts' | 'css' | 'html' | 'other';
    tags: string[];
    code: string;
    createdAt: Date;
};

export type CreateSnippetInput = Omit<Snippet, 'id' | 'createdAt'>;
