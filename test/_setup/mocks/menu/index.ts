import type { Menu, SubMenu } from '@/types/menu';

const mockMenu1 = {
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
};

const mockMenu2 = {
  id: 6,
  desc: 'HOME',
  caminho: '/pagina-inicial',
  subMenus: [],
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
};

const mockMenus: Menu[] = [mockMenu1, mockMenu2];

const mockSubMenu1: SubMenu = {
  id: 2,
  desc: 'SUB_MENU_1',
  caminho: '/aprovar/sub-menu1',
  ordemExibicao: 1,
  dataCriacao: '2025-07-07T19:29:11.433',
};

export { mockMenus, mockMenu1, mockMenu2, mockSubMenu1 };
