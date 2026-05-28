"use client"

import { motion } from "framer-motion"
import { useState } from "react"

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-9 h-5 rounded-full transition-colors ${on ? "bg-indigo-600" : "bg-[#252830]"}`}
    >
      <motion.div
        animate={{ x: on ? 16 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-0.5 w-4 h-4 bg-white rounded-full"
      />
    </button>
  )
}

export default function SettingsPage() {
  const [notifs, setNotifs] = useState(true)
  const [emails, setEmails] = useState(false)
  const [streakReminder, setStreakReminder] = useState(true)
  const [publicProfile, setPublicProfile] = useState(false)

  return (
    <div className="max-w-xl pb-20 lg:pb-0">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Settings</h2>
        <p className="text-gray-500 text-sm mt-1">manage your preferences</p>
      </div>

      {/* notifications */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#16181d] border border-[#252830] rounded-xl p-4 mb-4"
      >
        <p className="text-sm font-medium text-white mb-4">Notifications</p>
        <div className="flex flex-col gap-4">
          {[
            { label: "Push notifications", sub: "get notified about course updates", val: notifs, set: () => setNotifs(!notifs) },
            { label: "Email digest", sub: "weekly summary of your progress", val: emails, set: () => setEmails(!emails) },
            { label: "Streak reminder", sub: "daily reminder to keep your streak", val: streakReminder, set: () => setStreakReminder(!streakReminder) },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white">{item.label}</p>
                <p className="text-xs text-gray-600 mt-0.5">{item.sub}</p>
              </div>
              <Toggle on={item.val} onChange={item.set} />
            </div>
          ))}
        </div>
      </motion.section>

      {/* privacy */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-[#16181d] border border-[#252830] rounded-xl p-4 mb-4"
      >
        <p className="text-sm font-medium text-white mb-4">Privacy</p>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white">Public profile</p>
            <p className="text-xs text-gray-600 mt-0.5">let others see your progress</p>
          </div>
          <Toggle on={publicProfile} onChange={() => setPublicProfile(!publicProfile)} />
        </div>
      </motion.section>

      {/* account */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-[#16181d] border border-[#252830] rounded-xl p-4"
      >
        <p className="text-sm font-medium text-white mb-4">Account</p>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Display name</label>
            <input
              type="text"
              defaultValue="Shivam"
              className="bg-[#0d0d0f] border border-[#252830] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Email</label>
            <input
              type="email"
              defaultValue="shivam@example.com"
              className="bg-[#0d0d0f] border border-[#252830] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
          <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition-colors w-fit">
            save changes
          </button>
        </div>
      </motion.section>
    </div>
  )
}
