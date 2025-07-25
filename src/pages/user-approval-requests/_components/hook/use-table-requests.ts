import { useCallback, useEffect, useRef, useState } from 'react';

import { useDebounce } from '@/hooks/use-debounce';
import { useUserApprovalRequestsContext } from '@/pages/user-approval-requests/context';
import { getAllUserRequests } from '@/services/user/table-requests';
import type { GetUserRequestsResponse } from '@/types/user/requests/http';

export const useTableRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataRequests, setDataRequests] = useState<GetUserRequestsResponse[]>(
    []
  );
  const abortControllerRef = useRef<AbortController | null>(null);

  const { filterEmpresaId, filterNome } = useUserApprovalRequestsContext();

  const debouncedNome = useDebounce(filterNome, 600);

  const fetchRequests = useCallback(async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      const params: {
        nome?: string;
        idEmpresa?: number;
      } = {};

      if (debouncedNome) params.nome = debouncedNome;
      if (filterEmpresaId) params.idEmpresa = Number(filterEmpresaId);

      const data = await getAllUserRequests(
        { ...params },
        abortControllerRef.current.signal
      );

      setDataRequests(data);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'CanceledError') return;

      console.error(
        'Erro ao buscar solicitações de cadastro de usuário:',
        error
      );
    } finally {
      setIsLoading(false);
    }
  }, [debouncedNome, filterEmpresaId]);

  useEffect(() => {
    fetchRequests();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchRequests]);

  return { dataRequests, isLoading };
};
