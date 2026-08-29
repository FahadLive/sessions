---
layout: libdoc_page.liquid
permalink: /add-product-admin/
title: Admin Page — Add Products with Supabase
description: A beginner-friendly admin page to add products with image upload to Supabase
eleventyNavigation:
    key: Add Product (Admin)
    parent: E-commerce App
    order: 2
---

## Simplified Guide: Admin Add Product Page with Supabase + Next.js + Tailwind

---

### What You'll Build

An admin page where you can type a product title, set a price, pick an image, and save everything to Supabase in one click.

---

### Step 1 — Add INSERT policy

Run this in **Supabase SQL Editor** (you may have skipped this earlier):

```sql
create policy "Public insert"
  on public.products
  for insert
  with check (true);

create policy "Public upload images"
  on storage.objects
  for insert
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
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setImageFile(file);
        setPreview(file ? URL.createObjectURL(file) : null);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title || !price || !imageFile) {
            setMessage({ type: "error", text: "All fields are required." });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            // 1. Upload image
            const fileExt = imageFile.name.split(".").pop();
            const filePath = `products/${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("product-images")
                .upload(filePath, imageFile);

            if (uploadError)
                throw new Error(`Image upload failed: ${uploadError.message}`);

            // 2. Insert product row
            const { error: insertError } = await supabase
                .from("products")
                .insert({
                    title,
                    price: parseFloat(price),
                    image_path: filePath,
                });

            if (insertError)
                throw new Error(`Product save failed: ${insertError.message}`);

            // 3. Reset
            setTitle("");
            setPrice("");
            setImageFile(null);
            setPreview(null);
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
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-start justify-center p-8">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                    Add Product
                </h1>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                    >
                        {/* Title */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Product Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Running Shoes"
                                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            />
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Price (USD)
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="e.g. 49.99"
                                min="0"
                                step="0.01"
                                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Product Image
                            </label>

                            {/* Preview */}
                            {preview ? (
                                <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 h-48">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview(null);
                                            setImageFile(null);
                                        }}
                                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white text-xs px-2 py-1 rounded-md transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <label
                                    htmlFor="image-input"
                                    className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-800/50"
                                >
                                    <span className="text-3xl mb-2">🖼️</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Click to upload image
                                    </span>
                                    <span className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                                        PNG, JPG, WEBP
                                    </span>
                                </label>
                            )}

                            <input
                                id="image-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        {/* Message */}
                        {message && (
                            <div
                                className={`rounded-lg px-4 py-3 text-sm font-medium ${
                                    message.type === "success"
                                        ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                                        : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                                }`}
                            >
                                {message.type === "success" ? "✓ " : "✕ "}
                                {message.text}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                        >
                            {loading ? "Uploading..." : "Add Product"}
                        </button>
                    </form>
                </div>
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
