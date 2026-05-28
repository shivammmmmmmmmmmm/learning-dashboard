"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Sidebar from "./sidebar"
import Dashboard from "./dashboard"
import CoursesPage from "./pages/courses-page"
import AnalyticsPage from "./pages/analytics-page"
import ProfilePage from "./pages/profile-page"
import SettingsPage from "./pages/settings-page"
import { Course } from "@/types/course"

interface Props {
  courses: Course[]
  hasError: boolean
}

function ActivePage({ active, courses, hasError }: { active: string; courses: Course[]; hasError: boolean }) {
  if (active === "dashboard") return <Dashboard courses={courses} hasError={hasError} />
  if (active === "courses") return <CoursesPage />
  if (active === "analytics") return <AnalyticsPage />
  if (active === "profile") return <ProfilePage />
  if (active === "settings") return <SettingsPage />
  return null
}

export default function Shell({ courses, hasError }: Props) {
  const [active, setActive] = useState("dashboard")

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d0d0f]">
      <Sidebar active={active} onNavigate={setActive} />
      <main className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ActivePage active={active} courses={courses} hasError={hasError} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
