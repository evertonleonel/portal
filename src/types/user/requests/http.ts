import type { Empresa } from '@/types/empresa';
import type { PerfilRequestParams } from '@/types/perfil/http';

import type { USER_REQUEST_STATUS } from '../../_enums/user-request-status';
import type { Usuario } from '..';

export interface GetUserRequestsResponse {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  empresa: Empresa;
  statusAprovacaoMrs: keyof typeof USER_REQUEST_STATUS;
  statusAprovacaoFips: keyof typeof USER_REQUEST_STATUS;
  dataCriacao: string;
  usuarioCriacao: {
    id: number;
    nome: string;
    dataCriacao: string;
  };
  dataAlteracao: string | null;
  usuarioAlteracao: Usuario;
}

export interface GetAllUserRequestsParams {
  nome?: string;
  idEmpresa?: number;
}

export interface ApproveRequestParams {
  perfis: PerfilRequestParams[];
}
export interface NegarRequestParams {
  justificativa: string;
}
