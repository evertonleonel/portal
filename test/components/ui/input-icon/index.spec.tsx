import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { InputIcon } from '@/components/ui/input-icon';

describe('<InputIcon/>', () => {
  it('deve renderizar um input básico sem ícone', () => {
    render(<InputIcon placeholder="Digite algo" />);

    const input = screen.getByPlaceholderText('Digite algo');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('pl-3'); // padding left padrão
  });

  it('deve renderizar corretamente com um ícone', () => {
    const TestIcon = () => <svg data-testid="test-icon" />;
    render(<InputIcon icon={<TestIcon />} data-testid="input-with-icon" />);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByTestId('input-with-icon')).toHaveClass('pl-9'); // padding left maior para acomodar o ícone
  });

  it('deve aplicar classes customizadas via className', () => {
    const customClass = 'custom-test-class';
    render(<InputIcon className={customClass} data-testid="custom-input" />);

    expect(screen.getByTestId('custom-input')).toHaveClass(customClass);
  });

  it('deve aceitar diferentes tipos de input', () => {
    render(<InputIcon type="password" data-testid="password-input" />);

    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('deve passar props adicionais para o input', () => {
    render(
      <InputIcon
        data-testid="test-input"
        aria-label="test input"
        maxLength={10}
      />
    );

    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('aria-label', 'test input');
    expect(input).toHaveAttribute('maxLength', '10');
  });
});
