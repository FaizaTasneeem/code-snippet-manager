"use client";

import { useRouter } from 'next/navigation';

export default function Logo() {
    const router = useRouter();

    function handleLogoClick() {
        router.push("/");
    }

    return (
        <div className='flex items-center cursor-pointer'>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="30" height="30" rx="6" fill="#102839" stroke="#06B6D4" strokeWidth="2" />

                <path d="M9 10.5L14.5 16L9 21.5" stroke="#06B6D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M17.5 21.5H23.5" stroke="#06B6D4" strokeWidth="2.2" strokeLinecap="round" />

            </svg>

            <span className="p-4 font-bold text-xl" onClick={handleLogoClick}>
                Snippet
                <span className="text-cyan-500"> Vault</span>
            </span>
        </div>
    )
}
