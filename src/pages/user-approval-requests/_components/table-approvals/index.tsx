import { DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';

import { useTableApprovals } from '../hook/use-table-approvals';
import { columnsTableApprovals } from './columns';

export const TableApprovals = () => {
  const { dataApprovals, isLoading } = useTableApprovals();

  if (isLoading)
    return (
      <DataTableSkeleton
        columnCount={6}
        rowCount={6}
        cellWidths={['10%', '15%', '10%', '10%', '10%', '30%']}
      />
    );

  return <DataTable columns={columnsTableApprovals} data={dataApprovals} />;
};
