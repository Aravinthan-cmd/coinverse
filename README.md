# CryptoTracker - Cryptocurrency Dashboard

A modern, responsive cryptocurrency dashboard built with Next.js and the CoinGecko API. Track live prices, build watchlists, and analyze market data for top cryptocurrencies.

## Features

- **Live Market Data**: Real-time cryptocurrency prices, market caps, and trading volumes
- **Interactive Charts**: Price charts with multiple time ranges (24h, 7d, 30d, 90d)
- **Watchlist**: Save and track your favorite cryptocurrencies with localStorage persistence
- **Advanced Filtering**: Filter coins by price range, market cap, and sort by various metrics
- **Search Functionality**: Debounced search to find cryptocurrencies by name or symbol
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Skeleton loading animations and error handling

## Tech Stack

- **Next.js 13** - React framework with app router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Recharts** - Interactive chart library
- **Lucide React** - Beautiful icons
- **CoinGecko API** - Cryptocurrency market data

## Getting Started

### Prerequisites

1. Node.js 18+ installed
2. A CoinGecko API account (free tier available)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Get your CoinGecko API key:
   - Sign up at [CoinGecko](https://www.coingecko.com/en/developers/dashboard)
   - Create a free Demo Account
   - Generate an API key

4. Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser



## Key Features Implementation

### Watchlist Management
- Uses React Context for global state management
- Persists data in localStorage
- Real-time updates across components

### Search & Filtering
- Debounced search to reduce API calls
- Client-side filtering for better performance
- Multiple filter options (price, market cap, volume)

### Charts
- Interactive price charts using Recharts
- Multiple time ranges with dynamic data fetching
- Responsive design with custom tooltips

### Error Handling
- Comprehensive error states
- Retry functionality
- Loading skeletons for better UX

## Deployment

The app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!
