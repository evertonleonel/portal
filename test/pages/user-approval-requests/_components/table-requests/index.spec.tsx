import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useTableApprovalRequests } from '@/pages/user-approval-requests/_components/hook/use-table-approval-requests';
import { TableRequests } from '@/pages/user-approval-requests/_components/table-requests';
import type { GetUserRequestsResponse } from '@/types/user/requests';

// Mock do hook
vi.mock(
  '@/pages/user-approval-requests/_components/hook/use-table-approval-requests',
  () => ({
    useTableApprovalRequests: vi.fn(),
  })
);

// Mock do componente DataTable
vi.mock('@/components/ui/data-table', () => ({
  DataTable: vi.fn(() => <div data-testid="data-table">DataTable</div>),
}));

// Mock do componente DataTableSkeleton
vi.mock('@/components/ui/data-table-skeleton', () => ({
  DataTableSkeleton: vi.fn(() => (
    <div data-testid="data-table-skeleton">Loading...</div>
  )),
}));
const mockRequest: GetUserRequestsResponse = {
  id: 1,
  nome: 'João Silva',
  email: 'joao@example.com',
  cargo: 'Desenvolvedor',
  empresa: {
    id: 1,
    sigla: 'EMP1',
    nome: 'Empresa 1',
    ativo: true,
    dataCriacao: '2024-01-01',
    usuarioCriacao: {
      id: 1,
      nome: 'Admin',
      dataCriacao: '2024-01-01',
    },
    dataAlteracao: null,
    usuarioAlteracao: null,
  },
  statusAprovacaoMrs: 'P',
  statusAprovacaoFips: 'P',
  dataCriacao: '2024-01-01',
  usuarioCriacao: {
    id: 1,
    nome: 'Admin',
    dataCriacao: '2024-01-01',
  },
  dataAlteracao: null,
  usuarioAlteracao: {
    id: 2,
    nome: 'Aprovador',
    email: 'aprovador@example.com',
    cargo: 'Aprovador',
    empresa: {
      id: 1,
      sigla: 'EMP1',
      nome: 'Empresa 1',
      ativo: true,
      dataCriacao: '2024-01-01',
      usuarioCriacao: {
        id: 1,
        nome: 'Admin',
        dataCriacao: '2024-01-01',
      },
      dataAlteracao: null,
      usuarioAlteracao: null,
    },
    chaveAd: 'aprovador',
    ativo: true,
    dataCriacao: '2024-01-01',
    usuarioCriacao: 'Admin',
    dataAlteracao: '2024-01-02',
    usuarioAlteracao: 'Admin',
  },
};

describe('TableRequests', () => {
  it('deve renderizar o skeleton loader durante o carregamento', () => {
    vi.mocked(useTableApprovalRequests).mockReturnValue({
      dataApprovals: [],
      dataRequests: [],
      isLoading: true,
    });

    render(<TableRequests />);

    expect(screen.getByTestId('data-table-skeleton')).toBeInTheDocument();
  });

  it('deve renderizar a tabela com os dados quando o carregamento for concluído', () => {
    vi.mocked(useTableApprovalRequests).mockReturnValue({
      dataApprovals: [],
      dataRequests: [mockRequest],
      isLoading: false,
    });

    render(<TableRequests />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });
});
