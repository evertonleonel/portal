import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TableRequests } from '@/pages/user-approval-requests/_components/table-requests';

import { userMock } from '../../../../_setup/mocks/user';

const mockUseTableRequests = vi.fn();

// Mock do hook
vi.mock(
  '@/pages/user-approval-requests/_components/hook/use-table-requests',
  () => ({
    useTableRequests: () => mockUseTableRequests(),
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
    mockUseTableRequests.mockReturnValue({
      dataRequests: [],
      isLoading: true,
    });

    render(<TableRequests />);

    expect(screen.getByTestId('data-table-skeleton')).toBeInTheDocument();
  });

  it('deve renderizar a tabela com os dados quando o carregamento for concluído', () => {
    mockUseTableRequests.mockReturnValue({
      dataRequests: mockRequest,
      isLoading: false,
    });

    render(<TableRequests />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });
});
