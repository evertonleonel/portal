import { api } from '@/lib/axios';
import type {
  GetAllUserRequestsParams,
  GetUserRequestsResponse,
} from '@/types/user/requests';

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
