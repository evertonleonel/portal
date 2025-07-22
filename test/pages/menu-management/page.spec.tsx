import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import UserMenuManagement from '@/pages/menu-management/page';

describe('UserMenuManagement', () => {
  it('deve renderizar o componente corretamente', () => {
    render(<UserMenuManagement />);

    expect(screen.getByText('Gerenciamento de Menus')).toBeInTheDocument();
    expect(screen.getByText('Menus')).toBeInTheDocument();
  });

  it('deve exibir os botões de novo menu e submenu', () => {
    render(<UserMenuManagement />);

    const novoMenuButton = screen.getByRole('button', { name: /novo menu/i });
    const novoSubmenuButton = screen.getByRole('button', {
      name: /novo submenu/i,
    });

    expect(novoMenuButton).toBeInTheDocument();
    expect(novoSubmenuButton).toBeInTheDocument();
  });

  it('deve permitir clicar no botão de novo menu', async () => {
    const user = userEvent.setup();
    render(<UserMenuManagement />);

    const novoMenuButton = screen.getByRole('button', { name: /novo menu/i });
    await user.click(novoMenuButton);

    expect(novoMenuButton).toBeInTheDocument();
    expect(novoMenuButton).not.toBeDisabled();
  });

  it('deve permitir clicar no botão de novo submenu', async () => {
    const user = userEvent.setup();
    render(<UserMenuManagement />);

    const novoSubmenuButton = screen.getByRole('button', {
      name: /novo submenu/i,
    });
    await user.click(novoSubmenuButton);

    expect(novoSubmenuButton).toBeInTheDocument();
    expect(novoSubmenuButton).not.toBeDisabled();
  });
});
