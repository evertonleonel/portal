import { act, renderHook } from '@testing-library/react';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

import { usePreviewMenuModal } from '@/pages/menu-management/_components/menu-modal/context';
import { useMenuFormModal } from '@/pages/menu-management/_components/menu-modal/hook/use-menu-form-modal';
import * as MenuService from '@/services/menu';

import { mockMenu1 } from '../../../../_setup/mocks/menu';

// Mock do contexto
vi.mock('@/pages/menu-management/_components/menu-modal/context', () => ({
  usePreviewMenuModal: vi.fn(),
}));

// Mock do toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('useMenuFormModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (usePreviewMenuModal as Mock).mockReturnValue({
      isOpen: true,
      onClose: mockOnClose,
      data: null,
    });
  });

  it('deve inicializar o formulário com valores padrão quando não há dados', () => {
    const { result } = renderHook(() => useMenuFormModal());

    expect(result.current.form.getValues()).toEqual({
      desc: '',
      caminho: '',
    });
  });

  it('deve inicializar o formulário com dados do menu quando estiver editando', () => {
    (usePreviewMenuModal as Mock).mockReturnValue({
      isOpen: true,
      onClose: mockOnClose,
      data: mockMenu1,
    });

    const { result } = renderHook(() => useMenuFormModal());

    expect(result.current.form.getValues()).toEqual({
      desc: mockMenu1.desc,
      caminho: mockMenu1.caminho,
    });
  });

  it('deve criar um novo menu com sucesso', async () => {
    const postMenuSpy = vi
      .spyOn(MenuService, 'postMenu')
      .mockResolvedValue(undefined);
    const { result } = renderHook(() => useMenuFormModal());

    const formData = {
      desc: 'Novo Menu',
      caminho: '/novo-menu',
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(postMenuSpy).toHaveBeenCalledWith(formData);
    expect(toast.success).toHaveBeenCalledWith('Menu criado com sucesso!');
  });

  it('deve editar um menu existente com sucesso', async () => {
    const patchMenuSpy = vi
      .spyOn(MenuService, 'patchMenu')
      .mockResolvedValue(undefined);
    (usePreviewMenuModal as Mock).mockReturnValue({
      isOpen: true,
      onClose: mockOnClose,
      data: mockMenu1,
    });

    const { result } = renderHook(() => useMenuFormModal());

    const formData = {
      desc: 'Menu Editado',
      caminho: '/menu-editado',
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(patchMenuSpy).toHaveBeenCalledWith({
      ...formData,
      id: mockMenu1.id.toString(),
    });
    expect(toast.success).toHaveBeenCalledWith('Menu editado com sucesso!');
  });

  it('deve lidar com erro na submissão do formulário', async () => {
    const error = new Error('Erro ao criar menu');
    vi.spyOn(MenuService, 'postMenu').mockRejectedValue(error);
    const { result } = renderHook(() => useMenuFormModal());

    await act(async () => {
      await result.current.onSubmit({
        desc: 'Novo Menu',
        caminho: '/novo-menu',
      });
    });

    expect(toast.success).not.toHaveBeenCalled();
  });
});
