import type { GetUserRequestsResponse } from '@/types/user/requests';

export const requestMock: GetUserRequestsResponse[] = [
  {
    id: 1,
    nome: 'Elon Musk',
    email: 'elon.musk@example.com',
    cargo: 'CEO',
    empresa: {
      id: 1,
      sigla: 'EMP1',
      nome: 'Empresa 1',
      ativo: true,
      dataCriacao: '2024-01-01',
      usuarioCriacao: {
        id: 1,
        nome: 'Admin',
        dataCriacao: '2024-01-01',
      },
      dataAlteracao: null,
      usuarioAlteracao: null,
    },
    statusAprovacaoMrs: 'P',
    statusAprovacaoFips: 'P',
    dataCriacao: '2024-01-01',
    usuarioCriacao: {
      id: 1,
      nome: 'Admin',
      dataCriacao: '2024-01-01',
    },
    dataAlteracao: '2024-01-02',
    usuarioAlteracao: {
      id: 2,
      nome: 'Aprovador',
      email: 'aprovador@example.com',
      cargo: 'Aprovador',
      empresa: {
        id: 1,
        sigla: 'EMP1',
        nome: 'Empresa 1',
        ativo: true,
        dataCriacao: '2024-01-01',
        usuarioCriacao: {
          id: 1,
          nome: 'Admin',
          dataCriacao: '2024-01-01',
        },
        dataAlteracao: null,
        usuarioAlteracao: null,
      },
      chaveAd: 'aprovador',
      ativo: true,
      dataCriacao: '2024-01-01',
      usuarioCriacao: 'Admin',
      dataAlteracao: '2024-01-02',
      usuarioAlteracao: 'Admin',
    },
  },
];

export const userMock = {
  requests: requestMock,
};
