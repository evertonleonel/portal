import { DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';
import type { USER_APPROVAL_STATUS } from '@/types/_enums/user-approval-status';

import { columnsTableApprovals } from './columns';
type Usuario = {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  empresa: string;
  status: keyof typeof USER_APPROVAL_STATUS;
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
      status: 'APROVADO',
      dataHora: '10/01/2025 16:10h',
    },
    {
      id: 2,
      nome: 'Maria',
      email: 'maria@email.com',
      perfil: 'Client',
      empresa: 'MRS',
      status: 'NEGADO',
      dataHora: '10/01/2025 16:10h',
    },
    {
      id: 3,
      nome: 'Carlos',
      email: 'carlos@email.com',
      perfil: 'Master',
      empresa: 'RUMO',
      status: 'APROVADO',
      dataHora: '10/01/2025 16:10h',
    },
  ];

  return (
    <>
      <DataTable columns={columnsTableApprovals} data={usuarios} />
      <DataTableSkeleton
        columnCount={6}
        rowCount={6}
        cellWidths={['10%', '15%', '10%', '10%', '10%', '30%']}
      />
    </>
  );
};
