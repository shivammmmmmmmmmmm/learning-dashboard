"use client"

import { motion } from "framer-motion"

// fake contribution data, 7 cols x 7 rows
const grid = [
  [2, 0, 3, 1, 4, 0, 1],
  [0, 3, 1, 2, 0, 3, 2],
  [3, 1, 4, 0, 2, 1, 3],
  [1, 2, 0, 3, 1, 4, 0],
  [4, 0, 2, 1, 3, 0, 2],
  [0, 3, 1, 4, 0, 2, 1],
  [2, 1, 3, 0, 1, 3, 4],
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const weekMinutes = [45, 90, 30, 120, 60, 75, 20]
const maxMin = Math.max(...weekMinutes)

function cellColor(level: number) {
  if (level === 0) return "bg-[#252830]"
  if (level === 1) return "bg-indigo-900/50"
  if (level === 2) return "bg-indigo-700/60"
  if (level === 3) return "bg-indigo-500/70"
  return "bg-indigo-400"
}

export default function Activity() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.5 }}
      className="rounded-xl bg-[#16181d] border border-[#252830] p-4"
    >
      <p className="text-white text-sm font-medium mb-0.5">Activity</p>
      <p className="text-gray-600 text-xs mb-4">last 7 weeks</p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* contribution grid */}
        <div>
          <div className="flex gap-1">
            {grid.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-1">
                {col.map((level, ri) => (
                  <motion.div
                    key={ri}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (ci * 7 + ri) * 0.006 }}
                    className={`w-3 h-3 rounded-sm ${cellColor(level)}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[10px] text-gray-600">less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <div key={l} className={`w-2.5 h-2.5 rounded-sm ${cellColor(l)}`} />
            ))}
            <span className="text-[10px] text-gray-600">more</span>
          </div>
        </div>

        {/* bar chart */}
        <div className="flex-1">
          <p className="text-xs text-gray-600 mb-3">this week (min)</p>
          <div className="flex items-end gap-1.5" style={{ height: 72 }}>
            {weekMinutes.map((min, i) => {
              const h = (min / maxMin) * 100
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end" style={{ height: 60 }}>
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.06 + 0.6, ease: "easeOut" }}
                      className="w-full rounded-t-sm bg-indigo-500/70 min-h-[3px] origin-bottom"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-600">{weekDays[i].slice(0, 1)}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* quick stats */}
      <div className="flex gap-5 mt-4 pt-4 border-t border-[#252830]">
        <div>
          <p className="text-sm font-semibold text-white">440</p>
          <p className="text-[11px] text-gray-500">min this week</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-400">+12%</p>
          <p className="text-[11px] text-gray-500">vs last week</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">6/7</p>
          <p className="text-[11px] text-gray-500">active days</p>
        </div>
      </div>
    </motion.section>
  )
}
