import type { ColumnDef } from '@tanstack/react-table';
import { EllipsisIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { UserRequestStatus } from '@/components/ui/status/user-requests-status';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { GetUserRequestsResponse } from '@/types/user/requests';
import { formatDateWithHour } from '@/utils/format-date-with-hour';

export const columnsTableRequests: ColumnDef<GetUserRequestsResponse>[] = [
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
    header: 'Status MRS',
    accessorKey: 'statusAprovacaoMrs',
    cell: ({ row }) => {
      const status = row.original.statusAprovacaoMrs;
      const isActive = status === 'P';
      return (
        <UserRequestStatus
          status={status}
          variant={isActive ? 'default' : 'disable'}
        />
      );
    },
  },
  {
    header: 'Status FIPS',
    accessorKey: 'statusAprovacaoFips',
    cell: ({ row }) => {
      return <UserRequestStatus status={row.original.statusAprovacaoFips} />;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { statusAprovacaoFips, statusAprovacaoMrs } = row.original;

      const canApproveOrReject =
        statusAprovacaoFips === 'P' && statusAprovacaoMrs === 'P';

      return (
        <>
          <div className="flex justify-center gap-2 max-lg:hidden lg:gap-4">
            <UserRequestStatus
              onClick={() => console.log(row)}
              className="cursor-pointer"
              variant={canApproveOrReject ? 'approve' : 'disable'}
              disabled={!canApproveOrReject}
            >
              <Icon name="checkCircle" />
              Permitir
            </UserRequestStatus>
            <UserRequestStatus
              className="cursor-pointer"
              onClick={() => console.log(row)}
              variant={canApproveOrReject ? 'notApprove' : 'disable'}
              disabled={!canApproveOrReject}
            >
              <Icon name="closeCircle" />
              Negar
            </UserRequestStatus>
          </div>

          <div className="lg:hidden">
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <EllipsisIcon />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Ações</span>
                </TooltipContent>
              </Tooltip>

              <DropdownMenuContent
                className="divide divide-input divide-y px-0"
                align="start"
              >
                <DropdownMenuItem
                  className="rounded-none"
                  disabled={!canApproveOrReject}
                  onClick={() => console.log('Permitir')}
                >
                  Permitir
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center rounded-none"
                  disabled={!canApproveOrReject}
                  onClick={() => console.log('Negar')}
                >
                  Negar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      );
    },
  },
];
