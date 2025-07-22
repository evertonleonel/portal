import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { vi } from 'vitest';

import { CellActionTableMenu } from '@/pages/menu-management/_components/table-menus/cell-action';
import { deleteMenu } from '@/services/menu';

import { mockMenu1, mockSubMenu1 } from '../../../../_setup/mocks/menu';

// Mock dos módulos
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));
vi.mock('@/services/menu');

const mockOnOpenMenu = vi.fn();
const mockOnOpenSubMenu = vi.fn();

vi.mock('@/pages/menu-management/_components/menu-modal/context', () => ({
  usePreviewMenuModal: () => ({
    onOpen: mockOnOpenMenu,
  }),
}));

vi.mock('@/pages/menu-management/_components/submenu-modal/context', () => ({
  usePreviewSubMenuModal: () => ({
    onOpen: mockOnOpenSubMenu,
  }),
}));

describe('CellActionTableMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getEditButton = () => screen.getByTestId('edit-button');
  const getDeleteButton = () => screen.getByTestId('delete-button');

  it('deve renderizar botões de ação para um menu', () => {
    render(<CellActionTableMenu dataMenu={mockMenu1} />);

    expect(getEditButton()).toBeInTheDocument();
    expect(getDeleteButton()).toBeInTheDocument();
  });

  it('deve renderizar botões de ação para um submenu', () => {
    render(<CellActionTableMenu dataSubMenu={mockSubMenu1} />);

    expect(getEditButton()).toBeInTheDocument();
    expect(getDeleteButton()).toBeInTheDocument();
  });

  it('deve chamar onOpen do menu modal ao clicar em editar', () => {
    render(<CellActionTableMenu dataMenu={mockMenu1} />);

    fireEvent.click(getEditButton());

    expect(mockOnOpenMenu).toHaveBeenCalledWith(mockMenu1);
  });

  it('deve chamar onOpen do submenu modal ao clicar em editar', () => {
    render(<CellActionTableMenu dataSubMenu={mockSubMenu1} />);

    fireEvent.click(getEditButton());

    expect(mockOnOpenSubMenu).toHaveBeenCalledWith(mockSubMenu1);
  });

  it('deve chamar deleteMenu e mostrar toast de sucesso ao excluir um menu', async () => {
    vi.mocked(deleteMenu).mockResolvedValueOnce(undefined);

    render(<CellActionTableMenu dataMenu={mockMenu1} />);

    fireEvent.click(getDeleteButton());

    await waitFor(() => {
      expect(deleteMenu).toHaveBeenCalledWith({ id: '1' });
      expect(toast.success).toHaveBeenCalledWith(
        'Menu APROVAR_SOLICITACAO_USUARIO excluido com sucesso!'
      );
    });
  });

  it('deve mostrar toast de erro quando falhar ao excluir um menu', async () => {
    vi.mocked(deleteMenu).mockRejectedValueOnce(new Error('Erro ao excluir'));

    render(<CellActionTableMenu dataMenu={mockMenu1} />);

    fireEvent.click(getDeleteButton());

    await waitFor(() => {
      expect(deleteMenu).toHaveBeenCalledWith({ id: '1' });
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
