import { api } from '@/lib/axios';
import type { PerfilRequestParams } from '@/types/perfil/request';

export async function approveRequestRegister(
  idUsuarioSolicitacao: number,
  params: PerfilRequestParams[]
) {
  await api.patch(`/v1/usuario-solicitacao/${idUsuarioSolicitacao}/aprovar`, {
    perfis: params.values,
  });
}
