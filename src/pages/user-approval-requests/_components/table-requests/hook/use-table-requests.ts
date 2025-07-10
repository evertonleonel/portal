import { useEffect, useState } from 'react';

import { getAllUserRequests } from '@/services/user/requests';
import type { GetUserRequestsResponse } from '@/types/user/requests';

export const useTableRequests = () => {
  const [dataRequests, setDataRequests] = useState<GetUserRequestsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUserRequests() {
      try {
        setIsLoading(true);
        const data = await getAllUserRequests();
        setDataRequests(data);
      } catch (error) {
        console.error('Erro ao buscar solicitações de cadastro de usuário:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserRequests();
  }, []);
  return { dataRequests, isLoading };
};
