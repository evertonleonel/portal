import { useCallback, useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/use-debounce';
import { useUserApprovalRequestsContext } from '@/pages/user-approval-requests/context';
import { getAllUserRequests } from '@/services/user/requests';
import type { GetUserRequestsResponse } from '@/types/user/requests';
export const useTableApprovalRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataRequests, setDataRequests] = useState<GetUserRequestsResponse[]>(
    []
  );

  const { filterEmpresaId, filterNome } = useUserApprovalRequestsContext();

  const debouncedNome = useDebounce(filterNome, 600);

  const fetchUserRequests = useCallback(async () => {
    try {
      setIsLoading(true);

      const params: {
        nome?: string;
        idEmpresa?: number;
      } = {};

      if (debouncedNome) params.nome = debouncedNome;
      if (filterEmpresaId) params.idEmpresa = Number(filterEmpresaId);

      const data = await getAllUserRequests(params);

      setDataRequests(data);
    } catch (error) {
      console.error(
        'Erro ao buscar solicitações de cadastro de usuário:',
        error
      );
    } finally {
      setIsLoading(false);
    }
  }, [debouncedNome, filterEmpresaId]);

  useEffect(() => {
    fetchUserRequests();
  }, [fetchUserRequests]);

  const dataApprovals = dataRequests.filter(el => el.dataAlteracao !== null);

  return { dataApprovals, dataRequests, isLoading };
};
