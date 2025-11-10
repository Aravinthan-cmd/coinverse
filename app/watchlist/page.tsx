'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCoinsMarkets } from '@/lib/api';
import { useWatchlist } from '@/contexts/WatchlistContext';
import { CoinTable } from '@/components/coins/CoinTable';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { CoinTableSkeleton } from '@/components/ui/loading-skeleton';
import { Coin } from '@/types/crypto';

export default function WatchlistPage() {
  const { watchlist, clearWatchlist } = useWatchlist();
  const [watchlistCoins, setWatchlistCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlistCoins = async () => {
      if (watchlist.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch all coins and filter by watchlist
        const allCoins = await getCoinsMarkets(1, 250, 'market_cap_desc');
        const filteredCoins = allCoins.filter((coin: Coin) => watchlist.includes(coin.id));
        
        setWatchlistCoins(filteredCoins);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load watchlist');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlistCoins();
  }, [watchlist]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Watchlist</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Keep track of your favorite cryptocurrencies
              </p>
            </div>
          </div>
          <CoinTableSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">My Watchlist</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Keep track of your favorite cryptocurrencies
            </p>
          </div>
          <ErrorState
            title="Failed to Load Watchlist"
            message={error}
            onRetry={handleRetry}
          />
        </div>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">My Watchlist</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Keep track of your favorite cryptocurrencies
            </p>
          </div>
          <EmptyState
            icon="star"
            title="Your watchlist is empty"
            message="Start building your watchlist by clicking the star icon next to any cryptocurrency."
          />
          <div className="text-center">
            <Button asChild>
              <Link href="/">Browse Markets</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Watchlist</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {watchlist.length} {watchlist.length === 1 ? 'coin' : 'coins'} in your watchlist
            </p>
          </div>
          {watchlist.length > 0 && (
            <Button
              variant="outline"
              onClick={clearWatchlist}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        <CoinTable
          coins={watchlistCoins}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
}