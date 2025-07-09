import type { ColumnDef } from '@tanstack/react-table';

import type { USER_APPROVAL_STATUS } from '@/types/_enums/user-approval-status';

type Usuario = {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  empresa: string;
  status: keyof typeof USER_APPROVAL_STATUS;
  dataHora: string;
};

export const columnsTableApprovals: ColumnDef<Usuario>[] = [
  { header: 'Nome', accessorKey: 'nome' },
  { header: 'E-mail', accessorKey: 'email' },
  { header: 'Perfil', accessorKey: 'perfil' },
  { header: 'Empresa', accessorKey: 'empresa' },
  { header: 'Status', accessorKey: 'status' },
  { header: 'Data e hora da aprovação', accessorKey: 'dataHora' },
];
