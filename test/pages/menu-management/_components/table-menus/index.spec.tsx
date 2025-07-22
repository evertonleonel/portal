import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TableMenus } from '@/pages/menu-management/_components/table-menus';
import * as MenuContext from '@/pages/menu-management/context';
import type { Menu } from '@/types/menu';

import { mockMenus } from '../../../../_setup/mocks/menu';
// Mock do contexto
vi.mock('@/pages/menu-management/context', () => ({
  useMenuManagementContext: vi.fn(),
}));

// Mock do DataTable e componentes relacionados
vi.mock('@/components/ui/data-table', () => ({
  DataTable: vi.fn(({ data }) => {
    if (!data.length) {
      return (
        <div data-testid="data-table">
          <div>Sem resultados.</div>
        </div>
      );
    }

    return (
      <div data-testid="data-table">
        {data.map((item: Menu) => (
          <div key={item.id}>
            <div>{item.desc}</div>
            {item.subMenus?.map(subMenu => (
              <div key={subMenu.id} data-testid="submenu-row">
                {subMenu.desc}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }),
  TableRowSpacing: vi.fn(() => null),
}));

// Mock do DataTableSkeleton
vi.mock('@/components/ui/data-table-skeleton', () => ({
  DataTableSkeleton: vi.fn(() => <div data-testid="data-table-skeleton" />),
}));

describe('TableMenus', () => {
  it('deve mostrar o skeleton quando estiver carregando', () => {
    vi.spyOn(MenuContext, 'useMenuManagementContext').mockReturnValue({
      isLoading: true,
      menus: [],
    });

    render(<TableMenus />);

    expect(screen.getByTestId('data-table-skeleton')).toBeInTheDocument();
  });

  it('deve renderizar a tabela com os menus quando houver dados', () => {
    vi.spyOn(MenuContext, 'useMenuManagementContext').mockReturnValue({
      isLoading: false,
      menus: mockMenus,
    });

    render(<TableMenus />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    expect(screen.getByText('APROVAR_SOLICITACAO_USUARIO')).toBeInTheDocument();
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('SUB_MENU_1')).toBeInTheDocument();
  });

  it('deve renderizar a tabela vazia quando não houver menus', () => {
    vi.spyOn(MenuContext, 'useMenuManagementContext').mockReturnValue({
      isLoading: false,
      menus: [],
    });

    render(<TableMenus />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    expect(screen.getByText('Sem resultados.')).toBeInTheDocument();
  });
});
