import { type Column, DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton';
type Usuario = {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  empresa: string;
  dataHora: string;
  statusMRS: boolean;
  statusFIPS: boolean;
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
      statusMRS: true,
      statusFIPS: false,
    },
    {
      id: 2,
      nome: 'Maria',
      email: 'maria@email.com',
      perfil: 'string',
      dataHora: 'string',
      empresa: 'string',
      statusMRS: false,
      statusFIPS: false,
    },
    {
      id: 3,
      nome: 'Carlos',
      email: 'carlos@email.com',
      perfil: 'string',
      dataHora: 'string',
      empresa: 'string',
      statusMRS: true,
      statusFIPS: false,
    },
  ];

  const colunas: Column<Usuario>[] = [
    { header: 'Nome', accessor: 'nome' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Status MRS',
      accessor: 'statusMRS',
      render: valor => (
        <span className={valor ? 'text-green-600' : 'text-red-600'}>
          {valor ? 'Ativo' : 'Inativo'}
        </span>
      ),
    },
    {
      header: 'Status FIPS',
      accessor: 'statusFIPS',
      render: valor => (
        <span className={valor ? 'text-green-600' : 'text-red-600'}>
          {valor ? 'Ativo' : 'Inativo'}
        </span>
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
