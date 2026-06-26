"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();

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
        <div className="w-full p-4 px-20 flex flex-row justify-between">
            <input className="p-4 w-[50%] border rounded-lg" type="text" value={searchQuery} onChange={handleSearchQueryChange} placeholder="Search by title or tag..." />

            <div className="flex flex-col md:flex-row justify-center gap-2">
                <Link href={generateLangLink("all")} className={`p-2 border-b-2 w-18 truncate text-center cursor-pointer ${currentLang === "all" ? "border-blue-400" : "border-white"}`}>All</Link>
                <Link href={generateLangLink("html")} className={`p-2 border-b-2 w-18 truncate text-center cursor-pointer ${currentLang === "html" ? "border-blue-400" : "border-white"}`}>HTML</Link>
                <Link href={generateLangLink("css")} className={`p-2 border-b-2 w-18 truncate text-center cursor-pointer ${currentLang === "css" ? "border-blue-400" : "border-white"}`}>CSS</Link>
                <Link href={generateLangLink("js")} className={`p-2 border-b-2 w-18 truncate text-center cursor-pointer ${currentLang === "js" ? "border-blue-400" : "border-white"}`}>JS</Link>
                <Link href={generateLangLink("ts")} className={`p-2 border-b-2 w-18 truncate text-center cursor-pointer ${currentLang === "ts" ? "border-blue-400" : "border-white"}`}>TS</Link>
                <Link href={generateLangLink("other")} className={`p-2 border-b-2 w-18 truncate text-center cursor-pointer ${currentLang === "other" ? "border-blue-400" : "border-white"}`}>OTHER</Link>
            </div>
        </div>
    )
}

export default Search