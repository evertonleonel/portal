interface EmpresaNotification {
  id: number;
  sigla: string;
  nome: string;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
}

interface Sistema {
  id: number;
  sigla: string;
  nome: string;
  empresa: EmpresaNotification;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
}

interface MenuNotification {
  id: number;
  desc: string;
  caminho: string;
  menuPrincipal: string | null;
  ordemExibicao: number;
  sistema: Sistema;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
  perfilMenus: string[]; // ou: PerfilMenu[] se for referenciado como objeto
}

interface PerfilMenuNotification {
  id: number;
  perfil: string;
  menu: MenuNotification;
  descNivelAcesso: string;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
}

interface PerfilNotification {
  id: number;
  desc: string;
  sistema: Sistema;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
  usuarioPerfis: string[]; // ou UsuarioPerfil[]
  perfilMenus: PerfilMenuNotification[];
}

interface UsuarioPerfil {
  id: number;
  usuario: string;
  perfil: PerfilNotification;
  dataCriacao: string;
  usuarioCriacao: string;
}

interface UsuarioNofitication {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  empresa: EmpresaNotification;
  chaveAd: string;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: string;
  dataAlteracao: string;
  usuarioAlteracao: string;
  usuarioPerfis: UsuarioPerfil[];
}

export interface Notification {
  id: number;
  usuario: UsuarioNofitication;
  descricao: string;
  lido: boolean;
  dataCriacao: string;
  usuarioCriacao: UsuarioNofitication;
  dataAlteracao: string;
  usuarioAlteracao: UsuarioNofitication;
}
