import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';

export const NotificationPanel = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={'end'}
        className="shadow-popover border-none p-0 md:w-[380px]"
      >
        <header className="border-table flex items-center justify-between gap-2 border-b p-3">
          <p className="text-primary-hover text-sm font-semibold">
            Notificações
          </p>
          <Button variant={'outline'} size={'icon-sm'}>
            <Icon name="config" />
          </Button>
        </header>
        <main className="flex flex-col items-center justify-between gap-2 px-4 pb-9 pt-1">
          <section className="w-full">
            <span className="flex items-center justify-between gap-1 px-3 py-2.5">
              <div className="flex gap-1">
                <p className="text-primary-hover text-sm font-semibold">
                  Novas
                </p>
                <Badge className="h-[15px] w-[17px] rounded-full">3</Badge>
              </div>
              <Button
                size={'sm'}
                variant={'ghost'}
                className="cursor-pointer text-xs font-semibold"
              >
                Marcar tudo como lida
              </Button>
            </span>
          </section>
          <section className="w-full">
            <li className="bg-accent flex items-center gap-3 p-3 pb-6">
              <div className="">
                <Icon name="notificationPanelOn" />
              </div>
              <p className="w-full space-y-0.5">
                <span className="flex w-full items-center justify-between gap-1">
                  <div className="text-popover-foreground text-sm font-semibold">
                    Solicitação de acesso
                  </div>
                  <span className="text-muted-foreground flex items-center gap-2 text-[10px]">
                    06 horas atrás
                    <div className="bg-badge size-2 rounded-full" />
                  </span>
                </span>
                <span className="text-popover-foreground text-sm font-semibold">
                  aa
                </span>
              </p>
            </li>
          </section>
        </main>
        <footer className="bg-separator flex items-center justify-center rounded-b-lg">
          <Button
            variant={'ghost'}
            size={'sm'}
            className="cursor-pointer text-sm font-semibold"
          >
            Ver mais
          </Button>
        </footer>
      </PopoverContent>
    </Popover>
  );
};

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
