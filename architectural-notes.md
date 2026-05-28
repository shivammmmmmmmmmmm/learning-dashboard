# Architectural notes (server/client split)

- **Server-side data fetching**: `app/page.tsx` is a Server Component and calls Supabase directly via `@supabase/ssr`.
- **Client components for UI**: components that use Framer Motion and React state are marked with `"use client"` (e.g. sidebar, course cards, welcome, activity).
- **Loading**: `app/loading.tsx` provides a streaming skeleton to avoid layout shifts.

## Challenges

- The Supabase SSR client requires cookie handling. In Server Components, cookie writes are not reliable, so cookie updates are wrapped defensively.

