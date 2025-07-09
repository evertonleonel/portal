import { postUsuarioSolicitacaoMock } from './mocks/services/auth/signin/register/register-mock';
import {
  deleteEmpresaMock,
  getEmpresaByIdMock,
  getEmpresaMock,
  patchEmpresaMock,
  postEmpresaMock,
} from './mocks/services/empresa/empresa-mock';

export const handlers = [
  postUsuarioSolicitacaoMock,
  getEmpresaMock,
  getEmpresaByIdMock,
  postEmpresaMock,
  patchEmpresaMock,
  deleteEmpresaMock,
];
