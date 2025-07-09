export interface GetEmpresaResponse {
  id: number;
  sigla: string;
  nome: string;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: {
    id: number;
    nome: string;
    email: string;
    cargo: string;
    empresa: string;
    chaveAd: string;
    ativo: boolean;
    dataUltimoLogin: string;
    dataCriacao: string;
    usuarioCriacao: string;
    dataAlteracao: string;
    usuarioAlteracao: string;
  };
  dataAlteracao: string;
  usuarioAlteracao: {
    id: 0;
    nome: string;
    email: string;
    cargo: string;
    empresa: string;
    chaveAd: string;
    ativo: boolean;
    dataUltimoLogin: string;
    dataCriacao: string;
    usuarioCriacao: string;
    dataAlteracao: string;
    usuarioAlteracao: string;
  };
}

export interface GetEmpresaByIdParams {
  id: string;
}

export interface PostEmpresaParams {
  sigla: string;
  nome: string;
}

export interface DeleteEmpresaParams {
  id: string;
}

export interface PatchEmpresaParams {
  id: string;
  sigla?: string;
  nome?: string;
}
