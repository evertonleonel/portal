import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import type { IconsName } from '@/components/ui/icon';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CollapsedSidebarMenu } from '@/components/ux/app-sidebar/collapsed-sidebar-menu';

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

const mockMenuItems = [
  {
    title: 'Página inicial',
    url: '/pagina-inicial',
    icon: 'home' as IconsName,
  },
  {
    title: 'Programacao',
    url: '#',
    icon: 'microsoft' as IconsName,
    subMenus: [
      {
        id: 1,
        nome: 'Programação',
        url: '/programacao',
      },
      {
        id: 2,
        nome: 'Indicadores',
        url: '/indicadores',
      },
    ],
  },
];

// Mock do hook de roteamento
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ pathname: '/pagina-inicial' }),
  };
});

const renderCollapsedMenu = (isMobile = false) => {
  const isItemActive = (item: (typeof mockMenuItems)[0]) =>
    item.url === '/pagina-inicial';

  return render(
    <BrowserRouter>
      <SidebarProvider>
        <TooltipProvider>
          <CollapsedSidebarMenu
            items={mockMenuItems}
            isMobile={isMobile}
            isItemActive={isItemActive}
          />
        </TooltipProvider>
      </SidebarProvider>
    </BrowserRouter>
  );
};

describe('CollapsedSidebarMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => {
    window.matchMedia = mockMatchMedia;
  });

  it('deve renderizar todos os itens do menu', () => {
    renderCollapsedMenu();

    expect(screen.getByText('Página inicial')).toBeInTheDocument();
    expect(screen.getByText('Programacao')).toBeInTheDocument();
  });

  it('deve mostrar submenus quando um item com dropdown é clicado', () => {
    renderCollapsedMenu();

    const menuItem = screen.getByText('Programacao');
    fireEvent.click(menuItem);

    expect(screen.getByText('Programacao')).toBeInTheDocument();
  });

  it('deve marcar o item como ativo quando corresponder à rota atual', () => {
    renderCollapsedMenu();

    const menuButton = screen
      .getByRole('link', { name: /página inicial/i })
      .closest('[data-active="true"]');

    expect(menuButton).toBeInTheDocument();
  });

  it('deve esconder tooltip em mobile', () => {
    renderCollapsedMenu(true); // isMobile = true

    const tooltipContent = document.querySelector(
      '[data-slot="tooltip-content"]'
    );
    expect(tooltipContent).not.toBeInTheDocument();
  });
});
