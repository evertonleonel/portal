import type { GetUserRequestsResponse } from '@/types/user/requests';

export const requestMock: GetUserRequestsResponse[] = [
  {
    id: 1,
    nome: 'Elon Musk',
    email: 'elon.musk@example.com',
    cargo: 'CEO',
    empresa: {
      id: 1,
      sigla: 'MRS',
      nome: 'MRS',
      ativo: true,
      dataCriacao: '2025-07-08T14:43:16.78',
      usuarioCriacao: {
        id: 1,
        nome: 'Admin',
        dataCriacao: '2025-07-08T14:43:16.78',
      },
      dataAlteracao: '2025-08-01T14:43:16.78',
      usuarioAlteracao: null,
    },
    statusAprovacaoMrs: 'P',
    statusAprovacaoFips: 'P',
    dataCriacao: '2025-07-08T14:43:16.78',
    usuarioCriacao: {
      id: 1,
      nome: 'Admin',
      dataCriacao: '2025-07-08T14:43:16.78',
    },
    dataAlteracao: '2025-08-01T14:43:16.78',
    usuarioAlteracao: {
      id: 2,
      nome: 'Aprovador',
      email: 'aprovador@example.com',
      cargo: 'Aprovador',
      empresa: {
        id: 1,
        sigla: 'MRS',
        nome: 'MRS',
        ativo: true,
        dataCriacao: '2025-07-08T14:43:16.78',
        usuarioCriacao: {
          id: 1,
          nome: 'Admin',
          dataCriacao: '2025-07-08T14:43:16.78',
        },
        dataAlteracao: '2025-08-01T14:43:16.78',
        usuarioAlteracao: null,
      },
      chaveAd: 'aprovador',
      ativo: true,
      dataCriacao: '2025-07-08T14:43:16.78',
      usuarioCriacao: 'Admin',
      dataAlteracao: '2025-08-01T14:43:16.78',
      usuarioAlteracao: 'Admin',
    },
  },
];

export const userMock = {
  requests: requestMock,
};
