// tests/components/MenuModal.spec.tsx
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SubMenuModal } from '@/pages/menu-management/_components/submenu-modal';
import { usePreviewSubMenuModal } from '@/pages/menu-management/_components/submenu-modal/context';
import { useSubMenuFormModal } from '@/pages/menu-management/_components/submenu-modal/hook/use-submenu-form-modal';
import type { SubMenuSubModalFormInputs } from '@/pages/menu-management/_components/submenu-modal/schema';
import { MenuManagementProvider } from '@/pages/menu-management/context';

import { mockMenus, mockSubMenu1 } from '../../../../_setup/mocks/menu';

// Mock dos hooks
vi.mock(
  '@/pages/menu-management/_components/submenu-modal/hook/use-submenu-form-modal'
);

// Mock do usePreviewSubMenuModal
vi.mock('@/pages/menu-management/_components/submenu-modal/context', () => ({
  usePreviewSubMenuModal: vi.fn(),
}));

// Mock do MenuManagementContext
vi.mock('@/pages/menu-management/context', () => ({
  MenuManagementProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useMenuManagementContext: () => ({
    isLoading: false,
    menus: mockMenus,
  }),
}));

const mockDefaultValuesSubMenu = {
  desc: '',
  caminho: '',
  menuPrincipal: '',
  ordemExibicao: '',
};

const renderSubMenuModal = (
  mockForm: UseFormReturn<SubMenuSubModalFormInputs>
) => {
  render(
    <MenuManagementProvider>
      <FormProvider {...mockForm}>
        <SubMenuModal />
      </FormProvider>
    </MenuManagementProvider>
  );
};

const renderHookSubMenuModal = () => {
  const { result } = renderHook(() =>
    useForm<SubMenuSubModalFormInputs>({
      defaultValues: mockDefaultValuesSubMenu,
    })
  );

  const mockForm = result.current;

  return mockForm;
};

describe('SubMenuModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar corretamente com título de cadastro', () => {
    const mockForm = renderHookSubMenuModal();

    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    vi.mocked(usePreviewSubMenuModal).mockReturnValue({
      isOpen: true,
      onOpen: vi.fn(),
      onClose: mockOnClose,
      data: undefined,
    });

    vi.mocked(useSubMenuFormModal).mockReturnValue({
      form: mockForm,
      onSubmit: mockOnSubmit,
      onClose: mockOnClose,
      isOpen: true,
      subMenuData: undefined,
      inputFullPathValue: '',
      isPending: false,
    });

    renderSubMenuModal(mockForm);

    expect(screen.getByText('Cadastrar novo submenu')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cadastrar' })
    ).toBeInTheDocument();
  });

  it('deve renderizar corretamente com título de edição', () => {
    const mockForm = renderHookSubMenuModal();

    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    vi.mocked(usePreviewSubMenuModal).mockReturnValue({
      isOpen: true,
      onOpen: vi.fn(),
      onClose: mockOnClose,
      data: mockSubMenu1,
    });

    vi.mocked(useSubMenuFormModal).mockReturnValue({
      form: mockForm,
      onSubmit: mockOnSubmit,
      onClose: mockOnClose,
      isOpen: true,
      subMenuData: mockSubMenu1,
      inputFullPathValue: '/menu/submenu',
      isPending: false,
    });

    renderSubMenuModal(mockForm);

    expect(screen.getByText('Editar submenu')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Editar' })).toBeInTheDocument();
  });

  it('deve chamar onClose ao clicar em Cancelar', () => {
    const mockForm = renderHookSubMenuModal();

    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    vi.mocked(usePreviewSubMenuModal).mockReturnValue({
      isOpen: true,
      onOpen: vi.fn(),
      onClose: mockOnClose,
      data: undefined,
    });

    vi.mocked(useSubMenuFormModal).mockReturnValue({
      form: mockForm,
      onSubmit: mockOnSubmit,
      onClose: mockOnClose,
      isOpen: true,
      subMenuData: undefined,
      inputFullPathValue: '',
      isPending: false,
    });

    renderSubMenuModal(mockForm);

    fireEvent.click(screen.getByText('Cancelar'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('não deve renderizar o conteúdo quando isOpen é false', () => {
    const mockForm = renderHookSubMenuModal();

    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    vi.mocked(usePreviewSubMenuModal).mockReturnValue({
      isOpen: false,
      onOpen: vi.fn(),
      onClose: mockOnClose,
      data: undefined,
    });

    vi.mocked(useSubMenuFormModal).mockReturnValue({
      form: mockForm,
      onSubmit: mockOnSubmit,
      onClose: mockOnClose,
      isOpen: false,
      subMenuData: undefined,
      inputFullPathValue: '',
      isPending: false,
    });

    renderSubMenuModal(mockForm);

    expect(
      screen.queryByText('Cadastrar novo submenu')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Cadastrar')).not.toBeInTheDocument();
  });
});
