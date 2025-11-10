'use client';

import { useState, useEffect, useMemo } from 'react';
import { getCoinsMarkets } from '@/lib/api';
import { useDebounce } from '@/hooks/useDebounce';
import { Coin, FilterOptions } from '@/types/crypto';
import { SearchBar } from '@/components/coins/SearchBar';
import { FilterPanel } from '@/components/coins/FilterPanel';
import { CoinTable } from '@/components/coins/CoinTable';
import { ErrorState } from '@/components/ui/error-state';
import { CoinTableSkeleton } from '@/components/ui/loading-skeleton';

const COINS_PER_PAGE = 50;

export default function HomePage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'market_cap',
    sortOrder: 'desc',
    priceRange: { min: null, max: null },
    marketCapRange: { min: null, max: null },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch coins data
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const sortParam = `${filters.sortBy}_${filters.sortOrder}`;
        const data = await getCoinsMarkets(currentPage, COINS_PER_PAGE, sortParam);
        setCoins(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load coins');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, [currentPage, filters.sortBy, filters.sortOrder]);

  // Filter and search coins
  const filteredCoins = useMemo(() => {
    let result = [...coins];

    // Apply search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
      );
    }

    // Apply price range filter
    if (filters.priceRange.min !== null) {
      result = result.filter((coin) => coin.current_price >= filters.priceRange.min!);
    }
    if (filters.priceRange.max !== null) {
      result = result.filter((coin) => coin.current_price <= filters.priceRange.max!);
    }

    // Apply market cap range filter
    if (filters.marketCapRange.min !== null) {
      result = result.filter((coin) => coin.market_cap >= filters.marketCapRange.min!);
    }
    if (filters.marketCapRange.max !== null) {
      result = result.filter((coin) => coin.market_cap <= filters.marketCapRange.max!);
    }

    return result;
  }, [coins, debouncedSearchQuery, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
  };

  // Calculate total pages (assuming 100 pages max for demo)
  const totalPages = 100;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState
          title="Failed to Load Markets"
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Cryptocurrency Markets
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track prices, market caps, and trading volumes of top cryptocurrencies
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search coins by name or symbol..."
          />
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {isLoading ? (
          <CoinTableSkeleton />
        ) : (
          <CoinTable
            coins={filteredCoins}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}