import type { Empresa } from '@/types/empresa';

export const empresaMock: Empresa[] = [
  {
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
  {
    id: 2,
    sigla: 'EMP2',
    nome: 'Empresa 2',
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
];
