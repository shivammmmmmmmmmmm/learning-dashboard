export default function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-[#16181d] border border-[#252830] p-4 animate-pulse ${className}`}>
      <div className="w-9 h-9 bg-[#252830] rounded-lg mb-3" />
      <div className="h-3 bg-[#252830] rounded w-3/4 mb-2" />
      <div className="h-2.5 bg-[#252830] rounded w-1/2 mb-4" />
      <div className="h-1 bg-[#252830] rounded-full" />
    </div>
  )
}
