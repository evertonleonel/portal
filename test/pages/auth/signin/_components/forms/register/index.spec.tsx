import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RegisterForm } from '@/pages/auth/signin/_components/forms/register';
import { SigninProvider } from '@/pages/auth/signin/context';

// Wrapper com provider
const TestWrapper = ({ children }: { children: ReactNode }) => <SigninProvider>{children}</SigninProvider>;

describe('RegisterForm - Teste dos Inputs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar todos os campos de input obrigatórios', () => {
    render(<RegisterForm />, { wrapper: TestWrapper });

    expect(screen.getByPlaceholderText('Seu nome aqui')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('Digite seu e-mail corporativo')).toHaveLength(2);
    expect(screen.getByText('Selecione')).toBeInTheDocument(); // Campo empresa
  });

  it('deve limpar o campo quando o usuário apagar o conteúdo', async () => {
    render(<RegisterForm />, { wrapper: TestWrapper });
    const user = userEvent.setup();

    const nomeInput = screen.getByPlaceholderText('Seu nome aqui');

    await user.type(nomeInput, 'João Silva');
    expect(nomeInput).toHaveValue('João Silva');

    await user.clear(nomeInput);
    expect(nomeInput).toHaveValue('');
  });

  it('deve permitir editar o valor já digitado', async () => {
    render(<RegisterForm />, { wrapper: TestWrapper });
    const user = userEvent.setup();

    const emailInputs = screen.getAllByPlaceholderText('Digite seu e-mail corporativo');
    const emailInput = emailInputs[0];

    await user.type(emailInput, 'joao@teste.com');
    expect(emailInput).toHaveValue('joao@teste.com');

    await user.clear(emailInput);
    await user.type(emailInput, 'novoemail@empresa.com');

    expect(emailInput).toHaveValue('novoemail@empresa.com');
  });
});
