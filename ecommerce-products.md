---
layout: libdoc_page.liquid
title: Product Listing with Supabase + Next.js
description: A single page showing product cards (image, title, price) fetched from Supabase
eleventyNavigation:
    key: Product Listing
    parent: E-commerce App
    order: 4
---

## Simplified Guide: Product Listing with Supabase + Next.js + Tailwind

---

### What You'll Build

A single page that shows product cards (image, title, price) fetched from Supabase.

---

### Step 1 — Run the SQL in Supabase

Go to your **Supabase Dashboard → SQL Editor → New Query**, paste and run this all at once:

```sql
-- Create table
create table public.products (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  price      numeric(10, 2) not null,
  image_path text not null,
  created_at timestamptz default now()
);

-- RLS
alter table public.products enable row level security;

-- Allow anyone to read AND write (no auth needed)
create policy "Public read"   on public.products for select using (true);
create policy "Public insert" on public.products for insert with check (true);

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true);

-- Allow anyone to read AND upload images
create policy "Public read images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Public upload images"
  on storage.objects for insert
  with check (bucket_id = 'product-images');

-- Add some test products
insert into public.products (title, price, image_path) values
  ('Running Shoes', 89.99, 'products/running-shoes.svg'),
  ('Leather Wallet', 34.99, 'products/leather-wallet.svg'),
  ('Wireless Headphones', 149.99, 'products/headphones.svg');
```

Then go to **Storage → product-images bucket** and upload some test images. The filenames must match what you put in `image_path` above (e.g. upload a file named `running-shoes.svg` inside a `products/` folder).

<div class="d-flex fw-wrap gap-3" rgap-3="xs">
  <a href="/assets/sample-products/running-shoes.svg" download class="btn btn-primary">⬇ Download Running Shoes</a>
  <a href="/assets/sample-products/leather-wallet.svg" download class="btn btn-primary">⬇ Download Leather Wallet</a>
  <a href="/assets/sample-products/headphones.svg" download class="btn btn-primary">⬇ Download Headphones</a>
</div>

---

### Step 2 — One Page File

Everything lives in one file: `app/products/page.tsx`

```tsx
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function ProductsPage() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: products, error } = await supabase
        .from("products")
        .select("id, title, price, image_path")
        .order("created_at", { ascending: false });

    if (error) {
        return (
            <main className="min-h-screen bg-white dark:bg-gray-950 p-8">
                <p className="text-red-500">
                    Failed to load products: {error.message}
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products?.map((product) => {
                    const { data: imgData } = supabase.storage
                        .from("product-images")
                        .getPublicUrl(product.image_path);

                    return (
                        <div
                            key={product.id}
                            className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-200"
                        >
                            <div className="overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <img
                                    src={imgData.publicUrl}
                                    alt={product.title}
                                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="font-semibold text-gray-900 dark:text-white truncate">
                                    {product.title}
                                </h2>
                                <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                                    ${Number(product.price).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
```

That's it. No separate component file, no client-side hooks, no extra setup — just one server component that fetches and renders.

---

### Visit the Page

Run your dev server and go to:

```
http://localhost:3000/products
```

---

### The Only Two Things That Can Go Wrong

**Images not showing** — check that the filename in `image_path` in the database exactly matches the file you uploaded to the bucket, including the folder prefix (`products/filename.jpg`).

**No products showing** — open Supabase → Table Editor → products and confirm rows exist. If the table is empty the page will just render an empty grid with no error.
