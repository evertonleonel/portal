import { http, HttpResponse } from 'msw';

import type { UserRequestRegisterParams } from '@/types/auth/signin/register/http';

export const postUsuarioSolicitacaoMock = http.post<
  never,
  UserRequestRegisterParams
>('/v1/usuario-solicitacao', async ({ request }) => {
  const { email } = await request.json();

  if (email === 'johndoe@example.com') {
    return new HttpResponse(null, { status: 400 });
  }

  if (email === 'email@teste.com') {
    return new HttpResponse(null, {
      status: 200,
    });
  }

  return new HttpResponse(null, { status: 204 });
});
