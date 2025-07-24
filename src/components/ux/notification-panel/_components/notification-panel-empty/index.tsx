import { Icon } from '@/components/ui/icon';

export const NotificationPanelEmptyState = () => {
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
