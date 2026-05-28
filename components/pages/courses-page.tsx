"use client"

import { motion } from "framer-motion"
import { Code2, FileCode, Database, Sparkles, BookOpen, Clock, CheckCircle2, LucideIcon } from "lucide-react"
import { courses } from "@/lib/data"

const icons: Record<string, LucideIcon> = {
  Code2, FileCode, Database, Sparkles, BookOpen,
}

const statusLabel = (progress: number) => {
  if (progress === 100) return { text: "completed", color: "text-emerald-400 bg-emerald-500/10" }
  if (progress >= 50) return { text: "in progress", color: "text-indigo-400 bg-indigo-500/10" }
  return { text: "just started", color: "text-amber-400 bg-amber-500/10" }
}

export default function CoursesPage() {
  return (
    <div className="max-w-3xl pb-20 lg:pb-0">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">My Courses</h2>
        <p className="text-gray-500 text-sm mt-1">{courses.length} courses enrolled</p>
      </div>

      <div className="flex flex-col gap-3">
        {courses.map((course, i) => {
          const Icon = icons[course.icon_name] ?? BookOpen
          const status = statusLabel(course.progress)

          return (
            <motion.article
              key={course.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="flex items-center gap-4 bg-[#16181d] border border-[#252830] rounded-xl p-4 hover:border-white/8 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-indigo-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-white text-sm font-medium">{course.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${status.color}`}>
                    {status.text}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1 bg-[#252830] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: course.progress / 100 }}
                      transition={{ duration: 0.8, delay: i * 0.07 + 0.2, ease: "easeOut" }}
                      className="h-full bg-indigo-500 rounded-full origin-left"
                    />
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">{course.progress}%</span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-gray-600 text-xs flex-shrink-0">
                <Clock className="w-3 h-3" />
                <span>{Math.round((100 - course.progress) * 0.4)}h left</span>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* little summary at the bottom */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "enrolled", value: courses.length, icon: BookOpen },
          { label: "completed", value: courses.filter(c => c.progress === 100).length, icon: CheckCircle2 },
          { label: "in progress", value: courses.filter(c => c.progress > 0 && c.progress < 100).length, icon: Clock },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
              className="bg-[#16181d] border border-[#252830] rounded-xl p-3 text-center"
            >
              <Icon className="w-4 h-4 text-gray-500 mx-auto mb-1.5" />
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-[11px] text-gray-600">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
