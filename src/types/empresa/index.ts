export type Empresa = {
  id: number;
  sigla: string;
  nome: string;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: {
    id: number;
    nome: string;
    dataCriacao: string;
  };
  dataAlteracao: string | null;
  usuarioAlteracao: string | null;
};

//Services
export type GetEmpresaResponse = Empresa;

export interface GetEmpresaByIdParams {
  id: string;
}

export interface PostEmpresaBody {
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
