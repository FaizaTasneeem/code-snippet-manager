# Snippet Vault - Code Snippet Manager

![CI](https://github.com/FaizaTasneeem/code-snippet-manager/actions/workflows/ci.yml/badge.svg)

A high-performance, responsive code snippet manager built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Drizzle ORM**. This project showcases modern React patterns, full-stack Next.js architecture, robust server-side actions, relational PostgreSQL persistence, custom data filtering with state persistence, and client-side performance optimizations.

🚀 **Ready for Portfolio / CV Showcase**

🔗 **Live Demo:** [code-snippet-manager-beige.vercel.app](https://code-snippet-manager-beige.vercel.app/)

---

## 🛠️ Key Skills & Tech Stack Demonstrated

* **Next.js 16 (App Router) & React 19:** Layouts, nested dynamic routing (`/snippet/[snippetId]`), Loading Skeletons (`loading.tsx`), custom error templates (`not-found.tsx`), and Suspense boundaries.
* **Database & Persistence (Drizzle ORM + PostgreSQL):** Type-safe relational database management with **Drizzle ORM** and **PostgreSQL** schema definitions (`src/db/schema.ts`), featuring relational foreign-key constraints (`snippets` -> `languages`) and cascade deletions.
* **Dynamic Language System & Prism Aliasing:** Full support for extensible programming languages with preset/custom hex color coding, database auto-seeding, and intelligent Prism syntax alias mapping (`c++` → `cpp`, `golang` → `go`, etc.).
* **Server-Side Architecture (Server Actions):** Implementation of `"use server"` actions (`createSnippet`, `updateSnippet`, `deleteSnippet`, `addLanguage`, `deleteLanguage`) bridging client interactions directly to database operations with path revalidation.
* **TypeScript & Inferred Schemas:** Type safety end-to-end utilizing Drizzle's `$inferSelect` and `$inferInsert` types alongside dynamic Zod validation schemas.
* **Runtime Schema Validation:** Integration of **Zod** for preprocessing and validating form data dynamically against registered database languages, hex color regexes, and tag arrays.
* **Comprehensive Testing (Vitest & Playwright):** Complete test pyramid including mocked Vitest unit tests for database queries and Zod validations, paired with Playwright end-to-end tests for critical user workflows.
* **Syntax Highlighting & UX:** Beautiful syntax highlighting integrated via **`react-syntax-highlighter`** (Coldark Dark theme) across grid card previews and detail view modes.
* **Performance Optimizations:** Custom client-side debouncing (500ms) on text search to prevent input-lag and excessive layout recalculation.
* **State Persistence in URLs:** Built-in preservation of search query strings (`?q=...`) and language category filters (`?lang=...`) using `URLSearchParams` to support shareable state.
* **Modern React & UI Components:** Extracted modular UI system with custom modals, toast notifications, responsive snippet count badges, and state-driven copy-to-clipboard functionality.

---

## 🌟 Key Features

1. **Dynamic Code Search:** Case-insensitive, partial-match title and tag search with real-time feedback and a live snippet count badge.
2. **Custom Language Management:** Add new programming languages with custom hex colors or preset palette swatches. Automatically populates filter tabs and snippet dropdowns, and supports one-click deletion with database cascade.
3. **Language Filters:** Category navigation filters allowing instant classification across all registered languages, with "Other" anchored at the end.
4. **Controlled Creation Form:** Input preprocessing with dynamic Zod schemas, language select menus, and automatic parsing of comma-separated strings into tag arrays.
5. **Inline Code Editing:** Edit code snippets directly in the detail view with live state synchronization and server action persistence.
6. **Syntax Highlighting & Alias Resolution:** Formatted and styled code display powered by `react-syntax-highlighter` with automatic Prism alias resolution (`shell` → `bash`, `c#` → `csharp`, etc.).
7. **Copy-to-Clipboard Utility:** Custom hook wrapper enabling one-click copying of code snippets with success notification toasts.
8. **PostgreSQL Relational Persistence:** Relational data storage managed through Drizzle ORM queries and migrations.
9. **Polished Skeleton Loaders:** Tailwind-animated loaders across main views, creation forms, and snippet details to eliminate Layout Shifts (CLS).

---

## 📂 Architecture & Directory Highlights

* **`src/db/`**: Database configuration (`index.ts`) and Drizzle ORM schema definitions (`schema.ts`) defining the Postgres `snippets` and `languages` tables with cascade relations.
* **`src/app/actions.ts`**: Server Actions (`createSnippet`, `updateSnippet`, `deleteSnippet`, `addLanguage`, `deleteLanguage`) handling full-stack data mutation, Zod validation, and revalidation.
* **`src/lib/snippets.ts`**: Data access layer encapsulating Drizzle database queries and auto-seeding defaults (`getAll`, `getAllLanguages`, `create`, `createLanguage`, `removeLanguage`, etc.).
* **`src/lib/validations.ts`**: Dynamic Zod validation schemas (`createSchema`, `langSchema`).
* **`src/components/`**: Modularized component hierarchy:
  * **`layout/`**: Header, navigation buttons (`CreateButton`), and `Logo`.
  * **`snippet/`**: `SnippetGridView`, `Search`, `NewSnippetForm`, `EditSnippetForm`, `DeleteButton`, `CopyToClipBoardButton`, and syntax highlighting integration.
  * **`ui/`**: Reusable `Modal`, `AddLangModal`, and `Toast` feedback components.
* **`src/app/snippet/[snippetId]/`**: Dynamic route for detailed viewing, syntax highlighting, code updating, and deletion.
* **`src/app/loading.tsx` & `not-found.tsx`**: System-level UX enhancements for loading skeletons and 404 pages.
* **`e2e/`**: Playwright end-to-end test suite (`snippets.spec.ts`).
* **`src/lib/tests/`**: Vitest unit test suite covering DB access functions, search queries, and validation schemas.

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
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

### Run Unit Tests (Vitest)
```bash
npm run test:run
```

### Run End-to-End Tests (Playwright)
```bash
npm run test:e2e
```
Or run with UI mode:
```bash
npm run test:e2e:ui
```
