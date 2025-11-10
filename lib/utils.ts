import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  currency: string = 'USD',
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return '$0.00';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

export function formatNumber(value: number): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0';
  }

  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  }
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }
  
  return value.toLocaleString();
}

export function formatPercentage(value: number): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0.00%';
  }
  
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function getPercentageColor(percentage: number): string {
  if (percentage > 0) {
    return 'text-green-600 dark:text-green-400';
  } else if (percentage < 0) {
    return 'text-red-600 dark:text-red-400';
  }
  return 'text-gray-600 dark:text-gray-400';
}