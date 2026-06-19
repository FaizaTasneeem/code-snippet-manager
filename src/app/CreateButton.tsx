"use client";

import { useRouter } from 'next/navigation';

export default function CreateButton() {
    const router = useRouter();

    function handleButtonClick() {
        router.push("/new");
    }

    return (
        <div>
            <button className="p-4 border rounded-lg cursor-pointer" onClick={handleButtonClick}>+ New Snippet</button>
        </div>
    )
}
