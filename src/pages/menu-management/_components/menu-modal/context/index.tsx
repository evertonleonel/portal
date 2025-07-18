import { createContext, useCallback, useContext, useState } from 'react';

import type { Menu } from '@/types/menu';

interface MenuModalContextType {
  isOpen: boolean;
  onOpen: (data?: Menu) => void;
  onClose: () => void;
  data?: Menu;
}

const MenuModalContext = createContext<MenuModalContextType | undefined>(
  undefined
);

export const MenuModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Menu | undefined>(undefined);

  const onOpen = useCallback((menu?: Menu) => {
    setData(menu);
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <MenuModalContext.Provider value={{ isOpen, onOpen, onClose, data }}>
      {children}
    </MenuModalContext.Provider>
  );
};

export const usePreviewMenuModal = () => {
  const context = useContext(MenuModalContext);
  if (!context) {
    throw new Error(
      'usePreviewMenuModal deve ser usado dentro de um MenuModalProvider'
    );
  }
  return context;
};
