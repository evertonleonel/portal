import { api } from '@/lib/axios';
import type { NegarRequestParams } from '@/types/user/requests/to-deny';

export async function negarRequestRegister(
  idUsuarioSolicitacao: number,
  params: NegarRequestParams
) {
  await api.patch(`/v1/usuario-solicitacao/${idUsuarioSolicitacao}/negar`, {
    justificativa: params.justificativa,
  });
}
