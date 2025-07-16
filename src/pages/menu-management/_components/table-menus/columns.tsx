import type { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { Menu } from '@/types/menu';
import { formatDateWithHour } from '@/utils/format-date-with-hour';

import { CellActionTableMenu } from './cell-action';

export const columnsTableMenus: ColumnDef<Menu>[] = [
  { header: 'Nome', accessorKey: 'menuPrincipal' },
  { header: 'Menu Principal', accessorKey: 'caminho' },
  {
    header: 'Submenu',
    cell: ({ row }) => {
      return (
        <span>{row.original.menuPrincipal ? '-' : row.original.caminho}</span>
      );
    },
  },
  { header: 'Ordem Exibição', accessorKey: 'ordemExibicao' },
  {
    accessorKey: 'dataCriacao',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-foreground hover:text-foreground cursor-pointer px-0"
          onClick={() => column.toggleSorting()}
        >
          Data e hora da solicitação
          <div className="ml-2 h-4 w-4 rounded">
            <Icon
              name={
                column.getIsSorted() === 'asc'
                  ? 'downArrow'
                  : column.getIsSorted() === 'desc'
                    ? 'upArrow'
                    : 'upDownArrow'
              }
              className="text-primary"
            />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{formatDateWithHour(row.original.dataCriacao)}</span>;
    },
  },
  {
    header: 'Usuário criação',
    accessorKey: 'usuarioCriacao.nome',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActionTableMenu data={row.original} />,
  },
];
