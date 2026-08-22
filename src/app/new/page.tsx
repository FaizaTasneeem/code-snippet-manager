"use client";

import { useActionState } from "react";
import { createSnippet } from "@/app/actions";

export default function NewFormPage() {
    const [state, formAction, isPending] = useActionState(createSnippet, null);

    const getFieldError = (field: string) => state?.error?.find(i => i.errorField === field)?.errorMsg;

    return (
        <div className="w-full">
            <form className="w-full mb-10 bg-gray-400 flex flex-col p-8 rounded-lg" action={formAction}>
                <label htmlFor="title" className="mt-4 text-gray-600">Title</label>
                <input className="p-4 m-2 border border-gray-300 rounded-lg text-gray-600" type="text" id="title" name="title" required />
                {getFieldError("title") &&
                    <p className="text-red-500">{getFieldError("title")}</p>
                }

                <label htmlFor="language" className="mt-4 text-gray-600">Language</label>
                <select className="p-4 m-2 border border-gray-300 rounded-lg text-gray-600" id="language" name="language" required>
                    <option>js</option>
                    <option>ts</option>
                    <option>css</option>
                    <option>html</option>
                    <option>other</option>
                </select>

                <label htmlFor="tags" className="mt-4 text-gray-600">Tags <span className="text-gray-400">(separated by commas)</span></label>
                <input className="p-4 m-2 border border-gray-300 rounded-lg text-gray-600" type="text" id="tags" name="tags" required />
                {getFieldError("tags") &&
                    <p className="text-red-500">{getFieldError("tags")}</p>
                }

                <label htmlFor="code" className="mt-4 text-gray-600">Code</label>
                <textarea className="p-4 m-2 border border-gray-300 rounded-lg text-gray-600" id="code" name="code" required />
                {getFieldError("code") &&
                    <p className="text-red-500">{getFieldError("code")}</p>
                }

                <button className="bg-gray-300 cursor-pointer p-4 m-2 mt-8 text-gray-600 border border-gray-300 rounded-lg shadow-lg">Submit</button>
            </form>

            {isPending &&
                <p className="text-gray-400 italic">...Creating Snippet</p>
            }

        </div>

    );
}