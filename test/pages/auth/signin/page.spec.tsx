import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import SignIn from '@/pages/auth/signin/page';

// Mock dos formulários
vi.mock('@/pages/auth/signin/_components/forms/login', () => ({
  LoginForm: () => <div data-testid="login-form">Login Form Content</div>,
}));

vi.mock('@/pages/auth/signin/_components/forms/register', () => ({
  RegisterForm: () => <div data-testid="register-form">Register Form Content</div>,
}));

vi.mock('@/pages/auth/signin/_components/forms/return', () => ({
  ReturnForm: () => <div data-testid="return-form">Return Form Content</div>,
}));

// Wrapper para o Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('SignIn Page - Tabs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar as tabs de Login e Cadastro', () => {
    renderWithRouter(<SignIn />);

    expect(screen.getByRole('tab', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /cadastro/i })).toBeInTheDocument();
  });

  it('deve mostrar o LoginForm por padrão na tab Login', () => {
    renderWithRouter(<SignIn />);

    const loginTab = screen.getByRole('tab', { name: /login/i });
    expect(loginTab).toHaveAttribute('data-state', 'active');

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByText('Login Form Content')).toBeInTheDocument();
  });

  it('deve mostrar o texto correto para a tab Login', () => {
    renderWithRouter(<SignIn />);

    expect(screen.getByText('Bem vindo(a)!')).toBeInTheDocument();
    expect(screen.getByText('Faça login ou solicite seu cadastro')).toBeInTheDocument();
  });

  it('deve alternar para a tab Cadastro e mostrar o RegisterForm', async () => {
    const user = userEvent.setup();
    renderWithRouter(<SignIn />);

    const cadastroTab = screen.getByRole('tab', { name: /cadastro/i });
    await user.click(cadastroTab);

    expect(cadastroTab).toHaveAttribute('data-state', 'active');

    const loginTab = screen.getByRole('tab', { name: /login/i });
    expect(loginTab).toHaveAttribute('data-state', 'inactive');

    expect(screen.getByTestId('register-form')).toBeInTheDocument();
    expect(screen.getByText('Register Form Content')).toBeInTheDocument();
  });

  it('deve mostrar o texto correto para a tab Cadastro', async () => {
    const user = userEvent.setup();
    renderWithRouter(<SignIn />);

    const cadastroTab = screen.getByRole('tab', { name: /cadastro/i });
    await user.click(cadastroTab);

    expect(screen.getByText('Solicite seu cadastro')).toBeInTheDocument();
    expect(
      screen.getByText('Preencha as informações abaixo para solicitar seu cadastro no Portal')
    ).toBeInTheDocument();
  });

  it('deve alternar de volta para a tab Login após clicar em Cadastro', async () => {
    const user = userEvent.setup();
    renderWithRouter(<SignIn />);

    const cadastroTab = screen.getByRole('tab', { name: /cadastro/i });
    await user.click(cadastroTab);

    expect(cadastroTab).toHaveAttribute('data-state', 'active');
    expect(screen.getByTestId('register-form')).toBeInTheDocument();

    const loginTab = screen.getByRole('tab', { name: /login/i });
    await user.click(loginTab);

    expect(loginTab).toHaveAttribute('data-state', 'active');
    expect(cadastroTab).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  it('deve esconder o conteúdo da tab Login quando a tab Cadastro está ativa', async () => {
    const user = userEvent.setup();
    renderWithRouter(<SignIn />);

    expect(screen.getByTestId('login-form')).toBeInTheDocument();

    const cadastroTab = screen.getByRole('tab', { name: /cadastro/i });
    await user.click(cadastroTab);

    expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();
    expect(screen.getByTestId('register-form')).toBeInTheDocument();
  });

  it('deve renderizar os logos no footer', () => {
    renderWithRouter(<SignIn />);

    expect(screen.getByAltText('Logo MRS')).toBeInTheDocument();
    expect(screen.getByAltText('Logo FIPS')).toBeInTheDocument();
    expect(screen.getByAltText('Logo RUMO')).toBeInTheDocument();
    expect(screen.getByAltText('Logo VLI')).toBeInTheDocument();
  });

  it('deve renderizar o logo principal', () => {
    renderWithRouter(<SignIn />);

    expect(screen.getByAltText('Logo Portal')).toBeInTheDocument();
  });
});
