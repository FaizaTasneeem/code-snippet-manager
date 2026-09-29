"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { deleteLanguage } from "@/app/actions";
import { LanguageSelect } from "@/db/schema";
import AddLangModal from "../ui/AddLangModal";

function Search({ languageList }: { languageList: LanguageSelect[] | undefined }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [showAddLangModal, setShowAddLangModal] = useState(false);
    const [langFilterId, setLangFilterId] = useState(-1);

    const currentLang = searchParams.get("lang") || "all";

    function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(event.target.value);
    }

    function generateLangLink(lang: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("lang", lang.toLocaleLowerCase());
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
                    languageList
                        ?.filter(lang => lang.name.toLowerCase() !== "other")
                        .map(lang => (
                            <Link
                                key={lang.id}
                                href={generateLangLink(lang.name)}
                                className={`p-1 py-2 flex gap-2 justify-center rounded-full border-2 w-20 truncate text-center cursor-pointer ${currentLang === lang.name.toLocaleLowerCase() ? "bg-cyan-500 text-black" : "border-gray-600"}`}
                                onMouseEnter={() => { if (!["html", "css", "js", "ts"].includes(lang.name)) setLangFilterId(lang.id) }}
                                onMouseLeave={() => setLangFilterId(-1)}
                            >
                                {lang.name.toLocaleUpperCase()}
                                {lang.id === langFilterId &&
                                    <div onClick={(e) => { e.stopPropagation(); deleteLanguage(lang.id) }}><X size={16} /></div>
                                }
                            </Link>
                        ))
                }
                {
                    languageList
                        ?.filter(lang => lang.name.toLowerCase() === "other")
                        .map(lang => (
                            <Link
                                key={lang.id}
                                href={generateLangLink(lang.name)}
                                className={`p-1 py-2 rounded-full border-2 w-18 truncate text-center cursor-pointer ${currentLang === lang.name.toLocaleLowerCase() ? "bg-cyan-500 text-black" : "border-gray-600"}`}
                            >
                                {lang.name.toLocaleUpperCase()}
                            </Link>
                        ))
                }
                <button className={`p-2 rounded-full border-2 w-18 truncate text-center cursor-pointer border-gray-600`} onClick={() => setShowAddLangModal(true)}>+ Add More</button>
            </div>
            {showAddLangModal && <AddLangModal setShowAddLangModal={setShowAddLangModal} />}
        </div>
    )
}

export default Search