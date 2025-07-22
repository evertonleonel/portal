// tests/components/MenuModal.spec.tsx
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { MenuModal } from '@/pages/menu-management/_components/menu-modal';
import { usePreviewMenuModal } from '@/pages/menu-management/_components/menu-modal/context';
import { useMenuFormModal } from '@/pages/menu-management/_components/menu-modal/hook/use-menu-form-modal';
import type { MenuModalFormInputs } from '@/pages/menu-management/_components/menu-modal/schema';

import { mockMenu1 } from '../../../../_setup/mocks/menu';

// Mock dos hooks
vi.mock(
  '@/pages/menu-management/_components/menu-modal/hook/use-menu-form-modal'
);
vi.mock('@/pages/menu-management/_components/menu-modal/context', () => ({
  usePreviewMenuModal: vi.fn(),
}));

describe('MenuModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar corretamente com título de cadastro', () => {
    const { result } = renderHook(() =>
      useForm<MenuModalFormInputs>({
        defaultValues: {
          desc: '',
          caminho: '',
        },
      })
    );
    const mockForm = result.current;

    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    vi.mocked(usePreviewMenuModal).mockReturnValue({
      isOpen: true,
      onOpen: vi.fn(),
      onClose: mockOnClose,
      data: undefined,
    });

    vi.mocked(useMenuFormModal).mockReturnValue({
      form: mockForm,
      onSubmit: mockOnSubmit,
      onClose: mockOnClose,
      isOpen: true,
      menuData: undefined,
    });

    render(
      <FormProvider {...mockForm}>
        <MenuModal />
      </FormProvider>
    );

    expect(screen.getByText('Cadastrar novo menu')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
  });

  it('deve renderizar corretamente com título de edição', () => {
    const { result } = renderHook(() =>
      useForm<MenuModalFormInputs>({
        defaultValues: {
          desc: '',
          caminho: '',
        },
      })
    );
    const mockForm = result.current;

    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    vi.mocked(usePreviewMenuModal).mockReturnValue({
      isOpen: true,
      onOpen: vi.fn(),
      onClose: mockOnClose,
      data: mockMenu1,
    });

    vi.mocked(useMenuFormModal).mockReturnValue({
      form: mockForm,
      onSubmit: mockOnSubmit,
      onClose: mockOnClose,
      isOpen: true,
      menuData: mockMenu1,
    });

    render(
      <FormProvider {...mockForm}>
        <MenuModal />
      </FormProvider>
    );

    expect(screen.getByText('Editar menu')).toBeInTheDocument();
    expect(screen.getByText('Editar')).toBeInTheDocument();
  });

  it('deve chamar onClose ao clicar em Cancelar', () => {
    const { result } = renderHook(() =>
      useForm<MenuModalFormInputs>({
        defaultValues: {
          desc: '',
          caminho: '',
        },
      })
    );
    const mockForm = result.current;

    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    vi.mocked(usePreviewMenuModal).mockReturnValue({
      isOpen: true,
      onOpen: vi.fn(),
      onClose: mockOnClose,
      data: undefined,
    });

    vi.mocked(useMenuFormModal).mockReturnValue({
      form: mockForm,
      onSubmit: mockOnSubmit,
      onClose: mockOnClose,
      isOpen: true,
      menuData: undefined,
    });

    render(
      <FormProvider {...mockForm}>
        <MenuModal />
      </FormProvider>
    );

    fireEvent.click(screen.getByText('Cancelar'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('não deve renderizar o conteúdo quando isOpen é false', () => {
    const { result } = renderHook(() =>
      useForm<MenuModalFormInputs>({
        defaultValues: {
          desc: '',
          caminho: '',
        },
      })
    );
    const mockForm = result.current;

    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    vi.mocked(usePreviewMenuModal).mockReturnValue({
      isOpen: false,
      onOpen: vi.fn(),
      onClose: mockOnClose,
      data: undefined,
    });

    vi.mocked(useMenuFormModal).mockReturnValue({
      form: mockForm,
      onSubmit: mockOnSubmit,
      onClose: mockOnClose,
      isOpen: false,
      menuData: undefined,
    });

    render(
      <FormProvider {...mockForm}>
        <MenuModal />
      </FormProvider>
    );

    expect(screen.queryByText('Cadastrar novo menu')).not.toBeInTheDocument();
    expect(screen.queryByText('Cadastrar')).not.toBeInTheDocument();
  });
});
