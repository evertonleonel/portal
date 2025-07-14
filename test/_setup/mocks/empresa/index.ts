import type { Empresa } from '@/types/empresa';
type EmpresasName = 'MRS' | 'FIPS' | 'RUMO';

export const empresaMock: Record<EmpresasName, Empresa> = {
  MRS: {
    id: 1,
    sigla: 'MRS',
    nome: 'MRS',
    ativo: true,
    dataCriacao: '2025-07-08T14:43:16.780Z',
    usuarioCriacao: {
      id: 1,
      nome: 'Admin',
      dataCriacao: '2025-07-08T14:43:16.780Z',
    },
    dataAlteracao: null,
    usuarioAlteracao: null,
  },
  FIPS: {
    id: 2,
    sigla: 'FIPS',
    nome: 'FIPS',
    ativo: true,
    dataCriacao: '2025-06-30T18:45:04.137',
    usuarioCriacao: {
      id: 1,
      nome: 'Sist-Portal Unificado',
      dataCriacao: '2025-06-30T18:44:43.45',
    },
    dataAlteracao: null,
    usuarioAlteracao: null,
  },
  RUMO: {
    id: 3,
    sigla: 'RUMO',
    nome: 'RUMO',
    ativo: true,
    dataCriacao: '2025-07-08T14:43:16.780Z',
    usuarioCriacao: {
      id: 1,
      nome: 'Admin',
      dataCriacao: '2025-07-08T14:43:16.780Z',
    },
    dataAlteracao: '2025-08-08T15:45:13.000Z',
    usuarioAlteracao: 'Master Editor',
  },
};

export const empresasMock: Empresa[] = [empresaMock.MRS, empresaMock.FIPS];
