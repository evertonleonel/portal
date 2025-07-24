const empresaMock = {
  id: 1,
  sigla: 'ABC',
  nome: 'Empresa ABC',
  ativo: true,
  dataCriacao: '2025-07-24T14:20:52.631Z',
  usuarioCriacao: 'admin',
  dataAlteracao: '2025-07-24T14:20:52.631Z',
  usuarioAlteracao: 'admin',
};

const usuarioBase = {
  id: 1,
  nome: 'João da Silva',
  email: 'joao@empresa.com',
  cargo: 'Analista',
  chaveAd: 'joao.silva',
  ativo: true,
  dataCriacao: '2025-07-24T14:20:52.632Z',
  usuarioCriacao: 'admin',
  dataAlteracao: '2025-07-24T14:20:52.632Z',
  usuarioAlteracao: 'admin',
  empresa: empresaMock,
  usuarioPerfis: [],
};

export const mockNotification = [
  {
    id: 1,
    descricao: 'Notificação de teste',
    lido: false,
    dataCriacao: '2025-07-24T14:20:52.632Z',
    dataAlteracao: '2025-07-24T14:20:52.632Z',
    usuario: {
      ...usuarioBase,
      usuarioPerfis: [
        {
          id: 1,
          usuario: 'joao.silva',
          dataCriacao: '2025-07-24T14:20:52.632Z',
          usuarioCriacao: 'admin',
          perfil: {
            id: 1,
            desc: 'Administrador',
            ativo: true,
            dataCriacao: '2025-07-24T14:20:52.631Z',
            usuarioCriacao: 'admin',
            dataAlteracao: '2025-07-24T14:20:52.631Z',
            usuarioAlteracao: 'admin',
            usuarioPerfis: [],
            perfilMenus: [
              {
                id: 1,
                perfil: 'Administrador',
                descNivelAcesso: 'Total',
                dataCriacao: '2025-07-24T14:20:52.631Z',
                usuarioCriacao: 'admin',
                dataAlteracao: '2025-07-24T14:20:52.631Z',
                usuarioAlteracao: 'admin',
                menu: {
                  id: 1,
                  desc: 'Dashboard',
                  caminho: '/dashboard',
                  menuPrincipal: null,
                  ordemExibicao: 1,
                  dataCriacao: '2025-07-24T14:20:52.631Z',
                  usuarioCriacao: 'admin',
                  dataAlteracao: '2025-07-24T14:20:52.631Z',
                  usuarioAlteracao: 'admin',
                  perfilMenus: [],
                  sistema: {
                    id: 1,
                    sigla: 'SIS',
                    nome: 'Sistema de Gestão',
                    ativo: true,
                    dataCriacao: '2025-07-24T14:20:52.631Z',
                    usuarioCriacao: 'admin',
                    dataAlteracao: '2025-07-24T14:20:52.631Z',
                    usuarioAlteracao: 'admin',
                    empresa: empresaMock,
                  },
                },
              },
            ],
            sistema: {
              id: 1,
              sigla: 'SIS',
              nome: 'Sistema de Gestão',
              ativo: true,
              dataCriacao: '2025-07-24T14:20:52.631Z',
              usuarioCriacao: 'admin',
              dataAlteracao: '2025-07-24T14:20:52.631Z',
              usuarioAlteracao: 'admin',
              empresa: empresaMock,
            },
          },
        },
      ],
    },
    usuarioCriacao: usuarioBase,
    usuarioAlteracao: usuarioBase,
  },
  {
    id: 2,
    descricao: 'Notificação de teste',
    lido: false,
    dataCriacao: '2025-07-30T14:20:52.632Z',
    dataAlteracao: '2025-07-24T14:20:52.632Z',
    usuario: {
      ...usuarioBase,
      usuarioPerfis: [
        {
          id: 1,
          usuario: 'joao.silva',
          dataCriacao: '2025-07-24T14:20:52.632Z',
          usuarioCriacao: 'admin',
          perfil: {
            id: 1,
            desc: 'Administrador',
            ativo: true,
            dataCriacao: '2025-07-24T14:20:52.631Z',
            usuarioCriacao: 'admin',
            dataAlteracao: '2025-07-24T14:20:52.631Z',
            usuarioAlteracao: 'admin',
            usuarioPerfis: [],
            perfilMenus: [
              {
                id: 1,
                perfil: 'Administrador',
                descNivelAcesso: 'Total',
                dataCriacao: '2025-07-24T14:20:52.631Z',
                usuarioCriacao: 'admin',
                dataAlteracao: '2025-07-24T14:20:52.631Z',
                usuarioAlteracao: 'admin',
                menu: {
                  id: 1,
                  desc: 'Dashboard',
                  caminho: '/dashboard',
                  menuPrincipal: null,
                  ordemExibicao: 1,
                  dataCriacao: '2025-07-24T14:20:52.631Z',
                  usuarioCriacao: 'admin',
                  dataAlteracao: '2025-07-24T14:20:52.631Z',
                  usuarioAlteracao: 'admin',
                  perfilMenus: [],
                  sistema: {
                    id: 1,
                    sigla: 'SIS',
                    nome: 'Sistema de Gestão',
                    ativo: true,
                    dataCriacao: '2025-07-24T14:20:52.631Z',
                    usuarioCriacao: 'admin',
                    dataAlteracao: '2025-07-24T14:20:52.631Z',
                    usuarioAlteracao: 'admin',
                    empresa: empresaMock,
                  },
                },
              },
            ],
            sistema: {
              id: 1,
              sigla: 'SIS',
              nome: 'Sistema de Gestão',
              ativo: true,
              dataCriacao: '2025-07-24T14:20:52.631Z',
              usuarioCriacao: 'admin',
              dataAlteracao: '2025-07-24T14:20:52.631Z',
              usuarioAlteracao: 'admin',
              empresa: empresaMock,
            },
          },
        },
      ],
    },
    usuarioCriacao: usuarioBase,
    usuarioAlteracao: usuarioBase,
  },
  {
    id: 3,
    descricao: 'Notificação de teste',
    lido: false,
    dataCriacao: '2025-08-30T14:20:52.632Z',
    dataAlteracao: '2025-07-24T14:20:52.632Z',
    usuario: {
      ...usuarioBase,
      usuarioPerfis: [
        {
          id: 1,
          usuario: 'joao.silva',
          dataCriacao: '2025-07-24T14:20:52.632Z',
          usuarioCriacao: 'admin',
          perfil: {
            id: 1,
            desc: 'Administrador',
            ativo: true,
            dataCriacao: '2025-07-24T14:20:52.631Z',
            usuarioCriacao: 'admin',
            dataAlteracao: '2025-07-24T14:20:52.631Z',
            usuarioAlteracao: 'admin',
            usuarioPerfis: [],
            perfilMenus: [
              {
                id: 1,
                perfil: 'Administrador',
                descNivelAcesso: 'Total',
                dataCriacao: '2025-07-24T14:20:52.631Z',
                usuarioCriacao: 'admin',
                dataAlteracao: '2025-07-24T14:20:52.631Z',
                usuarioAlteracao: 'admin',
                menu: {
                  id: 1,
                  desc: 'Dashboard',
                  caminho: '/dashboard',
                  menuPrincipal: null,
                  ordemExibicao: 1,
                  dataCriacao: '2025-07-24T14:20:52.631Z',
                  usuarioCriacao: 'admin',
                  dataAlteracao: '2025-07-24T14:20:52.631Z',
                  usuarioAlteracao: 'admin',
                  perfilMenus: [],
                  sistema: {
                    id: 1,
                    sigla: 'SIS',
                    nome: 'Sistema de Gestão',
                    ativo: true,
                    dataCriacao: '2025-07-24T14:20:52.631Z',
                    usuarioCriacao: 'admin',
                    dataAlteracao: '2025-07-24T14:20:52.631Z',
                    usuarioAlteracao: 'admin',
                    empresa: empresaMock,
                  },
                },
              },
            ],
            sistema: {
              id: 1,
              sigla: 'SIS',
              nome: 'Sistema de Gestão',
              ativo: true,
              dataCriacao: '2025-07-24T14:20:52.631Z',
              usuarioCriacao: 'admin',
              dataAlteracao: '2025-07-24T14:20:52.631Z',
              usuarioAlteracao: 'admin',
              empresa: empresaMock,
            },
          },
        },
      ],
    },
    usuarioCriacao: usuarioBase,
    usuarioAlteracao: usuarioBase,
  },
  {
    id: 4,
    descricao: 'Notificação de teste',
    lido: false,
    dataCriacao: '2025-07-24T18:20:52.632Z',
    dataAlteracao: '2025-07-24T14:20:52.632Z',
    usuario: {
      ...usuarioBase,
      usuarioPerfis: [
        {
          id: 1,
          usuario: 'joao.silva',
          dataCriacao: '2025-07-24T14:20:52.632Z',
          usuarioCriacao: 'admin',
          perfil: {
            id: 1,
            desc: 'Administrador',
            ativo: true,
            dataCriacao: '2025-07-24T14:20:52.631Z',
            usuarioCriacao: 'admin',
            dataAlteracao: '2025-07-24T14:20:52.631Z',
            usuarioAlteracao: 'admin',
            usuarioPerfis: [],
            perfilMenus: [
              {
                id: 1,
                perfil: 'Administrador',
                descNivelAcesso: 'Total',
                dataCriacao: '2025-07-24T14:20:52.631Z',
                usuarioCriacao: 'admin',
                dataAlteracao: '2025-07-24T14:20:52.631Z',
                usuarioAlteracao: 'admin',
                menu: {
                  id: 1,
                  desc: 'Dashboard',
                  caminho: '/dashboard',
                  menuPrincipal: null,
                  ordemExibicao: 1,
                  dataCriacao: '2025-07-24T14:20:52.631Z',
                  usuarioCriacao: 'admin',
                  dataAlteracao: '2025-07-24T14:20:52.631Z',
                  usuarioAlteracao: 'admin',
                  perfilMenus: [],
                  sistema: {
                    id: 1,
                    sigla: 'SIS',
                    nome: 'Sistema de Gestão',
                    ativo: true,
                    dataCriacao: '2025-07-24T14:20:52.631Z',
                    usuarioCriacao: 'admin',
                    dataAlteracao: '2025-07-24T14:20:52.631Z',
                    usuarioAlteracao: 'admin',
                    empresa: empresaMock,
                  },
                },
              },
            ],
            sistema: {
              id: 1,
              sigla: 'SIS',
              nome: 'Sistema de Gestão',
              ativo: true,
              dataCriacao: '2025-07-24T14:20:52.631Z',
              usuarioCriacao: 'admin',
              dataAlteracao: '2025-07-24T14:20:52.631Z',
              usuarioAlteracao: 'admin',
              empresa: empresaMock,
            },
          },
        },
      ],
    },
    usuarioCriacao: usuarioBase,
    usuarioAlteracao: usuarioBase,
  },
  {
    id: 5,
    descricao: 'Notificação de teste',
    lido: false,
    dataCriacao: '2025-07-24T18:09:25.000Z',
    dataAlteracao: '2025-07-24T14:20:52.632Z',
    usuario: {
      ...usuarioBase,
      usuarioPerfis: [
        {
          id: 1,
          usuario: 'joao.silva',
          dataCriacao: '2025-07-24T14:20:52.632Z',
          usuarioCriacao: 'admin',
          perfil: {
            id: 1,
            desc: 'Administrador',
            ativo: true,
            dataCriacao: '2025-07-24T14:20:52.631Z',
            usuarioCriacao: 'admin',
            dataAlteracao: '2025-07-24T14:20:52.631Z',
            usuarioAlteracao: 'admin',
            usuarioPerfis: [],
            perfilMenus: [
              {
                id: 1,
                perfil: 'Administrador',
                descNivelAcesso: 'Total',
                dataCriacao: '2025-07-24T14:20:52.631Z',
                usuarioCriacao: 'admin',
                dataAlteracao: '2025-07-24T14:20:52.631Z',
                usuarioAlteracao: 'admin',
                menu: {
                  id: 1,
                  desc: 'Dashboard',
                  caminho: '/dashboard',
                  menuPrincipal: null,
                  ordemExibicao: 1,
                  dataCriacao: '2025-07-24T14:20:52.631Z',
                  usuarioCriacao: 'admin',
                  dataAlteracao: '2025-07-24T14:20:52.631Z',
                  usuarioAlteracao: 'admin',
                  perfilMenus: [],
                  sistema: {
                    id: 1,
                    sigla: 'SIS',
                    nome: 'Sistema de Gestão',
                    ativo: true,
                    dataCriacao: '2025-07-24T14:20:52.631Z',
                    usuarioCriacao: 'admin',
                    dataAlteracao: '2025-07-24T14:20:52.631Z',
                    usuarioAlteracao: 'admin',
                    empresa: empresaMock,
                  },
                },
              },
            ],
            sistema: {
              id: 1,
              sigla: 'SIS',
              nome: 'Sistema de Gestão',
              ativo: true,
              dataCriacao: '2025-07-24T14:20:52.631Z',
              usuarioCriacao: 'admin',
              dataAlteracao: '2025-07-24T14:20:52.631Z',
              usuarioAlteracao: 'admin',
              empresa: empresaMock,
            },
          },
        },
      ],
    },
    usuarioCriacao: usuarioBase,
    usuarioAlteracao: usuarioBase,
  },
];

