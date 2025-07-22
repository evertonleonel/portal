import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { usePreviewSubMenuModal } from '@/pages/menu-management/_components/submenu-modal/context';
import { useSubMenuFormModal } from '@/pages/menu-management/_components/submenu-modal/hook/use-submenu-form-modal';
import { patchSubMenu, postSubMenu } from '@/services/menu';

import { mockMenus, mockSubMenu1 } from '../../../../_setup/mocks/menu';

// Mock dos módulos externos
vi.mock('@/services/menu');
vi.mock('@/pages/menu-management/_components/submenu-modal/context', () => ({
  usePreviewSubMenuModal: vi.fn(),
}));

// Mock do table-menus
vi.mock('@/pages/menu-management/_components/table-menus', () => {
  return {
    get mockMenu() {
      return mockMenus;
    },
  };
});

describe('useSubMenuFormModal', () => {
  beforeEach(() => {
    vi.mocked(usePreviewSubMenuModal).mockImplementation(() => ({
      data: undefined,
      isOpen: true,
      onClose: vi.fn(),
      onOpen: vi.fn(),
    }));
  });

  it('deve inicializar o formulário com valores padrão', () => {
    const { result } = renderHook(() => useSubMenuFormModal());

    expect(result.current.form.getValues()).toEqual({
      desc: '',
      caminho: '',
      menuPrincipal: '',
      ordemExibicao: '',
    });
  });

  it('deve criar um novo sub-menu com sucesso', async () => {
    const mockPostSubMenu = vi.mocked(postSubMenu);
    const { result } = renderHook(() => useSubMenuFormModal());

    const formData = {
      desc: 'Novo Sub Menu',
      caminho: '/novo',
      menuPrincipal: '1',
      ordemExibicao: '1',
    };

    await act(async () => {
      await result.current.form.setValue('desc', formData.desc);
      await result.current.form.setValue('caminho', formData.caminho);
      await result.current.form.setValue(
        'menuPrincipal',
        formData.menuPrincipal
      );
      await result.current.form.setValue(
        'ordemExibicao',
        formData.ordemExibicao
      );
      await result.current.onSubmit(formData);
    });

    await waitFor(() => {
      expect(mockPostSubMenu).toHaveBeenCalledWith(formData);
    });
  });

  it('deve atualizar um sub-menu existente com sucesso', async () => {
    vi.mocked(usePreviewSubMenuModal).mockImplementation(() => ({
      data: mockSubMenu1,
      isOpen: true,
      onClose: vi.fn(),
      onOpen: vi.fn(),
    }));

    const mockPatchSubMenu = vi.mocked(patchSubMenu);
    const { result } = renderHook(() => useSubMenuFormModal());

    const formData = {
      desc: 'Sub Menu Atualizado',
      caminho: '/submenu-atualizado',
      menuPrincipal: '1',
      ordemExibicao: '2',
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    await waitFor(() => {
      expect(mockPatchSubMenu).toHaveBeenCalledWith({
        ...formData,
        id: mockSubMenu1.id.toString(),
      });
    });
  });

  it('deve construir o caminho completo corretamente', async () => {
    const { result } = renderHook(() => useSubMenuFormModal());

    await act(async () => {
      await result.current.form.setValue('menuPrincipal', '1');
      await result.current.form.setValue('caminho', '/submenu');
    });

    expect(result.current.inputFullPathValue).toBe('/aprovar/submenu');
  });
});
