import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type SupabaseCookie = { name: string; value: string; options: any };


// Creates a Supabase client for use in Server Components
// Using @supabase/ssr as required by Next.js App Router
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: SupabaseCookie[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component can't set cookies, this is fine for read-only
          }
        },
      },
    }
  );
}
