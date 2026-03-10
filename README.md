# YouthMart — Campus Exchange

A modern college student marketplace to buy, sell, and exchange study materials within your campus community.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Routing:** React Router DOM v6
- **State/Data:** TanStack React Query
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Animations:** Framer Motion

## Getting Started

### 1. Prerequisites

- Node.js 18+ or Bun
- A [Supabase](https://supabase.com) account (free tier works)

### 2. Clone & Install

```sh
git clone <YOUR_GIT_URL>
cd campus-exchange
npm install
```

### 3. Set Up Supabase

1. Create a new project at [app.supabase.com](https://app.supabase.com)
2. Go to **SQL Editor** and run the migration file:
   - `supabase/migrations/20240101000000_initial_schema.sql`
3. Go to **Settings → API** to find your project URL and anon key

### 4. Configure Environment Variables

Copy the example file and fill in your credentials:

```sh
cp .env.example .env
```

Edit `.env`:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Run the App

```sh
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Architecture

```
Browser (React SPA)
  │
  ├── React Router DOM  →  Page components
  ├── TanStack Query    →  Data fetching + caching
  ├── AuthContext       →  Session management
  │
  └── Supabase SDK
        ├── supabase.auth    →  Login / signup / logout
        ├── supabase.from()  →  PostgreSQL CRUD
        └── supabase.storage →  Image uploads
```

## Database Schema

| Table       | Purpose                                  |
|-------------|------------------------------------------|
| `profiles`  | User profiles (name, college, course)    |
| `items`     | Item listings with seller reference      |
| `wishlist`  | User ↔ item many-to-many saved items     |
| `messages`  | Direct messages between buyer and seller |
| `reviews`   | Seller reviews and ratings               |

Row Level Security (RLS) is enabled on all tables:
- Anyone can read public listings and profiles
- Users can only create/modify their own data

## Features

- 🔐 **Real Authentication** — Email + password via Supabase Auth
- 📦 **Item Listings** — Create, browse, filter, and view items
- ☁️ **Image Upload** — Photos stored in Supabase Storage
- ❤️ **Persistent Wishlist** — Saved across sessions in the database
- 💬 **Messaging** — Contact sellers directly
- ⭐ **Reviews** — Rate and review sellers
- 🛡️ **Protected Routes** — `/sell` and `/wishlist` require login

## Deployment

Deploy to any static host (Vercel, Netlify, Cloudflare Pages):

```sh
npm run build
# Upload the `dist/` folder
```

Make sure to set the same environment variables in your hosting provider's dashboard.
