import type { Sistema } from '@/types/sistema';

import type { UserPerfilCriacao } from '../user';

export interface PerfilRequestParams {
  id: number;
}

export interface PerfilResponseParams {
  id: number;
  desc: string;
  sistema: Sistema;
  usuarioCriacao: UserPerfilCriacao;
}
