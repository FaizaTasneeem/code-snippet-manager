export default function Loading() {
    const skeletons = Array.from({ length: 6 });
    return (
        <div className="w-full flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="w-full p-4 px-20 flex flex-row justify-between">
                <div className="p-7 w-[50%] border rounded-lg animate-pulse"></div>

                <div className="flex flex-col md:flex-row justify-center gap-2">
                    <div className="p-2 border-b-2 w-18 animate-pulse"></div>
                    <div className="p-2 border-b-2 w-18 animate-pulse"></div>
                    <div className="p-2 border-b-2 w-18 animate-pulse"></div>
                    <div className="p-2 border-b-2 w-18 animate-pulse"></div>
                    <div className="p-2 border-b-2 w-18 animate-pulse"></div>
                    <div className="p-2 border-b-2 w-18 animate-pulse"></div>
                </div>
            </div>


            <div className="w-full p-8 px-20 grid grid-cols-1 md:grid-cols-3 gap-4">
                {skeletons.map((_, index) => (
                    <div
                        key={index}
                        className="p-4 flex flex-col border rounded-lg overflow-hidden animate-pulse bg-card"
                    >
                        <div className="flex flex-row justify-between items-center">
                            <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>

                        <div className="mt-6 flex flex-row gap-2">
                            <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}