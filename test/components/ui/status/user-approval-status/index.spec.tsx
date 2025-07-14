import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UserApprovalStatus } from '@/components/ui/status/user-approval-status';
import { USER_REQUEST_STATUS } from '@/types/_enums/user-request-status';

describe('<UserApprovalStatus/>', () => {
  it('deve renderizar children corretamente', () => {
    render(
      <UserApprovalStatus>
        <span>Conteúdo de teste</span>
      </UserApprovalStatus>
    );

    expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument();
  });

  it('deve renderizar corretamente com status Pendente', () => {
    render(<UserApprovalStatus status="P" />);

    const button = screen.getByRole('button');
    const status = screen.getByText(USER_REQUEST_STATUS.P);

    expect(button).toHaveClass('text-baixada-warning-500');
    expect(button).toHaveClass('bg-baixada-warning-50');
    expect(status).toBeInTheDocument();
  });

  it('deve renderizar corretamente com status Aprovado', () => {
    render(<UserApprovalStatus status="A" />);

    const button = screen.getByRole('button');
    const status = screen.getByText(USER_REQUEST_STATUS.A);

    expect(button).toHaveClass('text-baixada-success-lime-400');
    expect(button).toHaveClass('bg-baixada-success-lime-900');
    expect(status).toBeInTheDocument();
  });

  it('deve aplicar classes customizadas via className', () => {
    const customClass = 'custom-test-class';
    render(<UserApprovalStatus className={customClass} />);

    expect(screen.getByRole('button')).toHaveClass(customClass);
  });

  it('deve renderizar corretamente com variante approve', () => {
    render(<UserApprovalStatus variant="approve" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-baixada-success-lime-400');
    expect(button).toHaveClass('bg-baixada-success-lime-900');
    expect(button).toHaveClass('hover:bg-baixada-success-lime-900/60');
  });
});
