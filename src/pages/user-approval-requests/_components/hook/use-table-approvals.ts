import { useCallback, useEffect, useRef, useState } from 'react';

import { useDebounce } from '@/hooks/use-debounce';
import { useUserApprovalRequestsContext } from '@/pages/user-approval-requests/context';
import { getAllUserRequests } from '@/services/user/requests';
import type { GetUserRequestsResponse } from '@/types/user/requests';

export const useTableApprovals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataApprovals, setDataApprovals] = useState<GetUserRequestsResponse[]>(
    []
  );
  const abortControllerRef = useRef<AbortController | null>(null);

  const { filterEmpresaId, filterNome } = useUserApprovalRequestsContext();

  const debouncedNome = useDebounce(filterNome, 600);

  const fetchApprovals = useCallback(async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      const params: {
        nome?: string;
        idEmpresa?: number;
        // INFO: Não existe parâmetro no backend para filtrar apenas pendentes por status, filtro feito no frontend
      } = {};

      if (debouncedNome) params.nome = debouncedNome;
      if (filterEmpresaId) params.idEmpresa = Number(filterEmpresaId);

      const data = await getAllUserRequests(
        { ...params },
        abortControllerRef.current.signal
      );

      const dataApprovals = data.filter(el => el.dataAlteracao !== null);

      setDataApprovals(dataApprovals);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'CanceledError') return;

      console.error('Erro ao buscar aprovações de cadastro de usuário:', error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedNome, filterEmpresaId]);

  useEffect(() => {
    fetchApprovals();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchApprovals]);

  return { dataApprovals, isLoading };
};
