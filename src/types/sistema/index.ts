import type { Empresa } from '../empresa';
import type { Usuario } from '../user';

type UsuarioSistema = Pick<Usuario, 'id' | 'nome' | 'dataCriacao'>;

// type EmpresaSistema = Omit<Empresa, 'usuarioAlteracao'> & {
//   usuarioAlteracao: {
//     id: number;
//     nome: string;
//     dataCriacao: string;
//   } | null;
// };

export interface Sistema {
  id: number;
  sigla: string;
  nome: string;
  empresa: Empresa;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: UsuarioSistema;
  dataAlteracao: string | null;
  usuarioAlteracao: UsuarioSistema | null;
}
