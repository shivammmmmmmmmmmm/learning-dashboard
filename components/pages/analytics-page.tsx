"use client"

import { motion } from "framer-motion"
import { TrendingUp, Clock, BookOpen, Zap } from "lucide-react"

// fake weekly data for the past 4 weeks
const weeks = [
  { label: "3 weeks ago", hours: 4.5, sessions: 6 },
  { label: "2 weeks ago", hours: 6, sessions: 8 },
  { label: "last week", hours: 5, sessions: 7 },
  { label: "this week", hours: 7.5, sessions: 9 },
]

const maxHours = Math.max(...weeks.map(w => w.hours))

// subject breakdown
const subjects = [
  { name: "React", percent: 38, color: "bg-indigo-500" },
  { name: "TypeScript", percent: 27, color: "bg-violet-500" },
  { name: "Databases", percent: 20, color: "bg-sky-500" },
  { name: "UI / CSS", percent: 15, color: "bg-amber-500" },
]

export default function AnalyticsPage() {
  return (
    <div className="max-w-3xl pb-20 lg:pb-0">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Analytics</h2>
        <p className="text-gray-500 text-sm mt-1">your learning stats at a glance</p>
      </div>

      {/* top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "hours this week", value: "7.5h", icon: Clock, color: "text-indigo-400" },
          { label: "sessions", value: "9", icon: Zap, color: "text-amber-400" },
          { label: "courses active", value: "3", icon: BookOpen, color: "text-sky-400" },
          { label: "streak", value: "12d", icon: TrendingUp, color: "text-emerald-400" },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="bg-[#16181d] border border-[#252830] rounded-xl p-3"
            >
              <Icon className={`w-4 h-4 ${stat.color} mb-2`} />
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-[11px] text-gray-600 mt-0.5">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* weekly hours bar chart */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-[#16181d] border border-[#252830] rounded-xl p-4 mb-4"
      >
        <p className="text-sm font-medium text-white mb-0.5">Hours per week</p>
        <p className="text-xs text-gray-600 mb-4">last 4 weeks</p>

        <div className="flex items-end gap-3" style={{ height: 80 }}>
          {weeks.map((week, i) => {
            const h = (week.hours / maxHours) * 100
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex items-end" style={{ height: 64 }}>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.08 + 0.4, ease: "easeOut" }}
                    className="w-full rounded-t bg-indigo-500/70 origin-bottom"
                    style={{ height: `${h}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-600 text-center leading-tight">{week.hours}h</span>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3 mt-3 pt-3 border-t border-[#252830]">
          {weeks.map((week, i) => (
            <p key={i} className="flex-1 text-[10px] text-gray-600 text-center">{week.label}</p>
          ))}
        </div>
      </motion.section>

      {/* subject breakdown */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-[#16181d] border border-[#252830] rounded-xl p-4"
      >
        <p className="text-sm font-medium text-white mb-0.5">Time by subject</p>
        <p className="text-xs text-gray-600 mb-4">based on your activity</p>

        <div className="flex flex-col gap-3">
          {subjects.map((s, i) => (
            <div key={s.name}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-400">{s.name}</span>
                <span className="text-gray-500">{s.percent}%</span>
              </div>
              <div className="h-1.5 bg-[#252830] rounded-full overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: s.percent / 100 }}
                  transition={{ duration: 0.7, delay: i * 0.08 + 0.5, ease: "easeOut" }}
                  className={`h-full rounded-full ${s.color} origin-left`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
