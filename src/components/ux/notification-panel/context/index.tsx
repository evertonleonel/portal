import { createContext, useContext, useState } from 'react';

import { mockNotification, type Notification } from '../mock';

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
    useState<Notification[]>(mockNotification);
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
      setSelectedIds(notifications.map(n => n.id.toString()));
    }
  };

  const clearSelected = () => setSelectedIds([]);

  // const enviarSelecionadas = async () => {
  //   await api.markAsRead(selectedIds);
  //   clearSelected();
  // };

  console.log(notifications, 'notifications');

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
