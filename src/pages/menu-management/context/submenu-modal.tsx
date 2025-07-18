import { createContext, useCallback, useContext, useState } from 'react';

import type { Menu } from '@/types/menu';

interface SubMenuModalContextType {
  isOpen: boolean;
  onOpen: (data: Menu) => void;
  onClose: () => void;
  data?: Menu;
}

const SubMenuModalContext = createContext<SubMenuModalContextType | undefined>(
  undefined
);

export const SubMenuModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Menu | undefined>(undefined);

  const onOpen = useCallback((menu: Menu) => {
    setData(menu);
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <SubMenuModalContext.Provider value={{ isOpen, onOpen, onClose, data }}>
      {children}
    </SubMenuModalContext.Provider>
  );
};

export const usePreviewSubMenuModal = () => {
  const context = useContext(SubMenuModalContext);
  if (!context) {
    throw new Error(
      'usePreviewSubMenuModal deve ser usado dentro de um SubMenuModalProvider'
    );
  }
  return context;
};
