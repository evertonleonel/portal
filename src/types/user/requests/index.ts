import type { Empresa } from '@/types/empresa';

import type { USER_REQUEST_STATUS } from '../../_enums/user-request-status';

export interface GetUserRequestsResponse {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  empresa: Empresa | null;
  statusAprovacaoMrs: keyof typeof USER_REQUEST_STATUS;
  statusAprovacaoFips: keyof typeof USER_REQUEST_STATUS;
  dataCriacao: string;
  usuarioCriacao: {
    id: number;
    nome: string;
    dataCriacao: string;
  };
  dataAlteracao: string | null;
  usuarioAlteracao: {
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
  };
}

export interface GetAllUserRequestsParams {
  nome?: string;
  idEmpresa?: number;
}
