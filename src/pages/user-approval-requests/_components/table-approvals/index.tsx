import { type Column, DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skeleton';
type Usuario = {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  empresa: string;
  status: boolean;
  dataHora: string;
};

export const TableApprovals = () => {
  const usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'João',
      email: 'joao@email.com',
      perfil: 'Admin',
      empresa: 'FIPS',
      status: true,
      dataHora: 'string',
    },
    {
      id: 2,
      nome: 'Maria',
      email: 'maria@email.com',
      perfil: 'Client',
      empresa: 'MRS',
      status: true,
      dataHora: 'string',
    },
    {
      id: 3,
      nome: 'Carlos',
      email: 'carlos@email.com',
      perfil: 'Master',
      empresa: 'RUMO',
      status: true,
      dataHora: 'string',
    },
  ];

  const colunas: Column<Usuario>[] = [
    { header: 'Nome', accessor: 'nome' },
    { header: 'E-mail', accessor: 'email' },
    { header: 'Perfil', accessor: 'perfil' },
    { header: 'Empresa', accessor: 'empresa' },
    { header: 'Status', accessor: 'status' },
    { header: 'Email', accessor: 'dataHora' },
  ];

  return (
    <>
      <DataTable columns={colunas} data={usuarios} />;
      <DataTableSkeleton
        columnCount={6}
        rowCount={6}
        cellWidths={['15%', '15%', '5%', '5%', '5%', '30%']}
      />
    </>
  );
};
