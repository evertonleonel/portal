import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { UserApprovalRequestsProvider } from '@/pages/user-approval-requests/context';
import UserApprovalRequests from '@/pages/user-approval-requests/page';

// Mock do contexto para evitar chamadas reais à API
vi.mock('@/services/empresa', () => ({
  getAllEmpresa: vi.fn().mockResolvedValue([]),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <UserApprovalRequestsProvider>{component}</UserApprovalRequestsProvider>
    </BrowserRouter>
  );
};

describe('UserApprovalRequests', () => {
  it('deve renderizar o título da página corretamente', () => {
    renderWithProviders(<UserApprovalRequests />);

    expect(screen.getByText('Solicitações de cadastro')).toBeInTheDocument();
  });

  it('deve renderizar as duas tabs: Solicitações e Aprovações', () => {
    renderWithProviders(<UserApprovalRequests />);
    const solicitacoesTab = screen.getByRole('tab', { name: /solicitações/i });
    const aprovacoesTab = screen.getByRole('tab', { name: /aprovações/i });

    expect(solicitacoesTab).toBeInTheDocument();
    expect(aprovacoesTab).toBeInTheDocument();
  });

  it('deve mostrar a tab de Solicitações como ativa por padrão', () => {
    renderWithProviders(<UserApprovalRequests />);

    const solicitacoesTab = screen.getByRole('tab', { name: /solicitações/i });
    expect(solicitacoesTab).toHaveAttribute('aria-selected', 'true');
  });
});
