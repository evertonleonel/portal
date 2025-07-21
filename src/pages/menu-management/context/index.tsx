import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getAllMenu } from '@/services/menu';
import type { GetMenuResponse } from '@/types/menu';

interface MenuManagementType {
  menus: GetMenuResponse[];
  isLoading: boolean;
}

const MenuManagementContext = createContext<MenuManagementType | undefined>(
  undefined
);

interface MenuManagementProviderProps {
  children: ReactNode;
}
export const MenuManagementProvider = ({
  children,
}: MenuManagementProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [menus, setMenus] = useState<GetMenuResponse[]>([]);

  useEffect(() => {
    async function fetchMenus() {
      try {
        setIsLoading(true);
        const data = await getAllMenu();
        setMenus(data);
      } catch (error) {
        console.error('Erro ao buscar menus:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMenus();
  }, []);

  return (
    <MenuManagementContext.Provider
      value={{
        menus,
        isLoading,
      }}
    >
      {children}
    </MenuManagementContext.Provider>
  );
};

export const useMenuManagementContext = (): MenuManagementType => {
  const context = useContext(MenuManagementContext);
  if (context === undefined) {
    throw new Error(
      'useMenuManagementContext deve ser usado dentro de um <MenuManagementProvider>'
    );
  }
  return context;
};
