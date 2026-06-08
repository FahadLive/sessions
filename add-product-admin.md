---
layout: libdoc_page.liquid
title: Admin Page — Add Products with Supabase
description: A beginner-friendly admin page to add products with image upload to Supabase
eleventyNavigation:
  key: Add Product (Admin)
  parent: Product Listing
  order: 1
---

## Simplified Guide: Admin Add Product Page with Supabase + Next.js + Tailwind

---

### What You'll Build

An admin page where you can type a product title, set a price, pick an image, and save everything to Supabase in one click.

---

### Step 1 — Add INSERT policy for authenticated users

Run this in **Supabase SQL Editor** (you may have skipped this earlier):

```sql
create policy "Authenticated insert"
  on public.products
  for insert
  to authenticated
  with check (true);

create policy "Authenticated upload images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-images');
```

Need test images? Download these and upload them to your `product-images` bucket under a `products/` folder:

<div class="d-flex fw-wrap gap-3" rgap-3="xs">
  <a href="/assets/sample-products/running-shoes.svg" download class="btn btn-primary">⬇ Running Shoes</a>
  <a href="/assets/sample-products/leather-wallet.svg" download class="btn btn-primary">⬇ Leather Wallet</a>
  <a href="/assets/sample-products/headphones.svg" download class="btn btn-primary">⬇ Headphones</a>
</div>

---

### Step 2 — One Page File

Create `app/admin/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AdminPage() {
    const supabase = createClient();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title || !price || !imageFile) {
            setMessage({ type: "error", text: "All fields are required." });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            // 1. Upload image to storage bucket
            const fileExt = imageFile.name.split(".").pop();
            const filePath = `products/${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("product-images")
                .upload(filePath, imageFile);

            if (uploadError)
                throw new Error(`Image upload failed: ${uploadError.message}`);

            // 2. Insert product row into the table
            const { error: insertError } = await supabase
                .from("products")
                .insert({
                    title,
                    price: parseFloat(price),
                    image_path: filePath,
                });

            if (insertError)
                throw new Error(`Product save failed: ${insertError.message}`);

            // 3. Reset form on success
            setTitle("");
            setPrice("");
            setImageFile(null);
            (document.getElementById("image-input") as HTMLInputElement).value =
                "";
            setMessage({
                type: "success",
                text: "Product added successfully!",
            });
        } catch (err: any) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 flex items-start justify-center p-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Add Product
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Title */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Product Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Running Shoes"
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Price (USD)
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="e.g. 49.99"
                            min="0"
                            step="0.01"
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Product Image
                        </label>
                        <input
                            id="image-input"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImageFile(e.target.files?.[0] ?? null)
                            }
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700"
                        />
                    </div>

                    {/* Image Preview */}
                    {imageFile && (
                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border border-gray-200"
                        />
                    )}

                    {/* Feedback Message */}
                    {message && (
                        <p
                            className={`text-sm font-medium ${message.type === "success" ? "text-green-600" : "text-red-500"}`}
                        >
                            {message.text}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2 rounded-lg transition-colors"
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </main>
    );
}
```

---

### Visit the Page

```
http://localhost:3000/admin
```

---

### What It Does, Step by Step

When you click **Add Product**, the code does exactly two things in order:

1. **Uploads the image** to the `product-images` storage bucket under `products/timestamp.ext` — this gives every file a unique name so nothing ever gets overwritten
2. **Inserts a row** into the `products` table with the title, price, and the image path from step 1

If either step fails, it stops and shows the error message. If both succeed, the form clears and shows a green success message. The new product will immediately appear at `/products`.
