import type { Empresa } from '../empresa';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  empresa: Empresa;
  chaveAd: string;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
}

export interface UsuarioCriacaoMenu {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  chaveAd: string;
  ativo: boolean;
  dataCriacao: string;
}
