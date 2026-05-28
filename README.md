# Student Learning Dashboard

A dashboard built for the Frontend Intern Challenge using Next.js 15, Supabase, Tailwind CSS, Framer Motion, and Lucide React.

## Setup

```bash
npm install
cp .env.local.example .env.local
# fill in your Supabase URL and anon key
npm run dev
```

If you don't have Supabase set up, the app falls back to local mock data in `lib/data.ts` automatically.

## Supabase setup

Run this in your Supabase SQL editor:

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text not null,
  created_at timestamp with time zone default now()
);

alter table courses enable row level security;
create policy "public read" on courses for select to anon using (true);

insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code2'),
  ('TypeScript Mastery', 60, 'FileCode'),
  ('Database Design', 90, 'Database'),
  ('UI Animation Fundamentals', 40, 'Sparkles');
```

## Architecture decisions

**Server vs client components**

Data fetching happens in `app/page.tsx` which is a Server Component — it calls Supabase directly on the server using `@supabase/ssr`, so no API keys are ever exposed to the browser. The fetched courses are passed down as props to client components that handle animations.

Components that use Framer Motion or React state (`sidebar.tsx`, `course-card.tsx`, `welcome.tsx`, `activity.tsx`) are marked `"use client"`. Everything else (`dashboard.tsx`, `app/page.tsx`) stays as server components.

**Why this split?** Framer Motion needs the browser to run, so those components have to be client-side. But the data fetch should stay on the server so we get proper SSR and don't expose credentials.

**Loading states**

`app/loading.tsx` is a Next.js streaming skeleton — it shows automatically while the server component is fetching. Uses `animate-pulse` on placeholder shapes that match the real layout so there's no jarring shift when content loads.

**Animations**

All animations use `transform` and `opacity` only — no `width`/`height`/`top`/`left` changes that would cause layout shifts. Progress bars animate `width` but they're inside `overflow-hidden` containers so they don't affect surrounding layout.

Spring physics (`stiffness: 300, damping: 20`) on card hover, `layoutId` on sidebar nav highlight.

**Challenges**

The trickiest part was the server/client boundary with Supabase. The `@supabase/ssr` package requires cookie handling that doesn't work the same way in Server Components vs Route Handlers — had to use `getAll`/`setAll` pattern and wrap the `setAll` in a try/catch since Server Components can't actually set cookies.

Also had to be careful with Framer Motion's `animate` utility (for the counter) — it's a client-only API so the `Counter` component needed `"use client"` even though it's small.

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo on vercel.com
3. In Vercel Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

Vercel auto-detects Next.js and uses the default build pipeline.

## Required environment variables

See `.env.example` for the list of required Supabase environment variables. Do **not** commit real secrets.
