import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCoinDetails, getCoinsMarkets } from '@/lib/api';
import { CoinChart } from '@/components/coins/CoinChart';
import { formatCurrency, formatNumber, formatPercentage, getPercentageColor, cn } from '@/lib/utils';
import { WatchlistButton } from '@/components/coins/WatchlistButton';

export async function generateStaticParams() {
  try {
    // Get top 100 coins for static generation
    const coins = await getCoinsMarkets(1, 100, 'market_cap_desc');
    return coins.map((coin: any) => ({
      id: coin.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return empty array if API fails during build
    return [];
  }
}

interface CoinDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function CoinDetailsPage({ params }: CoinDetailsPageProps) {
  let coin;
  let error = null;

  try {
    coin = await getCoinDetails(params.id);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load coin details';
  }

  if (error || !coin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Markets
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Failed to Load Coin Details</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'Coin not found'}
          </p>
          <Link href="/">
            <Button>Return to Markets</Button>
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Market Cap Rank',
      value: `#${coin.market_data.market_cap_rank}`,
    },
    {
      label: 'Market Cap',
      value: formatCurrency(coin.market_data.market_cap.usd, 'USD', 0),
    },
    {
      label: '24h Volume',
      value: formatCurrency(coin.market_data.total_volume.usd, 'USD', 0),
    },
    {
      label: '24h High',
      value: formatCurrency(coin.market_data.high_24h.usd),
    },
    {
      label: '24h Low',
      value: formatCurrency(coin.market_data.low_24h.usd),
    },
    {
      label: 'Circulating Supply',
      value: formatNumber(coin.market_data.circulating_supply),
    },
    {
      label: 'Total Supply',
      value: coin.market_data.total_supply ? formatNumber(coin.market_data.total_supply) : 'N/A',
    },
    {
      label: 'Max Supply',
      value: coin.market_data.max_supply ? formatNumber(coin.market_data.max_supply) : 'N/A',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Markets
            </Button>
          </Link>
          <WatchlistButton coinId={coin.id} />
        </div>

        {/* Coin Header */}
        <div className="flex items-center space-x-4">
          <Image
            src={coin.image}
            alt={coin.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold">{coin.name}</h1>
              <Badge variant="secondary" className="text-sm uppercase">
                {coin.symbol}
              </Badge>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-2xl font-bold">
                {formatCurrency(coin.market_data.current_price.usd)}
              </span>
              <span
                className={cn(
                  'text-lg font-medium',
                  getPercentageColor(coin.market_data.price_change_percentage_24h)
                )}
              >
                {formatPercentage(coin.market_data.price_change_percentage_24h)}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
                <div className="text-lg font-semibold mt-1">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Price Chart */}
        <CoinChart coinId={coin.id} />

        {/* Description */}
        {coin.description?.en && (
          <Card>
            <CardHeader>
              <CardTitle>About {coin.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: coin.description.en.split('.')[0] + '.',
                }}
              />
              {coin.links?.homepage?.[0] && (
                <div className="mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={coin.links.homepage[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}