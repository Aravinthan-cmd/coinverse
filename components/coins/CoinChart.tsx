'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCoinChart } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { ErrorState } from '@/components/ui/error-state';

interface CoinChartProps {
  coinId: string;
}

interface ChartDataPoint {
  timestamp: number;
  price: number;
  date: string;
}

const timeRanges = [
  { label: '24H', days: 1, interval: 'hourly' },
  { label: '7D', days: 7, interval: 'hourly' },
  { label: '30D', days: 30, interval: 'daily' },
  { label: '90D', days: 90, interval: 'daily' },
];

export function CoinChart({ coinId }: CoinChartProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [selectedRange, setSelectedRange] = useState(timeRanges[1]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getCoinChart(
          coinId,
          selectedRange.days,
          selectedRange.interval
        );

        const formattedData = data.prices.map(
          ([timestamp, price]: [number, number]) => ({
            timestamp,
            price,
            date: new Date(timestamp).toLocaleDateString(),
          })
        );

        setChartData(formattedData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load chart data'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [coinId, selectedRange, reloadKey]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartDataPoint;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(data.timestamp).toLocaleString()}
          </p>
          <p className="text-lg font-semibold">{formatCurrency(data.price)}</p>
        </div>
      );
    }
    return null;
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <ErrorState
            title="Chart Error"
            message={error}
            onRetry={() => setReloadKey((k) => k + 1)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Price Chart</CardTitle>
          <div className="flex space-x-2">
            {timeRanges.map((range) => (
              <Button
                key={range.label}
                variant={
                  selectedRange.label === range.label ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => setSelectedRange(range)}>
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSkeleton className="h-80 w-full" />
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(timestamp) => {
                    const date = new Date(timestamp);
                    if (selectedRange.days === 1) {
                      return date.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                    }
                    return date.toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  className="text-xs"
                />
                <YAxis
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={(value) => formatCurrency(value, 'USD', 0, 2)}
                  className="text-xs"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 4,
                    stroke: 'hsl(var(--primary))',
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}