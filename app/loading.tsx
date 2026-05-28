import SkeletonCard from "@/components/skeleton-card"

export default function Loading() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0d0d0f]">
      <div className="hidden lg:flex w-[220px] h-full bg-[#16181d] border-r border-[#252830] flex-col p-3 gap-1.5 flex-shrink-0">
        <div className="h-7 w-28 bg-[#252830] rounded animate-pulse mb-4" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 bg-[#252830] rounded-lg animate-pulse" />
        ))}
      </div>

      <main className="flex-1 p-5 md:p-6 lg:p-8">
        <div className="max-w-5xl">
          <div className="h-32 bg-[#16181d] border border-[#252830] rounded-2xl animate-pulse mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
          <div className="h-48 bg-[#16181d] border border-[#252830] rounded-xl animate-pulse" />
        </div>
      </main>
    </div>
  )
}
