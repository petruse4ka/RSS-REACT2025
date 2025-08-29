import { cn } from '@/utils/cn';
import { SKELETON_ROWS, SKELETON_COLS } from '@/constants';

export default function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700', className)} />;
}

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Skeleton className="bg-scooter-400 dark:bg-shamrock-400 h-10 w-32" />
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="overflow-hidden">
        <div className="bg-zinc-50 dark:bg-zinc-800">
          <div className="grid grid-cols-6 gap-4 py-4">
            {Array.from({ length: SKELETON_COLS }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-full" />
            ))}
          </div>
        </div>

        <div className="divide-scooter-200 dark:divide-shamrock-400 divide-y">
          {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 py-4">
              {Array.from({ length: SKELETON_COLS }).map((_, index) => (
                <Skeleton key={index} className="h-5 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
