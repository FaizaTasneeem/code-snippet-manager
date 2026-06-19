"use client";

import { useRouter } from 'next/navigation';

export default function Logo() {
    const router = useRouter();

    function handleLogoClick() {
        router.push("/");
    }

    return (
        <div>
            <span className="p-4 font-medium text-2xl cursor-pointer" onClick={handleLogoClick}>Snippet Vault</span>
        </div>
    )
}
