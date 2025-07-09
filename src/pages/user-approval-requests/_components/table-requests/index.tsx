import { type Column, DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton';
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

  const colunas: Column<Usuario>[] = [
    { header: 'Nome', accessor: 'nome' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Status MRS',
      accessor: 'statusMRS',
      render: valor => (
        <UserRequestStatus variant="neutral">{valor}</UserRequestStatus>
      ),
    },
    {
      header: 'Status FIPS',
      accessor: 'statusFIPS',
      render: valor => (
        <UserRequestStatus status={valor as keyof typeof USER_REQUEST_STATUS}>
          {valor}
        </UserRequestStatus>
      ),
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
