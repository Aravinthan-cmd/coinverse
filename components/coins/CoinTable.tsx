'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useWatchlist } from '@/contexts/WatchlistContext';
import { Coin } from '@/types/crypto';
import { formatCurrency, formatNumber, formatPercentage, getPercentageColor, cn } from '@/lib/utils';

interface CoinTableProps {
  coins: Coin[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function CoinTable({ coins, currentPage, totalPages, onPageChange, isLoading }: CoinTableProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const handleWatchlistClick = (e: React.MouseEvent, coinId: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(coinId);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="h-6 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>Coin</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h %</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
              <TableHead className="text-right">Volume (24h)</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coins.map((coin) => (
              <TableRow key={coin.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <TableCell className="font-medium">
                  {coin.market_cap_rank}
                </TableCell>
                <TableCell>
                  <Link href={`/coin/${coin.id}`} className="flex items-center space-x-3 hover:text-primary">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-sm text-gray-500 uppercase">{coin.symbol}</div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(coin.current_price)}
                </TableCell>
                <TableCell className={cn('text-right font-medium', getPercentageColor(coin.price_change_percentage_24h))}>
                  {formatPercentage(coin.price_change_percentage_24h)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(coin.market_cap, 'USD', 0)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(coin.total_volume, 'USD', 0)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleWatchlistClick(e, coin.id)}
                    className="p-1 h-8 w-8"
                  >
                    <Star
                      className={cn(
                        'h-4 w-4',
                        isInWatchlist(coin.id)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-400 hover:text-yellow-400'
                      )}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}