import { Skeleton } from '@/components/ui/skeleton';

export const NofiticationPanelSkeleton = () => {
  const opacities = [1, 0.8, 0.7, 0.6, 0.4, 0.3, 0.2];
  return (
    <ul className="flex flex-col gap-6 p-3 pb-8">
      {opacities.map((opacity, index) => (
        <li key={index} className="flex items-center" style={{ opacity }}>
          <div>
            <Skeleton className="size-10 rounded-full" />
          </div>
          <div className="flex w-full flex-col gap-1">
            <Skeleton className="h-3 w-[40%] rounded-sm" />
            <Skeleton className="h-3 w-[30%] rounded-sm" />
          </div>
          <Skeleton className="size-6 rounded-sm" />
        </li>
      ))}
    </ul>
  );
};
