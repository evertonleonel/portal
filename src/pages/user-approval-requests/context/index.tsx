import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

import { getAllEmpresa } from '@/services/empresa';
import type { GetEmpresaResponse } from '@/types/empresa';

interface UserApprovalRequestsType {
  empresas: GetEmpresaResponse[];
  isLoadingEmpresas: boolean;
}

const UserApprovalRequestsContext = createContext<UserApprovalRequestsType | undefined>(undefined);

interface UserApprovalRequestsProviderProps {
  children: ReactNode;
}
export const UserApprovalRequestsProvider = ({ children }: UserApprovalRequestsProviderProps) => {
  const [empresas, setEmpresas] = useState<GetEmpresaResponse[]>([]);
  const [isLoadingEmpresas, setIsLoadingEmpresas] = useState(false);

  useEffect(() => {
    async function fetchEmpresas() {
      try {
        setIsLoadingEmpresas(true);
        const data = await getAllEmpresa();
        setEmpresas(data);
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      } finally {
        setIsLoadingEmpresas(false);
      }
    }

    fetchEmpresas();
  }, []);

  return (
    <UserApprovalRequestsContext.Provider value={{ empresas, isLoadingEmpresas }}>
      {children}
    </UserApprovalRequestsContext.Provider>
  );
};

export const useUserApprovalRequestsContext = (): UserApprovalRequestsType => {
  const context = useContext(UserApprovalRequestsContext);
  if (context === undefined) {
    throw new Error('useUserApprovalRequestsContext deve ser usado dentro de um UserApprovalRequestsProvider');
  }
  return context;
};
