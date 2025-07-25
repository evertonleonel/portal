import type { Empresa } from '.';

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
