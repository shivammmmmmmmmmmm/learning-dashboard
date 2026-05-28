import { createClient } from "@/lib/supabase"
import { courses as fallback } from "@/lib/data"
import { Course } from "@/types/course"
import Shell from "@/components/shell"

export default async function Page() {
  let courses: Course[] = []
  let hasError = false

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true })

    if (error) {
      console.error("supabase error:", error.message)
      hasError = true
    } else {
      courses = data ?? []
    }
  } catch (err) {
    console.warn("supabase not configured, using local data:", err)
    courses = fallback
  }

  if (!hasError && courses.length === 0) {
    courses = fallback
  }

  return <Shell courses={courses} hasError={hasError} />
}
