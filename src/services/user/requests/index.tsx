import { api } from '@/lib/axios';
import type { GetUserRequestsResponse } from '@/types/user/requests';

export async function getAllUserRequests() {
  const response = await api.get<GetUserRequestsResponse[]>(`/v1/usuario-solicitacao`);
  return response.data;
}
