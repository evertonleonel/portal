import type { Sistema } from '@/types/sistema';
import type { UserResponse } from '@/types/user/requests';

export interface PerfilResponseParams {
  id: number;
  desc: string;
  sistema: Sistema;
  usuarioCriacao: UserResponse;
}
