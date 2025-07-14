import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SearchFilters } from '@/pages/user-approval-requests/_components/search-filters';
import { useUserApprovalRequestsContext } from '@/pages/user-approval-requests/context';
import type { Empresa } from '@/types/empresa';

import { empresasMock } from '../../../../_setup/mocks/empresa';

interface UserApprovalRequestsType {
  empresas: Empresa[];
  isLoadingEmpresas: boolean;
  filterEmpresaId: string;
  handleFilterEmpresa: ({ id }: { id: string }) => void;
  filterNome: string;
  handleFilterNome: (nome: string) => void;
}

// Mock do contexto
vi.mock('@/pages/user-approval-requests/context', () => ({
  useUserApprovalRequestsContext: vi.fn(),
}));

const mockHandleFilterNome = vi.fn();
const mockHandleFilterEmpresa = vi.fn();
const mockEmpresas = empresasMock;

describe('SearchFilters', () => {
  beforeEach(() => {
    vi.mocked(useUserApprovalRequestsContext).mockReturnValue({
      empresas: mockEmpresas,
      isLoadingEmpresas: false,
      filterEmpresaId: '',
      handleFilterEmpresa: mockHandleFilterEmpresa,
      filterNome: '',
      handleFilterNome: mockHandleFilterNome,
    } as UserApprovalRequestsType);
  });

  it('deve renderizar os campos de filtro corretamente', () => {
    render(<SearchFilters />);

    expect(screen.getByPlaceholderText('Pesquisar')).toBeInTheDocument();
    expect(screen.getByText('Filtrar por empresa')).toBeInTheDocument();
  });

  it('deve chamar handleFilterNome quando o usuário digitar no campo de pesquisa', () => {
    render(<SearchFilters />);

    const searchInput = screen.getByPlaceholderText('Pesquisar');
    fireEvent.change(searchInput, { target: { value: 'Elon Musk' } });

    expect(mockHandleFilterNome).toHaveBeenCalledWith('Elon Musk');
  });

  it('deve chamar handleFilterEmpresa quando uma empresa for selecionada', async () => {
    render(<SearchFilters />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    const option = screen.getByText('MRS');
    fireEvent.click(option);

    expect(mockHandleFilterEmpresa).toHaveBeenCalledWith({ id: '1' });
  });

  it('deve mostrar mensagem de carregamento quando isLoadingEmpresas for true', () => {
    vi.mocked(useUserApprovalRequestsContext).mockReturnValue({
      empresas: [],
      isLoadingEmpresas: true,
      filterEmpresaId: '',
      handleFilterEmpresa: mockHandleFilterEmpresa,
      filterNome: '',
      handleFilterNome: mockHandleFilterNome,
    } as UserApprovalRequestsType);

    render(<SearchFilters />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });
});
