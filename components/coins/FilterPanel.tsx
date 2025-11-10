'use client';

import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FilterOptions } from '@/types/crypto';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFiltersChange({
      ...filters,
      sortBy,
    });
  };

  const handleSortOrderChange = () => {
    onFiltersChange({
      ...filters,
      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  const handlePriceRangeChange = (field: 'min' | 'max', value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [field]: numValue,
      },
    });
  };

  const handleMarketCapRangeChange = (field: 'min' | 'max', value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    onFiltersChange({
      ...filters,
      marketCapRange: {
        ...filters.marketCapRange,
        [field]: numValue,
      },
    });
  };

  const SortIcon = filters.sortOrder === 'asc' ? SortAsc : SortDesc;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={filters.sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="market_cap">Market Cap</SelectItem>
          <SelectItem value="price">Price</SelectItem>
          <SelectItem value="volume">Volume</SelectItem>
          <SelectItem value="price_change_24h">24h Change</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="sm"
        onClick={handleSortOrderChange}
        className="px-3"
      >
        <SortIcon className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Price Range (USD)</Label>
              <div className="flex space-x-2 mt-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min || ''}
                  onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max || ''}
                  onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Market Cap Range (USD)</Label>
              <div className="flex space-x-2 mt-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.marketCapRange.min || ''}
                  onChange={(e) => handleMarketCapRangeChange('min', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.marketCapRange.max || ''}
                  onChange={(e) => handleMarketCapRangeChange('max', e.target.value)}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}