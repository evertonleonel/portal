import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  SubMenuModalProvider,
  usePreviewSubMenuModal,
} from '@/pages/menu-management/_components/submenu-modal/context';

import { mockSubMenu1 } from '../../../../_setup/mocks/menu';

describe('SubMenuModalContext', () => {
  it('deve inicializar com o modal fechado e sem dados', () => {
    const { result } = renderHook(() => usePreviewSubMenuModal(), {
      wrapper: SubMenuModalProvider,
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('deve abrir o modal sem dados', () => {
    const { result } = renderHook(() => usePreviewSubMenuModal(), {
      wrapper: SubMenuModalProvider,
    });

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('deve abrir o modal com dados do menu', () => {
    const { result } = renderHook(() => usePreviewSubMenuModal(), {
      wrapper: SubMenuModalProvider,
    });

    act(() => {
      result.current.onOpen(mockSubMenu1);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.data).toEqual(mockSubMenu1);
  });

  it('deve fechar o modal', () => {
    const { result } = renderHook(() => usePreviewSubMenuModal(), {
      wrapper: SubMenuModalProvider,
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
      renderHook(() => usePreviewSubMenuModal());
    }).toThrow(
      'usePreviewSubMenuModal deve ser usado dentro de um SubMenuModalProvider'
    );
  });
});
