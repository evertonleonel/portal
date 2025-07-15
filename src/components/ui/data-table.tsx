import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnPinning: {
        right: ['actions'],
      },
    },
  });

  return (
    <div className="[&>div]:max-h-[50vh]">
      <Table className="font-manrope">
        <TableHeader className="bg-table backdrop-blur-xs sticky top-0 z-10">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="border-t-0">
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    className={cn(
                      'first:md:pl-4 last:md:pr-4 first:lg:pl-6 last:lg:pr-6',
                      header.column.getIsPinned() &&
                        data.length &&
                        'backdrop-blur-xs sticky right-0'
                    )}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="text-surface first:md:pl-4 last:md:pr-4 first:lg:pl-6 last:lg:pr-6"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      className={cn(
                        'text-surface first:md:pl-4 last:md:pr-4 first:lg:pl-6 last:lg:pr-6',
                        cell.column.getIsPinned() &&
                          'sticky right-0 backdrop-blur-sm'
                      )}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRowSpacing colSpan={columns.length} />
              </>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export const TableRowSpacing = ({ colSpan = 1000 }: { colSpan?: number }) => {
  return (
    <tr aria-hidden="true">
      <td colSpan={colSpan} className="py-1" />
    </tr>
  );
};
