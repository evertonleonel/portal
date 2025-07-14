import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe as viDescribe, expect, it, vi } from 'vitest';

import { useFormRegister } from '@/pages/auth/signin/_components/forms/register/hook/use-form-register';
import type { RegisterInputs } from '@/pages/auth/signin/_components/forms/register/schema';
import { useSigninContext } from '@/pages/auth/signin/context';
import { userRequestRegister } from '@/services/auth/signin/register';
import { getAllEmpresa } from '@/services/empresa';

import { empresaMock } from '../../../../../../_setup/mocks/empresa';

vi.mock('@/pages/auth/signin/context', () => ({
  useSigninContext: vi.fn(),
}));

vi.mock('@/services/auth/signin/register', () => ({
  userRequestRegister: vi.fn(),
}));

vi.mock('@/services/empresa', () => ({
  getAllEmpresa: vi.fn(),
}));

const mockEmpresas = empresaMock;

viDescribe('useFormRegister', () => {
  const mockHandleUpdateViewForm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useSigninContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      handleUpdateViewForm: mockHandleUpdateViewForm,
    });
  });

  it('deve buscar empresas ao inicializar o hook', async () => {
    (getAllEmpresa as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockEmpresas
    );

    const { result } = renderHook(() => useFormRegister());

    expect(result.current.isLoadingEmpresas).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoadingEmpresas).toBe(false);
    });

    expect(result.current.empresas).toEqual(mockEmpresas);
    expect(getAllEmpresa).toHaveBeenCalledTimes(1);
  });

  it('deve lidar com erro ao buscar empresas', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (getAllEmpresa as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Erro ao buscar empresas')
    );

    const { result } = renderHook(() => useFormRegister());

    await waitFor(() => {
      expect(result.current.isLoadingEmpresas).toBe(false);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao buscar empresa:',
      expect.any(Error)
    );
    expect(result.current.empresas).toEqual([]);
  });

  it('deve submeter o formulário com sucesso', async () => {
    const mockInputs: RegisterInputs = {
      nome: 'Elon Musk',
      email: 'elon@musk.com',
      empresa: { id: '1' },
      cargo: 'CEO',
    };

    (
      userRequestRegister as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({});

    const { result } = renderHook(() => useFormRegister());

    await act(async () => {
      await result.current.onSubmit(mockInputs);
    });

    expect(userRequestRegister).toHaveBeenCalledWith(mockInputs);
    expect(mockHandleUpdateViewForm).toHaveBeenCalledWith({ sucess: true });
  });

  it('deve lidar com erro ao submeter o formulário', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mockInputs: RegisterInputs = {
      nome: 'Elon Musk',
      email: 'elon@musk.com',
      empresa: { id: '1' },
      cargo: 'CEO',
    };

    (
      userRequestRegister as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValue(new Error('Erro ao registrar'));

    const { result } = renderHook(() => useFormRegister());

    await act(async () => {
      await result.current.onSubmit(mockInputs);
    });

    expect(userRequestRegister).toHaveBeenCalledWith(mockInputs);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao registrar usuário:',
      expect.any(Error)
    );
    expect(mockHandleUpdateViewForm).not.toHaveBeenCalled();
  });
});
