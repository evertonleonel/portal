import type { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { UserRequestStatus } from '@/components/ui/status/user-requests-status';
import type { GetUserRequestsResponse } from '@/types/user/requests';

export const columnsTableRequests: ColumnDef<GetUserRequestsResponse>[] = [
  { header: 'Nome', accessorKey: 'nome' },
  { header: 'E-mail', accessorKey: 'email' },
  {
    header: 'Perfil',
    accessorKey: 'perfil',
    cell: () => '-',
  },
  { header: 'Empresa', accessorKey: 'empresa', cell: ({ row }) => row.original.empresa?.nome },
  {
    accessorKey: 'usuarioCriacao.dataCriacao',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-foreground hover:text-foreground cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data e hora da solicitação
          <div className="ml-2 h-4 w-4 rounded">
            <Icon name={column.getIsSorted() === 'asc' ? 'arrowDown' : 'arrowUp'} className="text-primary" />
          </div>
        </Button>
      );
    },
  },
  {
    header: 'Status MRS',
    accessorKey: 'statusAprovacaoMrs',
    cell: ({ row }) => <UserRequestStatus variant="neutral" status={row.original.statusAprovacaoFips} />,
  },
  {
    header: 'Status FIPS',
    accessorKey: 'statusAprovacaoFips',
    cell: ({ row }) => <UserRequestStatus status={row.original.statusAprovacaoFips} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex gap-2 lg:gap-4">
        <UserRequestStatus className="cursor-pointer" variant="approve" onClick={() => console.log(row)}>
          <Icon name="checkCircle" />
          Permitir
        </UserRequestStatus>
        <UserRequestStatus className="cursor-pointer" variant="notApprove" onClick={() => console.log(row)}>
          <Icon name="closeCircle" />
          Negar
        </UserRequestStatus>
      </div>
    ),
  },
];
