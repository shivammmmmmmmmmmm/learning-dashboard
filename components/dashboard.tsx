import { Course } from "@/types/course"
import Welcome from "./welcome"
import CourseCard from "./course-card"
import Activity from "./activity"
import { AlertTriangle } from "lucide-react"

interface Props {
  courses: Course[]
  hasError?: boolean
}

export default function Dashboard({ courses, hasError }: Props) {
  return (
    <div className="pb-20 lg:pb-0 max-w-5xl">
      <div className="mb-5">
        <Welcome />
      </div>

      {hasError && (
        <div className="mb-5 flex items-center gap-3 rounded-xl bg-red-950/30 border border-red-900/40 px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300">
            couldn't reach the database — showing cached data
          </p>
        </div>
      )}

      <section className="mb-5">
        <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">my courses</p>
        {/* mobile: 1col, tablet: 2col, desktop: 4col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">activity</p>
        <Activity />
      </section>
    </div>
  )
}
