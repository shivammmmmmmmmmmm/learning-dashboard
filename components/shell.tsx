"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Sidebar from "./sidebar"
import Dashboard from "./dashboard"
import { Course } from "@/types/course"
import { BookOpen, BarChart2, User, Settings } from "lucide-react"

interface Props {
  courses: Course[]
  hasError: boolean
}

// simple placeholder for nav pages that aren't built out yet
function Placeholder({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center"
    >
      <div className="w-12 h-12 rounded-xl bg-[#16181d] border border-[#252830] flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-gray-500" />
      </div>
      <p className="text-white font-medium mb-1">{title}</p>
      <p className="text-gray-600 text-sm">Coming soon</p>
    </motion.div>
  )
}


const views: Record<string, React.ReactNode> = {
  courses: <Placeholder title="Courses" icon={BookOpen} />,
  analytics: (
    <Placeholder title="Analytics" icon={BarChart2} />
  ),
  profile: (
    <Placeholder title="Profile" icon={User} />
  ),
  settings: (
    <Placeholder title="Settings" icon={Settings} />
  ),
}


export default function Shell({ courses, hasError }: Props) {
  const [active, setActive] = useState("dashboard")

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d0d0f]">
      <Sidebar active={active} onNavigate={setActive} />
      <main className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8">
        <AnimatePresence mode="wait">
          {active === "dashboard" ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Dashboard courses={courses} hasError={hasError} />
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {views[active]}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
