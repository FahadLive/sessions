---
layout: libdoc_page.liquid
permalink: /orders-checkout-admin/
title: "Orders: Cart → Checkout → Admin"
description: Build an order system with checkout flow, order history, and admin order management.
eleventyNavigation:
    key: Orders (Checkout)
    parent: E-commerce App
    order: 6
---

# Orders: Cart → Checkout → Admin

> **Prerequisite:** Guide 1 (Auth) must be complete. Orders are tied to `auth.users`.

> **Next.js 16 notes used in this guide**
>
> - `cookies()` is **async-only** — always `await cookies()` in server components and route handlers
> - Server component params/props are now async — use `await` when accessing `params` or `searchParams`

---

## Step 1 — Create the Orders Schema

Run in **Supabase → SQL Editor**:

```sql
-- Orders table
create table public.orders (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade,
  status     text not null default 'pending', -- pending | confirmed | shipped | delivered
  total      numeric(10,2) not null,
  created_at timestamptz default now()
);

-- Order items (one row per product in the order)
create table public.order_items (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity   int not null,
  price      numeric(10,2) not null  -- snapshot at time of order (never changes)
);

-- Enable RLS
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Users see and create only their own orders
create policy "Users read own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users insert own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- Order items follow the parent order's ownership
create policy "Users read own order items"
  on public.order_items for select
  using (
    exists (select 1 from public.orders where id = order_id and user_id = auth.uid())
  );

create policy "Users insert own order items"
  on public.order_items for insert
  with check (
    exists (select 1 from public.orders where id = order_id and user_id = auth.uid())
  );

-- Admins see and update ALL orders
create policy "Admin read all orders"
  on public.orders for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin update orders"
  on public.orders for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );
```

> **Why snapshot the price?** Storing `price` on `order_items` means changing a product's price later won't alter old orders.

---

## Step 2 — Add Checkout to the Cart Page

Your cart page already has cart items from context. Add a `placeOrder` function and a Checkout button.

**`app/cart-page/page.tsx`**:

```tsx
"use client";
import { useCart } from "@/context/CartContext"; // your existing cart context
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cart, clearCart } = useCart();
    const supabase = createClient();
    const router = useRouter();

    async function placeOrder() {
        // 1. Check user is signed in
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login");
            return;
        }

        // 2. Calculate total
        const total = cart.reduce(
            (sum, item) => sum + item.price * item.qty,
            0,
        );

        // 3. Create the order row
        const { data: order, error } = await supabase
            .from("orders")
            .insert({ user_id: user.id, total })
            .select()
            .single();

        if (error || !order) {
            console.error(error);
            return;
        }

        // 4. Insert each cart item as an order_item
        await supabase.from("order_items").insert(
            cart.map((item) => ({
                order_id: order.id,
                product_id: item.id,
                quantity: item.qty,
                price: item.price, // snapshot the current price
            })),
        );

        // 5. Clear cart and redirect to orders page
        clearCart();
        router.push("/orders");
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
            <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

            {cart.length === 0 && (
                <p className="text-gray-500">Your cart is empty.</p>
            )}

            <div className="flex flex-col gap-3 mb-8">
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span>
                            {item.title} × {item.qty}
                        </span>
                        <span>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center">
                <p className="font-bold text-lg">
                    Total: $
                    {cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}
                </p>
                <button
                    onClick={placeOrder}
                    disabled={cart.length === 0}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition disabled:opacity-40"
                >
                    Place Order
                </button>
            </div>
        </main>
    );
}
```

---

## Step 3 — User Orders Page

Shows the signed-in user's order history.

> In Next.js 16, `cookies()` must be awaited in server components.

**`app/orders/page.tsx`**:

