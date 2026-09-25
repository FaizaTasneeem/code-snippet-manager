"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { LanguageSelect } from "@/db/schema";
import AddLangModal from "../ui/AddLangModal";

function Search({ languageList }: { languageList: LanguageSelect[] | undefined }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [showAddLangModal, setShowAddLangModal] = useState(false);

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
            const currentQ = searchParams.get("q") || "";
            if (currentQ !== searchQuery) router.push(`/?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timer);

    }, [searchQuery])

    return (
        <div className="w-full mt-4 p-4 px-20 flex flex-col items-start">
            <input className="w-full py-2.5 px-4 w-[50%] border border-gray-600 rounded-lg bg-[#111827] " type="text" value={searchQuery} onChange={handleSearchQueryChange} placeholder="🔍 Search snippets by title or tag..." />

            <div className="mt-4 flex flex-wrap justify-start md:justify-center gap-2 font-bold text-xs">
                <Link href={generateLangLink("all")} className={`p-1 py-2 rounded-full border-2 w-18 truncate text-center cursor-pointer ${currentLang === "all" ? "bg-cyan-500 text-black" : "border-gray-600"}`}>ALL</Link>
                {
                    languageList?.map(lang => (
                        <Link key={lang.id} href={generateLangLink(lang.name.toLocaleLowerCase())} className={`p-1 py-2 rounded-full border-2 w-18 truncate text-center cursor-pointer ${currentLang === lang.name.toLocaleLowerCase() ? "bg-cyan-500 text-black" : "border-gray-600"}`}>{lang.name.toLocaleUpperCase()}</Link>
                    ))
                }

                <button className={`p-2 rounded-full border-2 w-18 truncate text-center cursor-pointer border-gray-600`} onClick={() => setShowAddLangModal(true)}>+ Add More</button>
            </div>
            {showAddLangModal && <AddLangModal setShowAddLangModal={setShowAddLangModal} />}
        </div>
    )
}

export default Search