"use client"

import { motion } from "framer-motion"
import { Flame, Clock, CheckCircle2 } from "lucide-react"

export default function Welcome() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-[#16181d] border border-[#252830] p-6"
    >
      {/* soft bg blobs */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <p className="text-gray-500 text-sm mb-1">hey, good to see you 👋</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back,{" "}
            <span className="text-indigo-400">Shivam</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1.5">you've got 3 courses in progress</p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <StatBadge icon={<Flame className="w-4 h-4 text-orange-400" />} value="12" label="day streak" bg="bg-orange-500/10" />
          <StatBadge icon={<Clock className="w-4 h-4 text-sky-400" />} value="48h" label="learned" bg="bg-sky-500/10" />
          <StatBadge icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />} value="5" label="done" bg="bg-emerald-500/10" className="hidden sm:flex" />
        </div>
      </div>
    </motion.section>
  )
}

function StatBadge({
  icon,
  value,
  label,
  bg,
  className = "",
}: {
  icon: React.ReactNode
  value: string
  label: string
  bg: string
  className?: string
}) {
  return (
    <div className={`flex items-center gap-2.5 ${bg} border border-white/5 rounded-xl px-3.5 py-2.5 ${className}`}>
      {icon}
      <div>
        <p className="text-base font-bold text-white leading-none">{value}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  )
}
