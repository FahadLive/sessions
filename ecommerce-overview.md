---
layout: libdoc_page.liquid
title: E-commerce App
description: A comprehensive guide series for building an e-commerce app with Supabase and Next.js — product listing, cart, checkout, orders and admin auth.
eleventyNavigation:
    key: E-commerce App
    order: 1
---

# E-commerce App: Building with Supabase + Next.js

You're going to build a full e-commerce storefront from scratch — products, a cart, checkout and an admin dashboard — using **Next.js** for the interface and **Supabase** for the database and authentication.

You'll copy small, working code blocks step by step. No framework magic, no black boxes — each page is a self-contained guide you can drop into your project and see working.

## What you'll build

- **Product Listing (60 min):** a single page that shows product cards (image, title, price) fetched from Supabase.
- **Add Product (Admin) (60 min):** a beginner-friendly admin page to add products with image upload.
- **Build Cart (60 min):** a fully functional shopping cart using `useState` and React context.
- **Orders — Cart → Checkout → Admin (60 min):** an order system with a checkout flow, order history and admin order management.
- **Auth — Google Sign-In + Roles (60 min):** Google OAuth with Supabase, role-based access and protected routes.

## How it works

|                    | Listing   | Admin     | Cart      | Checkout  | Auth          |
| ------------------ | --------- | --------- | --------- | --------- | ------------- |
| **New thing**      | Database  | Storage   | Context   | Transactions | OAuth + RLS   |
| **Core skill**     | Fetch     | Upload    | State     | Mutations | Access control |

## What you need

- A [Supabase](https://supabase.com/) account (free) — for the database and auth
- A Next.js + Tailwind project set up with the Supabase client
- Node.js and npm installed on your machine

## The plan

| Page                                        | What it covers                         |
| ------------------------------------------- | -------------------------------------- |
| [Product Listing](/ecommerce-products/)     | Product cards fetched from Supabase    |
| [Add Product (Admin)](/add-product-admin/)  | Add products with image upload         |
| [Build Cart](/cart-page/)                   | Cart with `useState` and context       |
| [Orders (Checkout)](/orders-checkout-admin/)| Cart → checkout → order history        |
| [Auth (Google Sign-In)](/auth-google-signin/)| Google OAuth + roles + protected routes|

Start with **[Product Listing](/ecommerce-products/)** — the first page where you see products appear on screen.
