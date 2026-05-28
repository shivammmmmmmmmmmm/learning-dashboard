"use client"

import { motion, animate } from "framer-motion"
import { useEffect, useState } from "react"
import { Code2, FileCode, Database, Sparkles, BookOpen, Layout, Globe, Server, LucideIcon } from "lucide-react"
import { Course } from "@/types/course"

const icons: Record<string, LucideIcon> = {
  Code2, FileCode, Database, Sparkles, BookOpen, Layout, Globe, Server,
}

const accents = [
  {
    icon: "text-indigo-400",
    bar: "bg-indigo-500",
    glow: "bg-indigo-500/10",
    gradient: "from-indigo-600/10 via-transparent to-transparent",
    border: "hover:border-indigo-500/30",
  },
  {
    icon: "text-violet-400",
    bar: "bg-violet-500",
    glow: "bg-violet-500/10",
    gradient: "from-violet-600/10 via-transparent to-transparent",
    border: "hover:border-violet-500/30",
  },
  {
    icon: "text-sky-400",
    bar: "bg-sky-500",
    glow: "bg-sky-500/10",
    gradient: "from-sky-600/10 via-transparent to-transparent",
    border: "hover:border-sky-500/30",
  },
  {
    icon: "text-amber-400",
    bar: "bg-amber-500",
    glow: "bg-amber-500/10",
    gradient: "from-amber-600/10 via-transparent to-transparent",
    border: "hover:border-amber-500/30",
  },
]

function Counter({ to }: { to: number }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    const ctrl = animate(0, to, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return ctrl.stop
  }, [to])

  return <>{val}</>
}

export default function CourseCard({ course, index }: { course: Course; index: number }) {
  const Icon = icons[course.icon_name] ?? BookOpen
  const accent = accents[index % accents.length]

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.09 + 0.15, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`relative overflow-hidden rounded-xl bg-[#16181d] border border-[#252830] ${accent.border} p-4 cursor-pointer transition-colors`}
    >
      {/* subtle gradient mesh behind content */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} pointer-events-none`} />

      {/* grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative">
        <div className={`w-9 h-9 rounded-lg ${accent.glow} flex items-center justify-center mb-3`}>
          <Icon className={`w-4 h-4 ${accent.icon}`} />
        </div>

        <h3 className="text-white text-sm font-medium leading-snug mb-0.5">{course.title}</h3>
        <p className="text-gray-600 text-xs mb-4">continue where you left off</p>

        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-gray-500">progress</span>
          <span className="text-gray-300 font-medium">
            <Counter to={course.progress} />%
          </span>
        </div>
        <div className="h-1 bg-[#252830] rounded-full overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: course.progress / 100 }}
            transition={{ duration: 1, delay: index * 0.09 + 0.4, ease: "easeOut" }}
            className={`h-full rounded-full ${accent.bar} origin-left`}
          />
        </div>
      </div>
    </motion.article>
  )
}
