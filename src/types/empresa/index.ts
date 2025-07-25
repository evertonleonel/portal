export type Empresa = {
  id: number;
  sigla: string;
  nome: string;
  ativo: boolean;
  dataCriacao: string;
  usuarioCriacao: {
    id: number;
    nome: string;
    dataCriacao: string;
  };
  dataAlteracao: string | null;
  usuarioAlteracao: string | null;
};
