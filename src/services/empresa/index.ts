import { api } from '@/utils/lib/axios';

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

export async function getAllEmpresa() {
  const response = await api.get<GetEmpresaResponse[]>(`/v1/empresa`);
  return response.data;
}

interface GetEmpresaByIdParams {
  id: string;
}

export async function getEmpresaById({ id }: GetEmpresaByIdParams) {
  const response = await api.get<GetEmpresaResponse>(`/v1/empresa/${id}`);
  return response.data;
}

interface PostEmpresaParams {
  sigla: string;
  nome: string;
}

export async function postEmpresa({ sigla, nome }: PostEmpresaParams) {
  await api.post(`/v1/empresa`, { sigla, nome });
}

interface DeleteEmpresaParams {
  id: string;
}

export async function deleteEmpresa({ id }: DeleteEmpresaParams) {
  await api.delete(`/v1/empresa/${id}`);
}

interface PatchEmpresaParams {
  id: string;
  sigla?: string;
  nome?: string;
}

export async function patchEmpresa({ id, sigla, nome }: PatchEmpresaParams) {
  await api.patch(`/v1/empresa/${id}`, { sigla, nome });
}
