import type { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { Menu, SubMenu } from '@/types/menu';
import { formatDateWithHour } from '@/utils/format-date-with-hour';

import { CellActionTableMenu } from './cell-action';

export const columnsTableMenus: ColumnDef<Menu>[] = [
  {
    id: 'expand',
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={row.getToggleExpandedHandler()}
        >
          <Icon
            name={row.getIsExpanded() ? 'chevronUpArrow' : 'chevronDownArrow'}
          />
        </Button>
      ) : null;
    },
  },
  {
    header: 'Descrição',
    accessorKey: 'desc',
    cell: ({ row, getValue }) => {
      return (
        <div className="flex items-center gap-2">
          <span>{getValue() as string}</span>
          {row.getCanExpand() && (
            <span className="text-muted-foreground text-xs">
              ({row.original.subMenus.length} submenus)
            </span>
          )}
        </div>
      );
    },
  },
  { header: 'Caminho', accessorKey: 'caminho' },
  {
    accessorKey: 'dataCriacao',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-foreground hover:text-foreground cursor-pointer px-0"
          onClick={() => column.toggleSorting()}
        >
          Data e hora da criação
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
    cell: ({ row }) => <CellActionTableMenu dataMenu={row.original} />,
  },
];

export const columnsTableSubMenus: ColumnDef<SubMenu>[] = [
  {
    id: 'expand',
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={row.getToggleExpandedHandler()}
          className="hidden"
        >
          <Icon
            name={row.getIsExpanded() ? 'chevronUpArrow' : 'chevronDownArrow'}
          />
        </Button>
      ) : null;
    },
  },
  {
    header: 'Descrição',
    accessorKey: 'desc',
    cell: ({ getValue }) => {
      return (
        <div className="flex items-center gap-2 pl-10">
          <span>{getValue() as string}</span>
        </div>
      );
    },
  },
  { header: 'Caminho', accessorKey: 'caminho' },
  {
    accessorKey: 'dataCriacao',
    header: 'Data e hora da criação',
    cell: ({ row }) => {
      return <span>{formatDateWithHour(row.original.dataCriacao)}</span>;
    },
  },
  { header: 'Ordem exibição', accessorKey: 'ordemExibicao' },
  {
    id: 'actions',
    cell: ({ row }) => <CellActionTableMenu dataSubMenu={row.original} />,
  },
];
