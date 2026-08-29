---
layout: libdoc_page.liquid
permalink: /auth-google-signin/
title: "Auth: Google Sign-In + Roles"
description: Set up Google OAuth with Supabase, role-based access, and protected routes in Next.js 16.
eleventyNavigation:
    key: Auth (Google Sign-In)
    parent: E-commerce App
    order: 5
---

# Auth: Google Sign-In + Roles

## Step 1 — Enable Google in Supabase Dashboard

_~5 min — No code needed_

1. Supabase Dashboard → **Authentication → Providers → Google → toggle ON**
2. Go to [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials → **Create OAuth 2.0 Client ID**
3. Set **Authorized redirect URI** to:
    ```
    https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback
    ```
    > Find your project ref in Supabase → Project Settings → General
4. Copy **Client ID** and **Client Secret** → paste back into Supabase

---

## Step 2 — Install Supabase SSR

```bash
npm install @supabase/ssr
```

> Skip if you already have `@supabase/ssr` from previous sessions.

---

## Step 3 — Add the Proxy File

> ⚠️ In Next.js 16, `middleware.ts` is renamed to **`proxy.ts`** and the function export renamed to `proxy`.

**`proxy.ts`** (project root — replaces `middleware.ts`):

```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                setAll: (cookiesToSet) => {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options),
                    );
                },
            },
        },
    );

    // Refresh session
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const path = request.nextUrl.pathname;

    // Protect /admin — admins only
    if (path.startsWith("/admin")) {
        if (!user) return NextResponse.redirect(new URL("/login", request.url));

        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (profile?.role !== "admin")
            return NextResponse.redirect(new URL("/", request.url));
    }

    // Protect /orders — must be signed in
    if (path.startsWith("/orders") && !user)
        return NextResponse.redirect(new URL("/login", request.url));

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

---

## Step 4 — Login Page

**`app/login/page.tsx`**:

```tsx
"use client";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
    const supabase = createClient();

    async function signIn() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${location.origin}/auth/callback` },
        });
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-10 w-full max-w-sm flex flex-col gap-6">
                <h1 className="text-xl font-bold text-center">Sign In</h1>
                <button
                    onClick={signIn}
                    className="flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg py-2.5 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </button>
            </div>
        </main>
    );
}
```

---

## Step 5 — Auth Callback Route

Exchanges the OAuth code for a session cookie.

**`app/auth/callback/route.ts`**:

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    // In Next.js 16, cookies() is async — always await it
    const cookieStore = await cookies();

    if (code) {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll: () => cookieStore.getAll(),
                    setAll: (c) =>
                        c.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options),
                        ),
                },
            },
        );
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(new URL("/", request.url));
}
```

---

## Step 6 — Create the `profiles` Table + Role System

Run once in **Supabase → SQL Editor**:

```sql
-- 1. Profiles table (mirrors auth.users)
create table public.profiles (
  id    uuid primary key references auth.users(id) on delete cascade,
  email text,
  role  text not null default 'user'   -- 'user' or 'admin'
);

alter table public.profiles enable row level security;

create policy "Read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- 2. Auto-create profile on every sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

> **To make yourself an admin**, run this after signing in once:
>
> ```sql
> update public.profiles set role = 'admin' where email = 'you@gmail.com';
> ```

---

## Step 7 — Update RLS on Products + Storage

Replaces the open "public insert" policies from the previous session.

```sql
-- Drop the old open policies
drop policy if exists "Public insert" on public.products;
drop policy if exists "Public upload images" on storage.objects;

-- Only admins can add products
create policy "Admin insert products"
  on public.products for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can upload images
create policy "Admin upload images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images' and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
```

> Your existing **Public read** policies for products and images stay as-is.

---

## Step 8 — Add Sign Out + User Info to the Nav

**`components/UserNav.tsx`**:

```tsx
"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function UserNav({ email }: { email: string | null }) {
    const supabase = createClient();
    const router = useRouter();

    async function signOut() {
        await supabase.auth.signOut();
        router.refresh();
    }

    if (!email)
        return (
            <a
                href="/login"
                className="text-sm font-medium text-blue-500 hover:underline"
            >
                Sign In
            </a>
        );

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
                {email}
            </span>
            <button
                onClick={signOut}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
            >
                Sign out
            </button>
        </div>
    );
}
```

In your products page (server component), fetch the user and pass the email:

```tsx
// fetch user at the top of the server component
const { data: { user } } = await supabase.auth.getUser()

// in your nav JSX
<UserNav email={user?.email ?? null} />
```

---

## What You've Built

|                      |                                                     |
| -------------------- | --------------------------------------------------- |
| Google OAuth         | `signInWithOAuth` → callback route → session cookie |
| Profiles table       | Auto-created on sign-up via DB trigger              |
| Roles                | `profiles.role = 'user' \| 'admin'`                 |
| `/admin` protection  | `proxy.ts` checks role, redirects non-admins        |
| `/orders` protection | `proxy.ts` redirects unauthenticated users          |
| RLS on products      | Admin-only insert (was open to everyone)            |
