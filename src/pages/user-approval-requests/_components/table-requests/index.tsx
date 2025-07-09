import type { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';
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

export const TableRequests = () => {
  const usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'João',
      email: 'joao@email.com',
      perfil: 'string',
      dataHora: 'string',
      empresa: 'string',
      statusMRS: 'APROVADO',
      statusFIPS: 'NEGAR',
    },
    {
      id: 2,
      nome: 'Maria',
      email: 'maria@email.com',
      perfil: 'string',
      dataHora: 'string',
      empresa: 'string',
      statusMRS: 'NEGAR',
      statusFIPS: 'NEGAR',
    },
    {
      id: 3,
      nome: 'Carlos',
      email: 'carlos@email.com',
      perfil: 'string',
      dataHora: 'string',
      empresa: 'string',
      statusMRS: 'APROVADO',
      statusFIPS: 'NEGAR',
    },
  ];

  const colunas: ColumnDef<Usuario>[] = [
    { header: 'Nome', accessorKey: 'nome' },
    { header: 'Email', accessorKey: 'email' },
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

  return (
    <>
      <DataTable columns={colunas} data={usuarios} />
      <DataTableSkeleton
        columnCount={9}
        rowCount={6}
        cellWidths={['10%', '20%', '5%', '5%', '15%', '10%', '10%', '5%', '5%']}
      />
    </>
  );
};
