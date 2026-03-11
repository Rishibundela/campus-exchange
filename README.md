# YouthMart — Campus Marketplace for Students

A modern web application designed for college students to buy, sell, and exchange study materials within their campus community.

## Features

- **Browse & Search** — Find books, electronics, stationery, notes, lab equipment and more
- **Category Filtering** — Filter by category, condition, and price
- **Item Listings** — Sellers can list items with photos, price, category, and description
- **Wishlist** — Save items for later
- **Contact Sellers** — Message sellers directly about listings
- **Seller Ratings** — View ratings and reviews for sellers
- **Authentication** — Sign up and log in with college email
- **Responsive Design** — Works on mobile and desktop

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI)
- **Routing:** React Router DOM v6
- **Data Fetching:** TanStack React Query
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or bun package manager

### Installation

```sh
# Clone the repository
git clone https://github.com/Rishibundela/campus-exchange.git

# Navigate to the project directory
cd campus-exchange

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── ui/         # shadcn/ui base components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ItemCard.tsx
│   └── ...
├── pages/          # Route page components
│   ├── Index.tsx   # Home page
│   ├── Browse.tsx  # Browse listings
│   ├── Sell.tsx    # List an item
│   ├── Login.tsx   # Authentication
│   └── ...
├── hooks/          # Custom React hooks
├── lib/            # Utilities, data, and helpers
├── App.tsx         # Main app with routing
└── main.tsx        # Entry point
```

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Featured items and categories |
| `/browse` | Browse | Search, filter, and sort listings |
| `/item/:id` | Item Detail | View item details and contact seller |
| `/sell` | Sell | List a new item for sale |
| `/wishlist` | Wishlist | View saved items |
| `/login` | Login/Signup | Authentication |
| `/about` | About | About YouthMart |
| `/contact` | Contact | Contact form |
| `/terms` | Terms | Terms and conditions |
| `/privacy` | Privacy | Privacy policy |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## License

This project is open source and available under the [MIT License](LICENSE).
