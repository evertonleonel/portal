import { DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';
import type { USER_REQUEST_STATUS } from '@/types/_enums/user-request-status';

import { columnsTableRequests } from './columns';
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
      perfil: '-',
      dataHora: '10/01/2025 16:10h',
      empresa: 'MRS',
      statusMRS: 'APROVADO',
      statusFIPS: 'NEGAR',
    },
    {
      id: 2,
      nome: 'Maria',
      email: 'maria@email.com',
      perfil: '-',
      dataHora: '10/01/2025 16:10h',
      empresa: 'RUMO',
      statusMRS: 'NEGAR',
      statusFIPS: 'NEGAR',
    },
    {
      id: 3,
      nome: 'Carlos',
      email: 'carlos@email.com',
      perfil: '-',
      dataHora: '10/01/2025 16:10h',
      empresa: 'VLI',
      statusMRS: 'APROVADO',
      statusFIPS: 'NEGAR',
    },
  ];
  return (
    <>
      <DataTable columns={columnsTableRequests} data={usuarios} />
      <DataTableSkeleton
        columnCount={9}
        rowCount={6}
        cellWidths={['10%', '20%', '5%', '5%', '15%', '10%', '10%', '5%', '5%']}
      />
    </>
  );
};
