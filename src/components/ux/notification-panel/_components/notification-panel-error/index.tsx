import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export const NotificationPanelErrorState = () => {
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
