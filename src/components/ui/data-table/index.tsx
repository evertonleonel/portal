import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';

export type Column<T, K extends keyof T = keyof T> = {
  header: string;
  accessor: K;
  render?: (value: T[K], row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T, keyof T>[];
  data: T[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader className="bg-table border-b-0">
        <TableRow>
          {columns.map(col => (
            <TableHead className="md:px-4 lg:px-6" key={String(col.accessor)}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <>
            <TableRow key={idx}>
              {columns.map(col => {
                const value = row[col.accessor];
                return (
                  <TableCell
                    className="text-surface md:px-4 lg:px-6"
                    key={String(col.accessor)}
                  >
                    {col.render
                      ? col.render(value, row)
                      : (value as React.ReactNode)}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRowSpacing colSpan={columns.length} />
          </>
        ))}
      </TableBody>
    </Table>
  );
}

export const TableRowSpacing = ({ colSpan = 1000 }: { colSpan?: number }) => {
  return (
    <tr aria-hidden="true">
      <td colSpan={colSpan} className="py-2" />
    </tr>
  );
};
