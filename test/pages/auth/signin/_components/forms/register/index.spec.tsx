import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RegisterForm } from '@/pages/auth/signin/_components/forms/register';
import { SigninProvider } from '@/pages/auth/signin/context';

// Mock do serviço de empresas
vi.mock('@/services/empresa', () => ({
  getAllEmpresa: vi.fn().mockResolvedValue([
    { id: 1, nome: 'Empresa 1' },
    { id: 2, nome: 'Empresa 2' },
  ]),
}));

// Wrapper com provider
const TestWrapper = ({ children }: { children: ReactNode }) => (
  <SigninProvider>{children}</SigninProvider>
);

describe('RegisterForm - Teste dos Inputs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar todos os campos de input obrigatórios', () => {
    render(<RegisterForm />, { wrapper: TestWrapper });

    // Verifica os campos de texto
    expect(screen.getByPlaceholderText('Seu nome aqui')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Digite seu e-mail corporativo')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu cargo')).toBeInTheDocument();

    // Verifica o campo de empresa (que inicialmente está desabilitado e mostrando "Carregando...")
    const empresaSelect = screen.getByRole('combobox', { name: /empresa/i });
    expect(empresaSelect).toBeInTheDocument();
    expect(empresaSelect).toBeDisabled();
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

    const emailInput = screen.getByPlaceholderText(
      'Digite seu e-mail corporativo'
    );

    await user.type(emailInput, 'joao@teste.com');
    expect(emailInput).toHaveValue('joao@teste.com');

    await user.clear(emailInput);
    await user.type(emailInput, 'novoemail@empresa.com');

    expect(emailInput).toHaveValue('novoemail@empresa.com');
  });

  it('deve mostrar as empresas após carregar', async () => {
    render(<RegisterForm />, { wrapper: TestWrapper });

    const empresaSelect = screen.getByRole('combobox', { name: /empresa/i });
    expect(empresaSelect).toBeDisabled();

    const selectHabilitado = await screen.findByRole('combobox', {
      name: /empresa/i,
    });
    expect(selectHabilitado).not.toBeDisabled();
  });
});
