"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSnippet } from "@/app/actions";
import { Snippet } from "@/types";

export default function NewFormPage() {
    const [formValues, setFormValues] = useState<{
        title: string;
        language: Snippet["language"];
        tags: string[];
        code: string;
    }>({
        title: "",
        language: "html",
        tags: [],
        code: "",
    });

    const router = useRouter();

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "tags") {
            setFormValues({ ...formValues, [name]: [...formValues.tags, value] });
        }
        else {
            setFormValues({ ...formValues, [name]: value });
        }

    }

    async function handleFormSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        const createResponse = await createSnippet(formValues);
        console.log(createResponse);

        router.push("/");
    }

    return (
        <form className="bg-gray-400 flex flex-col p-8 rounded-lg" onSubmit={handleFormSubmit}>
            <label htmlFor="title" className="text-gray-500">Title</label>
            <input className="p-4 m-2 border border-gray-300 rounded-lg" type="text" id="title" name="title" onChange={handleFormChange} />

            <label htmlFor="language" className="text-gray-500">Language</label>
            <select className="p-4 m-2 border border-gray-300 rounded-lg" id="language" name="language" value={formValues.language} onChange={handleFormChange}>
                <option>js</option>
                <option>ts</option>
                <option>css</option>
                <option>html</option>
                <option>other</option>
            </select>

            <label htmlFor="tags" className="text-gray-500">Tags</label>
            <input className="p-4 m-2 border border-gray-300 rounded-lg" type="text" id="tags" name="tags" onChange={handleFormChange} />

            <label htmlFor="code" className="text-gray-500">Code</label>
            <input className="p-4 m-2 border border-gray-300 rounded-lg" type="text" id="code" name="code" onChange={handleFormChange} />

            <button className="cursor-pointer p-4 m-2 mt-12 text-gray-500 border border-gray-300 rounded-lg">Submit</button>
        </form>
    );
}