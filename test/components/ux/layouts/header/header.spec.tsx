import { render, screen } from '@testing-library/react';

import { Header } from '@/components/ux/_layouts/header';

describe('Header Component', () => {
  it('deve renderizar o componente Header corretamente', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('deve ter altura fixa de 54px', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('h-[54px]');
  });

  it('deve renderizar o botão com ícone de sino', () => {
    render(<Header />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('deve ter o botão posicionado à direita com a classe ml-auto', () => {
    render(<Header />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('ml-auto');
  });
});
