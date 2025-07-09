import type { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { UserRequestStatus } from '@/components/ui/status/user-requests-status';
import type { USER_REQUEST_STATUS } from '@/types/_enums/user-request-status';

type Usuario = {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  empresa: string;
  dataHora: Date;
  statusMRS: keyof typeof USER_REQUEST_STATUS;
  statusFIPS: keyof typeof USER_REQUEST_STATUS;
};

export const columnsTableRequests: ColumnDef<Usuario>[] = [
  { header: 'Nome', accessorKey: 'nome' },
  { header: 'E-mail', accessorKey: 'email' },
  { header: 'Perfil', accessorKey: 'perfil' },
  { header: 'Empresa', accessorKey: 'empresa' },
  {
    accessorKey: 'dataHora',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-foreground hover:text-foreground cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data e hora da solicitação
          <div className="ml-2 h-4 w-4 rounded">
            <Icon
              name={column.getIsSorted() === 'asc' ? 'arrowDown' : 'arrowUp'}
              className="text-primary"
            />
          </div>
        </Button>
      );
    },
  },
  {
    header: 'Status MRS',
    accessorKey: 'statusMRS',
    cell: () => (
      <UserRequestStatus variant="neutral">
        <Icon name="checkCircle" />
        Negar
      </UserRequestStatus>
    ),
  },
  {
    header: 'Status FIPS',
    accessorKey: 'statusFIPS',
    cell: ({ row }) => (
      <UserRequestStatus
        status={row.original.statusFIPS as keyof typeof USER_REQUEST_STATUS}
      >
        <Icon name="closeCircle" />
      </UserRequestStatus>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <p>{row.original.id}</p>,
  },
];
