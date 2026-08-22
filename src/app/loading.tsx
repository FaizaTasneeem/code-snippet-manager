export default function Loading() {
    const skeletons = Array.from({ length: 6 });

    return (
        <div className="w-full flex flex-col items-center justify-center font-sans animate-pulse">
            {/* Header / Title Section Skeleton */}
            <div className="w-full flex flex-col px-20 mt-10 font-medium">
                <div className="h-8 w-48 bg-gray-800 rounded-md" />
                <div className="h-4 w-72 bg-gray-800/60 rounded-md mt-2" />
            </div>

            {/* Search Bar & Language Filters Skeleton */}
            <div className="w-full mt-4 p-4 px-20 flex flex-col items-start">
                {/* Search Input Placeholder */}
                <div className="h-11 w-full md:w-[50%] bg-[#111827] border border-gray-600/60 rounded-lg" />

                {/* Language Tag Filter Buttons Placeholder */}
                <div className="mt-4 flex flex-col md:flex-row justify-center gap-2">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="h-8 w-18 bg-[#111827] border border-gray-600/60 rounded-full"
                        />
                    ))}
                </div>
            </div>

            {/* Snippets Grid Skeleton */}
            <div className="w-full p-8 px-20 grid grid-cols-1 md:grid-cols-3 gap-4">
                {skeletons.map((_, index) => (
                    <div
                        key={index}
                        className="p-4 bg-[#111827] flex flex-col border border-gray-600 rounded-lg overflow-hidden"
                    >
                        {/* Title & Language Badge */}
                        <div className="flex flex-row justify-between items-center">
                            <div className="h-5 w-36 bg-gray-700/60 rounded" />
                            <div className="h-5 w-12 bg-blue-950/60 border border-blue-600/40 rounded-lg" />
                        </div>

                        {/* Tags */}
                        <div className="mt-4 flex flex-row gap-2">
                            <div className="h-4 w-12 bg-gray-700/40 rounded" />
                            <div className="h-4 w-16 bg-gray-700/40 rounded" />
                        </div>

                        {/* Code Snippet Box */}
                        <div className="mt-2 w-full h-20 p-3 bg-[#0d1420] border border-gray-500/60 rounded-lg space-y-2">
                            <div className="h-3 w-4/5 bg-gray-700/40 rounded" />
                            <div className="h-3 w-3/5 bg-gray-700/40 rounded" />
                            <div className="h-3 w-2/5 bg-gray-700/40 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}