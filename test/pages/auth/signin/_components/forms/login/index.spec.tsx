import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LoginForm } from '@/pages/auth/signin/_components/forms/login';

const mockOnSubmit = vi.fn();
const mockHandleSubmit = vi.fn((fn: (data: { email: string }) => void) => (e?: Event) => {
  e?.preventDefault?.();
  fn({ email: 'test@example.com' });
});

const mockFormLogin = {
  control: {},
  handleSubmit: mockHandleSubmit,
  formState: { errors: {} },
  watch: vi.fn(),
  getValues: vi.fn(),
  setValue: vi.fn(),
  trigger: vi.fn(),
  clearErrors: vi.fn(),
  setError: vi.fn(),
  reset: vi.fn(),
  register: vi.fn(),
  unregister: vi.fn(),
  getFieldState: vi.fn(),
  setFocus: vi.fn(),
  resetField: vi.fn(),
};

let mockFormData = {
  statusMessage: { error: false, warning: false },
  isPending: false,
  formLogin: mockFormLogin,
  onSubmit: mockOnSubmit,
};

vi.mock('@/pages/auth/signin/_components/forms/login/hook/use-form-login', () => ({
  useFormLogin: () => mockFormData,
}));

vi.mock('@/components/ui/form', () => ({
  Form: ({ children }: { children: React.ReactNode }) => (
    <form
      data-testid="form"
      onSubmit={e => {
        e.preventDefault();
        mockHandleSubmit(() => {});
      }}
    >
      {children}
    </form>
  ),
  FormControl: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormField: ({
    render,
  }: {
    render: (props: {
      field: {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur: () => void;
        value: string;
        name: string;
      };
    }) => React.ReactNode;
  }) => {
    const [fieldValue, setFieldValue] = React.useState('');

    const field = {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(e.target.value);
      },
      onBlur: vi.fn(),
      value: fieldValue,
      name: 'email',
    };
    return render({ field });
  },
  FormItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormLabel: ({ children }: { children: React.ReactNode }) => <label>{children}</label>,
  FormMessage: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div className={className} data-testid="form-message">
      {children}
    </div>
  ),
}));

describe('<LoginForm />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFormData = {
      statusMessage: { error: false, warning: false },
      isPending: false,
      formLogin: mockFormLogin,
      onSubmit: mockOnSubmit,
    };
  });

  it('permite digitar no campo de e-mail', async () => {
    render(<LoginForm />);
    const input = screen.getByPlaceholderText(/digite seu e-mail/i);
    await userEvent.type(input, 'teste@exemplo.com');
    expect(input).toHaveValue('teste@exemplo.com');
  });

  it('chama handleSubmit quando o formulário é submetido', async () => {
    render(<LoginForm />);
    const form = screen.getByTestId('form');

    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('chama onSubmit ao clicar no botão', async () => {
    render(<LoginForm />);
    const button = screen.getByRole('button', { name: /continuar login/i });

    await userEvent.click(button);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('desabilita o botão quando isPending é true', () => {
    mockFormData.isPending = true;

    render(<LoginForm />);

    const button = screen.getByRole('button', { name: /continuar login/i });
    expect(button).toBeDisabled();
  });

  it('exibe mensagem de erro quando statusMessage.error é true', () => {
    mockFormData.statusMessage.error = true;

    render(<LoginForm />);

    expect(screen.getByText(/prezado usuário, seu e-mail não está autorizado/i)).toBeInTheDocument();
  });

  it('exibe mensagem de warning quando error.warning é true', () => {
    mockFormData.statusMessage.warning = true;

    render(<LoginForm />);

    expect(screen.getByText(/prezado usuário, seu e-mail já foi cadastrado/i)).toBeInTheDocument();
  });
});
