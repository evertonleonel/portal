import type { Empresa } from '../empresa';

export interface Sistema {
  id: number;
  sigla: string;
  nome: string;
  empresa: Empresa;
}
