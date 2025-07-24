import { createContext, useContext, useState } from 'react';

type Notification = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  isRead: boolean;
};

type NotificationPanelContextType = {
  notifications: Notification[];
  setNotifications: (n: Notification[]) => void;
  selectedIds: string[];
  toggleSelect: (id: string) => void;
  isSelected: (id: string) => boolean;
  toggleSelectAll: () => void;
  isAllSelected: boolean;
  clearSelected: () => void;
};

const NotificationPanelContext =
  createContext<NotificationPanelContextType | null>(null);

export const NotificationPanelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string) => selectedIds.includes(id);

  const isAllSelected =
    notifications.length > 0 && selectedIds.length === notifications.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(notifications.map(n => n.id));
    }
  };

  const clearSelected = () => setSelectedIds([]);

  // const enviarSelecionadas = async () => {
  //   await api.markAsRead(selectedIds);
  //   clearSelected();
  // };

  return (
    <NotificationPanelContext.Provider
      value={{
        notifications,
        setNotifications,
        selectedIds,
        toggleSelect,
        isSelected,
        toggleSelectAll,
        isAllSelected,
        clearSelected,
      }}
    >
      {children}
    </NotificationPanelContext.Provider>
  );
};

export const useNotificationPanel = () => {
  const context = useContext(NotificationPanelContext);
  if (!context)
    throw new Error(
      'useNotificationPanel must be used within NotificationPanelProvider'
    );
  return context;
};

export const mockNotifications = [
  {
    id: '1',
    title: 'Solicitação de acesso',
    description: 'Clara Antunes solicitou acesso ao Portal',
    createdAt: '2 horas atrás',
    isRead: false,
  },
  {
    id: '2',
    title: 'Nova mensagem',
    description: 'Você recebeu uma nova mensagem de suporte',
    createdAt: '1 hora atrás',
    isRead: false,
  },
  {
    id: '3',
    title: 'Atualização no sistema',
    description: 'O sistema foi atualizado com melhorias de performance',
    createdAt: 'Ontem',
    isRead: true,
  },
  {
    id: '4',
    title: 'Convite para reunião',
    description: 'Você foi adicionado à reunião de alinhamento',
    createdAt: '3 dias atrás',
    isRead: false,
  },
  {
    id: '5',
    title: 'Mudança de senha',
    description: 'Sua senha foi alterada com sucesso',
    createdAt: '5 dias atrás',
    isRead: true,
  },
  {
    id: '6',
    title: 'Mudança de senha',
    description: 'Sua senha foi alterada com sucesso',
    createdAt: '5 dias atrás',
    isRead: true,
  },
  {
    id: '7',
    title: 'Mudança de senha',
    description: 'Sua senha foi alterada com sucesso',
    createdAt: '5 dias atrás',
    isRead: true,
  },
  {
    id: '8',
    title: 'Mudança de senha',
    description: 'Sua senha foi alterada com sucesso',
    createdAt: '5 dias atrás',
    isRead: true,
  },
  {
    id: '9',
    title: 'Mudança de senha',
    description: 'Sua senha foi alterada com sucesso',
    createdAt: '5 dias atrás',
    isRead: true,
  },
];
