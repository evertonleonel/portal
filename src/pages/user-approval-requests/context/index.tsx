import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getAllEmpresa } from '@/services/empresa';
import type { GetEmpresaResponse } from '@/types/empresa';

interface UserApprovalRequestsType {
  empresas: GetEmpresaResponse[];
  isLoadingEmpresas: boolean;

  filterEmpresaId: string;
  handleFilterEmpresa: ({ id }: { id: string }) => void;

  filterNome: string;
  handleFilterNome: (nome: string) => void;
}

const UserApprovalRequestsContext = createContext<
  UserApprovalRequestsType | undefined
>(undefined);

interface UserApprovalRequestsProviderProps {
  children: ReactNode;
}
export const UserApprovalRequestsProvider = ({
  children,
}: UserApprovalRequestsProviderProps) => {
  const [isLoadingEmpresas, setIsLoadingEmpresas] = useState(false);
  const [empresas, setEmpresas] = useState<GetEmpresaResponse[]>([]);

  const [filterEmpresaId, setFilterEmpresaId] = useState('');
  const [filterNome, setFilterNome] = useState('');

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

  const handleFilterEmpresa = ({ id }: { id: string }) => {
    setFilterEmpresaId(id);
  };

  const handleFilterNome = (nome: string) => {
    setFilterNome(nome);
  };

  return (
    <UserApprovalRequestsContext.Provider
      value={{
        empresas,
        isLoadingEmpresas,
        filterEmpresaId,
        handleFilterEmpresa,
        filterNome,
        handleFilterNome,
      }}
    >
      {children}
    </UserApprovalRequestsContext.Provider>
  );
};

export const useUserApprovalRequestsContext = (): UserApprovalRequestsType => {
  const context = useContext(UserApprovalRequestsContext);
  if (context === undefined) {
    throw new Error(
      'useUserApprovalRequestsContext deve ser usado dentro de um UserApprovalRequestsProvider'
    );
  }
  return context;
};
