export interface UserRequestRegisterParams {
  nome: string;
  email: string;
  cargo: string;
  empresa: { id: string };
}
