import { api } from '@/lib/axios';
import type { PerfilRequestParams } from '@/types/perfil/http';
import type {
  GetAllUserRequestsParams,
  GetUserRequestsResponse,
  NegarRequestParams,
} from '@/types/user/requests/http';

export async function getAllUserRequests(
  { nome, idEmpresa }: GetAllUserRequestsParams,
  signal?: AbortSignal
) {
  //Remove param sem valor
  const params = {
    ...(nome && { nome }),
    ...(typeof idEmpresa === 'number' &&
      !isNaN(idEmpresa) &&
      idEmpresa !== 0 && { idEmpresa }),
  };

  const response = await api.get<GetUserRequestsResponse[]>(
    `/v1/usuario-solicitacao`,
    {
      params,
      signal,
    }
  );
  return response.data;
}

export async function approveRequestRegister(
  idUsuarioSolicitacao: number,
  params: PerfilRequestParams[]
) {
  await api.patch(`/v1/usuario-solicitacao/${idUsuarioSolicitacao}/aprovar`, {
    perfis: params.values,
  });
}

export async function negarRequestRegister(
  idUsuarioSolicitacao: number,
  params: NegarRequestParams
) {
  await api.patch(`/v1/usuario-solicitacao/${idUsuarioSolicitacao}/negar`, {
    justificativa: params.justificativa,
  });
}
