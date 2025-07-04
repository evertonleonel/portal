import { act, render, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { vi } from 'vitest';

import { SigninProvider, useSigninContext } from '@/pages/auth/signin/context';

const createWrapper = ({ children }: { children: ReactNode }) => <SigninProvider>{children}</SigninProvider>;

describe('SigninContext', () => {
  describe('SigninProvider', () => {
    it('deve renderizar filhos corretamente', () => {
      const TestComponent = () => <div>Test Content</div>;

      const { getByText } = render(
        <SigninProvider>
          <TestComponent />
        </SigninProvider>
      );

      expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('deve fornecer valores padrão corretos', () => {
      const { result } = renderHook(() => useSigninContext(), {
        wrapper: createWrapper,
      });

      expect(result.current.viewTabState).toEqual({
        sucess: false,
      });
      expect(typeof result.current.handleUpdateViewForm).toBe('function');
    });
  });

  describe('useSigninContext', () => {
    it('deve retornar o contexto quando usado dentro do provider', () => {
      const { result } = renderHook(() => useSigninContext(), {
        wrapper: createWrapper,
      });

      expect(result.current).toBeDefined();
      expect(result.current.viewTabState).toBeDefined();
      expect(result.current.handleUpdateViewForm).toBeDefined();
    });

    it('deve lançar erro quando usado fora do provider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useSigninContext());
      }).toThrow('useSigninContext deve ser usado dentro de um SigninProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('handleUpdateViewForm', () => {
    it('deve atualizar o estado corretamente', () => {
      const { result } = renderHook(() => useSigninContext(), {
        wrapper: createWrapper,
      });

      // Estado inicial
      expect(result.current.viewTabState.sucess).toBe(false);

      // Atualizar estado
      act(() => {
        result.current.handleUpdateViewForm({ sucess: true });
      });

      // Verificar se o estado foi atualizado
      expect(result.current.viewTabState.sucess).toBe(true);
    });

    it('deve mesclar o estado anterior com o novo estado', () => {
      const { result } = renderHook(() => useSigninContext(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.handleUpdateViewForm({
          sucess: true,
        });
      });

      expect(result.current.viewTabState).toEqual({
        sucess: true,
      });

      act(() => {
        result.current.handleUpdateViewForm({ sucess: false });
      });

      expect(result.current.viewTabState).toEqual({
        sucess: false,
      });
    });

    it('deve manter propriedades não especificadas na atualização', () => {
      const { result } = renderHook(() => useSigninContext(), {
        wrapper: createWrapper,
      });

      expect(result.current.viewTabState.sucess).toBe(false);

      act(() => {
        result.current.handleUpdateViewForm({ sucess: true });
      });

      expect(result.current.viewTabState.sucess).toBe(true);
    });
  });

  describe('Cenários de integração', () => {
    it('deve permitir múltiplas atualizações consecutivas', () => {
      const { result } = renderHook(() => useSigninContext(), {
        wrapper: createWrapper,
      });

      // Primeira atualização
      act(() => {
        result.current.handleUpdateViewForm({ sucess: true });
      });
      expect(result.current.viewTabState.sucess).toBe(true);

      // Segunda atualização
      act(() => {
        result.current.handleUpdateViewForm({ sucess: false });
      });
      expect(result.current.viewTabState.sucess).toBe(false);

      // Terceira atualização
      act(() => {
        result.current.handleUpdateViewForm({ sucess: true });
      });
      expect(result.current.viewTabState.sucess).toBe(true);
    });

    it('deve funcionar corretamente com múltiplos componentes consumindo o contexto', () => {
      const TestComponent1 = () => {
        const { viewTabState } = useSigninContext();
        return <div data-testid="component1">{viewTabState.sucess.toString()}</div>;
      };

      const TestComponent2 = () => {
        const { handleUpdateViewForm } = useSigninContext();
        return (
          <button data-testid="update-button" onClick={() => handleUpdateViewForm({ sucess: true })}>
            Update
          </button>
        );
      };

      const { getByTestId } = render(
        <SigninProvider>
          <TestComponent1 />
          <TestComponent2 />
        </SigninProvider>
      );

      // Estado inicial
      expect(getByTestId('component1')).toHaveTextContent('false');

      act(() => {
        getByTestId('update-button').click();
      });

      expect(getByTestId('component1')).toHaveTextContent('true');
    });
  });
});
