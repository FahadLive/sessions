---
layout: libdoc_page.liquid
title: Cart - useState and context for Cart Management
description: Add a fully functional shopping cart to your Next.js + Supabase storefront.
eleventyNavigation:
    key: Build Cart
    parent: E-commerce App
    order: 3
---

# Cart: useState for Cart Management

In this guide you'll add a fully functional shopping cart to your Next.js + Supabase storefront. By the end you'll have global cart state, an "Add to Cart" button on every product, a live badge in the nav, and a dedicated cart page with a running total.

---

## What You'll Build

- **`CartContext`** — global cart state using `useState` + React Context
- **`ProductCard`** — client component with an "Add to Cart" button
- **`CartNavButton`** — nav icon with a live item-count badge
- **`/cart` page** — quantity controls, per-line totals, grand total, and clear cart

---

## File Structure

```
context/
  CartContext.tsx
components/
  ProductCard.tsx
  CartNavButton.tsx
app/
  page.tsx          (updated)
  layout.tsx        (updated)
  cart/
    page.tsx
```

---

## Step 1 — Cart Context

Create `context/CartContext.tsx`. This is the single source of truth for cart state across your entire app.

```tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (product: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    function addToCart(product: Omit<CartItem, "quantity">) {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i,
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }

    function removeFromCart(id: string) {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }

    function updateQuantity(id: string, quantity: number) {
        if (quantity < 1) return removeFromCart(id);
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
        );
    }

    function clearCart() {
        setItems([]);
    }

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        {% raw %}
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
        {% endraw %}
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
}
```

**Key ideas:**

- `addToCart` checks if the item already exists. If it does, it increments `quantity` instead of adding a duplicate.
- `updateQuantity` calls `removeFromCart` when quantity drops below 1 — no zero-quantity ghost items.
- `totalItems` and `totalPrice` are derived values computed fresh on every render, so they're always in sync.

---

## Step 2 — Wrap Your Layout

Open `app/layout.tsx` and wrap `children` with `<CartProvider>`. This ensures cart state survives navigation between pages.

```tsx
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <CartProvider>{children}</CartProvider>
            </body>
        </html>
    );
}
```

---

## Step 3 — ProductCard Component

Your products page is a **server component**, but `useCart` requires a client component. The fix: split the card into its own file.

Create `components/ProductCard.tsx`:

```tsx
"use client";

import { useCart } from "@/context/CartContext";

type Product = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
};

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart, items } = useCart();
    const inCart = items.find((i) => i.id === product.id);

    return (
        <div className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-200">
            <div className="overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4 flex flex-col gap-3">
                <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white truncate">
                        {product.title}
                    </h2>
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                        ${Number(product.price).toFixed(2)}
                    </p>
                </div>
                <button
                    onClick={() =>
                        addToCart({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            imageUrl: product.imageUrl,
                        })
                    }
                    className="w-full py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                    {inCart
                        ? `Add Again (${inCart.quantity} in cart)`
                        : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}
```

> The button label updates to show the current quantity when the item is already in the cart.

---

## Step 4 — Cart Badge in the Nav

Create `components/CartNavButton.tsx`. Keeping this as its own tiny client component means `app/page.tsx` stays a server component.

```tsx
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartNavButton() {
    const { totalItems } = useCart();

    return (
        <Link
            href="/cart"
            className="relative flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
            <span className="text-xl">🛒</span>
            <span>Cart</span>
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 99 ? "99+" : totalItems}
                </span>
            )}
        </Link>
    );
}
```

---

## Step 5 — Update the Products Page

Update `app/page.tsx` to resolve image URLs on the server and pass them down to `ProductCard`:

```tsx
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CartNavButton from "@/components/CartNavButton";

export default async function ProductsPage() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: products, error } = await supabase
        .from("products")
        .select("id, title, price, image_path")
        .order("created_at", { ascending: false });

    if (error) {
        return (
            <main className="min-h-screen p-8">
                <p className="text-red-500">
                    Failed to load products: {error.message}
                </p>
            </main>
        );
    }

    const productsWithUrls = (products ?? []).map((product) => {
        const { data: imgData } = supabase.storage
            .from("product-images")
            .getPublicUrl(product.image_path);
        return { ...product, imageUrl: imgData.publicUrl };
    });

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Products
                </h1>
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin"
                        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        Add new product
                    </Link>
                    <CartNavButton />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productsWithUrls.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}
```

---

## Step 6 — Cart Page

Create `app/cart/page.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
        useCart();

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        ← Back to Products
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Your Cart
                    </h1>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                        <p className="text-4xl mb-4">🛒</p>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Your cart is empty
                        </p>
                        <Link
                            href="/"
                            className="mt-4 inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Browse products
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 p-4"
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                                            {item.title}
                                        </p>
                                        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                                            ${Number(item.price).toFixed(2)}{" "}
                                            each
                                        </p>
                                    </div>
                                    {/* Quantity controls */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity - 1,
                                                )
                                            }
                                            className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 font-bold text-sm transition-colors flex items-center justify-center"
                                        >
                                            −
                                        </button>
                                        <span className="w-6 text-center text-sm font-semibold">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity + 1,
                                                )
                                            }
                                            className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 font-bold text-sm transition-colors flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {/* Line total */}
                                    <p className="w-16 text-right font-bold text-sm shrink-0">
                                        $
                                        {(item.price * item.quantity).toFixed(
                                            2,
                                        )}
                                    </p>
                                    {/* Remove */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors text-lg leading-none shrink-0"
                                        aria-label="Remove item"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                            <div className="flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex flex-col gap-3 mt-6">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                                    Checkout
                                </button>
                                <button
                                    onClick={clearCart}
                                    className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 font-medium py-3 rounded-xl transition-colors text-sm"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
```

---

## How It All Connects

```
layout.tsx
└── <CartProvider>          ← state lives here
    ├── app/page.tsx         ← server component, fetches products
    │   ├── <CartNavButton>  ← reads totalItems, shows badge
    │   └── <ProductCard>    ← calls addToCart on click
    └── app/cart/page.tsx    ← reads items, renders cart UI
```

Because `CartProvider` lives in the root layout, the same cart state is shared across every page. Navigation never resets it.

---

## Concepts Covered

| Concept                             | Where                                        |
| ----------------------------------- | -------------------------------------------- |
| `useState` for array state          | `CartContext.tsx`                            |
| React Context + custom hook         | `CartContext.tsx` + `useCart()`              |
| Derived state (no extra `useState`) | `totalItems`, `totalPrice`                   |
| Server vs client component split    | `page.tsx` vs `ProductCard`, `CartNavButton` |
| Functional state updates            | `setItems((prev) => ...)`                    |

---

## What's Next

- **Persist the cart** with `localStorage` so it survives a page refresh
- **Checkout flow** with Stripe or another payment provider
- **Optimistic UI** — show instant feedback when adding to cart
