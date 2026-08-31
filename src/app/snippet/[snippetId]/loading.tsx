export default function SingleSnippetLoading() {
    return (
        <div className="bg-[#111827] w-[90%] mb-8 mt-10 p-6 px-10 flex flex-col justify-center items-center border border-gray-600 rounded-xl animate-pulse">
            <div className="w-full flex flex-col justify-start items-start">
                <div className="w-full mt-4 flex flex-row justify-between items-start">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-56 bg-gray-700/70 rounded-md" />
                            <div className="h-6 w-14 bg-blue-900/60 border border-blue-600/40 rounded-lg" />
                        </div>
                        <div className="h-4 w-40 bg-gray-800/60 rounded-md mt-2" />
                    </div>

                    <div className="flex gap-2">
                        <div className="h-9 w-20 bg-gray-700/60 rounded-xl" />
                        <div className="h-9 w-20 bg-gray-700/60 rounded-xl" />
                    </div>
                </div>

                <div className="mt-6 flex flex-row gap-2">
                    <div className="h-7 w-20 bg-cyan-900/40 border border-cyan-700/40 rounded-full" />
                    <div className="h-7 w-24 bg-cyan-900/40 border border-cyan-700/40 rounded-full" />
                </div>

                <div className="w-full p-4 mt-4 border border-gray-700 rounded-xl bg-[#0C0F19]">
                    <div className="flex justify-end">
                        <div className="h-8 w-28 bg-gray-800/80 rounded-lg" />
                    </div>
                    <div className="mt-4 space-y-3 p-4 bg-gray-900/80 rounded-xl h-64 flex flex-col justify-center">
                        <div className="h-4 w-3/4 bg-gray-700/50 rounded" />
                        <div className="h-4 w-1/2 bg-gray-700/50 rounded" />
                        <div className="h-4 w-5/6 bg-gray-700/50 rounded" />
                        <div className="h-4 w-2/3 bg-gray-700/50 rounded" />
                        <div className="h-4 w-1/3 bg-gray-700/50 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}