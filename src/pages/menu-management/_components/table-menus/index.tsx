import type { Row } from '@tanstack/react-table';

import { DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';
import type { Menu } from '@/types/menu';

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
  const isLoading = false;

  const novoMenu: Menu[] = [
    {
      id: 1,
      desc: 'APROVAR_SOLICITACAO_USUARIO',
      caminho: '/aprovar',
      subMenus: [
        {
          id: 2,
          desc: 'SUB_MENU_1',
          caminho: '/aprovar/sub-menu1',
          ordemExibicao: 1,
          dataCriacao: '2025-07-07T19:29:11.433',
        },
        {
          id: 3,
          desc: 'SUB_MENU_2',
          caminho: '/aprovar/sub-menu2',
          ordemExibicao: 2,
          dataCriacao: '2025-07-07T19:29:11.433',
        },
        {
          id: 4,
          desc: 'SUB_MENU_3',
          caminho: '/aprovar/sub-menu3',
          ordemExibicao: 3,
          dataCriacao: '2025-07-07T19:29:11.433',
        },
        {
          id: 5,
          desc: 'SUB_MENU_4',
          caminho: '/aprovar/sub-menu4',
          ordemExibicao: 4,
          dataCriacao: '2025-07-07T19:29:11.433',
        },
      ],
      sistema: {
        id: 1,
        sigla: 'PBU',
        nome: 'Portal Baixada Unificado',
        empresa: {
          id: 1,
          sigla: 'MRS',
          nome: 'MRS',
          ativo: true,
          dataCriacao: '2025-06-30T18:45:04.127',
          usuarioCriacao: {
            id: 1,
            nome: 'Sist-Portal Unificado',
            dataCriacao: '2025-06-30T18:44:43.45',
          },
          dataAlteracao: null,
          usuarioAlteracao: null,
        },
        ativo: true,
        dataCriacao: '2025-07-07T19:28:03.55',
        usuarioCriacao: {
          id: 1,
          nome: 'Sist-Portal Unificado',
          dataCriacao: '2025-06-30T18:44:43.45',
        },
        dataAlteracao: null,
        usuarioAlteracao: null,
      },
      dataCriacao: '2025-07-07T19:29:11.433',
      usuarioCriacao: {
        id: 1,
        nome: 'Sist-Portal Unificado',
        email: 'portalunificado@squadra.com.br',
        cargo: 'Sistema',
        chaveAd: '',
        ativo: true,
        dataCriacao: '2025-06-30T18:44:43.45',
      },
    },
    {
      id: 6,
      desc: 'HOME',
      caminho: '/home',
      subMenus: [
        {
          id: 10,
          desc: 'RELATORIO_MENSAL',
          caminho: '/relatorios/mensal',
          ordemExibicao: 1,
          dataCriacao: '2025-06-12T10:15:30.000',
        },
        {
          id: 11,
          desc: 'RELATORIO_ANUAL',
          caminho: '/relatorios/anual',
          ordemExibicao: 2,
          dataCriacao: '2025-06-12T10:15:30.000',
        },
        {
          id: 12,
          desc: 'CONFIGURACOES_USUARIO',
          caminho: '/configuracoes/usuario',
          ordemExibicao: 3,
          dataCriacao: '2025-06-15T09:00:00.000',
        },
        {
          id: 13,
          desc: 'HISTORICO_ACESSO',
          caminho: '/auditoria/historico',
          ordemExibicao: 4,
          dataCriacao: '2025-06-20T14:45:10.000',
        },
      ],
      sistema: {
        id: 1,
        sigla: 'PBU',
        nome: 'Portal Baixada Unificado',
        empresa: {
          id: 1,
          sigla: 'MRS',
          nome: 'MRS',
          ativo: true,
          dataCriacao: '2025-06-30T18:45:04.127',
          usuarioCriacao: {
            id: 1,
            nome: 'Sist-Portal Unificado',
            dataCriacao: '2025-06-30T18:44:43.45',
          },
          dataAlteracao: null,
          usuarioAlteracao: null,
        },
        ativo: true,
        dataCriacao: '2025-07-07T19:28:03.55',
        usuarioCriacao: {
          id: 1,
          nome: 'Sist-Portal Unificado',
          dataCriacao: '2025-06-30T18:44:43.45',
        },
        dataAlteracao: null,
        usuarioAlteracao: null,
      },
      dataCriacao: '2025-07-07T19:29:11.433',
      usuarioCriacao: {
        id: 1,
        nome: 'Sist-Portal Unificado',
        email: 'portalunificado@squadra.com.br',
        cargo: 'Sistema',
        chaveAd: '',
        ativo: true,
        dataCriacao: '2025-06-30T18:44:43.45',
      },
    },
  ];

  if (isLoading)
    return (
      <DataTableSkeleton
        columnCount={9}
        rowCount={6}
        cellWidths={['10%', '10%', '5%', '5%', '15%', '10%', '10%', '5%', '5%']}
      />
    );

  return (
    <DataTable
      columns={columnsTableMenus}
      data={novoMenu}
      getRowCanExpand={row => row.original.subMenus.length > 0}
      renderSubComponent={SubMenuComponent}
    />
  );
};
