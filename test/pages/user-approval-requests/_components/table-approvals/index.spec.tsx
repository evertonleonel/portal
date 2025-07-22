import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TableApprovals } from '@/pages/user-approval-requests/_components/table-approvals';

import { userMock } from '../../../../_setup/mocks/user';

const mockUseTableApprovals = vi.fn();

// Mock do hook
vi.mock(
  '@/pages/user-approval-requests/_components/hook/use-table-approvals',
  () => ({
    useTableApprovals: () => mockUseTableApprovals(),
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

const mockApprovalRequest = userMock.requests;

describe('TableApprovals', () => {
  it('deve renderizar o skeleton loader durante o carregamento', () => {
    mockUseTableApprovals.mockReturnValue({
      dataApprovals: [],
      isLoading: true,
    });

    render(<TableApprovals />);

    expect(screen.getByTestId('data-table-skeleton')).toBeInTheDocument();
  });

  it('deve renderizar a tabela com os dados quando o carregamento for concluído', () => {
    mockUseTableApprovals.mockReturnValue({
      dataApprovals: mockApprovalRequest,
      isLoading: false,
    });

    render(<TableApprovals />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });
});
