"use client";

import { useActionState } from "react";
import { createSnippet } from "@/app/actions";

export default function NewFormPage() {
    const [state, formAction, isPending] = useActionState(createSnippet, null);

    const getFieldError = (field: string) => state?.error?.find(i => i.errorField === field)?.errorMsg;

    return (
        <div className="w-[90%] mb-10 bg-[#111827] rounded-xl border border-gray-600">
            <div className="w-full flex flex-col px-8 mt-10 font-medium ">
                <h1 className="text-2xl">Create New Snippet</h1>
                <h4 className="text-sm text-gray-500 mt-2">Fill in the metadata and code details below. Validate input formats before saving.</h4>
            </div>

            <form className="w-full flex flex-col p-8 " action={formAction}>
                <div className="w-full flex gap-4">
                    <label htmlFor="title" className="flex flex-col w-[70%] mt-2 text-gray-300 text-sm font-bold">
                        Title
                        <input className="bg-[#0a0a0a] p-4 py-2 m-2 border border-gray-600 rounded-lg text-gray-600" type="text" id="title" name="title" required />
                        {getFieldError("title") &&
                            <p className="text-red-500">{getFieldError("title")}</p>
                        }
                    </label>

                    <label htmlFor="language" className="flex flex-col w-[30%] mt-2 text-gray-300 text-sm font-bold">
                        Language
                        <select className="bg-[#0a0a0a] p-4 py-2 m-2 border border-gray-600 rounded-lg text-gray-600" id="language" name="language" required>
                            <option>js</option>
                            <option>ts</option>
                            <option>css</option>
                            <option>html</option>
                            <option>other</option>
                        </select>
                    </label>

                </div>

                <label htmlFor="tags" className="mt-4 text-gray-300 text-sm font-bold">Tags <span className="text-gray-400">(separated by commas)</span></label>
                <input className="bg-[#0a0a0a] p-4 py-2 m-2 border border-gray-600 rounded-lg text-gray-600" type="text" id="tags" name="tags" required />
                {getFieldError("tags") &&
                    <p className="text-red-500">{getFieldError("tags")}</p>
                }

                <label htmlFor="code" className="mt-4 text-gray-300 text-sm font-bold">Code Snippet</label>
                <textarea className="bg-[#0a0a0a] p-4 m-2 border border-gray-600 rounded-lg text-gray-600" id="code" name="code" required />
                {getFieldError("code") &&
                    <p className="text-red-500">{getFieldError("code")}</p>
                }

                <button className="w-30 bg-cyan-500 cursor-pointer p-2 m-2 mt-8 text-black text-sm font-bold rounded-lg shadow-lg">Save Snippet</button>
            </form>

            {isPending &&
                <p className="text-gray-400 italic">...Creating Snippet</p>
            }

        </div>

    );
}