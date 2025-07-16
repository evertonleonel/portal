import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import type { IconsName } from '@/components/ui/icon';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ExpandedSidebarMenu } from '@/components/ux/app-sidebar/expanded-sidebar-menu';

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
    url: '/home',
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
    useLocation: () => ({ pathname: '/home' }),
  };
});

const renderExpandedMenu = (openItems = {}, toggleItem = vi.fn()) => {
  const isItemActive = (item: (typeof mockMenuItems)[0]) =>
    item.url === '/home';

  return render(
    <BrowserRouter>
      <SidebarProvider>
        <ExpandedSidebarMenu
          items={mockMenuItems}
          openItems={openItems}
          toggleItem={toggleItem}
          isItemActive={isItemActive}
        />
      </SidebarProvider>
    </BrowserRouter>
  );
};

describe('ExpandedSidebarMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => {
    window.matchMedia = mockMatchMedia;
  });

  it('deve renderizar todos os itens do menu', () => {
    renderExpandedMenu();

    expect(screen.getByText('Página inicial')).toBeInTheDocument();
    expect(screen.getByText('Programacao')).toBeInTheDocument();
  });

  it('deve mostrar submenus quando um item está aberto', () => {
    // Renderiza com o item "Programacao" aberto
    const openItems = { Programacao: true };
    renderExpandedMenu(openItems);

    expect(screen.getByText('Programação')).toBeInTheDocument();
    expect(screen.getByText('Indicadores')).toBeInTheDocument();
  });

  it('deve esconder submenus quando um item está fechado', () => {
    // Renderiza com o item "Programacao" fechado
    const openItems = { Programacao: false };
    renderExpandedMenu(openItems);

    expect(screen.queryByText('Programação')).not.toBeInTheDocument();
    expect(screen.queryByText('Indicadores')).not.toBeInTheDocument();
  });

  it('deve chamar toggleItem quando um item com submenu é clicado', () => {
    const toggleItem = vi.fn();
    renderExpandedMenu({}, toggleItem);

    const menuItem = screen.getByText('Programacao');
    fireEvent.click(menuItem);

    expect(toggleItem).toHaveBeenCalledWith('Programacao');
  });

  it('deve marcar o item como ativo quando corresponder à rota atual', () => {
    renderExpandedMenu();

    const menuButton = screen
      .getByRole('link', { name: /página inicial/i })
      .closest('[data-active="true"]');

    expect(menuButton).toBeInTheDocument();
  });
});
