"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function Search() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

    const currentLang = searchParams.get("lang") || "all";

    function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(event.target.value);
    }

    function generateLangLink(lang: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("lang", lang);
        return `/?${params.toString()}`;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("q", searchQuery);
            router.push(`/?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timer);

    }, [searchQuery])

    return (
        <div className="w-full mt-4 p-4 px-20 flex flex-col items-start">
            <input className="w-full py-2.5 px-4 w-[50%] border border-gray-600 rounded-lg bg-[#111827] " type="text" value={searchQuery} onChange={handleSearchQueryChange} placeholder="🔍 Search snippets by title or tag..." />

            <div className="mt-4 flex flex-col md:flex-row justify-center gap-2 font-bold text-xs">
                <Link href={generateLangLink("all")} className={`p-1 py-2 rounded-full border-2 w-18 truncate text-center cursor-pointer ${currentLang === "all" ? "bg-cyan-500 text-black" : "border-gray-600"}`}>All</Link>
                <Link href={generateLangLink("html")} className={`p-1 py-2 rounded-full border-2 w-18 truncate text-center cursor-pointer ${currentLang === "html" ? "bg-cyan-500 text-black" : "border-gray-600"}`}>HTML</Link>
                <Link href={generateLangLink("css")} className={`p-1 py-2 rounded-full border-2 w-18 truncate text-center cursor-pointer ${currentLang === "css" ? "bg-cyan-500 text-black" : "border-gray-600"}`}>CSS</Link>
                <Link href={generateLangLink("js")} className={`p-1 py-2 rounded-full border-2 w-18 truncate text-center cursor-pointer ${currentLang === "js" ? "bg-cyan-500 text-black" : "border-gray-600"}`}>JS</Link>
                <Link href={generateLangLink("ts")} className={`p-1 py-2 rounded-full border-2 w-18 truncate text-center cursor-pointer ${currentLang === "ts" ? "bg-cyan-500 text-black" : "border-gray-600"}`}>TS</Link>
                <Link href={generateLangLink("other")} className={`p-2 rounded-full border-2 w-18 truncate text-center cursor-pointer ${currentLang === "other" ? "bg-cyan-500 text-black" : "border-gray-600"}`}>OTHER</Link>
            </div>
        </div>
    )
}

export default Search