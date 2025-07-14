import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import {
  UserApprovalRequestsProvider,
  useUserApprovalRequestsContext,
} from '@/pages/user-approval-requests/context';
import { getAllEmpresa } from '@/services/empresa';

vi.mock('@/services/empresa', () => ({
  getAllEmpresa: vi.fn(),
}));

const mockEmpresas = [
  { id: '1', nome: 'Empresa 1' },
  { id: '2', nome: 'Empresa 2' },
];

describe('UserApprovalRequestsContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve lançar erro quando usado fora do Provider', () => {
    expect(() => renderHook(() => useUserApprovalRequestsContext())).toThrow(
      'useUserApprovalRequestsContext deve ser usado dentro de um UserApprovalRequestsProvider'
    );
  });

  it('deve carregar empresas ao montar o componente', async () => {
    (
      getAllEmpresa as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(mockEmpresas);

    const { result } = renderHook(() => useUserApprovalRequestsContext(), {
      wrapper: UserApprovalRequestsProvider,
    });

    expect(result.current.isLoadingEmpresas).toBe(true);
    expect(result.current.empresas).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoadingEmpresas).toBe(false);
    });

    expect(result.current.empresas).toEqual(mockEmpresas);
    expect(getAllEmpresa).toHaveBeenCalledTimes(1);
  });

  it('deve tratar erro ao carregar empresas', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (
      getAllEmpresa as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValueOnce(new Error('Erro ao carregar empresas'));

    const { result } = renderHook(() => useUserApprovalRequestsContext(), {
      wrapper: UserApprovalRequestsProvider,
    });

    await waitFor(() => {
      expect(result.current.isLoadingEmpresas).toBe(false);
    });

    expect(result.current.empresas).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao buscar empresas:',
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it('deve atualizar filtro de empresa', () => {
    const { result } = renderHook(() => useUserApprovalRequestsContext(), {
      wrapper: UserApprovalRequestsProvider,
    });

    act(() => {
      result.current.handleFilterEmpresa({ id: '1' });
    });

    expect(result.current.filterEmpresaId).toBe('1');
  });

  it('deve atualizar filtro de nome', () => {
    const { result } = renderHook(() => useUserApprovalRequestsContext(), {
      wrapper: UserApprovalRequestsProvider,
    });

    act(() => {
      result.current.handleFilterNome('Elon Musk');
    });

    expect(result.current.filterNome).toBe('Elon Musk');
  });
});
