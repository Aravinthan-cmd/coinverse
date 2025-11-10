'use client';

import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/contexts/WatchlistContext';
import { cn } from '@/lib/utils';

interface WatchlistButtonProps {
  coinId: string;
}

export function WatchlistButton({ coinId }: WatchlistButtonProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  return (
    <Button
      variant={isInWatchlist(coinId) ? 'default' : 'outline'}
      onClick={() => toggleWatchlist(coinId)}
    >
      <Star
        className={cn(
          'h-4 w-4 mr-2',
          isInWatchlist(coinId) && 'fill-current'
        )}
      />
      {isInWatchlist(coinId) ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </Button>
  );
}