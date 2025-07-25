import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ux/app-sidebar';
import { AuthProvider } from '@/context/auth-context';

// Mock do matchMedia
const mockMatchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Configuração do ambiente de teste
beforeAll(() => {
  window.matchMedia = mockMatchMedia;
});

const mockAuthContext = {
  user: {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    roles: ['user'],
  },
  isAuthenticated: true,
  isLoading: false,
  hasPermission: vi.fn().mockReturnValue(true),
  login: vi.fn(),
  logout: vi.fn(),
};

// Mock dos hooks de roteamento
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/pagina-inicial' }),
  };
});

// Mock do hook de autenticação
vi.mock('@/context/auth-context', () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock do hook de dispositivo móvel
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}));

// Mock do hook de tablet
vi.mock('@/hooks/use-tablet', () => ({
  useIsTablet: () => false,
}));

const renderSidebar = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('AppSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar todos os itens do menu principal', () => {
    renderSidebar();

    expect(screen.getByText('Página inicial')).toBeInTheDocument();
    expect(screen.getByText('Solicitacão Cadastro')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Client')).toBeInTheDocument();
  });

  it('deve mostrar submenus quando um item com submenus é clicado', () => {
    renderSidebar();

    const programacaoItem = screen.getByText('Programacao');
    fireEvent.click(programacaoItem);

    expect(screen.getByText('Programação')).toBeInTheDocument();
    expect(screen.getByText('Indicadores')).toBeInTheDocument();
  });

  it('deve chamar a função de logout quando o botão de sair é clicado', () => {
    const mockLogout = vi.fn();
    mockAuthContext.logout = mockLogout;

    renderSidebar();

    const logoutButton = screen.getByText('Sair');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });

  it('deve marcar o item como ativo quando corresponder à rota atual', () => {
    renderSidebar();

    const menuButton = screen
      .getByRole('link', { name: /página inicial/i })
      .closest('[data-active="true"]');
    expect(menuButton).toBeInTheDocument();
  });
});
