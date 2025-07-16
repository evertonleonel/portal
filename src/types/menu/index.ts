import type { Sistema } from '../sistema';
import type { Usuario } from '../user';

export interface Menu {
  id: number;
  desc: string;
  caminho: string;
  menuPrincipal: string;
  ordemExibicao: number;
  sistema: Sistema;
  dataCriacao: string;
  usuarioCriacao: Usuario;
  dataAlteracao: string;
  usuarioAlteracao: Usuario;
}
