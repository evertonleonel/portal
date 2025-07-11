export enum USER_REQUEST_STATUS {
  P = 'Pendente',
  A = 'Aprovado',
  N = 'Negado',
}

export type USER_REQUEST_STATUS_TYPE = keyof typeof USER_REQUEST_STATUS;
