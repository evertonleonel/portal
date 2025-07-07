import { api } from '@/utils/lib/axios';

export interface UserRequestRegisterParams {
  nome: string;
  email: string;
  cargo: string;
  empresa: { id: string };
}

export async function userRequestRegister({
  nome,
  email,
  cargo,
  empresa,
}: UserRequestRegisterParams) {
  await api.post(`/v1/usuario-solicitacao`, { nome, email, cargo, empresa });
}
