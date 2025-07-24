import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Notification } from '@/types/notification';
import { formatElapsedTime } from '@/utils/format-elapsed-time';

import { NotificationPanelEmptyState } from './_components/notification-panel-empty';
import { NotificationPanelProvider, useNotificationPanel } from './context';
import { mockNotification } from './mock';

export const NotificationPanel = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NotificationPanelProvider>
      <NotificationPanelWrapper>{children}</NotificationPanelWrapper>
    </NotificationPanelProvider>
  );
};

const NotificationPanelWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { notifications } = useNotificationPanel();
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={'end'}
        className="shadow-popover border-none p-0 sm:w-[380px]"
      >
        {notifications.length > 0 && <NotificationPanelContent />}
        {notifications.length === 0 && <NotificationPanelEmptyState />}
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
          <span className="flex items-center justify-between gap-1 py-2.5 pl-3">
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

        <ScrollArea className="h-72 w-full px-5">
          <ul className="flex flex-col">
            {mockNotification.map(n => (
              <NotificationItem
                key={n.id}
                notification={n}
                isSelected={isSelected(n.id.toString())}
                onToggle={() => toggleSelect(n.id.toString())}
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

type NotificationItemProps = {
  notification: Notification;
  isSelected: boolean;
  onToggle: () => void;
};

export const NotificationItem = ({
  notification,
  isSelected,
  onToggle,
}: NotificationItemProps) => {
  return (
    <li className="list-none">
      <button
        onClick={onToggle}
        className={cn(
          'flex w-full cursor-pointer items-center gap-3 p-3 pb-6 transition-all',
          isSelected ? 'bg-accent hover:bg-accent/50' : 'hover:bg-accent'
        )}
      >
        <picture className="hidden md:block">
          {notification.lido ? (
            <Icon name="notificationPanelOff" />
          ) : (
            <Icon name="notificationPanelOn" />
          )}
        </picture>

        <div className="w-full text-left">
          <div className="grid grid-cols-[1fr_0.5fr] items-center justify-between gap-0.5 text-sm font-semibold">
            <Tooltip>
              <TooltipTrigger>
                <span className="line-clamp-2">{notification.descricao}</span>
              </TooltipTrigger>
              <TooltipContent
                className={cn(
                  'hidden',
                  notification.descricao.length > 39 && 'block'
                )}
              >
                {notification.descricao}
              </TooltipContent>
            </Tooltip>
            <span className="text-muted-foreground ml-auto flex items-center gap-2 text-[10px]">
              <p>{formatElapsedTime(notification.dataCriacao)}</p>
              {!notification.lido && (
                <div className="bg-badge size-2 min-w-2 rounded-full data-[state=active]:block" />
              )}
            </span>
          </div>
          <p className="text-muted-foreground text-xs">
            {notification.usuario.nome}
          </p>
        </div>
      </button>
    </li>
  );
};
