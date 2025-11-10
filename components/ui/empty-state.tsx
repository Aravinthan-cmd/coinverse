import { Coins, Star } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: 'coins' | 'star';
}

export function EmptyState({ title, message, icon = 'coins' }: EmptyStateProps) {
  const IconComponent = icon === 'star' ? Star : Coins;

  return (
    <div className="flex flex-col items-center justify-center min-h-64 text-center space-y-4">
      <IconComponent className="h-12 w-12 text-gray-400" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {message}
        </p>
      </div>
    </div>
  );
}