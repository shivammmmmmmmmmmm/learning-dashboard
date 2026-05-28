"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react"

const links = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
]

interface Props {
  active: string
  onNavigate: (id: string) => void
}

export default function Sidebar({ active, onNavigate }: Props) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 1024) setOpen(false)
      else setOpen(true)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <>
      <motion.aside
        animate={{ width: open ? 220 : 64 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="hidden md:flex h-full flex-col flex-shrink-0 overflow-hidden bg-[#16181d] border-r border-[#252830]"
      >
        <div className="flex items-center gap-2.5 px-4 h-14 border-b border-[#252830]">
          <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {open && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="text-sm font-semibold text-white whitespace-nowrap"
              >
                learnspace
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 p-2.5 flex flex-col gap-0.5">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = active === link.id

            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="relative flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm w-full text-left"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-highlight"
                    className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon
                  className={`w-4 h-4 flex-shrink-0 relative z-10 ${
                    isActive ? "text-indigo-400" : "text-gray-500"
                  }`}
                />
                <AnimatePresence>
                  {open && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      className={`relative z-10 whitespace-nowrap ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </nav>

        <div className="hidden lg:block p-2.5 border-t border-[#252830]">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-center py-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-[#252830] transition-colors"
          >
            {open ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </motion.aside>

      {/* mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#16181d] border-t border-[#252830] flex justify-around py-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = active === link.id
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="flex flex-col items-center gap-1 px-2 py-1"
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-indigo-400" : "text-gray-500"}`} />
              <span className={`text-[10px] ${isActive ? "text-indigo-400" : "text-gray-500"}`}>
                {link.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
