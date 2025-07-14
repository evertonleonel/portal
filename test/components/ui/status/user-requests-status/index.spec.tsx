import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UserRequestStatus } from '@/components/ui/status/user-requests-status';
import { USER_REQUEST_STATUS } from '@/types/_enums/user-request-status';

describe('<UserRequestStatus/>', () => {
  it('deve renderizar children corretamente', () => {
    render(
      <UserRequestStatus>
        <span>Conteúdo de teste</span>
      </UserRequestStatus>
    );

    expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument();
  });

  it('deve renderizar corretamente com status Pendente', () => {
    render(<UserRequestStatus status="P" />);

    const button = screen.getByRole('button');
    const status = screen.getByText(USER_REQUEST_STATUS.P);

    expect(button).toHaveClass('text-baixada-warning-500');
    expect(button).toHaveClass('bg-baixada-warning-50');
    expect(status).toBeInTheDocument();
  });

  it('deve renderizar corretamente com status Aprovado', () => {
    render(<UserRequestStatus status="A" />);

    const button = screen.getByRole('button');
    const status = screen.getByText(USER_REQUEST_STATUS.A);

    expect(button).toHaveClass('text-baixada-success-500');
    expect(button).toHaveClass('bg-baixada-success-50/25');
    expect(status).toBeInTheDocument();
  });

  it('deve aplicar classes customizadas via className', () => {
    const customClass = 'custom-test-class';
    render(<UserRequestStatus className={customClass} />);

    expect(screen.getByRole('button')).toHaveClass(customClass);
  });

  it('deve renderizar corretamente com variante disable', () => {
    render(<UserRequestStatus variant="disable" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-muted-foreground/8');
    expect(button).toHaveClass('text-muted-foreground');
  });
});
