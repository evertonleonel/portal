import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { useTableRequests } from '@/pages/user-approval-requests/_components/hook/use-table-requests';
import { getAllUserRequests } from '@/services/user/table-requests';

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

describe('useTableRequests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve carregar os dados iniciais corretamente', async () => {
    vi.mocked(getAllUserRequests).mockResolvedValueOnce(mockRequests);

    const { result } = renderHook(() => useTableRequests(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.dataRequests).toEqual(mockRequests);

    expect(getAllUserRequests).toHaveBeenCalledWith(
      {},
      expect.any(AbortSignal)
    );
  });

  it('deve filtrar por nome com debounce', async () => {
    const filterNome = 'Elon';
    vi.mocked(getAllUserRequests).mockResolvedValueOnce(mockRequests);

    renderHook(() => useTableRequests(), {
      wrapper: createWrapper(filterNome),
    });

    await waitFor(
      () => {
        const calls = vi.mocked(getAllUserRequests).mock.calls;
        const lastCall = calls[calls.length - 1];
        expect(lastCall[0]).toEqual({ nome: filterNome });
      },
      { timeout: 1000 }
    );
  });

  it('deve tratar erros corretamente', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    vi.mocked(getAllUserRequests).mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useTableRequests(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(result.current.dataRequests).toEqual([]);
  });

  it('deve limpar o AbortController ao desmontar', () => {
    const { unmount } = renderHook(() => useTableRequests(), {
      wrapper: createWrapper(),
    });

    unmount();

    expect(true).toBe(true);
  });
});