```tsx
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-emerald-100 text-emerald-700",
};

export default async function OrdersPage() {
    // Next.js 16 — await cookies()
    const supabase = createClient(await cookies());

    const { data: orders } = await supabase
        .from("orders")
        .select("*, order_items(quantity, price, products(title))")
        .order("created_at", { ascending: false });

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                My Orders
            </h1>

            {orders?.length === 0 && (
                <p className="text-gray-500">No orders yet.</p>
            )}

            <div className="flex flex-col gap-6">
                {orders?.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-400">
                                #{order.id.slice(0, 8)}
                            </span>
                            <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[order.status]}`}
                            >
                                {order.status}
                            </span>
                        </div>

                        {order.order_items?.map((item: any) => (
                            <div
                                key={item.id}
                                className="flex justify-between text-sm text-gray-700 dark:text-gray-300 py-1"
                            >
                                <span>
                                    {item.products?.title} × {item.quantity}
                                </span>
                                <span>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}

                        <div className="border-t border-gray-100 dark:border-gray-800 mt-4 pt-4 text-right font-bold">
                            Total: ${Number(order.total).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
```

---

## Step 4 — Admin Orders Page

Lets the admin see all orders and update their status.

**`app/admin/orders/page.tsx`**:

```tsx
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const STATUSES = ["pending", "confirmed", "shipped", "delivered"];

export default function AdminOrdersPage() {
    const supabase = createClient();
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        supabase
            .from("orders")
            .select(
                "*, profiles(email), order_items(quantity, price, products(title))",
            )
            .order("created_at", { ascending: false })
            .then(({ data }) => setOrders(data ?? []));
    }, []);

    async function updateStatus(orderId: string, status: string) {
        await supabase.from("orders").update({ status }).eq("id", orderId);
        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                All Orders
            </h1>

            <div className="flex flex-col gap-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <p className="font-medium text-sm">
                                    {order.profiles?.email}
                                </p>
                                <p className="text-xs text-gray-400">
                                    #{order.id.slice(0, 8)}
                                </p>
                            </div>
                            <select
                                value={order.status}
                                onChange={(e) =>
                                    updateStatus(order.id, e.target.value)
                                }
                                className="text-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-1.5"
                            >
                                {STATUSES.map((s) => (
                                    <option key={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        {order.order_items?.map((item: any) => (
                            <div
                                key={item.id}
                                className="flex justify-between text-sm text-gray-600 dark:text-gray-400 py-0.5"
                            >
                                <span>
                                    {item.products?.title} × {item.quantity}
                                </span>
                                <span>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}

                        <p className="text-right font-bold text-sm mt-3">
                            Total: ${Number(order.total).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}
```

---

## Step 5 — Link to Orders in the Nav

Add "My Orders" and "Manage Orders" links in your nav (server component):

```tsx
// fetch user and role at the top
const {
    data: { user },
} = await supabase.auth.getUser();

const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

const isAdmin = profile?.role === "admin";
```

```tsx
{
    /* in your nav JSX */
}
{
    user && (
        <a
            href="/orders"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
        >
            My Orders
        </a>
    );
}

{
    isAdmin && (
        <a
            href="/admin/orders"
            className="text-sm font-medium text-purple-500 hover:text-purple-600 transition"
        >
            Manage Orders
        </a>
    );
}
```

---

## What You've Built

|                     |                                                   |
| ------------------- | ------------------------------------------------- |
| `orders` table      | Tied to user, has status + total                  |
| `order_items` table | Per-product rows with price snapshot              |
| Cart → Checkout     | `placeOrder()` creates order + items, clears cart |
| `/orders`           | User sees their own order history                 |
| `/admin/orders`     | Admin sees all orders, can update status          |
| RLS                 | Users only see their own; admins see everything   |

---

## The Full User Flow

```
User browses products
  → adds to cart  (existing CartContext)
    → goes to /cart-page
      → clicks "Place Order"
        → order saved to Supabase
          → redirected to /orders
            → sees order with status "pending"

Admin goes to /admin/orders
  → sees all orders from all users
    → changes status → "confirmed" / "shipped" / "delivered"
```
