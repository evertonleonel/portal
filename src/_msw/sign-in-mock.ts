import { http, HttpResponse } from 'msw';

export const signInMock = http.post('/sign', () => {
  return new HttpResponse(null, { status: 401 });
});
