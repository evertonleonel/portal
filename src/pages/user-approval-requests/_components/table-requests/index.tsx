import { DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';

import { useTableRequests } from '../hook/use-table-requests';
import { columnsTableRequests } from './columns';

export const TableRequests = () => {
  const { dataRequests, isLoading } = useTableRequests();

  if (isLoading)
    return (
      <DataTableSkeleton
        columnCount={9}
        rowCount={6}
        cellWidths={['10%', '10%', '5%', '5%', '15%', '10%', '10%', '5%', '5%']}
      />
    );

  return <DataTable columns={columnsTableRequests} data={dataRequests} />;
};
