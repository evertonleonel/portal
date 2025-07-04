import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ReturnForm } from '@/pages/auth/signin/_components/forms/return';

// Mock do useSigninContext
const mockHandleUpdateViewForm = vi.fn();
vi.mock('@/pages/auth/signin/context', () => ({
  useSigninContext: () => ({
    handleUpdateViewForm: mockHandleUpdateViewForm,
  }),
}));

vi.mock('@/hooks/use-small-screen', () => ({
  useIsSmallScreen: () => false,
}));

describe('ReturnForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o componente corretamente', () => {
    render(<ReturnForm />);

    expect(screen.getByRole('button', { name: 'Voltar para o login' })).toBeInTheDocument();
  });

  it('deve chamar handleUpdateViewForm quando o botão for clicado', () => {
    render(<ReturnForm />);

    const botaoVoltar = screen.getByRole('button', { name: 'Voltar para o login' });
    fireEvent.click(botaoVoltar);

    expect(mockHandleUpdateViewForm).toHaveBeenCalledTimes(1);
    expect(mockHandleUpdateViewForm).toHaveBeenCalledWith({
      sucess: false,
    });
  });

  it('deve renderizar as imagens dos logos', () => {
    render(<ReturnForm />);

    expect(screen.getByAltText('Logo Portal')).toBeInTheDocument();
    expect(screen.getByAltText('Logo MRS')).toBeInTheDocument();
    expect(screen.getByAltText('Logo FIPS')).toBeInTheDocument();
    expect(screen.getByAltText('Logo RUMO')).toBeInTheDocument();
    expect(screen.getByAltText('Logo VLI')).toBeInTheDocument();
  });
});
