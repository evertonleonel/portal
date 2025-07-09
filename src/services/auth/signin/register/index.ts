import { api } from '@/lib/axios';
import type { UserRequestRegisterParams } from '@/types/auth/signin/register';

export async function userRequestRegister({
  nome,
  email,
  cargo,
  empresa,
}: UserRequestRegisterParams) {
  await api.post(`/v1/usuario-solicitacao`, { nome, email, cargo, empresa });
}
