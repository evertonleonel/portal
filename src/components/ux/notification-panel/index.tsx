import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import { NotificationPanelProvider, useNotificationPanel } from './context';

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
        <NotificationPanelProvider>
          <NotificationPanelContent />
          {/* <NotificationPanelEmptyState  /> */}
          {/* <NotificationPanelErrorState  /> */}
        </NotificationPanelProvider>
      </PopoverContent>
    </Popover>
  );
};

const NotificationPanelContent = () => {
  const {
    notifications,
    toggleSelect,
    isSelected,
    toggleSelectAll,
    isAllSelected,
  } = useNotificationPanel();
  return (
    <>
      <header className="border-table flex items-center justify-between gap-2 border-b p-3">
        <p className="text-primary-hover text-sm font-semibold">Notificações</p>
        <Button variant={'outline'} size={'icon-sm'}>
          <Icon name="config" />
        </Button>
      </header>
      <main className="flex flex-col items-center justify-between gap-2 pb-9 pt-1">
        <section className="w-full px-4">
          <span className="flex items-center justify-between gap-1 px-3 py-2.5">
            <div className="flex gap-1">
              <p className="text-primary-hover text-sm font-semibold">Novas</p>
              <Badge className="h-[15px] w-[17px] rounded-full">
                {notifications.length}
              </Badge>
            </div>
            <Button
              size={'sm'}
              variant={'ghost'}
              className="cursor-pointer text-xs font-semibold"
              onClick={toggleSelectAll}
            >
              {isAllSelected ? 'Desmarcar tudo' : 'Marcar tudo como lida'}
            </Button>
          </span>
        </section>
        <ScrollArea className="h-72 px-4">
          <ul className="flex flex-col gap-2">
            {notifications.map(n => (
              <NotificationItem
                key={n.id}
                notification={n}
                isSelected={isSelected(n.id)}
                onToggle={() => toggleSelect(n.id)}
              />
            ))}
          </ul>
        </ScrollArea>
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
    </>
  );
};

type Notification = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  isRead: boolean;
};

type Props = {
  notification: Notification;
  isSelected: boolean;
  onToggle: () => void;
};

export const NotificationItem = ({
  notification,
  isSelected,
  onToggle,
}: Props) => {
  return (
    <li className="list-none">
      <button
        onClick={onToggle}
        className={cn(
          'flex w-full items-center gap-3 p-3 pb-6 transition-all',
          isSelected ? 'bg-accent hover:bg-accent/50' : 'hover:bg-accent'
        )}
      >
        <Icon name="notificationPanelOn" />
        <div className="w-full text-left">
          <div className="flex justify-between text-sm font-semibold">
            <span>{notification.title}</span>
            <span className="text-muted-foreground flex items-center gap-2 text-[10px]">
              {notification.createdAt}
              <div className="bg-badge size-2 rounded-full data-[state=active]:block" />
            </span>
          </div>
          <p className="text-muted-foreground text-xs">
            {notification.description}
          </p>
        </div>
      </button>
    </li>
  );
};

const NofiticationPanelSkeleton = () => {
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

const NotificationPanelEmptyState = () => {
  return (
    <div className="gap-1 space-y-1 py-44 text-center">
      <Icon name="notificationDefault" className="mx-auto" />
      <p className="text-foreground pt-5 font-semibold">Sem notificações</p>
      <p className="text-muted-foreground text-sm">
        Não existem notificações para serem
      </p>
      <p className="text-muted-foreground text-sm">exibidas no momento.</p>
    </div>
  );
};

const NotificationPanelErrorState = () => {
  return (
    <div className="gap-1 space-y-6 py-44 text-center">
      <Icon name="notificationError" className="mx-auto" />
      <div className="space-y-1">
        <p className="text-foreground font-semibold">Erro ao carregar</p>
        <p className="text-muted-foreground text-sm">
          Não conseguimos carregar as notificações.
        </p>
      </div>
      <Button className="cursor-pointer">Tentar novamente</Button>
    </div>
  );
};
