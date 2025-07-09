import { api } from '@/lib/axios';
import type {
  DeleteEmpresaParams,
  GetEmpresaByIdParams,
  GetEmpresaResponse,
  PatchEmpresaParams,
  PostEmpresaBody,
} from '@/types/empresa';

export async function getAllEmpresa() {
  const response = await api.get<GetEmpresaResponse[]>(`/v1/empresa`);
  return response.data;
}

export async function getEmpresaById({ id }: GetEmpresaByIdParams) {
  const response = await api.get<GetEmpresaResponse>(`/v1/empresa/${id}`);
  return response.data;
}

export async function postEmpresa({ sigla, nome }: PostEmpresaBody) {
  await api.post(`/v1/empresa`, { sigla, nome });
}

export async function deleteEmpresa({ id }: DeleteEmpresaParams) {
  await api.delete(`/v1/empresa/${id}`);
}

export async function patchEmpresa({ id, sigla, nome }: PatchEmpresaParams) {
  await api.patch(`/v1/empresa/${id}`, { sigla, nome });
}
