import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  MenuModalProvider,
  usePreviewMenuModal,
} from '@/pages/menu-management/_components/menu-modal/context';

import { mockMenu1 } from '../../../../_setup/mocks/menu';

describe('MenuModalContext', () => {
  it('deve inicializar com o modal fechado e sem dados', () => {
    const { result } = renderHook(() => usePreviewMenuModal(), {
      wrapper: MenuModalProvider,
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('deve abrir o modal sem dados', () => {
    const { result } = renderHook(() => usePreviewMenuModal(), {
      wrapper: MenuModalProvider,
    });

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('deve abrir o modal com dados do menu', () => {
    const { result } = renderHook(() => usePreviewMenuModal(), {
      wrapper: MenuModalProvider,
    });

    act(() => {
      result.current.onOpen(mockMenu1);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.data).toEqual(mockMenu1);
  });

  it('deve fechar o modal', () => {
    const { result } = renderHook(() => usePreviewMenuModal(), {
      wrapper: MenuModalProvider,
    });

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('deve lançar erro quando usar o hook fora do provider', () => {
    expect(() => {
      renderHook(() => usePreviewMenuModal());
    }).toThrow(
      'usePreviewMenuModal deve ser usado dentro de um MenuModalProvider'
    );
  });
});
