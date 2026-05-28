"use client"

import { motion } from "framer-motion"
import { GraduationCap, MapPin, Calendar, Github, Twitter } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="max-w-2xl pb-20 lg:pb-0">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Profile</h2>
        <p className="text-gray-500 text-sm mt-1">your public info</p>
      </div>

      {/* avatar + name */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#16181d] border border-[#252830] rounded-xl p-5 mb-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            S
          </div>
          <div>
            <h3 className="text-white font-semibold text-base">Shivam</h3>
            <p className="text-gray-500 text-sm">shivam@example.com</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-600">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> India</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> joined Jan 2024</span>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-4 leading-relaxed">
          Frontend dev in the making. Learning React, TypeScript, and trying to get better at CSS every day.
        </p>

        <div className="flex gap-3 mt-4">
          <a href="#" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
            <Github className="w-3.5 h-3.5" /> github
          </a>
          <a href="#" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
            <Twitter className="w-3.5 h-3.5" /> twitter
          </a>
        </div>
      </motion.section>

      {/* learning stats */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-[#16181d] border border-[#252830] rounded-xl p-5 mb-4"
      >
        <p className="text-sm font-medium text-white mb-4">Learning stats</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { value: "48h", label: "total time" },
            { value: "12", label: "day streak" },
            { value: "5", label: "completed" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="bg-[#0d0d0f] rounded-lg p-3"
            >
              <p className="text-lg font-bold text-white">{s.value}</p>
              <p className="text-[11px] text-gray-600 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* badges */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-[#16181d] border border-[#252830] rounded-xl p-5"
      >
        <p className="text-sm font-medium text-white mb-4">Badges</p>
        <div className="flex gap-3 flex-wrap">
          {[
            { emoji: "🔥", label: "10 day streak" },
            { emoji: "⚡", label: "fast learner" },
            { emoji: "🎯", label: "first course done" },
          ].map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="flex items-center gap-2 bg-[#0d0d0f] border border-[#252830] rounded-lg px-3 py-2"
            >
              <span className="text-base">{badge.emoji}</span>
              <span className="text-xs text-gray-400">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
