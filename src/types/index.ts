type Snippet = {
    id: string;
    title: string;
    language: 'js' | 'ts' | 'css' | 'html' | 'other';
    tags: string[];
    code: string;
    createdAt: Date;
};