import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useTableApprovals } from '@/pages/user-approval-requests/_components/hook/use-table-approvals';
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

function createWrapper(filterNome = '', filterEmpresaId = '') {
  mockContextValue.filterNome = filterNome;
  mockContextValue.filterEmpresaId = filterEmpresaId;
  return function Wrapper({ children }: { children: ReactNode }) {
    return <>{children}</>;
  };
}

const mockRequests = userMock.requests.map(request => ({
  ...request,
  dataAlteracao: new Date().toISOString(),
}));

const mockRequestsWithoutChanges = userMock.requests.map(request => ({
  ...request,
  dataAlteracao: null,
}));

describe('useTableApprovals', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve carregar os dados iniciais corretamente', async () => {
    vi.mocked(getAllUserRequests).mockResolvedValueOnce([
      ...mockRequests,
      ...mockRequestsWithoutChanges,
    ]);

    const { result, unmount } = renderHook(() => useTableApprovals(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.dataApprovals).toEqual(mockRequests);

    expect(getAllUserRequests).toHaveBeenCalledWith(
      {},
      expect.any(AbortSignal)
    );

    unmount();
  });

  it('deve filtrar por nome com debounce', async () => {
    const filterNome = 'Elon';
    vi.mocked(getAllUserRequests).mockResolvedValueOnce(mockRequests);

    const { unmount } = renderHook(() => useTableApprovals(), {
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

    unmount();
  });

  it('deve filtrar por empresa', async () => {
    const filterEmpresaId = '123';
    vi.mocked(getAllUserRequests).mockResolvedValueOnce(mockRequests);

    const { unmount } = renderHook(() => useTableApprovals(), {
      wrapper: createWrapper('', filterEmpresaId),
    });

    await waitFor(() => {
      const calls = vi.mocked(getAllUserRequests).mock.calls;
      const lastCall = calls[calls.length - 1];
      expect(lastCall[0]).toEqual({ idEmpresa: Number(filterEmpresaId) });
    });

    unmount();
  });

  it('deve filtrar por nome e empresa simultaneamente', async () => {
    const filterNome = 'Elon';
    const filterEmpresaId = '123';
    vi.mocked(getAllUserRequests).mockResolvedValueOnce(mockRequests);

    const { unmount } = renderHook(() => useTableApprovals(), {
      wrapper: createWrapper(filterNome, filterEmpresaId),
    });

    await waitFor(
      () => {
        const calls = vi.mocked(getAllUserRequests).mock.calls;
        const lastCall = calls[calls.length - 1];
        expect(lastCall[0]).toEqual({
          nome: filterNome,
          idEmpresa: Number(filterEmpresaId),
        });
      },
      { timeout: 1000 }
    );

    unmount();
  });

  it('deve tratar erros corretamente', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    vi.mocked(getAllUserRequests).mockRejectedValueOnce(new Error('API Error'));

    const { result, unmount } = renderHook(() => useTableApprovals(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(result.current.dataApprovals).toEqual([]);

    unmount();
  });

  it('deve ignorar erro de CanceledError', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    const cancelError = new Error('Canceled');
    cancelError.name = 'CanceledError';
    vi.mocked(getAllUserRequests).mockRejectedValueOnce(cancelError);

    const { result, unmount } = renderHook(() => useTableApprovals(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    unmount();
  });
});
