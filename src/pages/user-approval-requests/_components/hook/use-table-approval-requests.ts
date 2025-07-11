import { useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/use-debounce';
import { useUserApprovalRequestsContext } from '@/pages/user-approval-requests/context';
import { getAllUserRequests } from '@/services/user/requests';
import type { GetUserRequestsResponse } from '@/types/user/requests';

export const useTableApprovalRequests = () => {
  const [dataRequests, setDataRequests] = useState<GetUserRequestsResponse[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const { filterEmpresaId, filterNome } = useUserApprovalRequestsContext();
  const debounceName = useDebounce(filterNome, 600);

  const dataApprovals = dataRequests.filter(el => el.dataAlteracao !== null);

  const parsedataRequests = dataRequests.map(item => ({
    ...item,
    dataCriacao: new Date(item.dataCriacao),
    dataAlteracao: item.dataAlteracao ? new Date(item.dataAlteracao) : null,
  }));

  useEffect(() => {
    async function fetchUserRequests() {
      try {
        setIsLoading(true);

        const data = await getAllUserRequests({});

        setDataRequests(data);
      } catch (error) {
        console.error(
          'Erro ao buscar solicitações de cadastro de usuário:',
          error
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (!filterNome && !filterEmpresaId) {
      fetchUserRequests();
    }
  }, []);

  useEffect(() => {
    async function fetchUserRequests() {
      try {
        setIsLoading(true);
        const data = await getAllUserRequests({
          nome: debounceName,
          idEmpresa: Number(filterEmpresaId),
        });
        setDataRequests(data);
      } catch (error) {
        console.error(
          'Erro ao buscar solicitações de cadastro de usuário:',
          error
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserRequests();
  }, [debounceName, filterEmpresaId]);

  return { dataRequests, dataApprovals, isLoading, parsedataRequests };
};
