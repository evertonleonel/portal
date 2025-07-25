import type { Menu } from '.';

export type GetMenuResponse = Menu;

export interface GetMenuByIdParams {
  id: string;
}

export interface PostMenuBody {
  desc: string;
  caminho: string;
}

export interface PostSubMenuBody {
  desc: string;
  caminho: string;
  menuPrincipal: string;
  ordemExibicao: string;
}

export interface DeleteMenuParams {
  id: string;
}

export interface PatchMenuParams {
  id: string;
  desc?: string;
  caminho?: string;
  menuPrincipal?: string;
  ordemExibicao?: string;
}