export interface Empresa {
  id: number;
  sigla: string;
  nome: string;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
}

export interface Sistema {
  id: number;
  sigla: string;
  nome: string;
  empresa: Empresa;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
}

export interface Menu {
  id: number;
  desc: string;
  caminho: string;
  menuPrincipal: string | null;
  ordemExibicao: number;
  sistema: Sistema;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
  perfilMenus: string[]; // ou: PerfilMenu[] se for referenciado como objeto
}

export interface PerfilMenu {
  id: number;
  perfil: string;
  menu: Menu;
  descNivelAcesso: string;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
}

export interface Perfil {
  id: number;
  desc: string;
  sistema: Sistema;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
  usuarioPerfis: string[]; // ou UsuarioPerfil[]
  perfilMenus: PerfilMenu[];
}

export interface UsuarioPerfil {
  id: number;
  usuario: string;
  perfil: Perfil;
  dataCriacao: string;
  usuarioCriacao: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  empresa: Empresa;
  chaveAd: string;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
  usuarioPerfis: UsuarioPerfil[];
}

export interface Notification {
  id: number;
  usuario: Usuario;
  descricao: string;
  lido: boolean;
  dataCriacao: string;
  usuarioCriacao: Usuario;
  dataAlteracao: string;
  usuarioAlteracao: Usuario;
}
