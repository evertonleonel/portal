import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import {
  AuthLayout,
  AuthLayoutContent,
} from '@/components/ux/_layouts/auth-layout';

vi.mock('@/components/ux/app-sidebar', () => ({
  AppSidebar: () => <div data-testid="mock-sidebar">Sidebar</div>,
}));

vi.mock('@/components/ux/_layouts/header', () => ({
  Header: ({ children }: { children: React.ReactNode }) => (
    <header data-testid="mock-header">{children}</header>
  ),
}));

vi.mock('@/components/ux/_layouts/footer', () => ({
  Footer: () => <footer data-testid="mock-footer">Footer</footer>,
}));

vi.mock('@/components/ui/sidebar', () => ({
  useSidebar: () => ({
    state: 'expanded',
    isMobile: false,
  }),
  SidebarTrigger: () => <button data-testid="sidebar-trigger">Toggle</button>,
  SidebarProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-provider">{children}</div>
  ),
}));

describe('<AuthLayout/>', () => {
  it('deve renderizar o SidebarProvider com AuthLayoutContent', () => {
    render(
      <AuthLayout>
        <div data-testid="mock-children">Conteúdo</div>
      </AuthLayout>
    );

    expect(screen.getByTestId('sidebar-provider')).toBeInTheDocument();
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('deve passar o children corretamente para o <AuthLayoutContent/>', () => {
    const content = 'Conteúdo';
    render(
      <AuthLayout>
        <div>{content}</div>
      </AuthLayout>
    );

    expect(screen.getByText(content)).toBeInTheDocument();
  });
});

describe('<AuthLayoutContent/>', () => {
  it('deve renderizar todos os componentes principais', () => {
    render(
      <AuthLayoutContent>
        <div data-testid="mock-children">Conteúdo</div>
      </AuthLayoutContent>
    );

    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-trigger')).toBeInTheDocument();
  });

  it('deve renderizar o conteúdo principal dentro de uma tag main', () => {
    render(
      <AuthLayoutContent>
        <div data-testid="mock-children">Conteúdo</div>
      </AuthLayoutContent>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toContainElement(screen.getByTestId('mock-children'));
  });
});
