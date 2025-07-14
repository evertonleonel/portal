import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { useTableApprovalRequests } from '@/pages/user-approval-requests/_components/hook/use-table-approval-requests';
import { getAllUserRequests } from '@/services/user/requests';

import { userMock } from '../../../../_setup/mocks/user';

// Mock do módulo de serviço
vi.mock('@/services/user/requests', () => ({
  getAllUserRequests: vi.fn(),
}));

const mockContextValue = {
  filterNome: '',
  filterEmpresaId: '',
  setFilterNome: vi.fn(),
  setFilterEmpresaId: vi.fn(),
};

vi.mock('@/pages/user-approval-requests/context', () => ({
  useUserApprovalRequestsContext: vi.fn(() => mockContextValue),
}));

function createWrapper(filterNome = '') {
  mockContextValue.filterNome = filterNome;
  return function Wrapper({ children }: { children: ReactNode }) {
    return <>{children}</>;
  };
}

const mockRequests = userMock.requests;

describe('useTableApprovalRequests', () => {
  it('deve carregar os dados iniciais corretamente', async () => {
    vi.mocked(getAllUserRequests).mockResolvedValueOnce(mockRequests);

    const { result } = renderHook(() => useTableApprovalRequests(), {
      wrapper: createWrapper(),
    });

    // Verifica estado inicial de loading
    expect(result.current.isLoading).toBe(true);

    // Aguarda carregamento
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verifica se os dados foram carregados
    expect(result.current.dataRequests).toEqual(mockRequests);
    // Verifica se os dados de aprovação foram filtrados corretamente
    expect(result.current.dataApprovals).toHaveLength(1);
  });

  it('deve filtrar por nome com debounce', async () => {
    const filterNome = 'Elon';
    vi.mocked(getAllUserRequests).mockResolvedValueOnce(mockRequests);

    renderHook(() => useTableApprovalRequests(), {
      wrapper: createWrapper(filterNome),
    });

    // Aguarda o debounce e a chamada da API
    await waitFor(
      () => {
        expect(getAllUserRequests).toHaveBeenCalledWith({ nome: filterNome });
      },
      { timeout: 1000 }
    );
  });

  it('deve tratar erros corretamente', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    vi.mocked(getAllUserRequests).mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useTableApprovalRequests(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(result.current.dataRequests).toEqual([]);
  });
});
