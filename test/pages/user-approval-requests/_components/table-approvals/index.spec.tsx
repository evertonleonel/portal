import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useTableApprovalRequests } from '@/pages/user-approval-requests/_components/hook/use-table-approval-requests';
import { TableApprovals } from '@/pages/user-approval-requests/_components/table-approvals';
import type { GetUserRequestsResponse } from '@/types/user/requests';

// Mock do hook
vi.mock(
  '@/pages/user-approval-requests/_components/hook/use-table-approval-requests',
  () => ({
    useTableApprovalRequests: vi.fn(),
  })
);

vi.mock('@/components/ui/data-table', () => ({
  DataTable: vi.fn(() => <div data-testid="data-table">DataTable</div>),
}));

vi.mock('@/components/ui/data-table-skeleton', () => ({
  DataTableSkeleton: vi.fn(() => (
    <div data-testid="data-table-skeleton">Loading...</div>
  )),
}));

const mockApprovalRequest: GetUserRequestsResponse = {
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
  statusAprovacaoMrs: 'A',
  statusAprovacaoFips: 'A',
  dataCriacao: '2024-01-01',
  usuarioCriacao: {
    id: 1,
    nome: 'Admin',
    dataCriacao: '2024-01-01',
  },
  dataAlteracao: '2024-01-02',
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

describe('TableApprovals', () => {
  it('deve renderizar o skeleton loader durante o carregamento', () => {
    vi.mocked(useTableApprovalRequests).mockReturnValue({
      dataApprovals: [],
      dataRequests: [],
      isLoading: true,
    });

    render(<TableApprovals />);

    expect(screen.getByTestId('data-table-skeleton')).toBeInTheDocument();
  });

  it('deve renderizar a tabela com os dados quando o carregamento for concluído', () => {
    vi.mocked(useTableApprovalRequests).mockReturnValue({
      dataApprovals: [mockApprovalRequest],
      dataRequests: [mockApprovalRequest],
      isLoading: false,
    });

    render(<TableApprovals />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });
});
