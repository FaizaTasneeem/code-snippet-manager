"use client";

import { useActionState } from "react";
import { createSnippet } from "@/app/actions";
import { LanguageSelect } from "@/db/schema";


function NewSnippetForm({ languageList }: { languageList: LanguageSelect[] | undefined }) {
    const [state, formAction, isPending] = useActionState(createSnippet, null);

    const getFieldError = (field: string) => state?.error?.find(i => i.errorField === field)?.errorMsg;

    return (
        <div>
            <form className="w-full flex flex-col p-8 " action={formAction}>
                <div className="w-full flex gap-4">
                    <label htmlFor="title" className="flex flex-col w-[70%] mt-2 text-gray-300 text-sm font-bold">
                        Title *
                        <input className={`bg-[#0C0F19] p-4 py-2 m-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 ${getFieldError("title") ? 'border-red-400' : 'border-gray-600'}`} type="text" id="title" name="title" defaultValue={state?.title} required />
                        {getFieldError("title") &&
                            <p className="text-red-400">{getFieldError("title")}</p>
                        }
                    </label>

                    <label htmlFor="language" className="flex flex-col w-[30%] mt-2 text-gray-300 text-sm font-bold">
                        Language
                        <select className="bg-[#0C0F19] p-4 py-2 m-2 border border-gray-600 rounded-lg text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500" id="language" name="language" defaultValue={state?.language} required>
                            {languageList?.map(lang => (
                                <option key={lang.id} value={lang.name.toLowerCase()}>{lang.name}</option>
                            ))}
                        </select>
                    </label>

                </div>

                <label htmlFor="tags" className="flex flex-col mt-4 text-gray-300 text-sm font-bold">
                    Tags *<span className="text-gray-600">Comma separated (e.g. react, hooks, utility)</span>
                    <input className={`bg-[#0C0F19] p-4 py-2 m-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 ${getFieldError("tags") ? 'border-red-400' : 'border-gray-600'}`} type="text" id="tags" name="tags" defaultValue={state?.tags} required />
                    {getFieldError("tags") &&
                        <p className="text-red-400">{getFieldError("tags")}</p>
                    }

                </label>

                <label htmlFor="code" className="flex flex-col mt-4 text-gray-300 text-sm font-bold">
                    Code Snippet *
                    <textarea className={`bg-[#0C0F19] p-4 m-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 ${getFieldError("code") ? 'border-red-400' : 'border-gray-600'}`} id="code" name="code" defaultValue={state?.code} required />
                    {getFieldError("code") &&
                        <p className="text-red-400">{getFieldError("code")}</p>
                    }
                </label>

                <button className="w-30 bg-cyan-500 cursor-pointer p-2 m-2 mt-8 text-black text-sm font-bold rounded-lg shadow-lg">Save Snippet</button>
            </form>

            {isPending &&
                <p className="text-gray-400 italic">...Creating Snippet</p>
            }
        </div>
    )
}

export default NewSnippetForm