import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Icon } from '@/components/ui/icon';

describe('<Icon/>', () => {
  it('deve renderizar um ícone quando um nome válido é fornecido', () => {
    render(<Icon name="home" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('não deve renderizar nada quando um nome inválido é fornecido', () => {
    // @ts-expect-error - Testando com um nome inválido propositalmente
    render(<Icon name="icone-invalido" data-testid="icon" />);
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('deve passar propriedades adicionais para o componente SVG', () => {
    const className = 'custom-class';
    render(<Icon name="home" className={className} data-testid="icon" />);

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveClass(className);
  });
});
