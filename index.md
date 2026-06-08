---
layout: libdoc_page.liquid
title: Building Product Listing with Supabase
description: A comprehensive guide to building a product card component with Supabase integration
---

## Product Card Component with Supabase — Build Guide

### Overview

You'll build two things:
- A **ProductCard** component (image, title, price)
- A **ProductListing** page that fetches data from Supabase tables and Storage buckets

### 1. Supabase Setup

**Database Table**

Create a `products` table in your Supabase project with the following columns:

- `id` — uuid, primary key, default `gen_random_uuid()`
- `title` — text, not null
- `price` — numeric(10,2), not null
- `image_path` — text (stores the storage path, e.g. `products/shoe.jpg`)
- `created_at` — timestamptz, default `now()`

**Storage Bucket**

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `product-images`
3. Set it to **Public** if you want simple URL access, or **Private** if you need signed URLs
4. Upload your product images; note the paths (e.g. `products/shoe.jpg`)

**Row Level Security (RLS)**

Enable RLS on the `products` table and add a policy:
- For public read: `USING (true)` on SELECT
- For authenticated writes: `USING (auth.role() = 'authenticated')` on INSERT/UPDATE/DELETE

### 2. Project Setup

Install dependencies:

```bash
npm install @supabase/supabase-js
```

Create a Supabase client file at `lib/supabaseClient.js`:

```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

Add your credentials to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. ProductCard Component

Create `components/ProductCard.jsx`:

```jsx
export default function ProductCard({ title, price, imageUrl }) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${Number(price).toFixed(2)}</p>
      </div>
    </div>
  )
}
```

Basic CSS for the card:

```css
.product-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}
.product-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
.product-image { width: 100%; height: 220px; object-fit: cover; }
.product-info { padding: 16px; }
.product-title { font-size: 1rem; font-weight: 600; margin-bottom: 8px; }
.product-price { font-size: 1.1rem; color: #16a34a; font-weight: 700; }
```

### 4. Resolving Image URLs from Supabase Storage

There are two patterns depending on your bucket visibility:

**Public bucket** — construct the URL directly:

```js
const getPublicImageUrl = (imagePath) => {
  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(imagePath)
  return data.publicUrl
}
```

**Private bucket** — generate a signed URL (expires after N seconds):

```js
const getSignedImageUrl = async (imagePath) => {
  const { data, error } = await supabase.storage
    .from('product-images')
    .createSignedUrl(imagePath, 3600) // 1 hour
  return data?.signedUrl
}
```

### 5. ProductListing Page

Create `pages/products.jsx` (or `app/products/page.jsx` for App Router):

```jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ProductCard from '../components/ProductCard'

export default function ProductListing() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, title, price, image_path')
          .order('created_at', { ascending: false })

        if (error) throw error

        const withImages = data.map((product) => {
          const { data: imgData } = supabase.storage
            .from('product-images')
            .getPublicUrl(product.image_path)
          return { ...product, imageUrl: imgData.publicUrl }
        })

        setProducts(withImages)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <p>Loading products...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  )
}
```

Grid CSS:

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  padding: 32px;
}
```

### 6. Optional Enhancements

**Pagination** — use Supabase's `.range(from, to)` for offset-based pagination or implement cursor-based with `.gt('id', lastId)`.

**Realtime updates** — subscribe to product changes:

```js
supabase
  .channel('products')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchProducts)
  .subscribe()
```

**Skeleton loading** — render placeholder cards while loading instead of a plain text fallback.

**Error boundaries** — wrap the listing in a React error boundary to gracefully handle failures.

**Image optimization** — if using Next.js, use the `<Image>` component from `next/image` with Supabase's domain whitelisted in `next.config.js`.

### 7. File Structure Summary

```
lib/
  supabaseClient.js       # Supabase client init
components/
  ProductCard.jsx         # Card UI component
pages/ (or app/)
  products.jsx            # Listing page
styles/
  products.css            # Card + grid styles
.env.local                # Supabase credentials
```

### Key Things to Remember

- Store only the **image path** (not the full URL) in your database; resolve the URL at render time
- Always handle the `error` object from every Supabase call
- Keep your `SUPABASE_ANON_KEY` in environment variables — never hardcode it
- Enable RLS on every table before going to production

## SQL Setup

### 1. Products Table

```sql
create table public.products (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  price       numeric(10, 2) not null,
  image_path  text not null,
  created_at  timestamptz default now()
);
```

### 2. Row Level Security

```sql
alter table public.products enable row level security;

create policy "Public read access"
  on public.products
  for select
  using (true);

create policy "Authenticated insert"
  on public.products
  for insert
  to authenticated
  with check (true);

create policy "Authenticated update"
  on public.products
  for update
  to authenticated
  using (true);

create policy "Authenticated delete"
  on public.products
  for delete
  to authenticated
  using (true);
```

### 3. Storage Bucket

```sql
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true);
```

Set `public` to `false` if you want private/signed URLs instead.

### 4. Storage Bucket RLS Policies

```sql
create policy "Public read images"
  on storage.objects
  for select
  using (bucket_id = 'product-images');

create policy "Authenticated upload images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated update images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'product-images');

create policy "Authenticated delete images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'product-images');
```

### 5. Seed Some Test Data

```sql
insert into public.products (title, price, image_path) values
  ('Running Shoes', 89.99, 'products/running-shoes.jpg'),
  ('Leather Wallet', 34.99, 'products/leather-wallet.jpg'),
  ('Wireless Headphones', 149.99, 'products/headphones.jpg'),
  ('Sunglasses', 59.99, 'products/sunglasses.jpg');
```

### How `image_path` Works

The `image_path` column stores just the path inside the bucket, e.g. `products/running-shoes.jpg`. In your component you resolve the full URL:

```ts
const supabase = createClient()

const { data } = supabase.storage
  .from('product-images')
  .getPublicUrl(product.image_path)

// data.publicUrl = https://kvqvgjpracvtbaajynxb.supabase.co/storage/v1/object/public/product-images/products/running-shoes.jpg
```

Run all of this in the **Supabase SQL Editor** (Dashboard → SQL Editor → New Query). The bucket SQL goes in the same editor since Supabase exposes the `storage` schema there.
