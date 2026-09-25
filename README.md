# Snippet Vault - Code Snippet Manager

![CI](https://github.com/FaizaTasneeem/code-snippet-manager/actions/workflows/ci.yml/badge.svg)

A high-performance, responsive code snippet manager built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Drizzle ORM**. This project showcases modern React patterns, full-stack Next.js architecture, robust server-side actions, relational PostgreSQL persistence, custom data filtering with state persistence, and client-side performance optimizations.

🚀 **Ready for Portfolio / CV Showcase**

🔗 **Live Demo:** [code-snippet-manager-beige.vercel.app](https://code-snippet-manager-beige.vercel.app/)

---

## 🛠️ Key Skills & Tech Stack Demonstrated

* **Next.js 16 (App Router) & React 19:** Layouts, nested dynamic routing (`/snippet/[snippetId]`), Loading Skeletons (`loading.tsx`), custom error templates (`not-found.tsx`), and Suspense boundaries.
* **Database & Persistence (Drizzle ORM + PostgreSQL):** Type-safe database management with **Drizzle ORM** and **PostgreSQL** schema definitions (`src/db/schema.ts`), replacing legacy file-system persistence with production-ready relational data access.
* **Server-Side Architecture (Server Actions):** Implementation of `"use server"` actions (`createSnippet`, `updateSnippet`, `deleteSnippet`) bridging client interactions directly to database operations without API boilerplate.
* **TypeScript & Inferred Schemas:** Type safety end-to-end utilizing Drizzle's `$inferSelect` and `$inferInsert` types alongside Zod validation schemas.
* **Runtime Schema Validation:** Integration of **Zod** for preprocessing and validating form data (titles, language enums, tag arrays, and code body) on both creation and mutation.
* **Syntax Highlighting & UX:** Beautiful syntax highlighting integrated via **`react-syntax-highlighter`** across grid card previews and detail view modes.
* **Performance Optimizations:** Custom client-side debouncing (500ms) on text search to prevent input-lag and excessive layout recalculation.
* **State Persistence in URLs:** Built-in preservation of search query strings (`?q=...`) and language category filters (`?lang=...`) using `URLSearchParams` to support shareable state.
* **Modern React & UI Components:** Extracted modular UI system with custom modals, toast notifications, responsive snippet count badges, and state-driven copy-to-clipboard functionality.

---

## 🌟 Key Features

1. **Dynamic Code Search:** Case-insensitive, partial-match title and tag search with real-time feedback and a live snippet count badge.
2. **Language Filters:** Category navigation filters allowing instant classification across `HTML`, `CSS`, `JS`, `TS`, and `Other`.
3. **Controlled Creation Form:** Input preprocessing with Zod, category select menus, and automatic parsing of comma-separated strings into tag arrays.
4. **Inline Code Editing:** Edit code snippets directly in the detail view with live state synchronization and server action persistence.
5. **Syntax Highlighting:** Formatted and styled code display powered by `react-syntax-highlighter` for high readability.
6. **Copy-to-Clipboard Utility:** Custom hook wrapper enabling one-click copying of code snippets with success notification toasts/modals.
7. **PostgreSQL Relational Persistence:** Robust data storage managed through Drizzle ORM queries and mutations.
8. **Polished Skeleton Loaders:** Tailwind-animated loaders across main views, creation forms, and snippet details to eliminate Layout Shifts (CLS).

---

## 📂 Architecture & Directory Highlights

* **`src/db/`**: Database configuration (`index.ts`) and Drizzle ORM schema definitions (`schema.ts`) defining the Postgres `snippets` table and enums.
* **`src/app/actions.ts`**: Server Actions (`createSnippet`, `updateSnippet`, `deleteSnippet`) handling full-stack data mutation, Zod validation, and revalidation.
* **`src/lib/snippets.ts`**: Data access layer encapsulating Drizzle database queries (`getAll`, `getById`, `getByLanguage`, `create`, `update`, `remove`).
* **`src/components/`**: Modularized component hierarchy:
  * **`layout/`**: Header, navigation buttons (`CreateButton`), and `Logo`.
  * **`snippet/`**: `SnippetGridView`, `Search`, `EditSnippetForm`, `DeleteButton`, `CopyToClipBoardButton`, and syntax highlighting integration.
  * **`ui/`**: Reusable `Modal` and `Toast` feedback components.
* **`src/app/snippet/[snippetId]/`**: Dynamic route for detailed viewing, syntax highlighting, code updating, and secure deletion.
* **`src/app/loading.tsx` & `not-found.tsx`**: System-level UX enhancements for loading skeletons and 404 pages.
* **`drizzle.config.ts`**: Drizzle Kit configuration pointing to schema definitions and database credentials.

---

## 🚀 Getting Started

### 1. Environment Setup
Create a `.env` file in the root directory with your PostgreSQL connection URL:
```env
DATABASE_URL=your_postgres_connection_string
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---
