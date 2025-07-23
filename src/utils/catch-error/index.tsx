import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import * as z from 'zod';

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map(issue => {
      return issue.message;
    });
    return toast(errors.join('\n'));
  } else if (isAxiosError(err)) {
    const message =
      err.response?.data?.detail ||
      'Erro inesperado do servidor, tente novamente mais tarde.';
    return toast.error(message);
  } else if (err instanceof Error) {
    return toast.error(err.message);
  } else {
    return toast('Algo deu errado, tente novamente mais tarde.');
  }
}
