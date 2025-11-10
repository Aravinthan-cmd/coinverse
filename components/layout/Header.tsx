'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Star, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Markets', href: '/', icon: TrendingUp },
  { name: 'Watchlist', href: '/watchlist', icon: Star },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">CryptoTracker</span>
          </Link>
          
          <nav className="flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? 'default' : 'ghost'}
                  size="sm"
                  asChild
                >
                  <Link href={item.href} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:block">{item.name}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}