'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Coin } from '@/types/crypto';

interface WatchlistContextType {
  watchlist: string[];
  isInWatchlist: (coinId: string) => boolean;
  addToWatchlist: (coinId: string) => void;
  removeFromWatchlist: (coinId: string) => void;
  toggleWatchlist: (coinId: string) => void;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('crypto-watchlist', []);

  const isInWatchlist = useCallback(
    (coinId: string) => watchlist.includes(coinId),
    [watchlist]
  );

  const addToWatchlist = useCallback(
    (coinId: string) => {
      setWatchlist(prev => prev.includes(coinId) ? prev : [...prev, coinId]);
    },
    [setWatchlist]
  );

  const removeFromWatchlist = useCallback(
    (coinId: string) => {
      setWatchlist(prev => prev.filter(id => id !== coinId));
    },
    [setWatchlist]
  );

  const toggleWatchlist = useCallback(
    (coinId: string) => {
      if (isInWatchlist(coinId)) {
        removeFromWatchlist(coinId);
      } else {
        addToWatchlist(coinId);
      }
    },
    [isInWatchlist, addToWatchlist, removeFromWatchlist]
  );

  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
  }, [setWatchlist]);

  const value = {
    watchlist,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    clearWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}