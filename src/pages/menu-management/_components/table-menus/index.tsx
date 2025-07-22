import type { Row } from '@tanstack/react-table';

import { DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';
import type { Menu } from '@/types/menu';

import { useMenuManagementContext } from '../../context';
import { columnsTableMenus, columnsTableSubMenus } from './columns';

const SubMenuComponent = ({ row }: { row: Row<Menu> }) => {
  return (
    <div className="hover:bg-background py-2">
      <DataTable
        variant={'submenu'}
        columns={columnsTableSubMenus}
        data={row.original.subMenus}
      />
    </div>
  );
};

export const TableMenus = () => {
  const { isLoading, menus } = useMenuManagementContext();

  if (isLoading)
    return (
      <DataTableSkeleton
        columnCount={5}
        rowCount={5}
        cellWidths={['20%', '10%', '10%', '10%', '10%']}
      />
    );

  return (
    <DataTable
      columns={columnsTableMenus}
      data={menus}
      getRowCanExpand={row => row.original.subMenus.length > 0}
      renderSubComponent={SubMenuComponent}
    />
  );
};
