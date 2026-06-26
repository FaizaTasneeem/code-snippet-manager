# Snippet Vault - Code Snippet Manager

A high-performance, responsive code snippet manager built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. This project showcases modern React patterns, full-stack Next.js architecture, robust server-side actions, custom data filtering with state persistence, and client-side performance optimizations.

🚀 **Ready for Portfolio / CV Showcase**

🔗 **Live Demo:** [code-snippet-manager-beige.vercel.app](https://code-snippet-manager-beige.vercel.app/)

---

## 🛠️ Key Skills & Tech Stack Demonstrated

* **Next.js 15 (App Router):** Layouts, nested dynamic routing (`/snippet/[snippetId]`), Loading Skeletons (`loading.tsx`), custom error templates (`not-found.tsx`), and Suspense boundaries.
* **Server-Side Architecture (Server Actions):** Implementation of `"use server"` actions (`createSnippet`, `deleteSnippet`) to bridge client boundaries to server operations, eliminating the need for boilerplate API routes.
* **TypeScript & Advanced Typing:** Strict typing throughout components, sharing schema types, and using utility types like `Omit<Snippet, 'id' | 'createdAt'>` for form inputs.
* **Runtime Schema Validation:** Integration of **Zod** to validate structural integrity of inputs before file system writes (validation on titles, language tags, and date types).
* **Performance Optimizations:** Custom client-side debouncing (500ms) on text search to prevent input-lag and excessive layout recalculation.
* **State Persistence in URLs:** Built-in preservation of search query strings (`?q=...`) and language category filters (`?lang=...`) using `URLSearchParams` to support shareable state.
* **Modern React & State Management:** Managed controlled forms, state-driven UI models (copy-to-clipboard modal notifications), and custom hooks (`useEffect`, `useState`).

---

## 🌟 Key Features

1. **Dynamic Code Search:** Fully case-insensitive, partial-match title and tag search.
2. **Language Filters:** Category navigation filters allowing instant classification across `HTML`, `CSS`, `JS`, `TS`, and `Other`.
3. **Controlled Creation Form:** Input sanitation, select menus, and automatic parsing of comma-separated strings into tag arrays.
4. **Copy-to-Clipboard Utility:** Custom hook wrapper enabling one-click copying of code snippets with temporary success notification modals.
5. **JSON-Based File System Database:** Server-side read/write operations mimicking a lightweight, serverless database setup.
6. **Polished Skeleton Loaders:** Custom Tailwind-animated loaders replicating layout structures to avoid sudden Layout Shifts (CLS).

---

## 📂 Architecture & Directory Highlights

* **`src/app/actions.ts`**: Encapsulates Next.js Server Actions for full-stack data mutation.
* **`src/app/snippet/[snippetId]/`**: Dynamic route pages containing detailed view layouts, copy functionality, and secure deletions.
* **`src/lib/snippets.ts`**: Core repository logic handling file system reads, file system writes, data filtering, and validation.
* **`src/types/index.ts`**: Global TypeScript contract definitions.
* **`src/app/loading.tsx` & `not-found.tsx`**: System-level UX enhancements for loading skeletons and 404 views.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---
