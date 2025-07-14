import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useTableApprovalRequests } from '@/pages/user-approval-requests/_components/hook/use-table-approval-requests';
import { TableRequests } from '@/pages/user-approval-requests/_components/table-requests';

import { userMock } from '../../../../_setup/mocks/user';

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

const mockRequest = userMock.requests;

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
      dataRequests: mockRequest,
      isLoading: false,
    });

    render(<TableRequests />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });
});
