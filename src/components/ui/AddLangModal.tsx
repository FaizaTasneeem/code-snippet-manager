import { useActionState } from "react";
import { addLanguage } from "@/app/actions";
import { LanguageSelect } from "@/db/schema";

function AddLangModal({ setShowAddLangModal }: { setShowAddLangModal: (val: boolean) => void }) {
    const [state, formAction, isPending] = useActionState(addLanguage, null);

    const getFieldError = (field: string) => state?.error?.find(i => i.errorField === field)?.errorMsg;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-full max-w-md bg-[#111827] text-lg text-center border border-gray-600 rounded-lg flex flex-col px-4 py-2">

                <div className="p-2 flex flex-col items-start">
                    <h1 className="text-xl">Add programming language</h1>
                    <h4 className="text-sm text-gray-500 mt-2">Define a new language for snippet tagging and color coding.</h4>
                </div>

                {getFieldError("root") && (
                    <p className="mt-2 text-red-400 text-sm">{getFieldError("root")}</p>
                )}
                <form className="w-full flex flex-col p-4" action={formAction}>
                    <div className="w-full flex flex-col gap-4">
                        <label htmlFor="name" className="flex flex-col items-start w-full mt-2 text-gray-300 text-sm font-bold">
                            Programming Language *
                            <input className={`w-full bg-[#0C0F19] p-4 py-2 my-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 ${getFieldError("name") ? 'border-red-400' : 'border-gray-600'}`} type="text" id="name" name="name" defaultValue={state?.name} required />
                            {getFieldError("name") &&
                                <p className="text-red-400">{getFieldError("name")}</p>
                            }
                        </label>

                        <label htmlFor="color" className="flex flex-col items-start w-full mt-2 text-gray-300 text-sm font-bold">
                            Color *
                            <input className={`w-full bg-[#0C0F19] p-4 py-2 my-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 ${getFieldError("color") ? 'border-red-400' : 'border-gray-600'}`} type="text" id="color" name="color" defaultValue={state?.color} required />
                            {getFieldError("color") &&
                                <p className="text-red-400">{getFieldError("color")}</p>
                            }
                        </label>

                    </div>

                    <div className="w-full flex justify-between text-sm">
                        <button className="w-1/2 p-2 m-2 mt-8 border border-gray-600 rounded-lg cursor-pointer" onClick={() => setShowAddLangModal(false)} type="button">Cancel</button>
                        <button className="w-1/2 p-2 m-2 mt-8 bg-cyan-500 text-black text-sm font-semibold rounded-lg shadow-lg cursor-pointer" type="submit">Add Language</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddLangModal