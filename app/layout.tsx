import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { WatchlistProvider } from '@/contexts/WatchlistContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CryptoTracker - Live Cryptocurrency Prices & Market Data',
  description: 'Track live cryptocurrency prices, market caps, and trading volumes. Build your watchlist and analyze price charts for top cryptocurrencies.',
  keywords: 'cryptocurrency, bitcoin, ethereum, crypto prices, market data, trading',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WatchlistProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <main>{children}</main>
          </div>
        </WatchlistProvider>
      </body>
    </html>
  );
}