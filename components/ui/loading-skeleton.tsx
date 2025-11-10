import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
        className
      )}
    />
  );
}

export function CoinTableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
          <LoadingSkeleton className="h-6 w-8" />
          <LoadingSkeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <LoadingSkeleton className="h-4 w-24" />
            <LoadingSkeleton className="h-3 w-16" />
          </div>
          <LoadingSkeleton className="h-4 w-20" />
          <LoadingSkeleton className="h-4 w-16" />
          <LoadingSkeleton className="h-4 w-24" />
          <LoadingSkeleton className="h-4 w-20" />
          <LoadingSkeleton className="h-6 w-6" />
        </div>
      ))}
    </div>
  );
}

export function CoinDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <LoadingSkeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <LoadingSkeleton className="h-8 w-48" />
          <LoadingSkeleton className="h-4 w-24" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-2">
            <LoadingSkeleton className="h-4 w-20" />
            <LoadingSkeleton className="h-6 w-24" />
          </div>
        ))}
      </div>
      
      <LoadingSkeleton className="h-96 w-full" />
    </div>
  );
}