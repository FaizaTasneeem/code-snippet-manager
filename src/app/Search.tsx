"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Search() {
    const searchParams = useSearchParams();
    const currentLang = searchParams.get("lang") || "all";

    return (
        <div className="w-full p-4 px-20 flex flex-row justify-between">
            <input className="p-4 w-[50%] border rounded-lg" type="text" placeholder="...Search" />
            <div className="flex flex-col md:flex-row justify-center gap-2">
                <Link href="/?lang=all" className={`p-2 border-b-2 w-18 truncate text-center cursor-pointer ${currentLang === "all" ? "border-blue-400" : "border-white"}`}>All</Link>
                <Link href="/?lang=html" className={`p-2 border-b-2 w-18 truncate text-center cursor-pointer ${currentLang === "html" ? "border-blue-400" : "border-white"}`}>HTML</Link>
                <Link href="/?lang=css" className={`p-2 border-b-2 w-18 truncate text-center cursor-pointer ${currentLang === "css" ? "border-blue-400" : "border-white"}`}>CSS</Link>
                <Link href="/?lang=js" className={`p-2 border-b-2 w-18 truncate text-center cursor-pointer ${currentLang === "js" ? "border-blue-400" : "border-white"}`}>JS</Link>
                <Link href="/?lang=ts" className={`p-2 border-b-2 w-18 truncate text-center cursor-pointer ${currentLang === "ts" ? "border-blue-400" : "border-white"}`}>TS</Link>
                <Link href="/?lang=other" className={`p-2 border-b-2 w-18 truncate text-center cursor-pointer ${currentLang === "other" ? "border-blue-400" : "border-white"}`}>OTHER</Link>
            </div>
        </div>
    )
}

export default Search