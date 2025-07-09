import type { ColumnDef } from '@tanstack/react-table';

import { Icon } from '@/components/ui/icon';
import { UserRequestStatus } from '@/components/ui/status/user-requests-status';
import type { USER_REQUEST_STATUS } from '@/types/_enums/user-request-status';

type Usuario = {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  empresa: string;
  dataHora: string;
  statusMRS: keyof typeof USER_REQUEST_STATUS;
  statusFIPS: keyof typeof USER_REQUEST_STATUS;
};

export const columnsTableRequests: ColumnDef<Usuario>[] = [
  { header: 'Nome', accessorKey: 'nome' },
  { header: 'E-mail', accessorKey: 'email' },
  { header: 'Perfil', accessorKey: 'perfil' },
  { header: 'Empresa', accessorKey: 'empresa' },
  { header: 'Data e hora da solicitação', accessorKey: 'dataHora' },
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
