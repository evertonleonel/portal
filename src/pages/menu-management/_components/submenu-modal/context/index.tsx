import { createContext, useCallback, useContext, useState } from 'react';

import type { SubMenu } from '@/types/menu';

interface SubMenuModalContextType {
  isOpen: boolean;
  onOpen: (data?: SubMenu) => void;
  onClose: () => void;
  data?: SubMenu;
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
  const [data, setData] = useState<SubMenu | undefined>(undefined);

  const onOpen = useCallback((menu?: SubMenu) => {
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
