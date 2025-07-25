import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import {
  MenuManagementProvider,
  useMenuManagementContext,
} from '@/pages/menu-management/context';
import { getAllMenus } from '@/services/menu';

vi.mock('@/services/menu', () => ({
  getAllMenus: vi.fn(),
}));

describe('MenuManagementContext', () => {
  it('deve inicializar com valores padrão', async () => {
    const mockMenus = [
      { id: 1, name: 'Menu 1' },
      { id: 2, name: 'Menu 2' },
    ];

    (getAllMenus as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockMenus
    );

    const { result } = renderHook(() => useMenuManagementContext(), {
      wrapper: MenuManagementProvider,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.menus).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.menus).toEqual(mockMenus);
    });
  });

  it('deve lançar erro quando usado fora do provider', () => {
    expect(() => {
      renderHook(() => useMenuManagementContext());
    }).toThrow(
      'useMenuManagementContext deve ser usado dentro de um <MenuManagementProvider>'
    );
  });

  it('deve lidar com erro na busca de menus', async () => {
    const mockError = new Error('Erro ao buscar menus');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    (getAllMenus as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      mockError
    );

    const { result } = renderHook(() => useMenuManagementContext(), {
      wrapper: MenuManagementProvider,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.menus).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao buscar menus:',
        mockError
      );
    });

    consoleSpy.mockRestore();
  });
});
