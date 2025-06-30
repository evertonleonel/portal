import { cn } from '@/utils/lib/tailwind-merge';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="skeleton" className={cn('bg-baixada-neutral-100 animate-pulse rounded-md', className)} {...props} />
  );
}

export { Skeleton };
