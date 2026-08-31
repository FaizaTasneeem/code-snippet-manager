export default function NewSnippetLoading() {
    return (
        <div className="w-[90%] mb-10 bg-[#111827] rounded-xl border border-gray-600 animate-pulse">
            <div className="w-full flex flex-col px-8 mt-10 font-medium">
                <div className="h-8 w-56 bg-gray-700/70 rounded-md" />
                <div className="h-4 w-96 max-w-full bg-gray-800/60 rounded-md mt-2" />
            </div>

            <div className="w-full flex flex-col p-8 space-y-4">
                <div className="w-full flex gap-4">
                    <div className="flex flex-col w-[70%] mt-2 space-y-2">
                        <div className="h-4 w-16 bg-gray-700/60 rounded" />
                        <div className="h-10 w-full bg-[#0C0F19] border border-gray-700/60 rounded-lg" />
                    </div>
                    <div className="flex flex-col w-[30%] mt-2 space-y-2">
                        <div className="h-4 w-20 bg-gray-700/60 rounded" />
                        <div className="h-10 w-full bg-[#0C0F19] border border-gray-700/60 rounded-lg" />
                    </div>
                </div>

                <div className="flex flex-col mt-4 space-y-2">
                    <div className="h-4 w-48 bg-gray-700/60 rounded" />
                    <div className="h-10 w-full bg-[#0C0F19] border border-gray-700/60 rounded-lg" />
                </div>

                <div className="flex flex-col mt-4 space-y-2">
                    <div className="h-4 w-32 bg-gray-700/60 rounded" />
                    <div className="h-40 w-full bg-[#0C0F19] border border-gray-700/60 rounded-lg" />
                </div>

                <div className="h-10 w-32 bg-cyan-600/40 rounded-lg mt-8" />
            </div>
        </div>
    );
}