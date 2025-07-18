import type { Sistema } from '../sistema';
import type { Usuario } from '../user';

type UsuarioCriacaoMenu = Omit<
  Usuario,
  'empresa' | 'usuarioCriacao' | 'dataAlteracao' | 'usuarioAlteracao'
>;

export interface Menu {
  id: number;
  desc: string;
  caminho: string;
  subMenus: SubMenu[];
  sistema: Sistema;
  dataCriacao: string;
  usuarioCriacao: UsuarioCriacaoMenu;
}

export interface SubMenu {
  id: number;
  desc: string;
  caminho: string;
  ordemExibicao: number;
  dataCriacao: string;
}
