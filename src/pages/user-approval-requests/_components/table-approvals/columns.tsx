import type { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { UserApprovalStatus } from '@/components/ui/status/user-approval-status';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { GetUserRequestsResponse } from '@/types/user/requests';
import { formatDateWithHour } from '@/utils/format-date-with-hour';

export const columnsTableApprovals: ColumnDef<GetUserRequestsResponse>[] = [
  { header: 'Nome', accessorKey: 'nome' },
  { header: 'E-mail', accessorKey: 'email' },
  {
    header: 'Perfil',
    accessorKey: 'perfil',
    cell: () => '-',
  },
  {
    header: 'Empresa',
    accessorKey: 'empresa',
    cell: ({ row }) => row.original.empresa?.nome,
  },
  {
    header: 'Status',
    accessorKey: 'statusAprovacaoMrs',
    cell: ({ row }) => {
      const status = row.original.statusAprovacaoMrs;
      return <UserApprovalStatus status={status} />;
    },
  },
  {
    accessorKey: 'usuarioCriacao.dataAlteracao',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-foreground hover:text-foreground cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data e hora da aprovação
          <div className="ml-2 h-4 w-4 rounded">
            <Icon
              name={column.getIsSorted() === 'asc' ? 'arrowDown' : 'arrowUp'}
              className="text-primary"
            />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.original.dataAlteracao
            ? formatDateWithHour(row.original.dataAlteracao)
            : '-'}
        </span>
      );
    },
  },
  {
    id: 'actions',

    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={'ghost'}
                size={'icon'}
                className="cursor-pointer"
                onClick={() => console.log(row)}
              >
                <Icon name="note" className="size-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Justificativa</TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
];
