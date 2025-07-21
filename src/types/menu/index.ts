import type { Sistema } from '../sistema';
import type { UsuarioCriacaoMenu } from '../user';

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

//HTTP

export type GetMenuResponse = Menu;

export interface GetMenuByIdParams {
  id: string;
}

export interface PostMenuBody {
  desc: string;
  caminho: string;
}

export interface DeleteMenuParams {
  id: string;
}

export interface PatchMenuParams {
  id: string;
  desc?: string;
  caminho?: string;
}
